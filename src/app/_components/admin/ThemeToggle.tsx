"use client";

import { IconButton, Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/_contexts/ThemeContext";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      sx={{
        position: "relative",
        width: 40,
        height: 40,
        borderRadius: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: isDarkMode ? "background.paper" : "#1a1a1a",
        color: isDarkMode ? "text.primary" : "white",
        transition: "all 0.3s ease",
        "&:hover": {
          bgcolor: isDarkMode ? "rgba(0,0,0,0.04)" : "#333",
          transform: "translateY(-2px)",
        },
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDarkMode ? "dark" : "light"}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{
            duration: 0.4,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          <Box
            sx={{
              width: 20,
              height: 20,
              marginBottom: 0.5,
              position: "relative",
            }}
          >
            {isDarkMode ? (
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <circle cx="12" cy="12" r="5" stroke="currentColor" />
                <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" />
                <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" />
                <line
                  x1="4.22"
                  y1="4.22"
                  x2="5.64"
                  y2="5.64"
                  stroke="currentColor"
                />
                <line
                  x1="18.36"
                  y1="18.36"
                  x2="19.78"
                  y2="19.78"
                  stroke="currentColor"
                />
                <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" />
                <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" />
                <line
                  x1="4.22"
                  y1="19.78"
                  x2="5.64"
                  y2="18.36"
                  stroke="currentColor"
                />
                <line
                  x1="18.36"
                  y1="5.64"
                  x2="19.78"
                  y2="4.22"
                  stroke="currentColor"
                />
              </motion.svg>
            ) : (
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                  stroke="currentColor"
                />
              </motion.svg>
            )}
          </Box>
        </motion.div>
      </AnimatePresence>
    </IconButton>
  );
}
