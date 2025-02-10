"use client";

import {
  Box,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { MdArrowBack, MdSave } from "react-icons/md";
import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRouter } from "next/navigation";
import { Blog, blogService } from "@/app/_services/blog-service";

interface BlogEditorProps {
  blogId?: string;
}

const MenuBar = ({ editor }: any) => {
  if (!editor) {
    return null;
  }

  return (
    <Box sx={{ mb: 2, display: "flex", gap: 1 }}>
      <Button
        size="small"
        variant={editor.isActive("bold") ? "contained" : "outlined"}
        onClick={() => editor.chain().focus().toggleBold().run()}
        sx={{ minWidth: "auto" }}
      >
        B
      </Button>
      <Button
        size="small"
        variant={editor.isActive("italic") ? "contained" : "outlined"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        sx={{ minWidth: "auto" }}
      >
        I
      </Button>
      <Button
        size="small"
        variant={
          editor.isActive("heading", { level: 1 }) ? "contained" : "outlined"
        }
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </Button>
      <Button
        size="small"
        variant={
          editor.isActive("heading", { level: 2 }) ? "contained" : "outlined"
        }
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </Button>
      <Button
        size="small"
        variant={editor.isActive("bulletList") ? "contained" : "outlined"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        List
      </Button>
    </Box>
  );
};

export default function BlogEditor({ blogId }: BlogEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [blog, setBlog] = useState<Partial<Blog>>({
    title: "",
    slug: "",
    status: "draft",
    content: "",
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: blog.content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (blogId && blogId !== "new") {
      setLoading(true);
      blogService
        .getBlog(blogId)
        .then((data) => {
          if (data) {
            setBlog(data);
            editor?.commands.setContent(data.content || "");
          }
        })
        .finally(() => setLoading(false));
    }
  }, [blogId, editor]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setBlog((prev) => ({
      ...prev,
      title,
      slug: blogService.generateSlug(title),
    }));
  };

  const handleSave = async () => {
    if (!blog.title || !editor) {
      console.log("Validation failed:", { blog, editor });
      return;
    }

    const content = editor.getHTML();
    const blogData = {
      title: blog.title,
      content: content,
      slug: blog.slug || blogService.generateSlug(blog.title),
      status: blog.status || "draft",
    };

    console.log("Attempting to save blog:", blogData);

    setSaving(true);
    try {
      if (blogId && blogId !== "new") {
        await blogService.updateBlog(blogId, blogData);
      } else {
        await blogService.createBlog(blogData);
      }
      router.push("/dashboard/blogs");
    } catch (error) {
      console.error("Error saving blog:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={() => router.back()}
            sx={{
              color: "#1a1a1a",
              "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
            }}
          >
            <MdArrowBack />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 600, color: "#1a1a1a" }}>
            {blogId && blogId !== "new" ? "Edit Blog Post" : "New Blog Post"}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={
            saving ? <CircularProgress size={20} color="inherit" /> : <MdSave />
          }
          onClick={handleSave}
          disabled={saving}
          sx={{
            bgcolor: "#1a1a1a",
            "&:hover": {
              bgcolor: "#333",
            },
          }}
        >
          {saving ? "Saving..." : "Save"}
        </Button>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          bgcolor: "white",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", gap: 2, mb: 3, flexDirection: "column" }}>
          <TextField
            fullWidth
            label="Title"
            value={blog.title}
            onChange={handleTitleChange}
          />
          <TextField
            fullWidth
            label="URL Slug"
            value={blog.slug}
            onChange={(e) =>
              setBlog((prev) => ({ ...prev, slug: e.target.value }))
            }
            helperText="This will be the URL of your blog post"
          />
          <FormControl>
            <InputLabel>Status</InputLabel>
            <Select
              value={blog.status}
              label="Status"
              onChange={(e) =>
                setBlog((prev) => ({
                  ...prev,
                  status: e.target.value as "draft" | "published",
                }))
              }
            >
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="published">Published</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: 1,
            p: 2,
            minHeight: 400,
            "& .ProseMirror": {
              minHeight: 300,
              outline: "none",
            },
          }}
        >
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
        </Box>
      </Paper>
    </>
  );
}
