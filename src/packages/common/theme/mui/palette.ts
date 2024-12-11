declare module "@mui/material/styles" {
  interface PaletteColor {
    light_50: string;
    light_100: string;
    light_200: string;
    main_400: string;
    main_600: string;
    dark_800: string;
    dark_900: string;
  }

  interface SimplePaletteColorOptions {
    light_50?: string;
    light_100?: string;
    light_200?: string;
    dark_700?: string;
    dark_800?: string;
    dark_900?: string;
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

import { alpha } from "@mui/material/styles";

function createGradient(color1: string, color2: string) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const PRIMARY = {
  light_50: "#FAF7FD",
  light_100: "#F2ECFB",
  light_200: "#E7DCF8",
  light: "#D5C1F1",
  main_400: "#BB99E7",
  main: "#9966D7",
  main_600: "#8A54C9",
  dark: "#7541AF",
  dark_800: "#643990",
  dark_900: "#522F74",
};

const INFO = {
  light_50: "#DEEBFD",
  light_100: "#CDE1F9",
  light_200: "#B8D6F7",
  light: "#9CB4FF",
  main_400: "#6EAAEC",
  main: "#4C8BE5",
  main_600: "#376FD9",
  dark: "#2C2AD8",
  dark_800: "#2525AE",
  dark_900: "#284280",
};

const SUCCESS = {
  light_50: "#ECFDF3",
  light_100: "##D1FADF",
  light_200: "#A6F4C5",
  light: "#6CE9A6",
  main_400: "#32D583",
  main: "#12B76A",
  main_600: "#039855",
  dark: "#027A48",
  dark_800: "#05603A",
  dark_900: "#054F31",
};

const WARNING = {
  light_50: "#FFFAEB",
  light_100: "#FEF0C7",
  light_200: "#FEDF89",
  lighter: "#FEF0C7",
  light: "#FEC84B",
  main_400: "#FDB022",
  main: "#F79009",
  main_600: "#DC6803",
  dark: "#B54708",
  dark_800: "#93370D",
  dark_900: "#7A2E0E",
};

const ERROR = {
  light_50: "#FEF3F2",
  light_100: "#FEE4E2",
  light_200: "#FECDCA",
  light: "#FDA29B",
  main_400: "#F97066",
  main: "#F04438",
  main_600: "#D92D20",
  dark: "#B42318",
  dark_800: "#912018",
  dark_900: "#7A271A",
};

const BLACK_HAZE = {
  light_50: "#F6FAFD",
  light_100: "#E5F0F9",
  light_200: "#C6E1F1",
  light: "#94C9E5",
  main_400: "#5BADD5",
  main: "#5BADD5",
  main_600: "#2675A3",
  dark: "#205E84",
  dark_800: "#1E506E",
  dark_900: "#1E435C",
};

const BLUE_VIOLET = {
  light_50: "#F3F5FB",
  light_100: "#E4E7F5",
  light_200: "#CFD5EE",
  light: "#94C9E5",
  main_400: "#8896D2",
  main: "#6B77C6",
  main_600: "#585EB8",
  dark: "#5152AF",
  dark_800: "#44438A",
  dark_900: "#3A3A6E",
};

const BRING_PINK = {
  light_50: "#FFF1F4",
  light_100: "#FFE4E9",
  light_200: "#FDA4BA",
  light: "#FDA4BA",
  main_400: "#FA628A",
  main: "#F34073",
  main_600: "#E01E5F",
  dark: "#BD1350",
  dark_800: "#9E1349",
  dark_900: "#881345",
};

const GREY = {
  0: "#FFFFFF",
  50: "#F9FAFB",
  100: "#F3F4F6",
  200: "#E5E7EB",
  300: "#D2D6DB",
  400: "#9DA4AE",
  500: "#6C737F",
  600: "#4D5761",
  700: "#384250",
  800: "#1F2A37",
  900: "#111927",
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
  common: { black: "#000000", white: "#fff" },
  primary: { ...PRIMARY, contrastText: "#fff" },
  info: { ...INFO, contrastText: "#fff" },
  success: { ...SUCCESS, contrastText: "#fff" },
  warning: { ...WARNING, contrastText: "#fff" },
  error: { ...ERROR, contrastText: "#fff" },
  black_haze: { ...BLACK_HAZE, contrastText: "#fff" },
  blue_violet: { ...BLUE_VIOLET, contrastText: "#fff" },
  bring_pink: { ...BRING_PINK, contrastText: "#fff" },
  grey: GREY,
  gradients: GRADIENTS,
  divider: GREY[500_24],
  action: {
    hover: PRIMARY.light_100,
    selected: PRIMARY.light_100,
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
    background: { paper: "#fff", default: GREY[50], neutral: GREY[100] },
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
