import { Box, Container, Typography, Grid } from "@mui/material";
import Image from "next/image";
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useTranslations } from "next-intl";
import ContactForm from "@/app/_components/contact/ContactForm";
import { env } from "@/app/_config/env.config";
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact SONDER Photography",
    mainEntity: {
      "@type": "PhotographyBusiness",
      name: "SONDER Photography",
      telephone: "+1-555-123-4567",
      email: "info@sonderphotography.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Creative Studio St.",
        addressLocality: "New York",
        postalCode: "10001",
        addressCountry: "US",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    },
  };

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
              <ContactForm />
            </Grid>
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
type Params = Promise<{ locale: "en" | "hu" }>;
export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params;
  return {
    title: "Contact Us | SONDER Photography",
    description:
      "Get in touch with SONDER Photography for your wedding photography needs. Based in Hungary, available for destination weddings.",
    alternates: {
      canonical: `${env.SITE_URL}/${locale}/contact`,
      languages: {
        en: `${env.SITE_URL}/en/contact`,
        hu: `${env.SITE_URL}/hu/contact`,
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
