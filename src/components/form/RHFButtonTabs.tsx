import { Button, Stack, SxProps, Typography } from "@mui/material";
import { FieldPath, FieldValues, SetFieldValue } from "react-hook-form";
import { IOption } from "../dropdown/new/types";

interface RHFButtonTabsProps<T extends FieldValues> {
  label: string | React.ReactNode;
  value: string | number;
  valueName: FieldPath<T>;
  setValue: SetFieldValue<T>;
  options: IOption[];
  sx?: SxProps;
}

export default function RHFButtonTabs<T extends FieldValues>({
  label,
  setValue,
  value,
  valueName,
  options,
  sx = {},
}: RHFButtonTabsProps<T>) {
  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ ...sx }}>
      {typeof label === "string" ? (
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      ) : (
        label
      )}

      {options.map((option) => {
        const isSelected = option.value === value;

        return (
          <Button
            key={option.value}
            onClick={() => setValue(valueName, option.value)}
            sx={{
              minHeight: "auto",
              px: 1,
              py: 0.5,
              ...(isSelected && {
                color: "primary.main",
                backgroundColor: "primary.light_100",
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "primary.light_100",
                },
              }),
              ...(!isSelected && {
                color: (theme) => theme.palette.grey[400],
                backgroundColor: (theme) => theme.palette.grey[100],
              }),
            }}
          >
            {option.label}
          </Button>
        );
      })}
    </Stack>
  );
}
