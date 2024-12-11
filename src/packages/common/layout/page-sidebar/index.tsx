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

import ComparisonFilled from "@/components/icons/ComparisonFilled";
import MarketingMetricsFilled from "@/components/icons/MarketingMetricsFilled";
import OverviewFilled from "@/components/icons/OverviewFilled";
import ProductMetricsFilled from "@/components/icons/ProductMetricsFilled";
import {
  PermissionProps,
  useAuthorization,
} from "@/contexts/authorizationContext";
import { useCommonData } from "@/contexts/commonDataContext";
import { Assets } from "@/lib/constants/assets";
import { AppRoutes, Permission } from "@/lib/constants/routesAndPermissions";
import { AccessMode } from "@/lib/types/role";
import { canView, isAuth } from "@/lib/utils/auth.helper";
import { LocalStorageUtils } from "@/lib/utils/localStorageUtils";
import {
  DatasetLinked,
  NotificationsActive,
  TrackChanges,
  ViewKanban,
} from "@mui/icons-material";
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
            child:
              item.child && item.child.length > 0
                ? convertItemsWithPermissions(permissions, item.child)
                : undefined,
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
              child:
                item.child && item.child.length > 0
                  ? convertItemsWithPermissions(permissions, item.child)
                  : undefined,
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
  const { permissions } = useAuthorization();
  const recentAppIds = LocalStorageUtils.getRecentApps();
  const { apps: data } = useCommonData();
  const hefProductMetrics = recentAppIds?.[0] ?? (data && data[0]?.appId) ?? "";

  const items: MenuItem[] = [
    {
      requirePermissions: [
        { permission: Permission.SYSTEM_OVERVIEW, checkView: true },
      ],
      key: AppRoutes.HOME,
      icon: <OverviewFilled />,
      title: "Overview",
    },
    {
      requirePermissions: [
        { permission: Permission.APPS, value: AccessMode.Read },
      ],
      key: `${AppRoutes.APPS}${hefProductMetrics}`,
      icon: <ProductMetricsFilled />,
      title: "Product Metrics",
      child: [
        {
          key: `${AppRoutes.APPS}${hefProductMetrics}`,
          title: "App Information",
        },
        {
          requirePermissions: [
            {
              permission: Permission.APP_BUILDS_UPLOADER,
              value: AccessMode.Read,
            },
          ],
          key: `${AppRoutes.UPLOAD_BUILD}`,
          title: "Upload Build",
        },
        {
          requirePermissions: {
            or: [{ permission: Permission.APP_RAWDATA, checkView: true }],
          },
          key: `${AppRoutes.APPS}${hefProductMetrics}${AppRoutes.REPORT}/`,
          title: "Raw Data",
        },
        {
          requirePermissions: [
            { permission: Permission.REVIEWS, value: AccessMode.Read },
          ],
          key: `${AppRoutes.APPS}${AppRoutes.PRODUCT_REVIEWS}/`,
          title: "Customer Reviews",
        },
        {
          requirePermissions: [
            {
              permission: Permission.PRODUCT_LEADBOARD,
              value: AccessMode.Read,
            },
          ],
          key: AppRoutes.LEADERBOARD,
          title: "Product Leaderboard",
        },
        {
          requirePermissions: [
            {
              permission: Permission.APP_EXTRA_FEATURES,
              value: AccessMode.Read,
            },
          ],
          key: `${AppRoutes.APPS}${AppRoutes.MISC}`,
          title: "Misc",
        },
        {
          requirePermissions: [
            { permission: Permission.APP_AB_TESTING, value: AccessMode.Manage },
          ],
          key: AppRoutes.AB_TESTING,
          title: "A/B Testing",
        },
        {
          requirePermissions: [],
          key: AppRoutes.LEADERBOARD_MANAMENT,
          title: "Leaderboard Management",
        },
      ],
    },
    {
      requirePermissions: {
        or: [
          { permission: Permission.CREATIVE_HUB, checkView: true },
          { permission: Permission.UAxMO_REPORT, value: AccessMode.Read },
          { permission: Permission.MKT_UA_CAMPAIGN, value: AccessMode.Read },
          { permission: Permission.MKT_LTV_PREDICTION, value: AccessMode.Read },
          {
            permission: Permission.MktCreativeHubPerformance,
            value: AccessMode.Read,
          },
        ],
      },
      key: AppRoutes.MARKETING_METRICS,
      icon: <MarketingMetricsFilled />,
      title: "Marketing Metrics",
      child: [
        {
          key: "Campaign Management",
          title: "Campaign Management",
          requirePermissions: {
            or: [
              {
                permission: Permission.MKT_UA_CAMPAIGN_UNITY,
                value: AccessMode.Read,
              },
              {
                permission: Permission.MKT_UA_CAMPAIGN,
                value: AccessMode.Read,
              },
              {
                permission: Permission.MKT_UA_CAMPAIGN_GGADWORDS,
                value: AccessMode.Read,
              },
            ],
          },
          child: [
            {
              requirePermissions: [
                {
                  permission: Permission.MKT_UA_CAMPAIGN_UNITY,
                  value: AccessMode.Read,
                },
              ],
              key: `${AppRoutes.MARKETING_METRICS}${AppRoutes.CAMPAIGN_MANAGEMENT}`,
              title: "Unity Campaign",
            },
            {
              requirePermissions: [
                {
                  permission: Permission.MKT_UA_CAMPAIGN,
                  value: AccessMode.Read,
                },
              ],
              key: `${AppRoutes.MARKETING_METRICS}${AppRoutes.NEW_CAMPAIGN_MANAGEMENT}`,
              title: "Campaign Management",
            },
            {
              requirePermissions: [
                {
                  permission: Permission.MKT_UA_CAMPAIGN_GGADWORDS,
                  value: AccessMode.Read,
                },
              ],
              key: `${AppRoutes.MARKETING_METRICS}${AppRoutes.RECOMMENDATION}`,
              title: "Google Ads Recommendation",
            },
          ],
        },
        {
          key: "Report",
          title: "Report",
          requirePermissions: {
            or: [
              { permission: Permission.UAxMO_REPORT, value: AccessMode.Read },
              {
                permission: Permission.MKT_LTV_PREDICTION,
                value: AccessMode.Read,
              },
            ],
          },
          child: [
            {
              requirePermissions: [
                { permission: Permission.UAxMO_REPORT, value: AccessMode.Read },
              ],
              key: `${AppRoutes.MARKETING_METRICS}${AppRoutes.OVERVIEW}`,
              title: "Overview",
            },
            {
              requirePermissions: [
                { permission: Permission.UAxMO_REPORT, value: AccessMode.Read },
              ],
              key: `${AppRoutes.MARKETING_METRICS}${AppRoutes.REPORT}/`,
              title: "UAxMO Report",
            },
            {
              requirePermissions: [
                { permission: Permission.UAxMO_REPORT, value: AccessMode.Read },
              ],
              key: `${AppRoutes.MARKETING_METRICS}${AppRoutes.DAILY_COST_REPORT}/`,
              title: "ANW Report",
            },
            {
              requirePermissions: [
                { permission: Permission.UAxMO_REPORT, value: AccessMode.Read },
              ],
              key: `${AppRoutes.MARKETING_METRICS}${AppRoutes.COHORT_RETENTION}/`,
              title: "Cohort & Retention",
            },
            {
              requirePermissions: {
                or: [
                  {
                    permission: Permission.MKT_LTV_PREDICTION,
                    value: AccessMode.Read,
                  },
                ],
              },
              key: `${AppRoutes.MARKETING_METRICS}${AppRoutes.PREDICTION}`,
              title: "Prediction",
            },
          ],
        },
        {
          key: "Creative",
          title: "Creative",
          requirePermissions: {
            or: [
              {
                permission: Permission.MktCreativeHubPerformance,
                value: AccessMode.Read,
              },
              {
                permission: Permission.MktCreativeHubAssign,
                value: AccessMode.Read,
              },
              {
                permission: Permission.MktCreativeHubUpload,
                value: AccessMode.Read,
              },
            ],
          },
          child: [
            {
              requirePermissions: {
                or: [
                  {
                    permission: Permission.MktCreativeHubAssign,
                    value: AccessMode.Read,
                  },
                  {
                    permission: Permission.MktCreativeHubUpload,
                    value: AccessMode.Read,
                  },
                ],
              },
              key: `${AppRoutes.MARKETING_METRICS}${AppRoutes.CREATIVE_HUB}`,
              title: "Creative Hub",
            },
            {
              requirePermissions: [
                {
                  permission: Permission.MktCreativeHubPerformance,
                  value: AccessMode.Read,
                },
              ],
              key: `${AppRoutes.MARKETING_METRICS}${AppRoutes.CREATIVE_OVERVIEW}`,
              title: "Creative Performance",
            },
          ],
        },
      ],
    },
    {
      icon: <DatasetLinked sx={{ fontSize: 24 }} />,
      requirePermissions: [
        { permission: Permission.CREATIVE_HUB, value: AccessMode.Manage },
      ],
      key: `${AppRoutes.DATA_CONNECTORS}`,
      title: "Data Connectors",
    },
    {
      requirePermissions: [
        { permission: Permission.CUSTOM_DASHBOARD, value: AccessMode.Read },
      ],
      key: AppRoutes.APP_GROUP_METRICS,
      icon: <ComparisonFilled />,
      title: "App Group Metrics",
      child: [
        {
          key: `${AppRoutes.APP_GROUP_METRICS}${AppRoutes.HEALTH_CHECK}`,
          title: "Health Check",
        },
        {
          key: `${AppRoutes.APP_GROUP_METRICS}${AppRoutes.COMPARISON}`,
          title: "Comparison",
        },
        {
          requirePermissions: [
            { permission: Permission.CUSTOM_DASHBOARD, value: AccessMode.Read },
          ],
          key: AppRoutes.CUSTOM_DASHBOARD,
          title: "Custom Dashboard",
        },
      ],
    },
    {
      requirePermissions: [
        { permission: Permission.MKT_NOTIFICATION, value: AccessMode.Read },
      ],
      key: `${AppRoutes.MARKETING_METRICS}${AppRoutes.NOTIFICATION}`,
      title: "Notification",
      icon: <NotificationsActive />,
    },
    {
      requirePermissions: [
        { permission: Permission.MKT_NOTIFICATION, value: AccessMode.Read },
      ],
      key: `${AppRoutes.MARKETING_METRICS}${AppRoutes.OBJECTIVE_PROGRESS}`,
      title: "Objectives Progress",
      icon: <TrackChanges />,
    },
    {
      requirePermissions: [
        {
          permission: Permission.APP_FEATURES_TICKET,
          value: AccessMode.Read,
        },
      ],
      key: AppRoutes.TICKET_MANAGEMENT,
      icon: <ViewKanban />,
      title: "Ticket Management",
    },
  ];
  const menuItems: MenuItem[] = convertItemsWithPermissions(permissions, items);

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
