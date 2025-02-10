"use client";

import { Box, Container, Typography, CircularProgress } from "@mui/material";
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import { useEffect, useState } from "react";
import { Blog, blogService } from "@/app/_services/blog-service";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const data = await blogService.getBlogBySlug(slug);
        if (!data || data.status !== "published") {
          notFound();
        }
        setBlog(data);
      } catch (error) {
        console.error("Error loading blog:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };
    loadBlog();
  }, [slug]);

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!blog) return null;

  return (
    <Box>
      <Header />
      <Box sx={{ py: { xs: 12, md: 16 }, bgcolor: "#f8f8f8" }}>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              mb: 2,
              fontWeight: 600,
              color: "#1a1a1a",
            }}
          >
            {blog.title}
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              mb: 8,
              color: "#666",
              fontSize: "1rem",
            }}
          >
            {new Date(blog.createdAt as string).toLocaleDateString()}
          </Typography>
          <Box
            sx={{
              bgcolor: "white",
              p: { xs: 3, md: 6 },
              borderRadius: 2,
              "& img": {
                maxWidth: "100%",
                height: "auto",
                borderRadius: 1,
              },
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
