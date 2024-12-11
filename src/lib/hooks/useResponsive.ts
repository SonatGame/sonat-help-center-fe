// @mui
import { Breakpoint, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function useResponsive(
  query: number | Breakpoint,
  key: Breakpoint,
  start: number | Breakpoint = "xs",
  end: number | Breakpoint = "xl"
) {
  const theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(key));

  const mediaDown = useMediaQuery(theme.breakpoints.down(key));

  const mediaBetween = useMediaQuery(theme.breakpoints.between(start, end));

  const mediaOnly = useMediaQuery(theme.breakpoints.only(key));

  if (query === ("up" as Breakpoint)) {
    return mediaUp;
  }

  if (query === ("down" as Breakpoint)) {
    return mediaDown;
  }

  if (query === ("between" as Breakpoint)) {
    return mediaBetween;
  }

  if (query === ("only" as Breakpoint)) {
    return mediaOnly;
  }

  return null;
}
