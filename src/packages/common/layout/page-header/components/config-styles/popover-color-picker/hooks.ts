import * as React from "react";
import { ColorPickerProps } from ".";

export default function usePopoverColorPickerHooks({
  initColor,
  index,
  onChangeCallback,
}: ColorPickerProps) {
  const [color, setColor] = React.useState(initColor);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    onChangeCallback(index, color);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const onColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  React.useEffect(() => {
    setColor(initColor);
  }, [initColor]);

  return {
    color,
    anchorEl,
    open,
    handleClick,
    handleClose,
    id,
    onColorChange,
    onInputChange,
  };
}
