import TextMaxLine from "@/components/TextMaxLine";
import { AddRounded, ArrowForwardRounded } from "@mui/icons-material";
import { Box, Card, Stack, Typography, useTheme } from "@mui/material";

interface IProps {
  title?: string;
  content?: string;
  isEmpty?: boolean;
}

export default function LessonCard(props: IProps) {
  const theme = useTheme();
  const { isEmpty = false, title, content } = props;

  if (isEmpty)
    return (
      <Card
        sx={{
          borderRadius: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: theme.palette.primary.main,
          cursor: "pointer",
          userSelect: "none",
          height: 170,
          boxShadow: 0,
          border: 1,
          borderColor: theme.palette.divider,
        }}
      >
        <AddRounded fontSize="small" />
        <Typography variant="body2">Thêm bài học mới</Typography>
      </Card>
    );

  return (
    <Card
      sx={{
        cursor: "pointer",
        userSelect: "none",
        height: 170,
        boxShadow: 0,
        border: 1,
        borderColor: theme.palette.divider,
        p: 2,
      }}
    >
      <Stack justifyContent="space-between" sx={{ height: "100%" }}>
        <Box>
          <TextMaxLine
            TypographyProps={{ fontWeight: "bold" }}
            sx={{
              color: theme.palette.grey[700],
            }}
          >
            {title}
          </TextMaxLine>
          <TextMaxLine
            TypographyProps={{ variant: "body2" }}
            sx={{
              color: theme.palette.grey[500],
              wordBreak: "break-word",
            }}
          >
            {content}
          </TextMaxLine>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          sx={{ color: theme.palette.primary.main }}
        >
          <Typography variant="body2">Học ngay</Typography>
          <ArrowForwardRounded fontSize="small" />
        </Stack>
      </Stack>
    </Card>
  );
}
