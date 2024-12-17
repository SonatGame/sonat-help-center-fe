"use client";

import { Stack, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
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
      minHeight="100vh"
      width={1}
      sx={{
        background: theme.palette.background.default,
        backgroundImage: "url(/assets/img/grid.png)",
      }}
    >
      <Stack flex={1} width={1} height={1} flexDirection="row">
        <PageSidebar isSidebarOpen={open} />

        <Box
          component="main"
          sx={{
            height: "100vh",
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
          <Box width={1} sx={{ flexGrow: 1, pt: { xs: 7, sm: 8 } }}>
            {props.children}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
