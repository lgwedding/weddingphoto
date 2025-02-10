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
} from "@mui/material";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Blog {
  id: string;
  title: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

const dummyBlogs: Blog[] = [
  {
    id: "1",
    title: "Wedding Photography Tips",
    status: "published",
    createdAt: "2024-03-15",
    updatedAt: "2024-03-15",
  },
  {
    id: "2",
    title: "Best Locations for Engagement Photos",
    status: "draft",
    createdAt: "2024-03-14",
    updatedAt: "2024-03-14",
  },
];

export default function BlogList() {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const handleEdit = (blog: Blog) => {
    router.push(`/dashboard/blogs/${blog.id}`);
  };

  const handleDelete = (blog: Blog) => {
    setSelectedBlog(blog);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // TODO: Implement delete functionality
    setDeleteDialogOpen(false);
    setSelectedBlog(null);
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
        <Typography variant="h5" sx={{ fontWeight: 600, color: "#1a1a1a" }}>
          Blog Posts
        </Typography>
        <Button
          variant="contained"
          startIcon={<MdAdd />}
          onClick={() => router.push("/dashboard/blogs/new")}
          sx={{
            bgcolor: "#1a1a1a",
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
            <TableRow sx={{ bgcolor: "rgba(0,0,0,0.02)" }}>
              <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Created</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Updated</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyBlogs.map((blog) => (
              <TableRow
                key={blog.id}
                sx={{
                  "&:hover": {
                    bgcolor: "rgba(0,0,0,0.01)",
                  },
                }}
              >
                <TableCell>{blog.title}</TableCell>
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
                <TableCell>{blog.createdAt}</TableCell>
                <TableCell>{blog.updatedAt}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(blog)}
                    sx={{ color: "#1a1a1a" }}
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
          Are you sure you want to delete "{selectedBlog?.title}"? This action
          cannot be undone.
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
