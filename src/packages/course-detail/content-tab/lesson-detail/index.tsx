import { CourseApi } from "@/api/CourseApi";
import { ClipboardPlusIcon, EditIcon } from "@/lib/constants/icons";
import { KeyboardArrowRight } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useMemo, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import useSWR from "swr";
import { useCourseDetailContext } from "../../context";
import { getGoogleDocId } from "../../helper";
import "./styles.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function LessonDetail() {
  const theme = useTheme();
  const {
    editingChapter,
    editingLesson,
    setLessonData,
    lessonData,
    setShowModalCreate,
  } = useCourseDetailContext();
  const [numPages, setNumPages] = useState<number | null>(null);

  const { data: pdfData, isLoading: loadingPdf } = useSWR(
    ["get-pdf-file", editingLesson],
    async () => {
      if (!editingLesson) return;
      const lessonDetail = await CourseApi.getLessonById(editingLesson._id);
      setLessonData({
        title: lessonDetail.title,
        description: lessonDetail.description,
        url: lessonDetail.googleDocUrl,
        pdf: "",
      });
      const googleDocsId = getGoogleDocId(lessonDetail.googleDocUrl);
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
    return lessonData.pdf.length > 0 ? lessonData.pdf : pdfData ?? "";
  }, [lessonData, pdfData]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

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
          <Button
            variant="outlined"
            startIcon={<EditIcon sx={{ fill: theme.palette.primary.main }} />}
            onClick={() => setShowModalCreate(true)}
          >
            Chỉnh sửa bài học
          </Button>
          <Button
            variant="outlined"
            startIcon={
              <ClipboardPlusIcon sx={{ fill: theme.palette.primary.main }} />
            }
          >
            Tạo mini test
          </Button>
        </Stack>
      </Stack>
      <Container maxWidth="md" sx={{ flexGrow: 1, mt: 4 }}>
        {loadingPdf ? (
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
                  width={800}
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
