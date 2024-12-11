import { Box, Button, InputBase, Popover, Tooltip } from "@mui/material";
import React from "react";
import { HexColorPicker } from "react-colorful";
import usePopoverColorPickerHooks from "./hooks";

export interface ColorPickerProps {
  initColor: string;
  index: number;
  onChangeCallback: (index: number, newColor: string) => void;
  hasLabel?: boolean;
}

const labelList = [
  "Primary",
  "Hover",
  "Background",
  "Background paper",
  "Text primary",
  "Text secondary",
];

const PopoverColorPicker: React.FC<ColorPickerProps> = ({
  initColor,
  index,
  onChangeCallback,
  hasLabel,
}) => {
  const {
    color,
    anchorEl,
    open,
    handleClick,
    handleClose,
    id,
    onColorChange,
    onInputChange,
  } = usePopoverColorPickerHooks({
    initColor,
    index,
    onChangeCallback,
  });

  const ColorButton = (
    <Button
      sx={{ position: "relative", width: 1, height: 1 }}
      onClick={handleClick}
    >
      <Box
        sx={{
          width: 1,
          height: 1,
          border: "3px solid #fff",
          boxShadow: `0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.1)`,
          backgroundColor: color,
          borderRadius: (theme) => theme.shape.borderRadius,
          cursor: "pointer",
        }}
      ></Box>
    </Button>
  );

  return (
    <Box width={1} height={32}>
      {hasLabel ? (
        <Tooltip title={labelList[index]}>{ColorButton}</Tooltip>
      ) : (
        <>{ColorButton}</>
      )}

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <>
          <HexColorPicker
            color={color}
            onChange={onColorChange}
            style={{ width: "100%" }}
          />

          <InputBase
            sx={{ ml: 1, flex: 1 }}
            inputProps={{
              "aria-label": "color",
            }}
            value={color}
            onChange={onInputChange}
          />
        </>
      </Popover>
    </Box>
  );
};

export default PopoverColorPicker;
