import { Card, Stack, Typography, useTheme } from "@mui/material";
import { AwesomeIcon, BadIcon, FineIcon, GoodIcon, NotGoodIcon } from "./icons";

export default function MoodCard() {
  const theme = useTheme();
  const moodList = [
    {
      text: "Tệ",
      icon: <BadIcon sx={{ height: 56, width: 56 }} />,
    },
    {
      text: "Không ổn",
      icon: <NotGoodIcon sx={{ height: 56, width: 56 }} />,
    },
    {
      text: "Ổn",
      icon: <FineIcon sx={{ height: 56, width: 56 }} />,
    },
    {
      text: "Tốt",
      icon: <GoodIcon sx={{ height: 56, width: 56 }} />,
    },
    {
      text: "Tuyệt vời",
      icon: <AwesomeIcon sx={{ height: 56, width: 56 }} />,
    },
  ];

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
      <Stack
        alignItems="center"
        spacing={3}
        sx={{
          backgroundColor: theme.palette.primary[50],
          p: 2,
          borderRadius: 1.5,
          mt: 1.5,
        }}
      >
        <Typography fontWeight="medium">
          Hôm nay bạn cảm thấy thế nào
        </Typography>
        <Stack direction="row" justifyContent="center" spacing={2}>
          {moodList.map((item, index) => (
            <Stack key={index} alignItems="center" spacing={1}>
              {item.icon}
              <Typography variant="body2" textAlign="center">
                {item.text}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}
