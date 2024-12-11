import React from "react";

import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectProps,
  Stack,
  Typography,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";
import Asterisk from "./Asterisk";

const styles = {
  mx: 1,
  my: 0.5,
  borderRadius: 0.75,
  typography: "body2",
};

interface IRHFSelect {
  name: string;
  label?: string;
  required?: boolean;
  rules?: any;
  control: Control<any>;
  options: Array<
    | string
    | {
        value: string | number;
        label: string | number;
        disabled?: boolean;
        icon?: React.ReactElement;
      }
  >;
  SelectProps?: SelectProps;
  sx?: any;
}

export default function RHFSelect({
  name,
  label,
  required = false,
  rules,
  control,
  options = [],
  SelectProps = {},
  sx = {},
}: IRHFSelect) {
  const { label: selectLabel = "", onChange, ...rest } = SelectProps || {};

  const commonLabel = label || selectLabel;

  const formattedOptions = React.useMemo(
    () =>
      options.map((option) => {
        if (typeof option === "object" && option !== null) {
          const { value = "", label = "", disabled = false, icon } = option;

          return {
            value,
            label,
            disabled,
            icon,
          };
        }

        return {
          value: option,
          label: option,
          disabled: false,
          icon: <></>,
        };
      }),
    [options]
  );

  const render = React.useMemo(
    () => [
      formattedOptions.map(
        ({ value = "", label = "", disabled = false, icon }) => (
          <MenuItem
            key={value}
            value={value}
            disabled={disabled}
            sx={{ px: 1.5, py: 1.25, ...styles }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              {icon}
              <Typography variant="body2" lineHeight={1.5}>
                {label}
              </Typography>
            </Stack>
          </MenuItem>
        )
      ),
    ],
    [formattedOptions]
  );

  return (
    <Stack spacing={0.5} width="100%" sx={{ ...sx }}>
      {commonLabel && (
        <Typography variant="body2">
          {commonLabel}&nbsp;
          {required && <Asterisk />}
        </Typography>
      )}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth>
            <Select
              {...field}
              size="small"
              fullWidth
              error={!!error}
              {...rest}
              onChange={(e) => {
                onChange?.(e, e.target.value as any);
                field.onChange(e);
              }}
              MenuProps={{
                sx: {
                  maxHeight: 420,
                },
              }}
            >
              {render}
            </Select>

            {!!error && (
              <FormHelperText error={!!error}>{error?.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    </Stack>
  );
}
