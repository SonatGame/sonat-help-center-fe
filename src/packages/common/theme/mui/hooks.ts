"use client";

import { ThemeOptions, createTheme } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { useMemo } from "react";
import breakpoints from "./breakpoints";
import ComponentsOverrides from "./overrides";
import palette from "./palette";
import shadows, { customShadows } from "./shadow";
import typography from "./typography";

export default function useAppThemeHook() {
  const shape = 8;

  const themeOptions = useMemo(
    () => ({
      palette: {
        ...palette.light,
        primary: {
          ...palette.light.primary,
        },
        action: {
          ...palette.light.action,
        },
        background: {
          ...palette.light.background,
        },
        text: {
          ...palette.light.text,
        },
      },
      typography: typography as TypographyOptions,
      breakpoints,
      shape: { borderRadius: shape },
      shadows: shadows.light,
      customShadows: customShadows(
        palette.light.primary?.main || palette.light.primary.main
      ).light,
    }),
    [shape]
  );

  const theme = createTheme(themeOptions as unknown as ThemeOptions);
  theme.components = ComponentsOverrides(theme);

  return {
    theme,
  };
}
