"use client";
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
  Container,
  Fade,
  Divider,
} from "@mui/material";
import { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { Link as IntlLink } from "@/navigation";
import { useTranslations } from "next-intl";
import { usePathname, useParams } from "next/navigation";
import { GB, HU } from "country-flag-icons/react/3x2";
import { useFirebaseAuthService } from "@/app/_services/firebase-auth-service";
import UserWidget from "./UserWidget";
import { adminMenuItems } from "../admin/AdminSidebar";
import { MdLogin, MdLogout } from "react-icons/md";
import { User } from "firebase/auth";
type MenuItem = {
  label: string;
  href: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  isAuthButton?: boolean;
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const t = useTranslations("common.menu");
  const pathname = usePathname();
  const { locale: currentLocale } = useParams();
  const { getCurrentUser, logout } = useFirebaseAuthService();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();
      setIsAuthenticated(!!user);
    };
    checkAuth();
  }, [getCurrentUser]);

  const [logoBgPos, setLogoBgPos] = useState("100% 0%");

  useEffect(() => {
    // Animate from right to left on mount
    const timeout = setTimeout(() => setLogoBgPos("0% 0%"), 800);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
  };
  //TODO add correct type
  const baseMenuItems: MenuItem[] = [
    { label: t("portfolio"), href: "/portfolio" },
    { label: t("services"), href: "/services" },
    { label: t("blog"), href: "/blog" },
    { label: t("about"), href: "/about" },
    { label: t("contact"), href: "/contact" },
  ];

  const menuItems = isAuthenticated
    ? baseMenuItems
    : [
        ...baseMenuItems,
        {
          label: t("login"),
          href: "/login",
          isAuthButton: true,
          icon: <MdLogin />,
          onClick: undefined,
        },
      ];

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
    <header>
      <Fade in>
        <AppBar
          position="fixed"
          sx={{
            background: scrolled
              ? "rgba(255, 255, 255, 0.95)"
              : "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)", // iOS support
            boxShadow: scrolled ? "0 2px 28px rgba(0,0,0,0.08)" : "none",
            borderBottom: scrolled ? "none" : "1px solid rgba(255,255,255,0.2)",
            transform: "translate3d(0,0,0)", // Force GPU acceleration
            WebkitTransform: "translate3d(0,0,0)", // iOS GPU acceleration
            transition: "background-color 0.2s ease-out",
            WebkitTransition: "background-color 0.2s ease-out", // iOS transition
          }}
        >
          <Container maxWidth="xl">
            <Toolbar
              sx={{
                justifyContent: "space-between",
                height: scrolled ? "64px" : "80px",
                transform: "translate3d(0,0,0)", // Force GPU acceleration
                WebkitTransform: "translate3d(0,0,0)", // iOS GPU acceleration
                transition: "height 0.2s ease-out",
                WebkitTransition: "height 0.2s ease-out", // iOS transition
              }}
            >
              <IntlLink
                href="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    background:
                      "linear-gradient(90deg, #1a1a1a 30%, rgb(155, 106, 0) 90%)",
                    backgroundSize: "200% 100%",
                    backgroundPosition: logoBgPos,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 700,
                    letterSpacing: "-0.5px",
                    fontSize: scrolled ? "1.25rem" : "1.5rem",
                    transition:
                      "all 0.8s ease, background-position 0.8s cubic-bezier(0.4,0,0.2,1)",
                    "&:hover": {
                      backgroundPosition: "100% 0%",
                    },
                  }}
                >
                  SONDER
                </Typography>
              </IntlLink>
              {/* Desktop Menu */}
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: 1,
                  alignItems: "center",
                }}
              >
                {menuItems.map((item) => (
                  <Button
                    key={item.label}
                    href={item.href}
                    onClick={item.onClick}
                    sx={{
                      color: "#1a1a1a",
                      px: 2,
                      py: 1,
                      borderRadius: "30px",
                      transition: "all 0.2s ease",
                      position: "relative",
                      "&:hover": {
                        bgcolor: "transparent",
                        transform: "translateY(-2px)",
                        "&::after": {
                          width: "100%",
                        },
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "0%",
                        height: "2px",
                        backgroundColor: "#1a1a1a",
                        transition: "width 0.2s ease",
                      },
                      ...(item.label === t("contact") && {
                        bgcolor: "#1a1a1a",
                        color: "white",
                        ml: 2,
                        "&:hover": {
                          bgcolor: "#333",
                          transform: "translateY(-2px)",
                        },
                      }),
                      ...(item.isAuthButton && {
                        bgcolor: isAuthenticated ? "#dc3545" : "transparent",
                        color: isAuthenticated ? "white" : "#1a1a1a",
                        border: isAuthenticated ? "none" : "2px solid #1a1a1a",
                        ml: 2,
                        "&:hover": {
                          bgcolor: isAuthenticated ? "#c82333" : "#1a1a1a",
                          color: "white",
                          transform: "translateY(-2px)",
                        },
                      }),
                    }}
                  >
                    {item.label}
                  </Button>
                ))}

                {isAuthenticated ? (
                  <UserWidget
                    userEmail={
                      (getCurrentUser() as unknown as User)?.email || ""
                    }
                  />
                ) : null}

                <Box sx={{ ml: 2, display: "flex", gap: 1 }}>
                  {languages
                    .filter((lang) => lang.code !== currentLocale)
                    .map((lang) => (
                      <IntlLink
                        key={lang.code}
                        href={
                          pathname === `/${currentLocale}`
                            ? "/"
                            : pathname.replace(`/${currentLocale}`, "")
                        }
                        locale={lang.code as "en" | "hu"}
                        style={{ textDecoration: "none" }}
                      >
                        <IconButton
                          size="small"
                          sx={{
                            transition: "transform 0.2s ease",
                            "&:hover": {
                              transform: "translateY(-2px)",
                            },
                          }}
                        >
                          <FlagIcon locale={lang.code} />
                        </IconButton>
                      </IntlLink>
                    ))}
                </Box>
              </Box>

              {/* Mobile Menu Button */}
              <IconButton
                sx={{
                  display: { xs: "flex", md: "none" },
                  color: "#1a1a1a",
                }}
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
                    zIndex: 200,
                    maxWidth: "300px",
                    bgcolor: "rgba(255, 255, 255, 0.98)",
                    backdropFilter: "blur(10px)",
                  },
                }}
              >
                <Box sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 4,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        background:
                          "linear-gradient(45deg, #1a1a1a 30%, #666 90%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: 700,
                      }}
                    >
                      Menu
                    </Typography>
                    <IconButton onClick={handleDrawerToggle}>
                      <IoClose />
                    </IconButton>
                  </Box>
                  <List
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {menuItems.map((item) => (
                      <>
                        {item?.icon && (
                          <Box sx={{ my: 2 }}>
                            <Divider />
                          </Box>
                        )}
                        <ListItem key={item.label} disablePadding>
                          <Button
                            fullWidth
                            href={item.href}
                            onClick={handleDrawerToggle}
                            sx={{
                              color: "#1a1a1a",
                              justifyContent: "flex-start",
                              py: 1.5,
                              borderRadius: "12px",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                bgcolor: "rgba(0,0,0,0.05)",
                                transform: "translateX(8px)",
                              },
                            }}
                            startIcon={item?.icon || null}
                          >
                            {item.label}
                          </Button>
                        </ListItem>
                      </>
                    ))}

                    {isAuthenticated && (
                      <>
                        <Box sx={{ my: 2 }}>
                          <Divider />
                        </Box>
                        {adminMenuItems.map((item) => (
                          <ListItem key={item.label} disablePadding>
                            <Button
                              fullWidth
                              component={IntlLink}
                              href={item.path}
                              onClick={handleDrawerToggle}
                              sx={{
                                color: "#1a1a1a",
                                justifyContent: "flex-start",
                                py: 1.5,
                                borderRadius: "12px",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                  bgcolor: "rgba(0,0,0,0.05)",
                                  transform: "translateX(8px)",
                                },
                              }}
                            >
                              {item.label}
                            </Button>
                          </ListItem>
                        ))}
                        <Box sx={{ my: 2 }}>
                          <Divider />
                        </Box>
                        <ListItem disablePadding>
                          <Button
                            fullWidth
                            onClick={() => {
                              handleLogout();
                              handleDrawerToggle();
                            }}
                            sx={{
                              color: "#dc3545",
                              justifyContent: "flex-start",
                              py: 1.5,
                              borderRadius: "12px",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                bgcolor: "rgba(220, 53, 69, 0.1)",
                                transform: "translateX(8px)",
                              },
                            }}
                            startIcon={<MdLogout />}
                          >
                            {t("logout")}
                          </Button>
                        </ListItem>
                      </>
                    )}
                  </List>
                </Box>
              </Drawer>
            </Toolbar>
          </Container>
        </AppBar>
      </Fade>
    </header>
  );
}
