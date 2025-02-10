import { Box, Container, Typography } from "@mui/material";
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import { blogService } from "@/app/_services/blog-service";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await blogService.getBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${blog.title} | SONDER Photography`,
    description: blog.content?.substring(0, 160),
    openGraph: {
      title: blog.title,
      description: blog.content?.substring(0, 160),
      type: "article",
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await blogService.getBlogBySlug(params.slug);

  if (!blog || blog.status !== "published") {
    notFound();
  }

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
