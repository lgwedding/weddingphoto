import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import Image from "next/image";
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { Metadata } from "next";

export default function Contact() {
  const t = useTranslations("contact");
  const contactInfo = [
    {
      icon: FaPhone,
      title: t("info.phone.title"),
      details: t("info.phone.details"),
      description: t("info.phone.description"),
    },
    {
      icon: FaEnvelope,
      title: t("info.email.title"),
      details: t("info.email.details"),
      description: t("info.email.description"),
    },
    {
      icon: FaMapMarkerAlt,
      title: t("info.location.title"),
      details: t("info.location.details"),
      description: t("info.location.description"),
    },
  ];
  return (
    <Box>
      <Header />

      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          py: { xs: 12, md: 16 },
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1520854221256-17451cc331bf"
          alt="Contact Us"
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
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={6}>
            {/* Left Side - Contact Info */}
            <Grid item xs={12} md={5}>
              <Typography
                variant="h1"
                sx={{
                  color: "white",
                  fontSize: { xs: "2.5rem", md: "4rem" },
                  fontWeight: 600,
                  mb: 4,
                  letterSpacing: "-1px",
                }}
              >
                {t("title")}
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  opacity: 0.9,
                  mb: 6,
                  fontSize: "1.1rem",
                }}
              >
                {t("subtitle")}
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {contactInfo.map((info, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      color: "white",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateX(10px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: "50%",
                        bgcolor: "rgba(255,255,255,0.1)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <info.icon size={24} />
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ mb: 0.5, fontWeight: 600 }}
                      >
                        {info.title}
                      </Typography>
                      <Typography sx={{ opacity: 0.9 }}>
                        {info.details}
                      </Typography>
                      <Typography sx={{ opacity: 0.7, fontSize: "0.9rem" }}>
                        {info.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Right Side - Contact Form */}
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  bgcolor: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(20px)",
                  borderRadius: 4,
                  p: { xs: 4, md: 6 },
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    mb: 4,
                    fontWeight: 600,
                    background: "linear-gradient(90deg, #1a1a1a, #333)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {t("form.title")}
                </Typography>

                <Box
                  component="form"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label={t("form.firstName")}
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "white",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label={t("form.lastName")}
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "white",
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    label={t("form.email")}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "white",
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label={t("form.phone")}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "white",
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label={t("form.message")}
                    multiline
                    rows={6}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "white",
                      },
                    }}
                  />

                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: "#1a1a1a",
                      color: "white",
                      py: 2,
                      px: 6,
                      borderRadius: "30px",
                      "&:hover": {
                        bgcolor: "#333",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {t("form.submit")}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: "Contact Us | SONDER Photography",
    description:
      "Get in touch with SONDER Photography for your wedding photography needs. Based in Hungary, available for destination weddings.",
    alternates: {
      canonical: `https://yourdomain.com/${locale}/contact`,
      languages: {
        en: "/en/contact",
        hu: "/hu/contact",
      },
    },
    openGraph: {
      title: "Contact SONDER Photography",
      description: "Book your wedding photography consultation today",
      images: [
        {
          url: "/contact-og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Contact SONDER Photography",
        },
      ],
    },
  };
}
