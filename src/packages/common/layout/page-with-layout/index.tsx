"use client";

import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import PageHeader from "../page-header";
import PageSidebar, { drawerWidth, smallDrawerWidth } from "../page-sidebar";

interface PageWithLayoutProps {
  title?: string;
  children?: React.ReactNode;
}

export default function PageWithLayout(props: PageWithLayoutProps) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box
      height="100vh"
      width={1}
      sx={{
        background: (theme) => theme.palette.background.default,
      }}
    >
      <CssBaseline enableColorScheme />
      <Stack flex={1} width={1} height={1} flexDirection="row">
        <PageSidebar isSidebarOpen={open} />
        <Box
          component="main"
          sx={{
            width: matchesMd
              ? `100%`
              : open
              ? `calc(100% - ${drawerWidth})`
              : `calc(100% - ${smallDrawerWidth})`,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <PageHeader handleDrawer={handleDrawer} isSidebarOpen={open} />
          <Box width={1} sx={{ flexGrow: 1, mt: { xs: 7, sm: 8 } }}>
            {props.children}
          </Box>
          <Typography variant="body2" pb={2} textAlign="center">
            © 2024 Sonat With Love
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
