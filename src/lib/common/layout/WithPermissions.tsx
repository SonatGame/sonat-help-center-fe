"use client";

import FullPageLoader from "@/components/FullPageLoader";
import { PermissionProps } from "@/contexts/authorizationContext";
import { ArrowBackOutlined } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

interface WithPermissionsProps {
  requiredPermissions?: PermissionProps[];
  children?: React.ReactNode;
  redirectWithoutPermission?: string;
  checkView?: boolean;
}

export default function WithPermissions(props: WithPermissionsProps) {
  const router = useRouter();
  // const { permissions, isLoading } = useAuthorization();

  const onGoBack = () => {
    router.back();
  };

  const checkPermissions = () => {
    // if (!props.checkView) {
    //   if (props.requiredPermissions && props.requiredPermissions.length > 0) {
    //     return isAuth(permissions, props.requiredPermissions);
    //   }
    //   return true;
    // }

    // if (props.requiredPermissions && props.requiredPermissions.length > 0) {
    //   for (const requiredPermission of props.requiredPermissions) {
    //     if (!canView(permissions, requiredPermission.permission)) {
    //       return false;
    //     }
    //   }
    //   return true;
    // }

    return true;
  };

  // if (isLoading) return <FullPageLoader />;

  if (checkPermissions()) return <Fragment>{props.children}</Fragment>;

  if (props.redirectWithoutPermission) {
    router.push(props.redirectWithoutPermission);
    return <FullPageLoader />;
  }

  return (
    <Stack
      sx={{ width: "100%", minHeight: "100vh" }}
      alignItems="center"
      justifyContent="center"
      spacing={3}
    >
      <Typography variant="h1">Oops</Typography>

      <Stack spacing={1.5} alignItems="center" justifyContent="center">
        <Typography variant="h5">
          You do not have access to this page.
        </Typography>
        <Typography variant="body1">
          Please contact admin or someone else for this problem.
        </Typography>
      </Stack>

      <Button
        variant="contained"
        startIcon={<ArrowBackOutlined fontSize="small" />}
        onClick={onGoBack}
      >
        Go back
      </Button>
    </Stack>
  );
}
