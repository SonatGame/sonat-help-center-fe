import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface IProps {
  item: {
    key: string;
    icon?: React.ReactNode;
    title: string;
  };
  isSidebarOpen: boolean;
}
const SideBarItem: React.FC<IProps> = ({ item, isSidebarOpen }) => {
  const theme = useTheme();
  const pathname = usePathname();

  return (
    <ListItem key={item.key} disablePadding sx={{ display: "block" }}>
      <Link href={item.key} style={{ textDecoration: "none" }}>
        <Tooltip title={item.title} placement="right">
          <ListItemButton
            sx={{
              justifyContent: "flex-start",
              borderRadius: theme.shape.borderRadius / 6,
            }}
            selected={pathname.includes(item.key)}
          >
            <Stack gap={0.5} flexDirection="row" alignItems="center">
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                  color: theme.palette.text.secondary,
                }}
              >
                {item?.icon}
              </ListItemIcon>
              <ListItemText
                primary={<b>{item.title}</b>}
                sx={{
                  opacity: isSidebarOpen ? 1 : 0,
                  fontWeight: 700,
                  color: theme.palette.text.secondary,
                }}
              />
            </Stack>
          </ListItemButton>
        </Tooltip>
      </Link>
    </ListItem>
  );
};

export default SideBarItem;
