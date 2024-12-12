"use client";

import { AuthenticationProvider } from "@/contexts/authenticationContext";
import { AuthorizationProvider } from "@/contexts/authorizationContext";
import AppTheme from "@/packages/common/theme/mui";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Inter } from "next/font/google";
import { SWRConfig } from "swr";
import "../../styles/global.css";

export const inter = Inter({
  preload: true,
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <AuthenticationProvider>
          <AuthorizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <SWRConfig>
                <AppRouterCacheProvider>
                  <AppTheme>{children}</AppTheme>
                </AppRouterCacheProvider>
              </SWRConfig>
            </LocalizationProvider>
          </AuthorizationProvider>
        </AuthenticationProvider>
      </body>
    </html>
  );
}
