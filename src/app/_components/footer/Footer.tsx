import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import { FaInstagram, FaPinterest, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#f8f8f8", py: 8, mt: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              SONDER
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              Capturing life's precious moments with artistic vision and
              timeless elegance.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              info@sonderphotography.com
              <br />
              +1 (555) 123-4567
              <br />
              123 Creative Studio St.
              <br />
              New York, NY 10001
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <IconButton aria-label="Instagram">
                <FaInstagram />
              </IconButton>
              <IconButton aria-label="Pinterest">
                <FaPinterest />
              </IconButton>
              <IconButton aria-label="Facebook">
                <FaFacebookF />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
