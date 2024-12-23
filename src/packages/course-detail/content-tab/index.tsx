import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import StyledAccordion from "@/components/accordion";
import { EditIcon, TrashIcon } from "@/packages/course/icons";
import { ArrowBack } from "@mui/icons-material";
import { Grid2, Stack, Typography, useTheme } from "@mui/material";
import LessonCard from "./LessonCard";
import useContentTab from "./hook";
import LessonDetail from "./lesson-detail";
import UploadDocsModal from "./upload-docs-modal";

export default function CourseContent() {
  const theme = useTheme();
  const {
    courseData,
    edittingChapter,
    edittingLesson,
    handleAddLesson,
    isAddingLesson,
    handleCancel,
    handleAddChapter,
    showModalUpload,
    handleOpenUploadDocsModal,
    handleCloseUploadDocsModal,
    showConfirmDeleteChapterModal,
    handleOpenConfirmDeleteChapterModal,
    handleCloseConfirmDeleteChapterModal,
    handleConfirmDeleteChapter,
    googleDocs,
    setGoogleDocs,
  } = useContentTab();

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
          {isAddingLesson && (
            <Stack
              direction="row"
              gap={0.5}
              sx={{
                cursor: "pointer",
                userSelect: "none",
                color: theme.palette.primary.main,
              }}
              onClick={handleCancel}
            >
              <ArrowBack fontSize="small" />
              <Typography variant="body2" fontWeight="bold">
                Quay lại
              </Typography>
            </Stack>
          )}
          <Typography variant="h6">Nội dung khóa học</Typography>
          <Typography
            variant="body2"
            fontWeight="medium"
            sx={{ color: theme.palette.grey[500] }}
          >
            {courseData?.modules.reduce(
              (accumulator, currentValue) =>
                accumulator + (currentValue.lessons?.length ?? 0),
              0
            ) ?? 0}
            &nbsp;bài học
          </Typography>
        </Stack>
        <Stack gap={1.5} sx={{ px: 2, pb: 2 }}>
          {courseData?.modules?.map((chapter) => {
            return (
              <StyledAccordion
                key={chapter._id}
                summary={
                  <Stack>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{
                        color: theme.palette.grey[700],
                      }}
                    >
                      {chapter.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight="medium"
                      sx={{
                        color: theme.palette.primary.main,
                      }}
                    >
                      {chapter.lessons?.length}&nbsp;bài học
                    </Typography>
                  </Stack>
                }
                detail={
                  <>
                    {chapter.lessons?.map((lesson, i) => (
                      <Stack
                        key={lesson._id}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                          px: 1.5,
                          py: 3,
                          borderBottom:
                            i < (chapter.lessons?.length ?? 0) - 1
                              ? `1px solid ${theme.palette.divider}`
                              : undefined,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.grey[700],
                          }}
                        >
                          {lesson.title}
                        </Typography>
                      </Stack>
                    ))}
                  </>
                }
              />
            );
          })}
        </Stack>
      </Stack>
      {!isAddingLesson ? (
        <Stack
          gap={5}
          sx={{
            backgroundColor: theme.palette.grey[50],
            flexGrow: 1,
            p: 4,
          }}
        >
          {courseData?.modules?.map((chapter) => (
            <Stack key={chapter._id} gap={2}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" alignItems="center" gap={1.5}>
                  {/* <DragIndicator fontSize="small" /> */}
                  <Typography variant="h5">{chapter.title}</Typography>
                  <EditIcon fontSize="small" sx={{ cursor: "pointer" }} />
                </Stack>
                <Stack direction="row" alignItems="center" gap={1.5}>
                  <Typography
                    variant="body2"
                    fontWeight="medium"
                    sx={{ color: theme.palette.grey[500] }}
                  >
                    {chapter.lessons?.length ?? 0}&nbsp;bài học
                  </Typography>
                  <TrashIcon
                    fontSize="small"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      handleOpenConfirmDeleteChapterModal(chapter);
                    }}
                  />
                </Stack>
              </Stack>
              <Grid2 container spacing={3}>
                <Grid2 size={{ md: 6, lg: 4, xl: 3 }}>
                  <LessonCard
                    isEmpty
                    onClick={() => handleAddLesson(chapter)}
                  />
                </Grid2>
                {chapter.lessons?.map((lesson) => (
                  <Grid2 key={lesson._id} size={{ md: 6, lg: 4, xl: 3 }}>
                    <LessonCard
                      lessonData={lesson}
                      onClick={() => handleAddLesson(chapter, lesson)}
                    />
                  </Grid2>
                ))}
              </Grid2>
            </Stack>
          ))}
          <Stack gap={2}>
            <Typography variant="h5">Chương không có tiêu đề</Typography>
            <Grid2 container spacing={3}>
              <Grid2 size={{ md: 6, lg: 4, xl: 3 }}>
                <LessonCard isEmpty onClick={() => handleAddLesson()} />
              </Grid2>
            </Grid2>
          </Stack>
        </Stack>
      ) : (
        <LessonDetail
          edittingChapter={edittingChapter}
          edittingLesson={edittingLesson}
          handleGoBack={handleCancel}
          handleOpenUploadDocsModal={handleOpenUploadDocsModal}
          googleDocs={googleDocs}
          setGoogleDocs={setGoogleDocs}
        />
      )}
      <UploadDocsModal
        isModalOpen={showModalUpload}
        handleClose={handleCloseUploadDocsModal}
        googleDocs={googleDocs}
        setGoogleDocs={setGoogleDocs}
        edittingLesson={edittingLesson}
      />
      <ConfirmDeleteModal
        title="Xác nhận xóa chương"
        isOpen={showConfirmDeleteChapterModal}
        onApply={handleConfirmDeleteChapter}
        onClose={handleCloseConfirmDeleteChapterModal}
      >
        <Typography
          variant="body2"
          sx={{ color: theme.palette.grey[500], textAlign: "center" }}
        >
          Bạn có chắc chắn muốn xóa chương này không? Hành động này sẽ xóa vĩnh
          viễn tất cả các bài học bên trong chương. Bạn sẽ không thể khôi phục
          lại chúng sau khi xóa. Hãy cân nhắc kỹ trước khi thực hiện.
        </Typography>
      </ConfirmDeleteModal>
    </Stack>
  );
}
