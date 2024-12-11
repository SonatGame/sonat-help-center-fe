export default function Accordion(theme: any) {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          "&.Mui-expanded": {
            borderRadius: theme.shape.borderRadius * 1.5,
          },
          "&.Mui-disabled": {
            backgroundColor: "transparent",
          },
          border: `1px solid ${theme.palette.divider}`,
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(1),
          "&.Mui-disabled": {
            opacity: 1,
            color: theme.palette.action.disabled,
            "& .MuiTypography-root": {
              color: "inherit",
            },
          },
        },
        expandIconWrapper: {
          color: "inherit",
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          borderBottomLeftRadius: theme.shape.borderRadius * 1.5,
          borderBottomRightRadius: theme.shape.borderRadius * 1.5,
        },
      },
    },
  };
}
