export default function List(theme: any) {
  return {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1.5, 2),
          "&.Mui-selected, &.Mui-selected:hover": {
            border: `1px solid ${theme.palette.primary.text_selected} !important`,
            color: `${theme.palette.action.text_selected} !important`,
            backgroundColor: `${theme.palette.action.selected} !important`,
          },
          "&.Mui-selected .MuiTypography-root, &.Mui-selected .MuiSvgIcon-root":
            {
              color: `${theme.palette.action.text_hover} !important`,
            },
          "&.Mui-selected .MuiTypography-root": {
            color: `${theme.palette.action.text_selected} !important`,
          },
          "&:hover": {
            color: `${theme.palette.action.text_hover} !important`,
            backgroundColor: `${theme.palette.action.hover} !important`,
            "& .MuiTypography-root, & .MuiSvgIcon-root": {
              color: `${theme.palette.action.text_hover} !important`,
            },
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected, &.Mui-selected:hover": {
            border: `1px solid ${theme.palette.primary.text_selected} !important`,
            color: `${theme.palette.action.text_selected} !important`,
            backgroundColor: `${theme.palette.action.selected} !important`,
          },
          "&.Mui-selected .MuiTypography-root, &.Mui-selected .MuiSvgIcon-root":
            {
              color: `${theme.palette.action.text_hover} !important`,
            },
          "&.Mui-selected .MuiTypography-root": {
            color: `${theme.palette.action.text_selected} !important`,
          },
          "&:hover": {
            color: `${theme.palette.action.text_hover} !important`,
            backgroundColor: `${theme.palette.action.hover} !important`,
            "& .MuiTypography-root, & .MuiSvgIcon-root": {
              color: `${theme.palette.action.text_hover} !important`,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
          minWidth: "auto",
          marginRight: theme.spacing(2),
        },
      },
    },
    MuiListItemAvatar: {
      styleOverrides: {
        root: {
          minWidth: "auto",
          marginRight: theme.spacing(2),
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          marginTop: 0,
          marginBottom: 0,
        },
        multiline: {
          marginTop: 0,
          marginBottom: 0,
        },
      },
    },
  };
}
