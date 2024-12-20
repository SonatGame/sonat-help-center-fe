import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";

interface IRHFCheckboxProps<T extends FieldValues> {
  name: FieldPath<T>;
  label?: string;
  control: Control<T, any>;
  CheckboxProps?: CheckboxProps;
}

export function RHFCheckbox<T extends FieldValues>({
  name,
  control,
  label,
  CheckboxProps,
}: IRHFCheckboxProps<T>) {
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
