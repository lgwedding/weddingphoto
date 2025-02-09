import { useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { MdDashboard, MdPerson } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface UserWidgetProps {
  userEmail?: string;
}

export default function UserWidget({ userEmail }: UserWidgetProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const t = useTranslations("common.userMenu");

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

  return (
    <Box sx={{ ml: 2 }}>
      <IconButton
        onClick={handleMenu}
        sx={{
          padding: 0.5,
          border: "2px solid #1a1a1a",
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "translateY(-2px)",
          },
        }}
      >
        <Avatar sx={{ width: 32, height: 32, bgcolor: "#1a1a1a" }}>
          {userEmail?.[0]?.toUpperCase()}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 180,
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          },
        }}
        sx={{
          "& .MuiMenu-paper": {
            overflow: "visible",
          },
        }}
        disableScrollLock={true}
        keepMounted
      >
        <MenuItem onClick={() => handleNavigate("/dashboard")}>
          <MdDashboard style={{ marginRight: 8 }} />
          <Typography>Admin Dashboard</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate("/profile")}>
          <MdPerson style={{ marginRight: 8 }} />
          <Typography>Profile</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
