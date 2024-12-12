export default function Button(theme: any) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          "&:hover": {
            boxShadow: "none",
          },
          padding: theme.spacing(0.75, 2),
          borderRadius: theme.shape.borderRadius * 1.5,
        },
        sizeLarge: {
          minHeight: 48,
        },
        containedInherit: {
          color: theme.palette.grey[700],
          "&:hover": {
            backgroundColor: theme.palette.grey[400],
          },
        },
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: theme.palette.text.secondary,
        },
        sizeSmall: {
          padding: theme.spacing(0.5),
        },
      },
    },
  };
}
