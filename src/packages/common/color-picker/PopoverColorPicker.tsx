import { Box, Button, InputBase, Popover, Tooltip } from "@mui/material";
import React from "react";
import { HexColorPicker } from "react-colorful";
import usePopoverColorPickerHooks from "../layout/page-header/components/config-styles/popover-color-picker/hooks";
import styles from "./PopoverColorPicker.module.css";

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
    <Button className={styles.picker} onClick={handleClick}>
      <Box
        className={styles.swatch}
        style={{ backgroundColor: color }}
        sx={{ borderRadius: (theme) => theme.shape.borderRadius }}
      ></Box>
    </Button>
  );

  return (
    <div className={styles.container}>
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
    </div>
  );
};

export default PopoverColorPicker;
