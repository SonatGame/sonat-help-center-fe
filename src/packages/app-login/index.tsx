"use client";

import { Google } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import { useAuthentication } from "@/contexts/authenticationContext";
import Head from "@/packages/common/layout/Head";
import { enqueueSnackbar } from "notistack";

export default function LoginSection() {
  const { login } = useAuthentication();

  const onSignIn = async () => {
    try {
      if (login !== undefined) await login();
    } catch (error) {
      enqueueSnackbar("Sign in failed", { variant: "error" });
    }
  };

  return (
    <Box width={1} height="100vh">
      <Head title="Login" />
      <Stack
        component="main"
        width={1}
        height={1}
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h2" paddingBottom={4}>
          Welcome to Sonat Help Center
        </Typography>

        <Typography variant="h4" paddingBottom={4}>
          Made with love from Sonat BI team
        </Typography>

        <Button variant="contained" onClick={onSignIn} startIcon={<Google />}>
          Sign in with Google
        </Button>
      </Stack>
    </Box>
  );
}
