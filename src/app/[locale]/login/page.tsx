"use client";

import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { MdLockOutline } from "react-icons/md";
import { useFirebaseAuthService } from "@/app/_services/firebase-auth-service";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useFirebaseAuthService();
  const t = useTranslations("auth.login");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(credentials);

    if (!result.success) {
      setError(result.error || "An unknown error occurred");
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f8f8f8",
        p: 3,
      }}
    >
      <Card
        elevation={0}
        sx={{
          maxWidth: 400,
          width: "100%",
          borderRadius: 2,
          p: 3,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                bgcolor: "#1a1a1a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                mb: 2,
              }}
            >
              <MdLockOutline size={24} color="white" />
            </Box>
            <Typography variant="h5" component="h1" fontWeight={600}>
              {t("title")}
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              type="email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              required
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#1a1a1a",
                height: 48,
                "&:hover": {
                  bgcolor: "#333",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                t("title")
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
