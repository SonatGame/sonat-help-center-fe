import MyAppsFilled from "@/components/icons/MyAppsFilled";
import { useCommonData } from "@/contexts/commonDataContext";
import { AppRoutes } from "@/lib/constants/routesAndPermissions";
import usePermission from "@/lib/hooks/usePermission";
import { LocalStorageUtils } from "@/lib/utils/localStorageUtils";
import { Checklist, HomeRounded } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  Divider,
  Stack,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { drawerWidth, smallDrawerWidth } from "../page-sidebar";
import ConfigStylesModal from "./components/config-styles";
import { UserProfileButton } from "./components/user-profile";

interface PageHeaderProps {
  handleDrawer?: () => any;
  isSidebarOpen: boolean;
}

export default function PageHeader(props: PageHeaderProps) {
  const recentAppIds = LocalStorageUtils.getRecentApps();
  const { apps: data } = useCommonData();
  const { hasReleaseNoteReadPermission } = usePermission();

  const hrefProductMetrics =
    recentAppIds?.[0] ?? (data && data[0]?.appId) ?? "";
  const HAVEHOME_ROUTES = [
    `${AppRoutes.MARKETING_METRICS}${AppRoutes.CREATIVE_OVERVIEW}`,
    `${AppRoutes.MARKETING_METRICS}${AppRoutes.CREATIVE_GALLERY}`,
    `${AppRoutes.APPS}${AppRoutes.PRODUCT_REVIEWS}/`,
    `${AppRoutes.APPS}${AppRoutes.PRODUCT_REVIEWS}/management/`,
    `${AppRoutes.APPS}${AppRoutes.PRODUCT_REVIEWS}/${hrefProductMetrics}/`,
    `${AppRoutes.APPS}${AppRoutes.PRODUCT_REVIEWS}/${hrefProductMetrics}/rating/`,
    `${AppRoutes.APPS}${AppRoutes.PRODUCT_REVIEWS}/${hrefProductMetrics}/review/`,
    `${AppRoutes.APPS}${AppRoutes.PRODUCT_REVIEWS}/${hrefProductMetrics}/review-analysis/`,
    `${AppRoutes.APPS}${AppRoutes.PRODUCT_REVIEWS}/${hrefProductMetrics}/test-feedback/`,
    `${AppRoutes.APPS}${AppRoutes.PRODUCT_REVIEWS}/${hrefProductMetrics}/support/email`,
    `${AppRoutes.APPS}${AppRoutes.PRODUCT_REVIEWS}/${hrefProductMetrics}/support/troubleshoot`,
    `${AppRoutes.APPS}${AppRoutes.PRODUCT_REVIEWS}/issue-management/`,
    `${AppRoutes.APPS}${AppRoutes.PRODUCT_REVIEWS}/dashboard/`,
    `${AppRoutes.APPS}${AppRoutes.PRODUCT_REVIEWS}/notification/`,
  ];
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const path = usePathname();

  const isDisplayHomeButton = useMemo(() => {
    if (HAVEHOME_ROUTES.includes(path)) return true;
    return false;
  }, [path]);

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

          {isDisplayHomeButton && (
            <Link href={AppRoutes.HOME} style={{ textDecoration: "none" }}>
              <Tooltip title="Home" placement="bottom">
                <IconButton
                  edge="start"
                  aria-label="menu"
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === "dark" ? "white" : "#A5A5A5",
                    "&:hover": {
                      color: (theme) => theme.palette.primary.main,
                      backgroundColor: (theme) => theme.palette.action.hover,
                    },
                  }}
                >
                  <HomeRounded sx={{ fontSize: 24 }} />
                </IconButton>
              </Tooltip>
            </Link>
          )}
        </Stack>

        <Stack
          direction="row"
          justifyContent={{ xs: "center", md: "space-between" }}
          alignItems="center"
          gap={2}
        >
          <Stack direction="row" alignItems="center">
            {isXsScreen ? (
              <Stack direction="row" spacing={1}>
                {hasReleaseNoteReadPermission && (
                  <Link href={AppRoutes.REALEASE_NOTE}>
                    <IconButton>
                      <Checklist
                        sx={{ color: (theme) => theme.palette.text.secondary }}
                      />
                    </IconButton>
                  </Link>
                )}
                <Link href={AppRoutes.APPS}>
                  <IconButton>
                    <MyAppsFilled
                      sx={{ color: (theme) => theme.palette.text.secondary }}
                    />
                  </IconButton>
                </Link>
              </Stack>
            ) : (
              <Stack direction="row">
                {hasReleaseNoteReadPermission && (
                  <Link href={AppRoutes.REALEASE_NOTE}>
                    <Button startIcon={<Checklist />}>Release note</Button>
                  </Link>
                )}
                <Link href={AppRoutes.APPS}>
                  <Button startIcon={<MyAppsFilled />}>My apps</Button>
                </Link>
              </Stack>
            )}

            <ConfigStylesModal />
          </Stack>

          <Divider
            orientation="vertical"
            sx={{
              height: 40,
              strokeWidth: 1,
            }}
          />

          <UserProfileButton />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
