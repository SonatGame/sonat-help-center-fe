import { Chip, ChipProps, useTheme } from "@mui/material";
import React, { forwardRef } from "react";

interface BaseChipProps extends ChipProps {
  chipChildren?: React.ReactNode;
  popoverChildren?: React.ReactNode;
  minHeight?: number;
  height?: number | string;
  width?: number;
  onClick?: (e: any) => void;
}

const BaseChip = forwardRef(
  (
    { sx, onClick, minHeight, height, width, ...rest }: BaseChipProps,
    ref: any
  ) => {
    const theme = useTheme();

    return (
      <Chip
        ref={ref}
        variant="outlined"
        onClick={onClick}
        sx={{
          height: height ?? "auto",
          minHeight: minHeight ?? 37,
          width: width ?? "auto",
          borderRadius: 1,
          cursor: "pointer",
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
          "&:active": {
            borderColor: theme.palette.primary.main,
          },
          "&:hover": {
            "& .MuiTypography-root": {
              color: theme.palette.primary.main,
            },
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.action.hover,
          },
          "& .MuiChip-label": {
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: theme.spacing(0, 1),
          },
          ...sx,
        }}
        {...rest}
      />
    );
  }
);

BaseChip.displayName = "BaseChip";

export default BaseChip;
