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
} from "@mui/material";
import { MdArrowBack, MdSave } from "react-icons/md";
import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRouter } from "next/navigation";

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
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("draft");

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
  });

  const handleSave = () => {
    const content = editor?.getHTML();
    console.log({ title, content, status });
  };

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
            {blogId ? "Edit Blog Post" : "New Blog Post"}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<MdSave />}
          onClick={handleSave}
          sx={{
            bgcolor: "#1a1a1a",
            "&:hover": {
              bgcolor: "#333",
            },
          }}
        >
          Save
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
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
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
