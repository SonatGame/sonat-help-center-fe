import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import PopupState, { bindHover, bindPopover } from "material-ui-popup-state";
import HoverPopover from "material-ui-popup-state/HoverPopover";
import { usePathname } from "next/navigation";
import React from "react";
import { ChildItems } from "./ChildItem";

interface Item {
  key: string;
  icon?: React.ReactNode;
  title: string;
  child?: Item[];
}
interface IProps {
  item: Item;
  isSidebarOpen: boolean;
}

const SidebarCollapse: React.FC<IProps> = ({ item, isSidebarOpen }) => {
  const pathname = usePathname();

  return (
    <PopupState variant="popover" popupId={`popup-popover-${item.title}`}>
      {(popupState) => (
        <ListItem
          disablePadding
          sx={{ display: "block" }}
          {...bindHover(popupState)}
        >
          <ListItemButton
            sx={{
              justifyContent: "initial",
              borderRadius: (theme) => theme.shape.borderRadius / 6,
            }}
          >
            <Stack flexDirection="row" alignItems="center" gap={0.5}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? "white"
                      : theme.palette.text.secondary,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={<b>{item.title}</b>}
                sx={{
                  opacity: isSidebarOpen ? 1 : 0,
                  fontWeight: 600,
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? "white"
                      : theme.palette.text.secondary,
                }}
              />
            </Stack>
          </ListItemButton>
          {!isSidebarOpen && (
            <HoverPopover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{
                transform: "translate(12px,15px)",
                zIndex: 1200,
                borderRadius: "0px",
                border: 0,
                height: "100vh",
                maxHeight: "100vh !important",
                "& .MuiPaper-root": {
                  height: "100vh",
                  maxHeight: "100vh !important",
                  borderRadius: "0px",
                  // border: 0,
                  overflowY: "hidden",
                  boxShadow: "none",
                },
              }}
            >
              <List
                sx={{
                  minWidth: 300,
                  py: 4.5,
                  px: 2,
                  overflowY: "auto",
                  height: "100vh",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    px: 1,
                    cursor: "context-menu",
                    borderBottomWidth: 1,
                    mb: 1,
                  }}
                >
                  {item.title}
                </Typography>
                <ChildItems pathname={pathname} item={item.child} />
              </List>
            </HoverPopover>
          )}
          {isSidebarOpen && (
            <Collapse in={true} timeout="auto">
              <List sx={{ pl: 6 }}>
                <ChildItems pathname={pathname} item={item.child} />
              </List>
            </Collapse>
          )}
        </ListItem>
      )}
    </PopupState>
  );
};

export default SidebarCollapse;
