"use client";
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Blog, blogService } from "@/app/_services/blog-service";
import { useTranslations } from "next-intl";

export default function BlogList() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const t = useTranslations("blog");

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const data = await blogService.getBlogs();
      setBlogs(data);
    } catch (error) {
      console.error("Error loading blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog: Blog) => {
    router.push(`/dashboard/blogs/${blog.id}`);
  };

  const handleDelete = (blog: Blog) => {
    setSelectedBlog(blog);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedBlog?.id) return;

    try {
      await blogService.deleteBlog(selectedBlog.id);
      await loadBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setDeleteDialogOpen(false);
      setSelectedBlog(null);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
          color: "text.primary",
        }}
      >
        <CircularProgress color="inherit" />
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
        <Typography variant="h5" sx={{ fontWeight: 600, color: "#1a1a1a" }}>
          Blog Posts
        </Typography>
        <Button
          variant="contained"
          startIcon={<MdAdd />}
          onClick={() => router.push("/dashboard/blogs/new")}
          sx={{
            bgcolor: "#1a1a1a",
            color: "white",
            "&:hover": {
              bgcolor: "#333",
            },
          }}
        >
          New Post
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>
                Title
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>
                Slug
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>
                Created
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>
                Updated
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow
                key={blog.id}
                sx={{
                  "&:hover": {
                    bgcolor: "rgba(0,0,0,0.01)",
                  },
                }}
              >
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.slug}</TableCell>
                <TableCell>
                  <Chip
                    label={blog.status}
                    size="small"
                    sx={{
                      bgcolor:
                        blog.status === "published" ? "#4caf50" : "#ff9800",
                      color: "white",
                      textTransform: "capitalize",
                    }}
                  />
                </TableCell>
                <TableCell>
                  {new Date(blog.createdAt.toDate()).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(blog.updatedAt.toDate()).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(blog)}
                    sx={{ color: "text.primary" }}
                  >
                    <MdEdit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(blog)}
                    sx={{ color: "#dc3545" }}
                  >
                    <MdDelete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Blog Post</DialogTitle>
        <DialogContent>
          {`${t("deleteConfirmation1")} ${selectedBlog?.title} ${t(
            "deleteConfirmation2"
          )}`}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
