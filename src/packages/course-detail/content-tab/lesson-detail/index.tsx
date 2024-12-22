import { Chapter, Lesson } from "@/lib/types/course";
import { ClipboardPlusIcon, UploadCloudIcon } from "@/packages/course/icons";
import { KeyboardArrowRight } from "@mui/icons-material";
import { Button, Divider, Stack, Typography, useTheme } from "@mui/material";

interface IProps {
  edittingChapter?: Chapter;
  edittingLesson?: Lesson;
  handleGoBack: () => void;
  handleOpenUploadDocsModal: () => void;
}

export default function LessonDetail(props: IProps) {
  const {
    edittingChapter,
    edittingLesson,
    handleGoBack,
    handleOpenUploadDocsModal,
  } = props;
  const theme = useTheme();

  return (
    <Stack sx={{ flexGrow: 1 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}
      >
        <Stack direction="row" gap={1.5}>
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{ color: theme.palette.grey[500] }}
          >
            {edittingChapter?.title ?? "Chương không có tiêu đề"}
          </Typography>
          <KeyboardArrowRight sx={{ color: theme.palette.grey[500] }} />
          <Typography variant="body2" color="primary" fontWeight="bold">
            {edittingLesson?.title ?? "Bài viết không có tiêu đề"}
          </Typography>
        </Stack>
        <Stack direction="row" gap={1.5}>
          <Button variant="outlined" onClick={handleGoBack} sx={{ width: 96 }}>
            Hủy
          </Button>
          <Button variant="contained" sx={{ width: 96 }}>
            Lưu
          </Button>
        </Stack>
      </Stack>
      <Stack alignItems="center">
        <Stack
          direction="row"
          gap={3}
          sx={{
            mt: 4,
            p: 1.5,
            border: 1,
            borderColor: theme.palette.grey[200],
            borderRadius: 1,
            color: theme.palette.primary.main,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{ cursor: "pointer", userSelect: "none" }}
            onClick={() => handleOpenUploadDocsModal()}
          >
            <UploadCloudIcon />
            <Typography variant="body2" fontWeight="bold">
              Đăng tải tài liệu Doc
            </Typography>
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            <ClipboardPlusIcon />
            <Typography variant="body2" fontWeight="bold">
              Tạo mini test
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
