import { CourseApi } from "@/api/CourseApi";
import { ClipboardPlusIcon, UploadCloudIcon } from "@/lib/constants/icons";
import { Chapter, Lesson } from "@/lib/types/course";
import { KeyboardArrowRight } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { useCourseDetailContext } from "../../context";
import { getGoogleDocId } from "../../helper";
import useCourseDetail from "../../hook";

interface IProps {
  editingChapter?: Chapter;
  editingLesson?: Lesson;
  handleGoBack: () => void;
  handleOpenUploadDocsModal: () => void;
  googleDocs: {
    title: string;
    url: string;
    htmlContent: string;
  };
}

export default function LessonDetail(props: IProps) {
  const {
    editingChapter,
    editingLesson,
    handleGoBack,
    handleOpenUploadDocsModal,
    googleDocs,
  } = props;
  const { courseData } = useCourseDetail();
  const { mutate: mutateCourse } = useCourseDetailContext();
  const theme = useTheme();
  const [isSaving, setIsSaving] = useState(false);

  const {
    data: lessonData,
    isLoading: isLoadingLesson,
    mutate: mutateLesson,
  } = useSWR(
    ["get-lesson-detail", editingLesson],
    async () => {
      if (!editingLesson) return;
      return await CourseApi.getLessonById(editingLesson?._id);
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
    return googleDocs.htmlContent.length > 0
      ? googleDocs.htmlContent
      : data?.htmlContent ?? "";
  }, [googleDocs, data]);

  async function handleCreateLesson() {
    setIsSaving(true);
    if (!editingChapter && !editingLesson) {
      if (!courseData) return;
      await CourseApi.createChapter(courseData?._id, {
        title: "Chương không có tiêu đề",
        lessons: [
          {
            title: googleDocs.title,
            googleDocUrl: googleDocs.url,
          },
        ],
      });
    } else if (editingLesson)
      await CourseApi.updateLesson(editingLesson._id, {
        title: googleDocs.title,
        googleDocUrl: googleDocs.url,
      });
    else if (editingChapter) {
      await CourseApi.createLesson(editingChapter._id, {
        title: googleDocs.title,
        googleDocUrl: googleDocs.url,
      });
    }
    await mutateCourse();
    await mutateLesson();
    handleGoBack();
    setIsSaving(false);
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
            {editingChapter?.title ?? "Chương không có tiêu đề"}
          </Typography>
          <KeyboardArrowRight sx={{ color: theme.palette.grey[500] }} />
          <Typography variant="body2" color="primary" fontWeight="bold">
            {editingLesson?.title ?? "Bài viết không có tiêu đề"}
          </Typography>
        </Stack>
        <Stack direction="row" gap={1.5}>
          <Button variant="outlined" onClick={handleGoBack} sx={{ width: 96 }}>
            Hủy
          </Button>
          <LoadingButton
            variant="contained"
            sx={{ width: 96 }}
            onClick={handleCreateLesson}
            loading={isSaving}
          >
            Lưu
          </LoadingButton>
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
      <Container sx={{ flexGrow: 1 }}>
        {isLoadingLesson || isLoading ? (
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <CircularProgress />
          </Stack>
        ) : (
          <Box dangerouslySetInnerHTML={{ __html: htmlContent }} />
        )}
      </Container>
    </Stack>
  );
}
