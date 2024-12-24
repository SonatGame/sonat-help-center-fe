import { Components, Theme } from "@mui/material";

export default function Input(theme: any) {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            "& svg": { color: theme.palette.text.disabled },
          },
          minHeight: 37,
        },
        input: {
          fontSize: theme.typography.body2.fontSize,
          "&::placeholder": {
            opacity: 1,
            color: theme.palette.text.disabled,
            fontSize: theme.typography.body2.fontSize,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          "&:before": {
            borderBottomColor: theme.palette.grey[500_56],
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey[500_12],
          "&:hover": {
            backgroundColor: theme.palette.grey[500_16],
          },
          "&.Mui-focused": {
            backgroundColor: theme.palette.action.focus,
          },
          "&.Mui-disabled": {
            backgroundColor: theme.palette.action.disabledBackground,
          },
        },
        underline: {
          "&:before": {
            borderBottomColor: theme.palette.grey[500_56],
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.divider,
          },
          "&.Mui-disabled": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.action.disabledBackground,
            },
          },
          "& .MuiInputBase-inputMultiline": {
            padding: 0,
          },
          backgroundColor: theme.palette.background.paper,
          borderColor: theme.palette.divider,
        },
        input: {
          padding: theme.spacing(0.875, 1.5),
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: theme.palette.text.secondary,
        },
      },
    },
  } as Components<Omit<Theme, "components">>;
}
