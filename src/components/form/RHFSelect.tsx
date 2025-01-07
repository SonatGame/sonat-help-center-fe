import React from "react";

import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectProps,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import Asterisk from "./Asterisk";

const styles = {
  mx: 1,
  my: 0.5,
  borderRadius: 0.75,
  typography: "body2",
};

interface IRHFSelect<T extends FieldValues> {
  name: FieldPath<T>;
  label?: string;
  required?: boolean;
  rules?: any;
  control: Control<T, any>;
  options: Array<
    | string
    | {
        value: string;
        label: string;
        disabled?: boolean;
        icon?: React.ReactElement;
      }
  >;
  SelectProps?: SelectProps;
  sx?: SxProps;
}

export default function RHFSelect<T extends FieldValues>({
  name,
  label,
  required = false,
  rules,
  control,
  options = [],
  SelectProps = {},
  sx = {},
}: IRHFSelect<T>) {
  const { onChange, ...rest } = SelectProps || {};

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
      {label && (
        <Typography variant="body2">
          {label}&nbsp;
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
