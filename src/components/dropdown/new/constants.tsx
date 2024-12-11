export const menuItemStyles = {
  py: 1.5,
  px: 1,
  my: 0.5,
  borderRadius: 0.75,
};

export const menuItemErrorStyles = {
  "&:hover": {
    "& .MuiTypography-root, .MuiSvgIcon-root": {
      color: (theme: any) => `${theme.palette.error.main} !important`,
    },
    backgroundColor: (theme: any) =>
      `${theme.palette.error.light_100} !important`,
  },
};
