import { useAuthentication } from "@/contexts/authenticationContext";
import { Logout } from "@mui/icons-material";
import {
  Avatar,
  Box,
  MenuItem,
  Popover,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { menuItemStyles } from "@/components/dropdown/new/constants";
// import usePermission from "@/lib/hooks/usePermission";
import { LocalStorageUtils } from "@/lib/utils/localStorageUtils";

function getItem(
  label: string,
  key: React.Key,
  icon: React.ReactNode,
  callbackFn: () => any
) {
  return {
    label,
    key,
    icon,
    callbackFn,
  };
}

export const UserProfileButton = () => {
  const router = useRouter();
  const { logout } = useAuthentication();

  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    if (logout) await logout();
    enqueueSnackbar("Sign out successfully", { variant: "success" });
  };

  // const handleManageUser = () => {
  //   router.push(AppRoutes.USER_MANAGEMENT);
  // };

  // const handleManageAppCategories = () => {
  //   router.push(AppRoutes.APP_MANAGEMENT);
  // };

  // const handleManageSystem = () => {
  //   router.push(AppRoutes.SYSTEM_MANAGEMENT);
  // };

  const menuItems = [
    // ...(hasUsersManagementPermission
    //   ? [
    //       getItem(
    //         "Manage users",
    //         "Manage users",
    //         <AdminPanelSettings />,
    //         handleManageUser
    //       ),
    //     ]
    //   : []),
    // ...(hasViewAppsManagementPermission
    //   ? [
    //       getItem(
    //         "Manage apps",
    //         "Manage apps",
    //         <AppRegistrationOutlined />,
    //         handleManageAppCategories
    //       ),
    //     ]
    //   : []),
    // ...(hasSystemManagementPermission
    //   ? [
    //       getItem(
    //         "Manage system",
    //         "Manage system",
    //         <DisplaySettings />,
    //         handleManageSystem
    //       ),
    //     ]
    //   : []),
    getItem("Sign out", "Sign out", <Logout />, handleSignOut),
  ].filter(Boolean);

  useEffect(() => {
    const myPhotoURL = LocalStorageUtils.getPhotoUrl();
    const myEmail = LocalStorageUtils.getEmail();
    const myName = LocalStorageUtils.getDisplayName();

    if (myPhotoURL) setPhotoURL(myPhotoURL);
    if (myEmail) setEmail(myEmail);
    if (myName) setName(myName.replace(/^"(.+(?="$))"$/, "$1"));
  }, []);

  return (
    <Box>
      <Tooltip
        title={
          <Stack direction="column">
            <Typography variant="subtitle1">{name}</Typography>
            <Typography variant="caption">{email}</Typography>
          </Stack>
        }
        placement="bottom-end"
      >
        <Box onClick={handleMenu}>
          <Stack
            gap={1.5}
            direction="row"
            alignItems="center"
            sx={{ cursor: "pointer" }}
          >
            <Avatar
              src={photoURL}
              sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                width: 32,
                height: 32,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                color: (theme) => theme.palette.text.primary,
                display: { xs: "none", md: "contents" },
              }}
            >
              {name}
            </Typography>
          </Stack>
        </Box>
      </Tooltip>

      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: -5,
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Stack p={2} spacing={1}>
          <Typography variant="caption" sx={{ px: 2 }}>
            This account is managed by Sonat.vn
          </Typography>

          <Stack direction="row" spacing={1} p={1}>
            <Avatar src={photoURL} sx={{ width: 64, height: 64 }} />
            <Stack direction="column" justifyContent="center" spacing={0}>
              <Typography sx={{ fontWeight: 500 }}>{name}</Typography>
              <Typography variant="caption">{email}</Typography>
            </Stack>
          </Stack>

          {menuItems.map((item) => {
            return (
              <MenuItem
                key={item.key}
                sx={{ ...menuItemStyles, px: 1.5, py: 1, border: "none" }}
                onClick={item.callbackFn}
              >
                <Stack direction="row" spacing={3} alignItems="center">
                  {item.icon}
                  <Typography>{item.label}</Typography>
                </Stack>
              </MenuItem>
            );
          })}
        </Stack>
      </Popover>
    </Box>
  );
};
