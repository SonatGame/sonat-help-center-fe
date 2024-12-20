export default function Checkbox(theme: any) {
  return {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: theme.palette.action.checked,
          },
          "&.MuiCheckbox-indeterminate": {
            color: theme.palette.action.checked,
          },
        },
      },
    },
  };
}
