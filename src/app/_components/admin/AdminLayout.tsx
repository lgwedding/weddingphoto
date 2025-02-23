"use client";

import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from "@/app/_contexts/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import Header from "../header/Header";
import AdminSidebar from "./AdminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <ThemeProvider>
      <Box sx={{ minHeight: "100vh" }}>
        <AppBar position="fixed" sx={{ bgcolor: "background.paper" }}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "text.primary" }}
            ></Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Header />
          <Box sx={{ display: "flex", flex: 1, bgcolor: "background.paper" }}>
            <AdminSidebar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: { xs: 2, md: 3 },
                ml: { xs: 0 },
                bgcolor: "background.default",
                minHeight: "100vh",
                width: "100%",
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1000,
          }}
        >
          <ThemeToggle />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
