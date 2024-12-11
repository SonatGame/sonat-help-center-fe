import MenuIcon from "@mui/icons-material/Menu";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { drawerWidth, smallDrawerWidth } from "../page-sidebar";
import { UserProfileButton } from "./components/user-profile";

interface PageHeaderProps {
  handleDrawer?: () => any;
  isSidebarOpen: boolean;
}

export default function PageHeader(props: PageHeaderProps) {
  const theme = useTheme();

  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      sx={{
        position: "fixed",
        top: 0,
        zIndex: (theme) => theme.zIndex.drawer,
        width: matchesMd
          ? `100%`
          : props.isSidebarOpen
          ? `calc(100% - ${drawerWidth})`
          : `calc(100% - ${smallDrawerWidth})`,
        background: (theme) => theme.palette.background.paper,
        transition: "width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
      }}
      elevation={1}
    >
      <Toolbar
        disableGutters={true}
        sx={{
          px: { xs: 2, lg: 3 },
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          maxHeight: 64,
        }}
      >
        <Stack direction="row" alignContent="center" spacing={2}>
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={props.handleDrawer}
            sx={{
              color: (theme) =>
                theme.palette.mode === "dark" ? "white" : "#A5A5A5",
              "&:hover": {
                color: (theme) => theme.palette.primary.main,
                backgroundColor: (theme) => theme.palette.action.hover,
              },
            }}
          >
            <MenuIcon sx={{ fontSize: 24 }} />
          </IconButton>
        </Stack>
        <UserProfileButton />
      </Toolbar>
    </AppBar>
  );
}
