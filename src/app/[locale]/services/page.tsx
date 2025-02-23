import { Box, Container, Typography, Grid, Button } from "@mui/material";
import Image from "next/image";
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import { FaCamera, FaVideo, FaGlobe, FaEnvelope } from "react-icons/fa";
import HeroSection from "@/app/_components/hero/HeroSection";
import { useTranslations } from "next-intl";
import { env } from "@/app/_config/env.config";
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
  const t = useTranslations("services");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "Service",
      position: index + 1,
      name: service.title,
      description: service.description,
      provider: {
        "@type": "PhotographyBusiness",
        name: "SONDER Photography",
      },
      image: service.image,
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "EUR",
        },
      },
    })),
  };

  return (
    <Box>
      <Header />

      {/* Hero Section */}
      <HeroSection
        imageUrl="https://images.unsplash.com/photo-1606216794074-735e91aa2c92"
        title={t("title")}
        subtitle={t("subtitle")}
        height="100vh"
      />

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
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: 600, color: "#666" }}
                    >
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
            {t("contact.title")}
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, opacity: 0.9, fontSize: "1.1rem" }}
          >
            {t("contact.subtitle")}
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="/contact"
            sx={{
              bgcolor: "white",
              color: "#1a1a1a",
              px: 6,
              py: 2,
              "&:hover": {
                bgcolor: "#f8f8f8",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            {t("contact.button")}
          </Button>
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
    title: "Wedding Photography Services | SONDER Photography",
    description:
      "Comprehensive wedding photography services including engagement sessions, full-day coverage, videography, and custom wedding websites.",
    alternates: {
      canonical: `${env.SITE_URL}/${locale}/services`,
      languages: {
        en: `${env.SITE_URL}/en/services`,
        hu: `${env.SITE_URL}/hu/services`,
      },
    },
    openGraph: {
      title: "Wedding Photography Services - SONDER Photography",
      description:
        "Professional wedding photography and videography services in Hungary",
      images: [
        {
          url: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92",
          width: 1200,
          height: 630,
          alt: "Wedding Photography Services",
        },
      ],
    },
  };
}
