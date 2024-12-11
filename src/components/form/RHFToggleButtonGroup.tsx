import { Control, Controller } from "react-hook-form";

import {
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
} from "@mui/material";
import { ReactNode } from "react";

interface IRHFRadioGroupProps {
  name: string;
  label?: string;
  required?: boolean;
  rules?: any;
  control: Control<any>;
  defaultValue?: string | number;
  options: {
    label: string | number;
    value: string | number;
    description?: string | ReactNode;
  }[];
  ToggleButtonGroupProps?: ToggleButtonGroupProps;
  sx?: any;
  size?: "small" | "medium" | "large";
  variant?: "contained" | "ghosted";
}

export default function RHFToggleButtonGroup({
  name,
  options,
  rules,
  control,
  defaultValue,
  ToggleButtonGroupProps,
  size = "small",
  variant = "ghosted",
  sx,
}: IRHFRadioGroupProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <ToggleButtonGroup
          exclusive
          {...field}
          onChange={(e, value) => {
            if (!value) return;
            field.onChange(value);
          }}
          sx={{ minHeight: 36.5, width: "max-content", ...sx }}
          {...ToggleButtonGroupProps}
        >
          {options.map((option) => (
            <ToggleButton
              key={option.value}
              value={option.value}
              size={size}
              sx={{
                fontWeight: 500,
                textAlign: "center",
                ...(size === "small" && { py: 0.75, px: 1.5, fontSize: 14 }),
                ...(size === "medium" && { py: 1, px: 2, fontSize: 14 }),
                ...(size === "large" && { py: 1.5, px: 2, fontSize: 16 }),
                margin: 0,
                "&.Mui-selected": {
                  ...(variant === "ghosted" && {
                    "&:hover": {
                      bgcolor: (theme) => theme.palette.action.hover,
                      color: (theme) => theme.palette.primary.main,
                    },
                    bgcolor: (theme) => theme.palette.action.hover,
                    color: (theme) => theme.palette.primary.main,
                  }),
                  ...(variant === "contained" && {
                    "&:hover": {
                      bgcolor: (theme) => theme.palette.primary.main,
                      color: (theme) => theme.palette.primary.contrastText,
                    },
                    bgcolor: (theme) => theme.palette.primary.main,
                    color: (theme) => theme.palette.primary.contrastText,
                  }),
                  margin: 0,
                },
              }}
            >
              {option.label}
              {option.description && " "}
              {option.description}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    />
  );
}
