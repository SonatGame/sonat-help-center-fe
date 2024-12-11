import { LocalTheme, ThemeMode } from "@/lib/constants/defaultTheme";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useLocalStorage } from "usehooks-ts";

interface IProps {
  item: {
    key: string;
    icon?: React.ReactNode;
    title: string;
  };
  isSidebarOpen: boolean;
}
const SideBarItem: React.FC<IProps> = ({ item, isSidebarOpen }) => {
  const pathname = usePathname();
  const [modeColor] = useLocalStorage(LocalTheme.ThemeMode, ThemeMode.LIGHT);

  return (
    <ListItem key={item.key} disablePadding sx={{ display: "block" }}>
      <Link href={item.key} style={{ textDecoration: "none" }}>
        <Tooltip title={item.title} placement="right">
          <ListItemButton
            sx={{
              justifyContent: "flex-start",
              borderRadius: (theme) => theme.shape.borderRadius / 6,
            }}
            selected={pathname === item.key}
          >
            <Stack gap={0.5} flexDirection="row" alignItems="center">
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                  color: (theme) =>
                    modeColor === "dark"
                      ? "white"
                      : theme.palette.text.secondary,
                }}
              >
                {item?.icon}
              </ListItemIcon>
              <ListItemText
                primary={<b>{item.title}</b>}
                sx={{
                  opacity: isSidebarOpen ? 1 : 0,
                  fontWeight: 700,
                  color: (theme) =>
                    modeColor === "dark"
                      ? "white"
                      : theme.palette.text.secondary,
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
