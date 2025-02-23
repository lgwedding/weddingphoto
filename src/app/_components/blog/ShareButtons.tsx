"use client";
import { Box, IconButton, Modal, Fade } from "@mui/material";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaCopy } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useState } from "react";
import { MdShare } from "react-icons/md";

interface ShareButtonsProps {
  url: string;
  title: string;
  description: string;
}

export default function ShareButtons({
  url,
  title,
  description,
}: ShareButtonsProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareButtons = [
    {
      name: "Facebook",
      icon: FaFacebookF,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
    },
    {
      name: "X",
      icon: FaXTwitter,
      href: `https://x.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
    },
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
        description
      )}`,
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
  ];

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          bgcolor: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(4px)",
          "&:hover": {
            bgcolor: "white",
            transform: "scale(1.1)",
          },
          transition: "all 0.2s ease",
          zIndex: 2,
        }}
      >
        <MdShare />
      </IconButton>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              p: 3,
              maxWidth: 400,
              width: "90%",
              mx: 2,
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              position: "relative",
              outline: "none",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2,
                mb: 2,
              }}
            >
              {shareButtons.map((button) => (
                <Box
                  key={button.name}
                  onClick={() => window.open(button.href, "_blank")}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    p: 2,
                    borderRadius: 1,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    color: "black",
                    "&:hover": {
                      bgcolor: "rgba(0,0,0,0.04)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <button.icon size={20} />
                  {button.name}
                </Box>
              ))}
            </Box>
            <Box
              onClick={handleCopyLink}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 2,
                borderRadius: 1,
                cursor: "pointer",
                transition: "all 0.2s ease",
                bgcolor: copied ? "rgba(76,175,80,0.1)" : "transparent",
                color: copied ? "#4caf50" : "black",
                "&:hover": {
                  bgcolor: copied ? "rgba(76,175,80,0.1)" : "rgba(0,0,0,0.04)",
                },
              }}
            >
              <FaCopy size={20} />
              {copied ? "Copied!" : "Copy link"}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
