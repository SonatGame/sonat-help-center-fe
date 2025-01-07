export default function Tooltip(theme: any) {
  const isLight = theme.palette.mode === "light";

  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.common.white,
          color: theme.palette.grey[700],
          boxShadow: theme.customShadows.z8,
        },
        arrow: {
          color: theme.palette.common.white,
        },
      },
    },
  };
}
