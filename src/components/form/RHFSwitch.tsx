import { FormControlLabel, SwitchProps } from "@mui/material";
import { forwardRef } from "react";
import { Control, Controller } from "react-hook-form";
import Switch from "../Switch";

interface IRHFSwitchProps {
  name: string;
  label?: string;
  control: Control<any>;
  SwitchProps?: SwitchProps;
}

const RHFSwitch = forwardRef<HTMLButtonElement, IRHFSwitchProps>(
  ({ name, control, label, SwitchProps }, ref) => {
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
  }
);

RHFSwitch.displayName = "RHFSwitch";

export default RHFSwitch;
