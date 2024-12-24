"use client";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { ToastContainer } from "react-toastify";
import useAppThemeHook from "./hooks";

export default function AppTheme({ children }: { children: React.ReactNode }) {
  const { theme } = useAppThemeHook();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer hideProgressBar />
      {children}
    </ThemeProvider>
  );
}
