declare module "@mui/material/styles" {
  interface PaletteColor {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface SimplePaletteColorOptions {
    50?: string;
    100?: string;
    200?: string;
    700?: string;
    800?: string;
    900?: string;
  }

  interface TypeAction {
    text_hover: string;
    text_selected: string;
    checked: string;
    hover: string;
    selected: string;
    disabled: string;
    disabledBackground: string;
    focus: string;
    hoverOpacity: number;
    disabledOpacity: number;
  }

  interface Palette {
    black_haze: PaletteColor;
    blue_violet: PaletteColor;
    bring_pink: PaletteColor;
    action: TypeAction;
  }

  interface PaletteOptions {
    black_haze?: SimplePaletteColorOptions;
    blue_violet?: SimplePaletteColorOptions;
    bring_pink?: SimplePaletteColorOptions;
    action?: Partial<TypeAction>;
  }

  interface BreakpointOverrides {
    xxl: true;
  }
}

import { alpha, PaletteColor } from "@mui/material/styles";

function createGradient(color1: string, color2: string) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const PRIMARY: PaletteColor = {
  50: "#ECF2FF",
  100: "#DDE7FF",
  200: "#C2D3FF",
  300: "#9CB4FF",
  400: "#758AFF",
  500: "#5563FF",
  600: "#292AF4",
  700: "#2C2AD8",
  800: "#2525AE",
  900: "#262989",
  light: "#9CB4FF",
  main: "#5563FF",
  dark: "#2C2AD8",
  contrastText: "#FFFFFF",
};

const INFO = {
  50: "#DEEBFD",
  100: "#CDE1F9",
  200: "#B8D6F7",
  300: "#9CB4FF",
  400: "#6EAAEC",
  500: "#4C8BE5",
  600: "#376FD9",
  700: "#2C2AD8",
  800: "#2525AE",
  900: "#284280",
  light: "#9CB4FF",
  main: "#4C8BE5",
  dark: "#2C2AD8",
  contrastText: "#FFFFFF",
};

const SUCCESS = {
  50: "#ECFDF3",
  100: "##D1FADF",
  200: "#A6F4C5",
  300: "#6CE9A6",
  400: "#32D583",
  500: "#12B76A",
  600: "#039855",
  700: "#027A48",
  800: "#05603A",
  900: "#054F31",
  light: "#6CE9A6",
  main: "#12B76A",
  dark: "#027A48",
  contrastText: "#FFFFFF",
};

const WARNING = {
  50: "#FFFAEB",
  100: "#FEF0C7",
  200: "#FEDF89",
  300: "#FEC84B",
  400: "#FDB022",
  500: "#F79009",
  600: "#DC6803",
  700: "#B54708",
  800: "#93370D",
  900: "#7A2E0E",
  light: "#FEC84B",
  main: "#F79009",
  dark: "#B54708",
  contrastText: "#FFFFFF",
};

const ERROR = {
  50: "#FEF3F2",
  100: "#FEE4E2",
  200: "#FECDCA",
  300: "#FDA29B",
  400: "#F97066",
  500: "#F04438",
  600: "#D92D20",
  700: "#B42318",
  800: "#912018",
  900: "#7A271A",
  light: "#FDA29B",
  main: "#F04438",
  dark: "#B42318",
  contrastText: "#FFFFFF",
};

const BLACK_HAZE = {
  50: "#F6FAFD",
  100: "#E5F0F9",
  200: "#C6E1F1",
  300: "#94C9E5",
  400: "#5BADD5",
  500: "#5BADD5",
  600: "#2675A3",
  700: "#205E84",
  800: "#1E506E",
  900: "#1E435C",
  light: "#94C9E5",
  main: "#5BADD5",
  dark: "#205E84",
  contrastText: "#FFFFFF",
};

const BLUE_VIOLET = {
  50: "#F3F5FB",
  100: "#E4E7F5",
  200: "#CFD5EE",
  300: "#94C9E5",
  400: "#8896D2",
  500: "#6B77C6",
  600: "#585EB8",
  700: "#5152AF",
  800: "#44438A",
  900: "#3A3A6E",
  light: "#94C9E5",
  main: "#6B77C6",
  dark: "#5152AF",

  contrastText: "#FFFFFF",
};

const BRING_PINK = {
  50: "#FFF1F4",
  100: "#FFE4E9",
  200: "#FDA4BA",
  300: "#FDA4BA",
  400: "#FA628A",
  500: "#F34073",
  600: "#E01E5F",
  700: "#BD1350",
  800: "#9E1349",
  900: "#881345",
  light: "#FDA4BA",
  main: "#F34073",
  dark: "#BD1350",
  contrastText: "#FFFFFF",
};

const GREY = {
  0: "#FFFFFF",
  50: "#F9FAFB",
  100: "#F3F4F6",
  200: "#EAECF0",
  300: "#D2D6DB",
  400: "#98A2B3",
  500: "#667085",
  600: "#475467",
  700: "#344054",
  800: "#1D2939",
  900: "#101828",
  500_8: alpha("#667085", 0.08),
  500_12: alpha("#667085", 0.12),
  500_16: alpha("#667085", 0.16),
  500_24: alpha("#667085", 0.24),
  500_32: alpha("#667085", 0.32),
  500_48: alpha("#667085", 0.48),
  500_56: alpha("#667085", 0.56),
  500_80: alpha("#667085", 0.8),
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const BACKGROUND_DARK = {
  paper: "#282F3C",
  default: "#1E2631",
};

const COMMON = {
  common: { black: "#000000", white: "#ffffff" },
  primary: { ...PRIMARY, contrastText: "#ffffff" },
  info: { ...INFO, contrastText: "#ffffff" },
  success: { ...SUCCESS, contrastText: "#ffffff" },
  warning: { ...WARNING, contrastText: "#ffffff" },
  error: { ...ERROR, contrastText: "#ffffff" },
  black_haze: { ...BLACK_HAZE, contrastText: "#ffffff" },
  blue_violet: { ...BLUE_VIOLET, contrastText: "#ffffff" },
  bring_pink: { ...BRING_PINK, contrastText: "#ffffff" },
  grey: GREY,
  gradients: GRADIENTS,
  divider: GREY[200],
  action: {
    hover: PRIMARY[100],
    selected: PRIMARY[100],
    text_hover: PRIMARY.main,
    text_selected: PRIMARY.main,
    checked: PRIMARY.main,
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.58,
  },
};

const palette = {
  light: {
    ...COMMON,
    mode: "light",
    text: {
      primary: GREY[700],
      secondary: GREY[500],
      disabled: GREY[400],
    },
    background: { paper: "#ffffff", default: "#F9F9FF", neutral: GREY[100] },
    action: { active: GREY[600], ...COMMON.action },
  },
  dark: {
    ...COMMON,
    mode: "dark",
    text: {
      primary: GREY[100],
      secondary: GREY[300],
      disabled: GREY[600],
    },
    divider: GREY[700],
    background: {
      paper: BACKGROUND_DARK.paper,
      default: BACKGROUND_DARK.default,
      neutral: GREY[500_16],
    },
    action: {
      active: GREY[500],
      ...COMMON.action,
      hover: GREY[500_32],
      text_hover: GREY[200],
      text_selected: GREY[50],
      selected: GREY[500_80],
      checked: GREY[100],
    },
  },
};

export default palette;
