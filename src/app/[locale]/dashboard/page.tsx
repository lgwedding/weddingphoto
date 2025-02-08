"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import { firebaseAuthService } from "@/app/_services/firebase-auth-service";
import { useRouter } from "next/navigation";
import Header from "@/app/_components/header/Header";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { getCurrentUser } = firebaseAuthService();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 12, mb: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* Stats Cards */}
          {["Total Orders", "Revenue", "Customers", "Projects"].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: "#f8f8f8",
                  height: "100%",
                }}
              >
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  {item}
                </Typography>
                <Typography variant="h4">
                  {Math.floor(Math.random() * 1000)}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Recent Activity */}
        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 2,
            bgcolor: "#f8f8f8",
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Recent Activity
          </Typography>
          {/* Add your activity list here */}
        </Paper>
      </Container>
    </Box>
  );
}
