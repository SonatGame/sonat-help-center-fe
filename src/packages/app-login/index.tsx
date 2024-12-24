"use client";

import { Google } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import { useAuthentication } from "@/contexts/authenticationContext";
import Head from "@/lib/common/layout/Head";
import { toast } from "react-toastify";

export default function LoginSection() {
  const { login } = useAuthentication();

  const onSignIn = async () => {
    try {
      if (login !== undefined) await login();
    } catch (error) {
      toast.error("Sign in thất bại");
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
          Chào mừng đến Sonat Help Center
        </Typography>

        <Typography variant="h4" paddingBottom={4}>
          Sản phẩm của team BI
        </Typography>

        <Button variant="contained" onClick={onSignIn} startIcon={<Google />}>
          Đăng nhập bằng Google
        </Button>
      </Stack>
    </Box>
  );
}
