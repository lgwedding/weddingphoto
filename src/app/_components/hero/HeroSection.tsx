import { Box, Typography, Container, Fade } from "@mui/material";
import Image from "next/image";

interface HeroSectionProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  height?: string;
  overlay?: boolean;
}

export default function HeroSection({
  imageUrl,
  title,
  subtitle,
  height = "100vh",
  overlay = true,
}: HeroSectionProps) {
  return (
    <Box
      sx={{
        height,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 8,
      }}
    >
      <Fade in timeout={1000}>
        <Box sx={{ position: "absolute", width: "100%", height: "100%" }}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </Box>
      </Fade>

      {overlay && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            transition: "background-color 0.5s ease",
          }}
        />
      )}

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Fade in timeout={1500}>
          <Box
            sx={{
              textAlign: "center",
              color: "white",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "4rem" },
                fontWeight: 600,
                mb: 3,
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                maxWidth: "800px",
                mx: "auto",
                opacity: 0.9,
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              {subtitle}
            </Typography>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}
