"use client";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import React from "react";
import useAppThemeHook from "./hooks";

export default function AppTheme({ children }: { children: React.ReactNode }) {
  const { theme } = useAppThemeHook();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>{children}</SnackbarProvider>
    </ThemeProvider>
  );
}
