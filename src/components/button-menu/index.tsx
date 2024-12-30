import {
  Button,
  ButtonProps,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { MouseEvent, ReactNode, useState } from "react";

interface IButtonMenuProps {
  buttonTitle?: ReactNode;
  usingIconButton?: boolean;
  icon?: ReactNode;
  buttonProps?: ButtonProps;
  menuOptions: {
    label: ReactNode;
    onClick: () => void;
  }[];
}

export default function ButtonMenu({
  buttonTitle,
  icon,
  usingIconButton,
  buttonProps,
  menuOptions,
}: IButtonMenuProps) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (
    event: MouseEvent<HTMLLIElement, globalThis.MouseEvent>
  ) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <>
      {!usingIconButton ? (
        <Button onClick={handleClick} {...buttonProps}>
          {buttonTitle}
        </Button>
      ) : (
        <IconButton onClick={handleClick} {...buttonProps}>
          {icon}
        </IconButton>
      )}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiList-root": {
            py: 0,
            border: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        {menuOptions.map((item, index) => (
          <MenuItem
            key={index}
            onClick={(e) => {
              item.onClick();
              handleClose(e);
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
