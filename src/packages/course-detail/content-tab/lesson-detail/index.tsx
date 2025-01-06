import { CourseApi } from "@/api/CourseApi";
import { ClipboardPlusIcon, EditIcon } from "@/lib/constants/icons";
import { KeyboardArrowRight } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useMemo, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import useSWR from "swr";
import { useCourseDetailContext } from "../../context";
import { getGoogleDocId } from "../../helper";
import useCourseDetail from "../../hooks";
import "./styles.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface IProps {
  handleGoBack: () => void;
}

export default function LessonDetail(props: IProps) {
  const { handleGoBack } = props;
  const theme = useTheme();
  const { courseData } = useCourseDetail();
  const {
    mutate: mutateCourse,
    editingChapter,
    editingLesson,
    googleDocs,
    setGoogleDocs,
    setShowModalCreate,
  } = useCourseDetailContext();
  const [isSaving, setIsSaving] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);

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
      revalidateOnFocus: false,
      onSuccess: (data) => {
        if (!data) return;
        setGoogleDocs({ ...googleDocs, url: data.googleDocUrl });
      },
    }
  );

  const { data, isLoading } = useSWR(
    ["get-pdf-file", lessonData?._id],
    async () => {
      if (!lessonData) return;
      const googleDocsId = getGoogleDocId(lessonData?.googleDocUrl);
      if (!googleDocsId) return;

      const pdfBlob = await CourseApi.getPDFFile(googleDocsId);
      return URL.createObjectURL(pdfBlob);
    },
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
    }
  );

  const pdfUrl = useMemo(() => {
    return googleDocs.pdf.length > 0 ? googleDocs.pdf : data ?? "";
  }, [googleDocs, data]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

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
      <Stack alignItems="center" sx={{ mt: 4 }}>
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
            onClick={() => setShowModalCreate(true)}
          >
            <EditIcon sx={{ fill: theme.palette.primary.main }} />
            <Typography variant="body2" fontWeight="bold">
              {!editingLesson ? "Đăng tải tài liệu docs" : "Chỉnh sửa bài học"}
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
      <Container maxWidth="md" sx={{ flexGrow: 1 }}>
        {isLoadingLesson || isLoading ? (
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <CircularProgress />
          </Stack>
        ) : pdfUrl.length > 0 ? (
          <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
            {numPages &&
              Array.from({ length: numPages }, (_, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  renderMode="canvas"
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  width={900}
                />
              ))}
          </Document>
        ) : (
          <></>
        )}
      </Container>
    </Stack>
  );
}
