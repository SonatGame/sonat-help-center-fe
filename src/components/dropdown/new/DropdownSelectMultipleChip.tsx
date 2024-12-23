import BaseChip from "@/components/BaseChip";
import useDebounce from "@/lib/hooks/useDebounce";
import { Close, KeyboardArrowDown, Search } from "@mui/icons-material";
import {
  Button,
  Checkbox,
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
  Tooltip,
  Typography,
} from "@mui/material";
import { Empty } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { menuItemStyles } from "./constants";
import { IOption } from "./types";

interface DropdownSelectMultipleChipProps {
  label: string | React.ReactNode;
  value: (string | number)[];
  valueName: string;
  setValue: any;
  options: IOption[];
  disabled?: boolean;
  isLoading?: boolean;
  hasSearch?: boolean;
  hasApplyButton?: boolean;
  hasRemoveButton?: boolean;
  hasArrowDownIcon?: boolean;
  onRemove?: (value: string | number) => void;
  limitTags?: number;
  isHideSelectedValue?: boolean;
  isCountrySelect?: boolean;
  sx?: SxProps;
  isUsingAll?: boolean;
}

export default function DropdownSelectMultipleChip({
  label,
  value,
  valueName,
  setValue,
  options,
  disabled = false,
  isLoading = false,
  hasSearch = false,
  hasApplyButton = false,
  isHideSelectedValue = false,
  isCountrySelect = false,
  hasRemoveButton = false,
  hasArrowDownIcon = true,
  onRemove = () => {},
  limitTags = 1,
  sx,
  isUsingAll,
}: DropdownSelectMultipleChipProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [search, setSearch] = useState("");
  const [data, setData] = useState(value);

  const open = Boolean(anchorEl);
  const id = open ? `${label}-popover` : undefined;

  const memoOptions = useMemo(
    () =>
      options
        .filter((option) => {
          return (
            (option.label
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase()) ||
              option.value
                .toString()
                .toLowerCase()
                .includes(search.toLowerCase())) &&
            !option.disabled
          );
        })
        .sort((a: IOption, b: IOption) => {
          const aInValue = value.includes(a.value);
          const bInValue = value.includes(b.value);

          if (aInValue && bInValue) return 0;
          if (aInValue) return -1;
          if (bInValue) return 1;
          return 0;
        }),
    [options, search, value]
  );

  const filteredOptions = useDebounce(memoOptions, 300);

  const handleOpenSelectMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectItem = (newValue: string | number) => {
    setData((prev) => {
      return prev.includes(newValue)
        ? prev.filter((item) => item !== newValue)
        : [...prev, newValue];
    });
  };

  const handleSelectAll = () => {
    setData(
      data.length === options.length
        ? []
        : options.map((option) => option.value)
    );
  };

  const handleClose = () => {
    if (!hasApplyButton) {
      setValue(valueName, data);
      setAnchorEl(null);
    } else {
      setAnchorEl(null);
    }
  };

  useEffect(() => {
    setData(value);
  }, [value]);

  return (
    <>
      <BaseChip
        sx={{ ...sx }}
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

              {(() => {
                if (isLoading) return <CircularProgress size={16} />;
                let selectedValue = value;

                if (isHideSelectedValue) return null;

                selectedValue = value.map((item) => {
                  if (isCountrySelect)
                    return `${
                      options.find((c) => c.value === item)?.label ?? item
                    } (${item})`;
                  return options.find((c) => c.value === item)?.label ?? item;
                });

                if (
                  isUsingAll &&
                  options.length > 1 &&
                  (selectedValue.length === 0 ||
                    selectedValue.length === options.length)
                ) {
                  return (
                    <Typography variant="subtitle2" fontWeight={600}>
                      All
                    </Typography>
                  );
                }

                if (
                  selectedValue.length === options.length &&
                  options.length > 1
                )
                  return (
                    <Tooltip title={selectedValue.join(", ")}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        All
                      </Typography>
                    </Tooltip>
                  );

                if (selectedValue?.length > 1)
                  return (
                    <Tooltip title={selectedValue.join(", ")}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        flexWrap="wrap"
                      >
                        {selectedValue
                          .slice(0, limitTags)
                          .map((item, index) => (
                            <Typography
                              variant="subtitle2"
                              fontWeight={600}
                              key={index}
                            >
                              {`${item}${
                                index ===
                                selectedValue.slice(0, limitTags).length - 1
                                  ? ""
                                  : ","
                              }`}
                              &nbsp;
                            </Typography>
                          ))}
                        {selectedValue.length > limitTags && (
                          <Chip
                            key="limitTags"
                            size="small"
                            label={`+${selectedValue.length - limitTags}`}
                            sx={{ marginLeft: 0.25 }}
                          />
                        )}
                      </Stack>
                    </Tooltip>
                  );

                return (
                  <Typography variant="subtitle2">
                    {selectedValue[0]}
                  </Typography>
                );
              })()}
            </Stack>

            {(hasArrowDownIcon || hasRemoveButton) && (
              <Stack direction="row" alignItems="center" spacing={0.5}>
                {hasArrowDownIcon && (
                  <KeyboardArrowDown fontSize="small" color="action" />
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
              return (
                <Stack
                  height={200}
                  minWidth={200}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </Stack>
              );

            return (
              <List
                sx={{
                  m: 0,
                  p: 0,
                  overflowY: "auto",
                  minWidth: 240,
                  maxHeight: 420,
                }}
              >
                <MenuItem
                  key="all"
                  sx={{
                    ...menuItemStyles,
                    px: 0.5,
                    py: 0.25,
                  }}
                  selected={data.length === options.length}
                  onClick={handleSelectAll}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Checkbox
                      size="small"
                      disableRipple
                      checked={data.length === options.length}
                      indeterminate={
                        data.length > 0 && data.length < options.length
                      }
                    />
                    <Typography
                      variant="body2"
                      fontWeight={data.length === options.length ? 600 : 400}
                    >
                      Select all <br />
                      <Typography component="span" variant="caption">
                        {data?.length} selected
                      </Typography>
                    </Typography>
                  </Stack>
                </MenuItem>

                {filteredOptions.map((option: IOption) => {
                  const isSelected = data.includes(option.value);

                  return (
                    <MenuItem
                      key={option.value}
                      sx={{
                        ...menuItemStyles,
                        px: 0.5,
                        py: 0.25,
                      }}
                      selected={isSelected}
                      onClick={() => handleSelectItem(option.value)}
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Checkbox
                          size="small"
                          checked={isSelected}
                          disableRipple
                        />
                        {option.startIcon}
                        {option.icon}
                        <Typography
                          variant="body2"
                          fontWeight={isSelected ? 600 : 400}
                          pr={1}
                        >
                          {option.label}
                        </Typography>
                        {option.endIcon}
                      </Stack>
                    </MenuItem>
                  );
                })}
              </List>
            );
          })()}

          {hasApplyButton && (
            <Stack direction="row" justifyContent="flex-end">
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  setValue(valueName, data);
                  setAnchorEl(null);
                }}
              >
                Apply
              </Button>
            </Stack>
          )}
        </Stack>
      </Popover>
    </>
  );
}
