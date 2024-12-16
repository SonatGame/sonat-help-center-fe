import { alpha } from "@mui/material/styles";

export default function ToggleButton(theme: any) {
  const style = (color: string) => ({
    props: { color },
    style: {
      "&:hover": {
        borderColor: alpha(theme.palette[color].main, 0.48),
        backgroundColor: alpha(
          theme.palette[color].main,
          theme.palette.action.hoverOpacity
        ),
      },
      "&.Mui-selected": {
        borderColor: alpha(theme.palette[color].main, 0.48),
      },
    },
  });

  return {
    MuiToggleButton: {
      variants: [
        {
          props: { color: "standard" },
          style: {
            "&.Mui-selected": {
              backgroundColor: theme.palette.action.selected,
            },
          },
        },
        style("primary"),
        style("secondary"),
        style("info"),
        style("success"),
        style("warning"),
        style("error"),
      ],
      styleOverrides: {
        root: {
          color: theme.palette.text.secondary,
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.customShadows.z1,
        },
      },
    },
  };
}
