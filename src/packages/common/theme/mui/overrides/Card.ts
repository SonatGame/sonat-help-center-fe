export default function Card(theme: any) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius * 1.5,
          border: `1px solid ${theme.palette.divider}`,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: theme.spacing(2),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          flex: 1,
          padding: theme.spacing(2),
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: theme.spacing(2),
        },
      },
    },
  };
}
