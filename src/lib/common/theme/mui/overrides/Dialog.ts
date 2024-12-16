export default function Dialog(theme: any) {
  return {
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: theme.palette.background.default,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: theme.spacing(2.5, 2.5, 2),
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          borderTop: 0,
          borderBottom: 0,
          padding: theme.spacing(2.5, 2.5, 2.5),
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: theme.spacing(0, 2.5, 2.5),
        },
      },
    },
  };
}
