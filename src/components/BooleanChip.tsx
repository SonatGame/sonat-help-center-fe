import { ChipProps, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from "react-hook-form";
import BaseChip from "./BaseChip";
import Switch from "./Switch";

interface BooleanInputChipProps<T extends FieldValues> {
  control?: Control<T, any>;
  setValue?: UseFormSetValue<T>;
  valueName?: FieldPath<T>;
  initValue: boolean;
  label: string | React.ReactNode;
  onChangeCallback?: (checked: boolean) => void;
  chipProps?: ChipProps;
}

const BooleanChip = <T extends FieldValues>(
  props: BooleanInputChipProps<T>
) => {
  const { setValue, initValue, label, valueName, onChangeCallback, chipProps } =
    props;

  const [inputValue, setInputValue] = useState(initValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.checked);
    if (valueName && setValue)
      setValue(valueName, event.target.checked as PathValue<T, Path<T>>);
    if (onChangeCallback) onChangeCallback(event.target.checked);
  };

  useEffect(() => {
    setInputValue(initValue);
  }, [initValue]);

  return (
    <BaseChip
      label={
        <Stack
          spacing={1}
          width={1}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {label && typeof label === "string" ? (
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
          ) : (
            label
          )}
          <Switch
            checked={inputValue}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            size="small"
          />
        </Stack>
      }
      onClick={(e: any) => {
        if (valueName && setValue)
          setValue(valueName, !inputValue as PathValue<T, Path<T>>);
        setInputValue(!inputValue);
        if (onChangeCallback) onChangeCallback(!inputValue);
      }}
      {...chipProps}
    />
  );
};

export default BooleanChip;
