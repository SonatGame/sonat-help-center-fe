import { alpha } from "@mui/material";

export default function CssBaseline(theme: any) {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        "&::-webkit-scrollbar, &::-webkit-scrollbar:horizontal": {
          width: "8px",
          height: "8px",
        },
        "&::-webkit-scrollbar-track, &::-webkit-scrollbar-track:horizontal": {
          background: "#f1f1f1",
        },
        "&::-webkit-scrollbar-thumb, &::-webkit-scrollbar-thumb:horizontal": {
          borderRadius: 20,
          backgroundColor: alpha(theme.palette.primary.main, 0.7),
        },
        "&::-webkit-scrollbar-thumb:hover, ::-webkit-scrollbar-thumb:horizontal:hover":
          {
            backgroundColor: theme.palette.primary.main,
          },
        "& .ant-table": {
          scrollbarColor: "unset !important",
        },
        "*": {
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        },
        html: {
          width: "100%",
          height: "100%",
          WebkitOverflowScrolling: "touch",
        },
        body: {
          width: "100%",
          height: "100%",
        },
        "#__next": {
          width: "100%",
          height: "100%",
        },
        input: {
          "&[type=number]": {
            MozAppearance: "textfield",
            "&::-webkit-outer-spin-button": {
              margin: 0,
              WebkitAppearance: "none",
            },
            "&::-webkit-inner-spin-button": {
              margin: 0,
              WebkitAppearance: "none",
            },
          },
        },
        img: {
          display: "block",
          maxWidth: "100%",
        },
      },
    },
  };
}
