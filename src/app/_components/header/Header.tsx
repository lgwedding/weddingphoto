import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { Link as IntlLink } from "@/navigation";
import { useTranslations } from "next-intl";
import { usePathname, useParams } from "next/navigation";
import { GB, HU } from "country-flag-icons/react/3x2";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("common.menu");
  const pathname = usePathname();
  const { locale: currentLocale } = useParams();

  const menuItems = [
    { label: t("portfolio"), href: "/portfolio" },
    { label: t("services"), href: "/services" },
    { label: t("about"), href: "/about" },
    { label: t("contact"), href: "/contact" },
  ].map((item) => ({
    ...item,
    href: `/${currentLocale}${item.href}`,
  }));

  const languages = [
    { code: "en", label: "English" },
    { code: "hu", label: "Magyar" },
  ];

  const FlagIcon = ({ locale }: { locale: string }) => {
    switch (locale) {
      case "en":
        return <GB width={24} height={24} />;
      case "hu":
        return <HU width={24} height={24} />;
      default:
        return null;
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "rgba(255, 255, 255, 0.95)",
        boxShadow: "none",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IntlLink href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography
            variant="h6"
            sx={{ color: "#1a1a1a", fontWeight: 600, letterSpacing: "-0.5px" }}
          >
            SONDER
          </Typography>
        </IntlLink>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
          {menuItems.map((item) => (
            <Button
              key={item.label}
              color="inherit"
              sx={{
                color: "#1a1a1a",
                ...(item.label === "Contact" && {
                  bgcolor: "#1a1a1a",
                  color: "white",
                  "&:hover": { bgcolor: "#333" },
                }),
              }}
              href={item.href}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" }, ml: 2 }}>
          {languages
            .filter((lang) => lang.code !== currentLocale)
            .map((lang) => (
              <IntlLink
                key={lang.code}
                href={pathname.replace(`/${currentLocale}`, "")}
                locale={lang.code as "en" | "hu"}
                style={{ textDecoration: "none" }}
              >
                <IconButton size="small" sx={{ ml: 1 }}>
                  <FlagIcon locale={lang.code} />
                </IconButton>
              </IntlLink>
            ))}
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          sx={{ display: { xs: "flex", md: "none" }, color: "#1a1a1a" }}
          onClick={handleDrawerToggle}
          edge="start"
        >
          <RxHamburgerMenu />
        </IconButton>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: "100%",
              maxWidth: "300px",
              bgcolor: "rgba(255, 255, 255, 0.98)",
            },
          }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ color: "#1a1a1a", fontWeight: 600 }}>
              Menu
            </Typography>
            <IconButton onClick={handleDrawerToggle}>
              <IoClose />
            </IconButton>
          </Box>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.label}>
                <Button
                  fullWidth
                  href={item.href}
                  sx={{
                    justifyContent: "flex-start",
                    color: "#1a1a1a",
                    py: 1.5,
                    ...(item.label === "Contact" && {
                      bgcolor: "#1a1a1a",
                      color: "white",
                      "&:hover": { bgcolor: "#333" },
                    }),
                  }}
                  onClick={handleDrawerToggle}
                >
                  {item.label}
                </Button>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
