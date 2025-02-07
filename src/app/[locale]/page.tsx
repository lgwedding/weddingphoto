"use client";

import { Box, Container, Typography, Button, Grid } from "@mui/material";
import Image from "next/image";
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import HeroSection from "../_components/hero/HeroSection";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PhotographyBusiness",
    name: "SONDER Photography",
    image: "https://yourdomain.com/logo.jpg",
    "@id": "https://yourdomain.com",
    url: "https://yourdomain.com",
    telephone: "+1-555-123-4567",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Creative Studio St.",
      addressLocality: "New York",
      postalCode: "10001",
      addressCountry: "US",
    },
    priceRange: "€€€",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };

  return (
    <Box>
      <Header />

      {/* Hero Section */}
      <HeroSection
        imageUrl="https://images.unsplash.com/photo-1519741497674-611481863552"
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        height="100vh"
      />

      {/* Portfolio Preview */}
      <Box sx={{ py: { xs: 12, md: 16 }, bgcolor: "#f8f8f8" }}>
        <Container maxWidth="lg">
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
            Recent Works
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
            A glimpse into our latest wedding photography collections
          </Typography>
          <Grid container spacing={3}>
            {[
              "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
              "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6",
              "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
            ].map((img, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box
                  sx={{
                    position: "relative",
                    height: 500,
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-10px)",
                    },
                  }}
                >
                  <Image
                    src={img}
                    alt={`Portfolio ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
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
