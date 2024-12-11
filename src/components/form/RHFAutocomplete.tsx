import { Control, Controller } from "react-hook-form";

import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  Chip,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Asterisk from "./Asterisk";

interface IRHFAutocompleteProps {
  name: string;
  label?: string;
  rules?: any;
  limitTags?: number;
  multiple?: boolean;
  required?: boolean;
  control: Control<any>;
  options: {
    label: string | number;
    value: string | number;
    icon?: React.ReactNode;
  }[];
  AutocompleteProps?: any;
  sx?: any;
  specialOnchange?: (event: any, newValue: any) => void;
  defaultValue?: any;
}

export default function RHFAutocomplete({
  name,
  label,
  rules,
  limitTags = 3,
  required = false,
  multiple = false,
  control,
  options = [],
  AutocompleteProps = {},
  sx = {},
  defaultValue,
}: IRHFAutocompleteProps) {
  const { onChange, ...rest } = AutocompleteProps;

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
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => (
          <Autocomplete
            {...field}
            multiple={multiple}
            renderInput={(params: AutocompleteRenderInputParams) => (
              <TextField
                {...params}
                error={!!error}
                helperText={error?.message}
                size="small"
              />
            )}
            isOptionEqualToValue={(option: any, value) => {
              if (typeof value === "string") return option.label === value;
              return option.value === value.value;
            }}
            onChange={(event, newValue) => {
              onChange?.();
              field.onChange(newValue);
            }}
            renderTags={(value, getTagProps) => {
              const numTags = value.length;

              return (
                <>
                  {value.slice(0, limitTags).map((option, index) => (
                    <Chip
                      size="small"
                      {...getTagProps({ index })}
                      key={index}
                      avatar={option?.icon}
                      label={option.label}
                      sx={{ color: (theme) => theme.palette.primary.main }}
                    />
                  ))}

                  {limitTags && numTags > limitTags && (
                    <Tooltip
                      title={value
                        .slice(limitTags)
                        .map((value) => value.label)
                        .join(", ")}
                    >
                      <Chip
                        size="small"
                        label={` +${numTags - limitTags}`}
                      ></Chip>
                    </Tooltip>
                  )}
                </>
              );
            }}
            renderOption={(props: any, option: any) => (
              <Box component="li" {...props} key={option.value}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  {option?.icon}
                  <Typography variant="body1">{option.label}</Typography>
                </Stack>
              </Box>
            )}
            options={options}
            fullWidth
            {...rest}
          />
        )}
      />
    </Stack>
  );
}
