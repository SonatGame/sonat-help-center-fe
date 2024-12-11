import { Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function FullPageLoader() {
  return (
    <Stack
      width={1}
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress />
    </Stack>
  );
}
