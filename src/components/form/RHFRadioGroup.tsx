import { Control, Controller } from "react-hook-form";

import {
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  RadioGroupProps,
  RadioProps,
  Stack,
  Typography,
} from "@mui/material";
import Asterisk from "./Asterisk";

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
    description?: string;
  }[];
  RadioGroupProps?: RadioGroupProps;
  RadioProps?: RadioProps;
  sx?: any;
}

export default function RHFRadioGroup({
  name,
  label,
  options,
  required,
  rules,
  control,
  defaultValue,
  RadioGroupProps,
  RadioProps,
  sx,
}: IRHFRadioGroupProps) {
  const { onChange, ...rest } = RadioGroupProps || {};

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <Stack sx={{ ...sx }}>
          {label && (
            <Typography variant="body2">
              {label}&nbsp;
              {required && <Asterisk />}
            </Typography>
          )}

          <RadioGroup
            {...field}
            row
            {...rest}
            onChange={(e) => {
              onChange?.(e, e.target.value);
              field.onChange(e);
            }}
          >
            {options.map((option) => (
              <Stack key={option.value}>
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio {...RadioProps} />}
                  label={option.label}
                />

                {!!option?.description && (
                  <Typography variant="body2" color="text.secondary">
                    {option.description}
                  </Typography>
                )}
              </Stack>
            ))}
          </RadioGroup>

          {!!error && <FormHelperText error>{error?.message}</FormHelperText>}
        </Stack>
      )}
    />
  );
}
