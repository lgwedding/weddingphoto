"use client";

import { Box, Container, Typography, Grid } from "@mui/material";
import Image from "next/image";
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Lead Photographer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    description:
      "With over 10 years of experience capturing life's precious moments.",
  },
  {
    name: "David Chen",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    description:
      "Bringing creative vision and artistic direction to every shoot.",
  },
  {
    name: "Emma Williams",
    role: "Event Coordinator",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    description:
      "Ensuring your special day runs smoothly from start to finish.",
  },
];

export default function About() {
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
          src="https://images.unsplash.com/photo-1604017011826-d3b4c23f8914"
          alt="Studio Equipment"
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
            Our Story
          </Typography>
          <Typography variant="h5">
            Passionate About Capturing Your Special Moments
          </Typography>
        </Box>
      </Box>

      {/* About Content */}
      <Container maxWidth="lg" sx={{ mb: 12 }}>
        <Grid container spacing={8}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ mb: 4, fontWeight: 600 }}>
              Who We Are
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 3, color: "#666", fontSize: "1.1rem" }}
            >
              At Sonder Photography, we believe every moment tells a story.
              Founded in 2015, we've dedicated ourselves to capturing the
              authentic, unscripted moments that make each wedding unique.
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#666", fontSize: "1.1rem" }}
            >
              Our approach combines artistic vision with technical excellence,
              ensuring that every photograph not only captures the moment but
              also the emotion behind it.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                height: "400px",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e"
                alt="Photography Equipment"
                fill
                style={{ objectFit: "cover" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Team Section */}
      <Box sx={{ bgcolor: "#f8f8f8", py: 12 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{ textAlign: "center", mb: 8, fontWeight: 600, color: "#666" }}
          >
            Meet Our Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box
                  sx={{
                    textAlign: "center",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: 300,
                      width: 300,
                      borderRadius: "50%",
                      overflow: "hidden",
                      margin: "0 auto",
                      mb: 3,
                    }}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{ mb: 1, fontWeight: 600, color: "#666" }}
                  >
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mb: 2, color: "#666" }}>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    {member.description}
                  </Typography>
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
