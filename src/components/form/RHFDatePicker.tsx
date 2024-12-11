import { Control, Controller } from "react-hook-form";

import { pxToRem } from "@/lib/utils/getFontValue";
import {
  FormControl,
  FormHelperText,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { ReactNode } from "react";
import Asterisk from "./Asterisk";

interface RHFDatePickerProps {
  name: string;
  rules?: any;
  control: Control<any>;
  label?: string | ReactNode;
  required?: boolean;
  sx?: SxProps;
  disabled?: boolean;
  onChangeCallback?: (value: Date) => void;
}

export default function RHFDatePicker({
  name,
  control,
  rules,
  label,
  required,
  sx,
  disabled = false,
  onChangeCallback,
}: RHFDatePickerProps) {
  return (
    <Stack spacing={0.5} width="100%" sx={{ ...sx }}>
      {typeof label === "string" ? (
        <Typography variant="body2">
          {label}&nbsp;
          {required && <Asterisk />}
        </Typography>
      ) : (
        label && label
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <FormControl>
            <DatePicker
              {...field}
              format="DD/MM/YYYY"
              onChange={(newValue: Date | null) => {
                field.onChange(newValue);
                if (newValue) onChangeCallback?.(newValue);
              }}
              disabled={disabled}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: pxToRem(14),
                },
              }}
            />

            {!!error && (
              <FormHelperText error={!!error}>{error?.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    </Stack>
  );
}
