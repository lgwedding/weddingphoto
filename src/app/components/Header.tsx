import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
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
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography
            variant="h6"
            sx={{ color: "#1a1a1a", fontWeight: 600, letterSpacing: "-0.5px" }}
          >
            SONDER
          </Typography>
        </Link>

        <Box sx={{ display: "flex", gap: 4 }}>
          <Button color="inherit" sx={{ color: "#1a1a1a" }}>
            Portfolio
          </Button>
          <Button color="inherit" sx={{ color: "#1a1a1a" }}>
            Services
          </Button>
          <Button color="inherit" sx={{ color: "#1a1a1a" }}>
            About
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#1a1a1a",
              "&:hover": { bgcolor: "#333" },
            }}
          >
            Contact
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
