export default function SvgIcon(theme: any) {
  return {
    MuiSvgIcon: {
      styleOverrides: {
        color: theme.palette.text.secondary,
        fontSizeSmall: {
          width: 20,
          height: 20,
          fontSize: "inherit",
        },
        fontSizeLarge: {
          width: 32,
          height: 32,
          fontSize: "inherit",
        },
      },
    },
  };
}
