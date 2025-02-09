import { Box } from "@mui/material";
import Header from "../header/Header";
import AdminSidebar from "./AdminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <AdminSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          bgcolor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
