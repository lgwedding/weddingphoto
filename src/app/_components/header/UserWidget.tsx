"use client";

import { useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material";
import { MdDashboard, MdPerson, MdLogout } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useFirebaseAuthService } from "@/app/_services/firebase-auth-service";

interface UserWidgetProps {
  userEmail?: string;
}

export default function UserWidget({ userEmail }: UserWidgetProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const { logout } = useFirebaseAuthService();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    handleClose();
  };

  const handleLogout = async () => {
    await logout();
    handleClose();
  };

  return (
    <Box>
      <IconButton
        onClick={handleMenu}
        sx={{
          padding: 1,
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "translateY(-2px)",
          },
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: "background.paper",
            color: "text.primary",
            border: "2px solid",
            borderColor: "text.primary",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          {userEmail?.[0]?.toUpperCase()}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 2,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
          },
        }}
        disableScrollLock
      >
        <MenuItem onClick={() => handleNavigate("/dashboard")} sx={{ py: 1 }}>
          <MdDashboard size={18} style={{ marginRight: 12 }} />
          <Typography variant="body2">Dashboard</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate("/profile")} sx={{ py: 1 }}>
          <MdPerson size={18} style={{ marginRight: 12 }} />
          <Typography variant="body2">Profile</Typography>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{
            py: 1,
            color: "error.main",
            "&:hover": {
              bgcolor: "error.main",
              color: "white",
            },
          }}
        >
          <MdLogout size={18} style={{ marginRight: 12 }} />
          <Typography variant="body2">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
