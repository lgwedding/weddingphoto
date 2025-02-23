"use client";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  MdDashboard,
  MdPhotoLibrary,
  MdSettings,
  MdPeople,
  MdArticle,
} from "react-icons/md";
import { usePathname } from "next/navigation";
import { Link as IntlLink } from "@/navigation";

const DRAWER_WIDTH = 240;
const HEADER_HEIGHT = 80;

export const adminMenuItems = [
  { label: "Dashboard", icon: MdDashboard, path: "/dashboard" },
  { label: "Gallery", icon: MdPhotoLibrary, path: "/dashboard/gallery" },
  { label: "Clients", icon: MdPeople, path: "/dashboard/clients" },
  { label: "Settings", icon: MdSettings, path: "/dashboard/settings" },
  { label: "Blog Posts", icon: MdArticle, path: "/dashboard/blogs" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        zIndex: 100,
        height: "100%",
        background: "background.paper",
        display: { xs: "none", md: "block" },
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          borderRight: "1px solid rgba(0,0,0,0.08)",
          bgcolor: "background.paper",
          height: "100%",
        },
      }}
    >
      <Box
        sx={{
          p: 3,
          marginTop: `${HEADER_HEIGHT}px`,
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            background: "linear-gradient(45deg, #1a1a1a 30%, #666 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Admin Panel
        </Typography>
      </Box>
      <List sx={{ bgcolor: "background.paper" }}>
        {adminMenuItems.map((item) => (
          <ListItem
            key={item.label}
            component={IntlLink}
            href={item.path}
            sx={{
              py: 1.5,
              px: 2,
              mb: 1,
              mx: 0,
              borderRadius: 2,
              color: pathname === item.path ? "white" : "#666",
              bgcolor: pathname === item.path ? "#1a1a1a" : "transparent",
              "&:hover": {
                bgcolor: pathname === item.path ? "#333" : "rgba(0,0,0,0.04)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
              <item.icon size={20} />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
