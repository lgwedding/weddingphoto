"use client";

import { Box, Container, Typography, Button, Grid } from "@mui/material";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
            textAlign: "center",
            color: "white",
            zIndex: 1,
            p: 4,
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "4rem" },
              fontWeight: 600,
              mb: 2,
            }}
          >
            Capturing Timeless Moments
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Professional Wedding Photography in Hungary
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "white",
              color: "#1a1a1a",
              "&:hover": { bgcolor: "#f8f8f8" },
            }}
          >
            Book a Consultation
          </Button>
        </Box>
      </Box>

      {/* Portfolio Preview */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ textAlign: "center", mb: 6 }}>
          Recent Works
        </Typography>
        <Grid container spacing={3}>
          {[
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
            "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6",
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
          ].map((img, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box sx={{ position: "relative", height: 400 }}>
                <Image
                  src={img}
                  alt={`Portfolio ${index + 1}`}
                  fill
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}
