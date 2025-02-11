import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { FaInstagram, FaPinterest, FaFacebookF } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { Link as IntlLink } from "@/navigation";

export default function Footer() {
  const t = useTranslations();

  const socialLinks = [
    { icon: FaInstagram, label: "Instagram", href: "#" },
    { icon: FaPinterest, label: "Pinterest", href: "#" },
    { icon: FaFacebookF, label: "Facebook", href: "#" },
  ];

  const menuItems = [
    { label: t("common.menu.portfolio"), href: "/portfolio" },
    { label: t("common.menu.services"), href: "/services" },
    { label: t("common.menu.about"), href: "/about" },
    { label: t("common.menu.contact"), href: "/contact" },
  ];

  return (
    <footer
      style={{
        backgroundColor: "#ffffff",
        paddingTop: "30px",
        paddingBottom: "30px",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8} mb={8}>
          {/* Brand Section */}

          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 3,
                background: "linear-gradient(45deg, #1a1a1a 30%, #666 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t("common.brand.name")}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                lineHeight: 1.8,
                mb: 4,
                maxWidth: "90%",
              }}
            >
              {t("common.brand.description")}
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  sx={{
                    color: "#1a1a1a",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      color: "#666",
                    },
                  }}
                >
                  <social.icon />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ mb: 3, color: "#1a1a1a", fontWeight: 600 }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {menuItems.map((item) => (
                <IntlLink
                  key={item.label}
                  href={item.href}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      color: "#666",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        color: "#1a1a1a",
                        transform: "translateX(5px)",
                      },
                      display: "inline-block",
                    }}
                  >
                    {item.label}
                  </Typography>
                </IntlLink>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ mb: 3, color: "#1a1a1a", fontWeight: 600 }}
            >
              Get in Touch
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography
                component="a"
                href="mailto:info@sonderphotography.com"
                sx={{
                  color: "#666",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  "&:hover": { color: "#1a1a1a" },
                }}
              >
                info@sonderphotography.com
              </Typography>
              <Typography
                component="a"
                href="tel:+15551234567"
                sx={{
                  color: "#666",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  "&:hover": { color: "#1a1a1a" },
                }}
              >
                +1 (555) 123-4567
              </Typography>
              <Typography sx={{ color: "#666" }}>
                123 Creative Studio St.
                <br />
                New York, NY 10001
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 4 }} />

        <Typography
          variant="body2"
          sx={{
            color: "#666",
            textAlign: "center",
            fontSize: "0.875rem",
          }}
        >
          © {new Date().getFullYear()} SONDER. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
}
