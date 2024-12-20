import BaseChip from "@/components/BaseChip";
import ModalWrapper from "@/components/modal";
import {
  Add,
  Check,
  Close,
  Delete,
  ExpandLess,
  ExpandMore,
  KeyboardArrowDown,
  Search,
} from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Collapse,
  Divider,
  IconButton,
  List,
  MenuItem,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Empty } from "antd";
import { Fragment, useMemo, useState } from "react";
import { menuItemStyles } from "./constants";
import { findItemPathById, searchTree } from "./helpers";
import { ITreeviewOption } from "./types";

interface IDropdownTreeviewSelectOneChipProps {
  label: string | React.ReactNode;
  value: string;
  valueName: string;
  setValue: any;
  options: ITreeviewOption[];
  onChangeCallback?: (value: string) => void;
  hasArrowDownIcon?: boolean;
  disabled?: boolean;
  hasSearch?: boolean;
  isLoading?: boolean;
  onAddNode?: (parentId: string | null, name: string) => Promise<boolean>;
  onDeleteNode?: (nodeId: string) => Promise<void>;
  sx?: any;
}

export default function DropdownTreeviewSelectOneChip({
  label,
  value,
  valueName,
  setValue,
  options,
  hasArrowDownIcon = true,
  disabled = false,
  hasSearch = false,
  isLoading = false,
  onAddNode = undefined,
  onDeleteNode = undefined,
  onChangeCallback,
  sx,
}: IDropdownTreeviewSelectOneChipProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [parentId, setParentId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [isLoadingAdd, setIsLoadingAdd] = useState(isLoading);
  const [openNodes, setOpenNodes] = useState<{ [key: string]: boolean }>({});

  const open = Boolean(anchorEl);
  const id = open ? `${label}-popover` : undefined;

  const filterredOptions = useMemo(
    () => searchTree(options, search),
    [options, search]
  );

  const handleToggle = (id: string) => {
    setOpenNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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

  const displayLabel = useMemo(() => {
    const path = findItemPathById(options, value, []);
    return path ? path.reverse().join(" - ") : "";
  }, [options, value]);

  const renderAddNode = (ml = 0) => {
    return (
      <Stack ml={ml} pr={1} direction="row" alignItems="center" spacing={0.5}>
        <TextField
          value={name}
          placeholder="Enter new node"
          onChange={(e) => setName(e.target.value)}
          focused
        />

        <IconButton
          size="small"
          disabled={isLoadingAdd}
          onClick={async () => {
            setIsLoadingAdd(true);
            const success = await onAddNode?.(parentId, name);
            if (success) {
              setName("");
              setIsAdding(false);
              setParentId(null);
            }
            setIsLoadingAdd(false);
          }}
        >
          {isLoadingAdd ? (
            <CircularProgress size={16} />
          ) : (
            <Check fontSize="small" color="success" />
          )}
        </IconButton>

        <IconButton
          size="small"
          onClick={() => {
            setIsAdding(false);
            setParentId(null);
            setName("");
          }}
        >
          <Close fontSize="small" color="error" />
        </IconButton>
      </Stack>
    );
  };

  const renderTree = (options: ITreeviewOption[], level = 0) => {
    const hasSelectedChild = (option: ITreeviewOption): boolean => {
      if (option._id === value) return true;
      return option.children.some(hasSelectedChild);
    };

    const reorderedOptions = [...options].sort((a, b) => {
      const aHasSelectedChild = hasSelectedChild(a);
      const bHasSelectedChild = hasSelectedChild(b);
      return aHasSelectedChild ? -1 : bHasSelectedChild ? 1 : 0;
    });

    return reorderedOptions.map((option: ITreeviewOption) => {
      const isSelected = value === option._id;
      const hasChildren = option.children.length > 0;
      const isOpen = openNodes[option._id] || false;

      return (
        <Fragment key={option._id}>
          <MenuItem
            sx={{
              ...menuItemStyles,
              px: 1,
              py: 1,
            }}
            selected={isSelected}
            onClick={() => handleSelectItem(option._id)}
          >
            <Stack
              width={1}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                ml: level * 1.5,
                ...(level && !hasChildren && { ml: level * 3 }),
                ...(!level && { ml: 0 }),
                ...(!level && !hasChildren && { ml: 1.25 }),
              }}
            >
              <Stack direction="row" alignItems="center" gap={0.5}>
                {hasChildren && (
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggle(option._id);
                    }}
                  >
                    {isOpen ? (
                      <ExpandLess fontSize="small" />
                    ) : (
                      <ExpandMore fontSize="small" />
                    )}
                  </IconButton>
                )}

                <Typography variant="body2" fontWeight={isSelected ? 600 : 400}>
                  {option.name}
                </Typography>
              </Stack>

              <Stack direction="row" flexShrink={0}>
                {onAddNode && (
                  <IconButton
                    sx={{ flexShrink: 0 }}
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAdding(true);
                      setParentId(option._id);
                    }}
                  >
                    <Add fontSize="small" />
                  </IconButton>
                )}

                {onDeleteNode && (
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsConfirm(true);
                      setParentId(option._id);
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                )}
              </Stack>
            </Stack>
          </MenuItem>

          {isAdding &&
            parentId === option._id &&
            renderAddNode((level + 1) * 1.5)}

          {hasChildren && (
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              {renderTree(option.children, level + 1)}
            </Collapse>
          )}
        </Fragment>
      );
    });
  };

  return (
    <>
      <BaseChip
        sx={{
          ...sx,
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
                  lineHeight={1.2}
                >
                  {label}
                </Typography>
              ) : (
                label
              )}

              <Typography variant="subtitle2" fontWeight={600} lineHeight={1.2}>
                {displayLabel || "None"}
              </Typography>
            </Stack>

            {hasArrowDownIcon && (
              <KeyboardArrowDown fontSize="small" color="action" />
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
                sx={{
                  m: 0,
                  p: 0,
                  overflowY: "auto",
                  minWidth: 280,
                  maxHeight: 400,
                }}
              >
                {renderTree(filterredOptions)}
              </List>
            );
          })()}

          {onAddNode && (
            <>
              {isAdding && !parentId ? (
                renderAddNode()
              ) : (
                <Button
                  startIcon={<Add />}
                  onClick={() => {
                    setIsAdding(true);
                    setParentId(null);
                  }}
                >
                  Add New Root
                </Button>
              )}
            </>
          )}
        </Stack>
      </Popover>

      <ModalWrapper
        isOpen={isConfirm}
        usingActions
        onApply={async () => {
          await onDeleteNode?.(parentId!);
          setIsConfirm(false);
          setParentId(null);
        }}
        onClose={() => {
          setIsConfirm(false);
          setParentId(null);
        }}
      >
        <Typography>
          Are you sure you want to delete&nbsp;
          <b>{findItemPathById(options, parentId!, [])?.pop()}</b>?
        </Typography>
      </ModalWrapper>
    </>
  );
}
