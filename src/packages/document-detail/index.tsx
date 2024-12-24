import { ArrowBack } from "@mui/icons-material";
import { Stack, Typography, useTheme } from "@mui/material";

export default function CourseContent() {
  const theme = useTheme();
  // const {} = useDocumentDetail();

  return (
    <Stack direction="row" sx={{ height: "100%" }}>
      <Stack
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRight: 1,
          borderColor: theme.palette.divider,
          minWidth: 350,
        }}
      >
        <Stack gap={1.5} sx={{ p: 3 }}>
          <Stack
            direction="row"
            gap={0.5}
            sx={{
              cursor: "pointer",
              userSelect: "none",
              color: theme.palette.primary.main,
            }}
            onClick={() => {}}
          >
            <ArrowBack fontSize="small" />
            <Typography variant="body2" fontWeight="bold">
              Quay lại
            </Typography>
          </Stack>
          <Typography variant="h6">Nội dung khóa học</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
