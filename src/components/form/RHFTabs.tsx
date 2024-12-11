import { styled, SxProps, Tab, Tabs, TabsProps } from "@mui/material";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

const StyledTabs = styled(Tabs)(() => ({
  minHeight: "initial",
  "& .MuiTabs-indicator": {
    display: "none",
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  minHeight: "initial",
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  "&:first-child": {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  "&:last-child": {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  "&:not(:last-child)": {
    borderRight: 0,
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

interface IRHFTabsProps<T extends FieldValues> {
  name: FieldPath<T>;
  label?: string;
  required?: boolean;
  rules?: any;
  control: Control<T, any>;
  options: {
    label: string | number;
    value: string | number;
  }[];
  TabsProps?: TabsProps;
  sx?: SxProps;
}

export default function RHFTabs<T extends FieldValues>({
  name,
  options,
  rules,
  control,
  TabsProps,
  sx,
}: IRHFTabsProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <StyledTabs
          {...field}
          allowScrollButtonsMobile
          scrollButtons="auto"
          variant="scrollable"
          onChange={(e, value) => {
            if (!value) return;
            field.onChange(value);
          }}
          sx={{
            "& .MuiButtonBase-root.Mui-disabled": {
              display: "none",
            },
            ...sx,
          }}
          {...TabsProps}
        >
          {options.map((option) => (
            <StyledTab
              key={option.value}
              value={option.value}
              label={option.label}
            />
          ))}
        </StyledTabs>
      )}
    />
  );
}
