import { Box } from "@mui/material";
import Header from "../header/Header";
import AdminSidebar from "./AdminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <Box sx={{ display: "flex", flex: 1 }}>
        <AdminSidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 3 },
            ml: { xs: 0 },
            bgcolor: "#f5f5f5",
            minHeight: "100vh",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
