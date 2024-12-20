import { Card, Divider, Stack, Typography, useTheme } from "@mui/material";
import ClubItem from "./ClubItem";

export default function ClubCard() {
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
        <Typography variant="h6">Câu lạc bộ</Typography>
        <Typography
          variant="body2"
          fontWeight="bold"
          color="primary"
          sx={{ cursor: "pointer", userSelect: "none" }}
        >
          Tìm hiểu ngay
        </Typography>
      </Stack>
      <Divider />
      <ClubItem name="Câu lạc bộ cầu lông" time="19h30 - 21h00" />
      <ClubItem name="Câu lạc bộ bóng đá" time="19h30 - 21h00" />
      <ClubItem name="Câu lạc bộ yoga" time="19h30 - 21h00" />
    </Card>
  );
}
