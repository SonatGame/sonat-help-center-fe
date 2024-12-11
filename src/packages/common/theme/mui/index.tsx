"use client";

import createCache, { Options } from "@emotion/cache";
import { ThemeProvider } from "@mui/material/styles";
import { useServerInsertedHTML } from "next/navigation";
import { SnackbarProvider } from "notistack";
import React, { createContext, ReactNode } from "react";
import useAppThemeHook from "./hooks";

type ThemeProps = {
  children: ReactNode;
  options: Options;
  theme: any;
};

function ThemeRegistry(props: ThemeProps) {
  const { options, children } = props;
  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return <ThemeProvider theme={props.theme}>{children}</ThemeProvider>;
}

export const ThemeModeContext = createContext({
  markChange: () => {},
});

export default function AppTheme({ children }: { children: React.ReactNode }) {
  const { themeModeController, theme } = useAppThemeHook();

  return (
    <ThemeModeContext.Provider value={themeModeController}>
      <ThemeRegistry options={{ key: "mui" }} theme={theme}>
        <SnackbarProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </SnackbarProvider>
      </ThemeRegistry>
    </ThemeModeContext.Provider>
  );
}
