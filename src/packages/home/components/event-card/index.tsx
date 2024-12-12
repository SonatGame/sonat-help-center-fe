import { Card, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";

export default function EventCard() {
  const theme = useTheme();

  return (
    <Card>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        sx={{ p: 2 }}
      >
        <Typography variant="h6">Những sự kiện gần đây</Typography>
        <Typography
          variant="body2"
          fontWeight="bold"
          color="primary"
          sx={{ cursor: "pointer", userSelect: "none" }}
        >
          Tìm hiểu ngay
        </Typography>
      </Stack>
      <Image
        src={"/assets/img/sample_event.png"}
        alt="event-thumbnail"
        width={420}
        height={326}
      />
    </Card>
  );
}
