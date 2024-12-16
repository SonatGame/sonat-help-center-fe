import { inter } from "@/app/layout";
import { pxToRem, responsiveFontSizes } from "@/lib/utils/getFontValue";

const typography = {
  fontFamily: inter.style.fontFamily,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  h1: {
    fontWeight: 600,
    fontSize: pxToRem(48),
    lineHeight: 80 / 64,
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  h2: {
    fontWeight: 600,
    fontSize: pxToRem(42),
    lineHeight: 64 / 48,
    ...responsiveFontSizes({ sm: 32, md: 36, lg: 42 }),
  },
  h3: {
    fontWeight: 600,
    fontSize: pxToRem(24),
    lineHeight: 1.5,
    ...responsiveFontSizes({ sm: 24, md: 28, lg: 32 }),
  },
  h4: {
    fontWeight: 600,
    fontSize: pxToRem(20),
    lineHeight: 1.5,
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 28 }),
  },
  h5: {
    fontWeight: 600,
    fontSize: pxToRem(24),
    lineHeight: 1.5,
    ...responsiveFontSizes({ sm: 18, md: 20, lg: 24 }),
  },
  h6: {
    fontWeight: 600,
    fontSize: pxToRem(20),
    lineHeight: 28 / 18,
    ...responsiveFontSizes({ sm: 16, md: 18, lg: 20 }),
  },
  subtitle1: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 500,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    fontSize: pxToRem(16),
    lineHeight: 1.5,
  },
  body2: {
    fontSize: pxToRem(14),
    lineHeight: 22 / 14,
  },
  caption: {
    fontSize: pxToRem(12),
    lineHeight: 1.5,
  },
  overline: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: "uppercase",
  },
  button: {
    fontWeight: 500,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: "capitalize",
  },
};

export default typography;
