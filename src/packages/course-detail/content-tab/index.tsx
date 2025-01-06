import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import StyledAccordion from "@/components/accordion";
import { EditIcon, TrashIcon } from "@/lib/constants/icons";
import { ArrowBack } from "@mui/icons-material";
import { Grid2, Stack, TextField, Typography, useTheme } from "@mui/material";
import LessonCard from "./LessonCard";
import CreateLessonModal from "./create-lesson-modal";
import useContentTab from "./hooks";
import LessonDetail from "./lesson-detail";

export default function CourseContent() {
  const theme = useTheme();
  const {
    courseData,
    editingChapter,
    isEditLesson,
    handleCancel,
    handleOpenCreateLessonModal,
    showConfirmDeleteChapterModal,
    handleOpenConfirmDeleteChapterModal,
    handleConfirmDeleteChapter,
    handleEditChapter,
    handleCancelEditChapter,
    isEditingChapterTitle,
    inputRefs,
    setChapterTitle,
    chapterTitle,
    handleSelectLesson,
    handleCloseConfirmDeleteChapterModal,
    editingLesson,
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
          {isEditLesson && (
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
            {courseData?.modules?.reduce(
              (accumulator, currentValue) =>
                accumulator + (currentValue.lessons?.length ?? 0),
              0
            ) ?? 0}
            &nbsp;bài học
          </Typography>
        </Stack>
        <Stack gap={1.5} sx={{ px: 2, pb: 2, overflow: "auto" }}>
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
                          cursor: "pointer",
                        }}
                        onClick={() => handleSelectLesson(chapter, lesson)}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color:
                              editingLesson?._id === lesson._id
                                ? theme.palette.primary.main
                                : theme.palette.grey[700],
                            fontWeight:
                              editingLesson?._id === lesson._id
                                ? "bold"
                                : undefined,
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
      {!isEditLesson ? (
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
                  {editingChapter?._id === chapter._id &&
                  isEditingChapterTitle ? (
                    <TextField
                      variant="standard"
                      placeholder={chapter.title}
                      slotProps={{
                        input: {
                          disableUnderline: true,
                        },
                      }}
                      sx={{
                        "& .MuiInput-input": {
                          py: 0,
                          fontSize: theme.typography.h5.fontSize,
                          fontWeight: theme.typography.h5.fontWeight,
                          "::placeholder": {
                            fontSize: theme.typography.h5.fontSize,
                            fontWeight: theme.typography.h5.fontWeight,
                          },
                        },
                      }}
                      ref={(el) => {
                        inputRefs.current[chapter._id] = el;
                      }}
                      onBlur={handleCancelEditChapter}
                      autoComplete="off"
                      value={chapterTitle}
                      onChange={(e) => setChapterTitle(e.target.value)}
                    />
                  ) : (
                    <>
                      <Typography variant="h5">{chapter.title}</Typography>
                      <EditIcon
                        fontSize="small"
                        sx={{
                          cursor: "pointer",
                          fill: theme.palette.grey[500],
                        }}
                        onClick={() => {
                          handleEditChapter(chapter);
                        }}
                      />
                    </>
                  )}
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
                    onClick={() => handleOpenConfirmDeleteChapterModal(chapter)}
                  />
                </Stack>
              </Stack>
              <Grid2 container spacing={2}>
                <Grid2 size={{ sm: 12, md: 6, lg: 4, xl: 3 }}>
                  <LessonCard
                    isEmpty
                    chapterData={chapter}
                    onClick={handleOpenCreateLessonModal}
                  />
                </Grid2>
                {chapter.lessons?.map((lesson) => (
                  <Grid2
                    key={lesson._id}
                    size={{ sm: 12, md: 6, lg: 4, xl: 3 }}
                  >
                    <LessonCard
                      isAdmin
                      chapterData={chapter}
                      lessonData={lesson}
                      onClick={() => handleSelectLesson(chapter, lesson)}
                    />
                  </Grid2>
                ))}
              </Grid2>
            </Stack>
          ))}
          <Stack gap={2}>
            <Stack direction="row" alignItems="center" gap={1.5}>
              {isEditingChapterTitle && !editingChapter ? (
                <TextField
                  variant="standard"
                  placeholder="Chương không có tiêu đề"
                  autoComplete="off"
                  sx={{
                    width: "fit-content",
                    "& .MuiInput-input": {
                      py: 0,
                      fontSize: theme.typography.h5.fontSize,
                      fontWeight: theme.typography.h5.fontWeight,
                      "::placeholder": {
                        fontSize: theme.typography.h5.fontSize,
                        fontWeight: theme.typography.h5.fontWeight,
                      },
                    },
                  }}
                  slotProps={{
                    input: {
                      disableUnderline: true,
                    },
                  }}
                  onBlur={handleCancelEditChapter}
                  ref={(el) => {
                    inputRefs.current.new = el;
                  }}
                  onChange={(e) => setChapterTitle(e.target.value)}
                />
              ) : (
                <>
                  <Typography
                    variant="h5"
                    sx={{ color: theme.palette.grey[400] }}
                  >
                    Chương không có tiêu đề
                  </Typography>
                  <EditIcon
                    fontSize="small"
                    sx={{ cursor: "pointer", fill: theme.palette.grey[500] }}
                    onClick={() => {
                      handleEditChapter();
                    }}
                  />
                </>
              )}
            </Stack>

            <Grid2 container spacing={2}>
              <Grid2 size={{ sm: 12, md: 6, lg: 4, xl: 3 }}>
                <LessonCard isEmpty onClick={handleOpenCreateLessonModal} />
              </Grid2>
            </Grid2>
          </Stack>
        </Stack>
      ) : (
        <LessonDetail />
      )}
      <CreateLessonModal />
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
