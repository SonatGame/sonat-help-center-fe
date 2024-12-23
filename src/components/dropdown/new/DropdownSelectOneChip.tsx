import BaseChip from "@/components/BaseChip";
import { Close, KeyboardArrowDown, Search } from "@mui/icons-material";
import {
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  List,
  MenuItem,
  Popover,
  Stack,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { Empty } from "antd";
import React, { useMemo, useState } from "react";
import { menuItemStyles } from "./constants";
import { IOption } from "./types";

interface DropdownSelectOneChipProps {
  label: string | React.ReactNode;
  value: string;
  valueName: string;
  setValue: any;
  options: IOption[];
  disabled?: boolean;
  isLoading?: boolean;
  hasSearch?: boolean;
  isHideSelectedValue?: boolean;
  hasRemoveButton?: boolean;
  hasArrowDownIcon?: boolean;
  isShowDisabledOption?: boolean;
  onRemove?: (value: string) => void;
  onSelectItem?: (value: string) => void;
  onChangeCallback?: (value: string) => void;
  sx?: SxProps;
}

export default function DropdownSelectOneChip({
  label,
  value,
  valueName,
  setValue,
  options,
  isLoading = false,
  disabled = false,
  hasSearch = false,
  isHideSelectedValue = false,
  hasRemoveButton = false,
  hasArrowDownIcon = true,
  isShowDisabledOption = false,
  onRemove = () => {},
  onChangeCallback = () => {},
  sx,
}: DropdownSelectOneChipProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [search, setSearch] = useState("");

  const open = Boolean(anchorEl);
  const id = open ? `${label}-popover` : undefined;

  const filterredOptions = options.filter((option) => {
    return (
      (option.label.toString().toLowerCase().includes(search.toLowerCase()) ||
        option.value.toString().toLowerCase().includes(search.toLowerCase())) &&
      (isShowDisabledOption ? true : !option.disabled)
    );
  });
  const handleOpenSelectMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectItem = (newValue: string) => {
    setValue(valueName, newValue);
    onChangeCallback?.(newValue);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const foundValue = useMemo(() => {
    return options.find((c) => c.value === value);
  }, [value, options]);

  return (
    <>
      <BaseChip
        sx={{
          ...sx,
          ...(foundValue && {
            background: foundValue.backgroundColor,
            borderColor: `${foundValue.backgroundColor} !important`,
            "&:hover": {
              backgroundColor: `${foundValue.backgroundColor} !important`,
              color: foundValue.color,
            },
          }),
        }}
        onClick={handleOpenSelectMenu}
        variant="outlined"
        label={
          <Stack
            width={1}
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack spacing={1} direction="row" alignItems="center">
              {label && typeof label === "string" ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={500}
                >
                  {label}
                </Typography>
              ) : (
                label
              )}

              {!isHideSelectedValue && (
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  sx={{
                    color: `${foundValue?.color} !important` || "text.primary",
                  }}
                >
                  {foundValue ? foundValue.label : "None"}
                </Typography>
              )}
            </Stack>

            {(hasArrowDownIcon || hasRemoveButton) && (
              <Stack direction="row" alignItems="center" spacing={0.5}>
                {hasArrowDownIcon && (
                  <KeyboardArrowDown
                    fontSize="small"
                    color="action"
                    sx={{
                      ...(foundValue && {
                        color: foundValue.color,
                      }),
                    }}
                  />
                )}

                {hasRemoveButton && (
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(valueName);
                    }}
                  >
                    <Close sx={{ fontSize: 16 }} />
                  </IconButton>
                )}
              </Stack>
            )}
          </Stack>
        }
        disabled={disabled}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{ mt: 0.5 }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack p={1.5} spacing={1}>
          {hasSearch && (
            <>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                placeholder={`Search ${
                  label && typeof label === "string" ? label.toLowerCase() : ""
                }`}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 0.5 }} />,
                }}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Divider />
            </>
          )}

          {(() => {
            if (isLoading)
              return (
                <Stack
                  height={200}
                  minWidth={200}
                  justifyContent="center"
                  alignItems="center"
                >
                  <CircularProgress size={35} />
                </Stack>
              );

            if (options?.length === 0)
              return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

            return (
              <List
                // key={filterredOptions.toString()}
                sx={{
                  m: 0,
                  p: 0,
                  overflowY: "auto",
                  minWidth: 240,
                  maxHeight: 400,
                }}
              >
                {filterredOptions.map((option, index) => {
                  const isSelected = value === option.value;

                  return (
                    <MenuItem
                      key={option.value + index.toString()}
                      sx={{
                        ...menuItemStyles,
                        ...(option.color && {
                          "&:hover .MuiTypography-root, &.Mui-selected .MuiTypography-root":
                            {
                              color: `${option.color} !important`,
                            },
                        }),
                      }}
                      selected={isSelected}
                      disabled={option.disabled}
                      onClick={() => handleSelectItem(option.value)}
                    >
                      {option.backgroundColor && option.color ? (
                        <Chip
                          sx={{
                            borderRadius: 1,
                            backgroundColor: option.backgroundColor,
                            color: option.color,
                          }}
                          label={
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              {option.startIcon}
                              {option.icon}
                              <Typography
                                variant="body2"
                                fontWeight={isSelected ? 600 : 400}
                              >
                                {option.label}
                              </Typography>
                              {option.endIcon}
                            </Stack>
                          }
                        />
                      ) : (
                        <Stack direction="row" alignItems="center" spacing={2}>
                          {option.startIcon}
                          {option.icon}
                          <Typography
                            variant="body2"
                            fontWeight={isSelected ? 600 : 400}
                          >
                            {option.label}
                          </Typography>
                          {option.endIcon}
                        </Stack>
                      )}
                    </MenuItem>
                  );
                })}
              </List>
            );
          })()}
        </Stack>
      </Popover>
    </>
  );
}
