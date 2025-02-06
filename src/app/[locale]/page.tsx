"use client";

import { Box, Container, Typography, Button, Grid } from "@mui/material";
import Image from "next/image";
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";

export default function Home() {
  return (
    <Box>
      <Header />

      {/* Hero Section */}
      <Box
        sx={{
          height: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552"
          alt="Wedding Photography"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        />
        <Box
          sx={{
            position: "relative",
            textAlign: "center",
            color: "white",
            zIndex: 1,
            p: 4,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "4.5rem" },
              fontWeight: 600,
              mb: 3,
              letterSpacing: "-1px",
              maxWidth: 900,
              mx: "auto",
            }}
          >
            Capturing Timeless Moments
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 6,
              fontWeight: 300,
              opacity: 0.9,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Professional Wedding Photography in Hungary
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="/contact"
            sx={{
              bgcolor: "white",
              color: "#1a1a1a",
              px: 4,
              py: 1.5,
              "&:hover": {
                bgcolor: "#f8f8f8",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Book a Consultation
          </Button>
        </Box>
      </Box>

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
    </Box>
  );
}
