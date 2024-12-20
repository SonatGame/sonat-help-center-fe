import { Box, Card, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";

export interface IBookCardProps {
  title: string;
  author: string;
  available: boolean;
  thumbnail: string;
}

export default function BookCard(props: IBookCardProps) {
  const { title, author, available, thumbnail } = props;
  const theme = useTheme();

  function renderStatus() {
    const color = available
      ? theme.palette.primary.main
      : theme.palette.error.main;
    const text = available ? "Có thể mượn" : "Đã mượn hết";

    return (
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ color: color }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: 0.25,
            backgroundColor: color,
          }}
        />
        <Typography variant="caption" fontWeight="bold">
          {text}
        </Typography>
      </Stack>
    );
  }

  return (
    <Card
      sx={{
        height: 178,
        display: "flex",
        cursor: "pointer",
        transition: "transform .2s",
        ":hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Image src={thumbnail} alt="book-thumbnail" width={120} height={178} />
      <Stack justifyContent="center" spacing={1} sx={{ p: 2 }}>
        {renderStatus()}
        <Typography variant="body1" fontWeight="bold" sx={{ mt: 1.5 }}>
          {title}
        </Typography>
        <Typography variant="caption">{author}</Typography>
        {/* <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            color: theme.palette.primary.main,
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <Typography variant="body2" fontWeight="bold">
            Tham gia
          </Typography>
          <ArrowForward />
        </Stack> */}
      </Stack>
    </Card>
  );
}
