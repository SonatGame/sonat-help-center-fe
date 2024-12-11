import { PermissionProps } from "@/contexts/authorizationContext";
import { Assets } from "@/lib/constants/assets";
import { AppRoutes } from "@/lib/constants/routesAndPermissions";
import { canView, isAuth } from "@/lib/utils/auth.helper";
import { HomeRounded } from "@mui/icons-material";
import {
  Box,
  CSSObject,
  List,
  Stack,
  Theme,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import Image from "next/image";
import SidebarCollapse from "./sidebar-collapse";
import SideBarItem from "./sidebar-item";

interface PageSidebarProps {
  isSidebarOpen: boolean;
}

export interface MenuItem {
  requirePermissions?: any;
  key: string;
  title: string;
  icon?: React.ReactElement;
  child?: MenuItem[];
}

export function convertItemsWithPermissions(
  permissions: PermissionProps[],
  items: MenuItem[]
): MenuItem[] {
  const menuItems: MenuItem[] = [];
  for (const item of items) {
    if (item.requirePermissions) {
      if (Array.isArray(item.requirePermissions)) {
        const check = item.requirePermissions.every((p) => {
          if (p.checkView) return canView(permissions, p.permission);
          else return isAuth(permissions, [p]);
        });
        if (check) {
          menuItems.push({
            key: item.key,
            title: item.title,
            icon: item.icon,
            // child:
            //   item.child && item.child.length > 0
            //     ? convertItemsWithPermissions(permissions, item.child)
            //     : undefined,
          });
        }
      } else {
        if (Array.isArray(item.requirePermissions.or)) {
          const check = item.requirePermissions.or.some((p: any) => {
            if (p.checkView) return canView(permissions, p.permission);
            else return isAuth(permissions, [p]);
          });
          if (check) {
            menuItems.push({
              key: item.key,
              title: item.title,
              icon: item.icon,
              // child:
              //   item.child && item.child.length > 0
              //     ? convertItemsWithPermissions(permissions, item.child)
              //     : undefined,
            });
          }
        }
      }
    } else {
      menuItems.push(item);
    }
  }

  return menuItems;
}

export const drawerWidth = "20rem";
export const smallDrawerWidth = "5rem";

const openedMixin = (theme: Theme, mediaQuery: boolean): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme, mediaQuery: boolean): CSSObject => {
  return {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: mediaQuery ? 0 : smallDrawerWidth,
  };
};

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme, matches),
      "& .MuiDrawer-paper": openedMixin(theme, matches),
    }),
    ...(!open && {
      ...closedMixin(theme, matches),
      "& .MuiDrawer-paper": closedMixin(theme, matches),
    }),
  };
});

export default function PageSidebar(props: PageSidebarProps) {
  // const { permissions } = useAuthorization();

  const items: MenuItem[] = [
    {
      // requirePermissions: [
      //   { permission: Permission.SYSTEM_OVERVIEW, checkView: true },
      // ],
      key: AppRoutes.HOME,
      icon: <HomeRounded />,
      title: "Home",
    },
  ];
  // const menuItems: MenuItem[] = convertItemsWithPermissions(permissions, items);
  const menuItems: MenuItem[] = convertItemsWithPermissions([], items);

  return (
    <>
      <Drawer variant="permanent" open={props.isSidebarOpen}>
        <Box sx={{ px: 1.5, py: 3.5, width: "100%" }}>
          <Stack
            spacing={2}
            alignItems="center"
            direction="row"
            justifyContent="center"
          >
            <Image
              src={Assets.LOGO}
              width={50}
              height={50}
              alt="LOGO"
              style={{ marginTop: 0 }}
            />
            {props.isSidebarOpen && (
              <Box sx={{ height: "100%" }}>
                <Typography fontWeight={600} sx={{ fontSize: "1.25rem" }}>
                  BI System
                </Typography>
              </Box>
            )}
          </Stack>
          <List
            sx={{
              py: 2,
              "&& .Mui-selected, && .Mui-selected:hover": {
                bgcolor: (theme) => theme.palette.primary.main,
                color: "#fff",
                "&, & .MuiListItemIcon-root": {
                  color: "#fff",
                },
                "&, & .MuiListItemText-root": {
                  color: "#fff",
                },
                fontWeight: 700,
              },

              "& .MuiListItemButton-root:hover": {
                bgcolor: (theme) => theme.palette.action.hover,
                color: (theme) => theme.palette.primary.main,
                "&, & .MuiListItemIcon-root": {
                  color: (theme) => theme.palette.primary.main,
                },
                "&, & .MuiListItemText-root": {
                  color: (theme) => theme.palette.primary.main,
                },
                fontWeight: 600,
              },
              "&. MuiPaper-root": {
                height: "100vh",
                maxHeight: "100vh !important",
                borderRadius: "0px",
              },
            }}
          >
            {menuItems.map((item) =>
              item?.child ? (
                <SidebarCollapse
                  item={item}
                  key={item.key}
                  isSidebarOpen={props.isSidebarOpen}
                />
              ) : (
                <SideBarItem
                  item={item}
                  isSidebarOpen={props.isSidebarOpen}
                  key={item.key}
                />
              )
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
