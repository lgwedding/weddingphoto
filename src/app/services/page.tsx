"use client";

import { Box, Container, Typography, Grid, Divider } from "@mui/material";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaCamera, FaVideo, FaGlobe, FaEnvelope } from "react-icons/fa";

const services = [
  {
    title: "Wedding Photography",
    description:
      "Capturing your special moments with artistic vision and attention to detail. Our photography packages include engagement sessions, full-day wedding coverage, and carefully curated digital galleries.",
    icon: FaCamera,
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b",
  },
  {
    title: "Wedding Videography",
    description:
      "Professional cinematography that tells your love story. From getting ready to the last dance, we create beautiful films that you'll treasure forever.",
    icon: FaVideo,
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
  },
  {
    title: "Wedding Websites",
    description:
      "Custom-designed wedding websites that keep your guests informed and excited. Share your love story, event details, and manage RSVPs all in one beautiful place.",
    icon: FaGlobe,
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12",
  },
  {
    title: "Wedding Invitations",
    description:
      "Elegant and personalized wedding invitations that set the tone for your special day. From save-the-dates to thank you cards, we create cohesive stationery suites.",
    icon: FaEnvelope,
    image: "https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9",
  },
];

export default function Services() {
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
          src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92"
          alt="Wedding Services"
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
            Our Services
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Comprehensive Wedding Solutions for Your Perfect Day
          </Typography>
        </Box>
      </Box>

      {/* Services Section */}
      {services.map((service, index) => (
        <Box
          key={service.title}
          sx={{
            py: { xs: 8, md: 12 },
            bgcolor: index % 2 === 0 ? "white" : "#f8f8f8",
          }}
        >
          <Container maxWidth="lg">
            <Grid
              container
              spacing={8}
              direction={index % 2 === 0 ? "row" : "row-reverse"}
              alignItems="center"
            >
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    position: "relative",
                    height: { xs: 300, md: 500 },
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ maxWidth: 480 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Box
                      sx={{
                        mr: 2,
                        color: "#1a1a1a",
                        "& svg": { fontSize: "1.8rem" },
                      }}
                    >
                      <service.icon />
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 600 }}>
                      {service.title}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{ color: "#666", fontSize: "1.1rem", lineHeight: 1.8 }}
                  >
                    {service.description}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      ))}

      {/* Contact CTA */}
      <Box sx={{ bgcolor: "#1a1a1a", color: "white", py: 16 }}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ mb: 3, fontWeight: 600 }}>
            Ready to Create Something Beautiful?
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, opacity: 0.9, fontSize: "1.1rem" }}
          >
            Let's discuss your wedding vision and how we can help bring it to
            life.
          </Typography>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
