"use client";

import { Box, Container, Typography, Grid } from "@mui/material";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Masonry from "@mui/lab/Masonry";

const portfolioImages = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552",
    alt: "Wedding Ceremony",
    height: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
    alt: "Bride Portrait",
    height: 400,
  },
  {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
    alt: "Wedding Details",
    height: 500,
  },
  {
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6",
    alt: "Couple Portrait",
    height: 450,
  },
  {
    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866",
    alt: "Wedding Reception",
    height: 550,
  },
  {
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a",
    alt: "First Dance",
    height: 500,
  },
];

export default function Portfolio() {
  return (
    <Box>
      <Header />

      {/* Hero Section */}
      <Box
        sx={{
          height: "50vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 8,
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552"
          alt="Portfolio Hero"
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
            Our Portfolio
          </Typography>
          <Typography variant="h5">
            Moments Captured with Love and Artistry
          </Typography>
        </Box>
      </Box>

      {/* Portfolio Gallery */}
      <Container maxWidth="xl" sx={{ mb: 8 }}>
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={3}>
          {portfolioImages.map((image, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                height: { xs: 300, md: image.height },
                borderRadius: 2,
                overflow: "hidden",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.02)",
                  "& .overlay": {
                    opacity: 1,
                  },
                },
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                style={{ objectFit: "cover" }}
              />
              <Box
                className="overlay"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  bgcolor: "rgba(0,0,0,0.7)",
                  color: "white",
                  p: 2,
                  opacity: 0,
                  transition: "opacity 0.3s ease-in-out",
                }}
              >
                <Typography variant="subtitle1">{image.alt}</Typography>
              </Box>
            </Box>
          ))}
        </Masonry>
      </Container>

      <Footer />
    </Box>
  );
}
