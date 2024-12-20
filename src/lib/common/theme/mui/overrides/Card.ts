export default function Card(theme: any) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius * 2,
          boxShadow: "0px 4px 8px -2px rgba(16, 24, 40, 0.1)",
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
