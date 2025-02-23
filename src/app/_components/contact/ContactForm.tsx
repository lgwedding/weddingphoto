"use client";

import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const t = useTranslations("contact");
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      if (result.text === "OK") {
        setSnackbarMessage(t("form.successMessage"));
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        form.current?.reset();
      }
    } catch (error) {
      setSnackbarMessage(t("form.errorMessage"));
      setSnackbarSeverity("error");
      console.log(error);
      setOpenSnackbar(true);
    }

    setLoading(false);
  };

  return (
    <>
      <Box
        component="form"
        ref={form}
        onSubmit={handleSubmit}
        sx={{
          bgcolor: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: 4,
          p: { xs: 4, md: 6 },
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 600,
            background: "linear-gradient(90deg, #1a1a1a, #333)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t("form.title")}
        </Typography>

        <TextField
          fullWidth
          label={t("form.fullName")}
          name="from_name"
          required
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          label={t("form.email")}
          name="email"
          type="email"
          required
          sx={{ mt: 3 }}
        />

        <TextField
          fullWidth
          label={t("form.phone")}
          name="phone"
          sx={{ mt: 3 }}
        />

        <TextField
          fullWidth
          label={t("form.message")}
          name="message"
          multiline
          rows={6}
          required
          sx={{ mt: 3 }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          sx={{
            mt: 3,
            bgcolor: "#1a1a1a",
            color: "white",
            py: 2,
            px: 6,
            borderRadius: "30px",
            "&:hover": {
              bgcolor: "#333",
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          {loading ? "Sending..." : t("form.submit")}
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          severity={snackbarSeverity}
          onClose={() => setOpenSnackbar(false)}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
