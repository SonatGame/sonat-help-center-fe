import { CourseApi } from "@/api/CourseApi";
import { Chapter, Lesson } from "@/lib/types/course";
import { ClipboardPlusIcon, UploadCloudIcon } from "@/packages/course/icons";
import { KeyboardArrowRight } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useMemo } from "react";
import useSWR from "swr";
import { useCourseDetailContext } from "../../context";
import { getGoogleDocId } from "../../helper";
import useCourseDetail from "../../hook";

interface IProps {
  edittingChapter?: Chapter;
  edittingLesson?: Lesson;
  handleGoBack: () => void;
  handleOpenUploadDocsModal: () => void;
  googleDocsUrl: string;
  googleDocsContent: string;
}

export default function LessonDetail(props: IProps) {
  const {
    edittingChapter,
    edittingLesson,
    handleGoBack,
    handleOpenUploadDocsModal,
    googleDocsUrl,
    googleDocsContent,
  } = props;
  const { courseData } = useCourseDetail();
  const { mutate: mutateCourse, setIsAddingLesson } = useCourseDetailContext();
  const theme = useTheme();

  const {
    data: lessonData,
    isLoading: isLoadingLesson,
    mutate: mutateLesson,
  } = useSWR(
    ["get-lesson-detail", edittingLesson],
    async () => {
      if (!edittingLesson) return;
      return await CourseApi.getLessonById(edittingLesson?._id);
    },
    {
      refreshInterval: 0,
    }
  );

  const { data, isLoading } = useSWR(
    ["get-html-content", lessonData],
    () => {
      if (!lessonData) return;
      const googleDocsId = getGoogleDocId(lessonData?.googleDocUrl);
      if (!googleDocsId) return;
      return CourseApi.getHTMLContent(googleDocsId);
    },
    {
      refreshInterval: 0,
    }
  );
  const htmlContent = useMemo(() => {
    return googleDocsContent ?? data;
  }, [googleDocsContent, data]);

  async function handleCreateLesson() {
    if (!edittingChapter && !edittingLesson) {
      if (!courseData) return;
      await CourseApi.createChapter(courseData?._id, {
        title: "Chương không có tiêu đề",
        lessons: [
          {
            title: "Bài viết không có tiêu đề",
            googleDocUrl: googleDocsUrl,
            detail: "Test",
          },
        ],
      });
    } else if (edittingChapter) {
      await CourseApi.createLesson(edittingChapter._id, {
        title: "Bài viết không có tiêu đề",
        detail: "Test",
        googleDocUrl: googleDocsUrl,
      });
    } else if (edittingLesson)
      await CourseApi.updateLesson(edittingLesson._id, {
        googleDocUrl: googleDocsUrl,
      });
    await mutateCourse();
    await mutateLesson();
  }

  return (
    <Stack gap={4} sx={{ flexGrow: 1 }}>
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
          <Button
            variant="contained"
            sx={{ width: 96 }}
            onClick={handleCreateLesson}
          >
            Lưu
          </Button>
        </Stack>
      </Stack>
      <Stack alignItems="center">
        <Stack
          direction="row"
          gap={3}
          sx={{
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
      <Container>
        <Box dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </Container>
    </Stack>
  );
}
