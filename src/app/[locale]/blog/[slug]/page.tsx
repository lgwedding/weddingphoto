import { Box, Container, Typography } from "@mui/material";
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import { blogService } from "@/app/_services/blog-service";
import { notFound } from "next/navigation";
import Image from "next/image";
import ShareButtons from "@/app/_components/blog/ShareButtons";
import { env } from "@/app/_config/env.config";

type Params = Promise<{
  locale: "en" | "hu";
  slug: string;
}>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug, locale } = await params;
  const blog = await blogService.getBlogBySlug(slug);
  console.log("blog", slug, locale);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
    };
  }

  const defaultImage =
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643";

  return {
    title: `${blog.title} | SONDER Photography`,
    description: blog.content?.substring(0, 160),
    alternates: {
      canonical: `${env.SITE_URL}/${locale}/blog/${slug}`,
      languages: {
        en: `${env.SITE_URL}/en/blog/${slug}`,
        hu: `${env.SITE_URL}/hu/blog/${slug}`,
      },
    },
    openGraph: {
      title: blog.title,
      description: blog.content?.substring(0, 160),
      type: "article",
      url: `${env.SITE_URL}/${locale}/blog/${slug}`,
      images: [
        {
          url: blog.imageUrl || defaultImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.content?.substring(0, 160),
      images: [blog.imageUrl || defaultImage],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug, locale } = await params;
  const blog = await blogService.getBlogBySlug(slug);

  if (!blog || blog.status !== "published") {
    notFound();
  }

  const defaultImage =
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    image: blog.imageUrl || defaultImage,
    datePublished: blog.createdAt.toDate().toISOString(),
    dateModified: blog.updatedAt.toDate().toISOString(),
    author: {
      "@type": "Organization",
      name: "SONDER Photography",
    },
    publisher: {
      "@type": "Organization",
      name: "SONDER Photography",
      logo: {
        "@type": "ImageObject",
        url: `${env.SITE_URL}/logo.jpg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${env.SITE_URL}/${locale}/blog/${slug}`,
    },
    description: blog.content?.substring(0, 160),
  };

  return (
    <Box>
      <Header />
      <Box sx={{ py: { xs: 12, md: 16 }, bgcolor: "#f8f8f8" }}>
        <Container maxWidth="md">
          {blog.imageUrl && (
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: 300, md: 400 },
                mb: 6,
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
              <ShareButtons
                url={`${env.SITE_URL}/${locale}/blog/${slug}`}
                title={blog.title}
                description={blog.content?.substring(0, 160)}
              />
            </Box>
          )}
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
            {new Date(blog.createdAt.toDate()).toLocaleDateString()}
          </Typography>
          <Box
            sx={{
              bgcolor: "white",
              p: { xs: 3, md: 6 },
              borderRadius: 2,
              fontFamily: "var(--font-main)",
              color: "black",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Box>
  );
}
