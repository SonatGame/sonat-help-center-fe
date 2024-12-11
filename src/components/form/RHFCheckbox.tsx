import { Control, Controller } from "react-hook-form";

import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";

interface IRHFCheckboxProps {
  name: string;
  label?: string;
  control: Control<any>;
  CheckboxProps?: CheckboxProps;
}

export function RHFCheckbox({
  name,
  control,
  label,
  CheckboxProps,
}: IRHFCheckboxProps) {
  return (
    <FormControlLabel
      label={label}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Checkbox {...field} checked={field.value} {...CheckboxProps} />
          )}
        />
      }
    />
  );
}
