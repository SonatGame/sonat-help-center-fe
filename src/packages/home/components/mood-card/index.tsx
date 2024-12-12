import { Box, Card, Stack, Typography, useTheme } from "@mui/material";

export default function MoodCard() {
  const theme = useTheme();

  return (
    <Card sx={{ p: 2 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Typography variant="h6">Nhật ký tâm trạng</Typography>
        <Typography
          variant="body2"
          fontWeight="bold"
          color="primary"
          sx={{ cursor: "pointer", userSelect: "none" }}
        >
          Tìm hiểu ngay
        </Typography>
      </Stack>
      <Box sx={{ backgroundColor: theme.palette.primary[100] }}>
        <Stack justifyContent="center" alignItems="center" spacing={3}>
          <Stack direction="row"></Stack>
        </Stack>
      </Box>
    </Card>
  );
}
