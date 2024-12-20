"use client";

import FullPageLoader from "@/components/FullPageLoader";
import { useAuthentication } from "@/contexts/authenticationContext";
import { AppRoutes } from "@/lib/constants/routesAndPermissions";
import { ArrowForward } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

interface WithLoginProps {
  children?: React.ReactNode;
}

export default function WithLogin(props: WithLoginProps) {
  const { isAuthenticated, isLoading } = useAuthentication();
  const router = useRouter();

  const onClick = () => {
    router.push(AppRoutes.INDEX);
  };

  if (isLoading) return <FullPageLoader />;

  if (isAuthenticated) return <>{props.children}</>;

  return (
    <Stack
      sx={{ width: "100%", minHeight: "100vh" }}
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h4" paddingBottom={4}>
        You are not authenticated.
      </Typography>

      <Button variant="contained" endIcon={<ArrowForward />} onClick={onClick}>
        Login page
      </Button>
    </Stack>
  );
}
