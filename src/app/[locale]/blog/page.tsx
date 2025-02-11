import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import { blogService } from "@/app/_services/blog-service";
import Link from "next/link";
import Image from "next/image";

export default async function BlogPage() {
  const blogs = await blogService.getBlogs();
  const publishedBlogs = blogs.filter((blog) => blog.status === "published");

  return (
    <Box>
      <Header />
      <Box sx={{ py: { xs: 12, md: 16 }, bgcolor: "#f8f8f8" }}>
        <Container maxWidth="lg" sx={{ minHeight: "50vh" }}>
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              mb: 2,
              fontWeight: 600,
              letterSpacing: "-0.5px",
              color: "#666",
            }}
          >
            Our Blog
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              mb: 8,
              color: "#666",
              fontSize: "1.1rem",
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Photography tips, wedding inspiration, and behind-the-scenes stories
          </Typography>

          <Grid container spacing={4}>
            {publishedBlogs.map((blog) => (
              <Grid item xs={12} md={4} key={blog?.id}>
                <Link
                  href={`/blog/${blog?.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 2,
                      overflow: "hidden",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                      },
                    }}
                  >
                    <Box sx={{ position: "relative", height: 240 }}>
                      <Image
                        src={
                          blog?.imageUrl ||
                          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D"
                        }
                        alt={blog?.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                    <Box sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          mb: 1,
                          fontWeight: 600,
                          color: "#1a1a1a",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {blog.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#666",
                          fontSize: "0.875rem",
                        }}
                      >
                        {new Date(
                          blog?.createdAt as string
                        ).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Paper>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
