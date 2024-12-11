export default function Popover(theme: any) {
  return {
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.z8,
          borderRadius: Number(theme.shape.borderRadius) * 1.5,
          border: `1px solid ${theme.palette.divider}`,
        },
      },
    },
  };
}
