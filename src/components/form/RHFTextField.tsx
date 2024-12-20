import { Stack, TextField, TextFieldProps, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import Asterisk from "./Asterisk";

interface IRHFTextFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  label?: string | ReactNode;
  required?: boolean;
  rules?: any;
  control: Control<T, any>;
  onlyNumber?: boolean;
  defaultValue?: any;
  TextFieldProps?: TextFieldProps;
  sx?: any;
}

export default function RHFTextField<T extends FieldValues>({
  name,
  label,
  rules,
  required = false,
  control,
  defaultValue = "",
  onlyNumber = false,
  TextFieldProps,
  sx = {},
}: IRHFTextFieldProps<T>) {
  const { label: textFieldLabel, onChange, ...rest } = TextFieldProps || {};

  const commonLabel = label || textFieldLabel;

  return (
    <Stack spacing={0.5} width="100%" sx={{ ...sx }}>
      {typeof commonLabel === "string" ? (
        <Typography variant="body2">
          {commonLabel}&nbsp;
          {required && <Asterisk />}
        </Typography>
      ) : (
        commonLabel && commonLabel
      )}

      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            size="small"
            fullWidth
            error={!!error}
            helperText={error?.message}
            {...rest}
            onChange={(e) => {
              const reg = /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/;
              if (
                onlyNumber &&
                !reg.test(e.target.value) &&
                e.target.value.length !== 0
              )
                return;
              onChange?.(e);
              field.onChange(e);
            }}
          />
        )}
      />
    </Stack>
  );
}
