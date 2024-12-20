import { FormControlLabel, SwitchProps } from "@mui/material";
import { forwardRef } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import Switch from "../Switch";

interface IRHFSwitchProps<T extends FieldValues> {
  name: FieldPath<T>;
  label?: string;
  control: Control<T>;
  SwitchProps?: SwitchProps;
}

const RHFSwitch = forwardRef(function RHFSwitch<T extends FieldValues>(
  { name, control, label, SwitchProps }: IRHFSwitchProps<T>,
  ref: React.Ref<HTMLButtonElement>
) {
  return (
    <FormControlLabel
      label={label}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Switch
              {...field}
              checked={field.value}
              {...SwitchProps}
              ref={ref}
            />
          )}
        />
      }
    />
  );
});

RHFSwitch.displayName = "RHFSwitch";

export default RHFSwitch;
