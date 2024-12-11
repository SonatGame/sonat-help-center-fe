"use client";

import { LocalTheme, ThemeMode } from "@/lib/constants/defaultTheme";
import { PaletteMode, ThemeOptions, createTheme } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { useMemo, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import breakpoints from "./breakpoints";
import ComponentsOverrides from "./overrides";
import palette from "./palette";
import shadows, { customShadows } from "./shadow";
import typography from "./typography";

export default function useAppThemeHook() {
  const [isChanged, setIsChanged] = useState(false);
  const themeModeController = useMemo(
    () => ({
      markChange: () => {
        setIsChanged((prev) => !prev);
      },
    }),
    []
  );
  const mode =
    (useReadLocalStorage(LocalTheme.ThemeMode) as PaletteMode) ??
    ThemeMode.LIGHT;
  const isLight = mode === ThemeMode.LIGHT;

  const parseTheme = (theme: string, defaultTheme: any) => {
    try {
      return JSON.parse(theme) as ThemeOptions;
    } catch (e) {
      return defaultTheme;
    }
  };

  const initLightPalette =
    (useReadLocalStorage(ThemeMode.LIGHT) as string) ?? "";
  const lightPalette = initLightPalette
    ? parseTheme(initLightPalette, palette.light)?.palette ||
      parseTheme(initLightPalette, palette.light)
    : palette.light;

  const initDarkPalette = (useReadLocalStorage(ThemeMode.DARK) as string) ?? "";
  const darkPalette = initDarkPalette
    ? parseTheme(initDarkPalette, palette.dark)?.palette ||
      parseTheme(initDarkPalette, palette.dark)
    : palette.dark;

  const shape = 8;

  const themeOptions = useMemo(
    () => ({
      palette: {
        ...(isLight
          ? {
              ...palette.light,
              primary: {
                ...palette.light.primary,
                ...lightPalette.primary,
              },
              action: {
                ...palette.light.action,
                ...lightPalette.action,
              },
              background: {
                ...palette.light.background,
                paper: lightPalette.background.paper,
                default: lightPalette.background.default,
              },
              text: {
                ...palette.light.text,
                primary: lightPalette.text.primary,
                secondary: lightPalette.text.secondary,
              },
            }
          : {
              ...palette.dark,
              primary: {
                ...palette.dark.primary,
                ...darkPalette.primary,
              },
              action: {
                ...palette.dark.action,
                ...darkPalette.action,
              },
              background: {
                ...palette.dark.background,
                paper: darkPalette.background.paper,
                default: darkPalette.background.default,
              },
              text: {
                ...palette.dark.text,
                primary: darkPalette.text.primary,
                secondary: darkPalette.text.secondary,
              },
            }),
        mode: mode as PaletteMode,
      },
      typography: typography as TypographyOptions,
      breakpoints,
      shape: { borderRadius: shape },
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight
        ? customShadows(
            lightPalette.primary?.main || palette.light.primary.main
          ).light
        : customShadows(darkPalette.primary?.main || palette.dark.primary.main)
            .dark,
    }),
    [isLight, lightPalette, darkPalette, mode, typography, shape]
  );

  const theme = createTheme(themeOptions as unknown as ThemeOptions);
  theme.components = ComponentsOverrides(theme);

  return {
    themeModeController,
    theme,
  };
}
