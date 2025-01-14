import StyledAccordion from "@/components/accordion";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import RHFTextField from "@/components/form/RHFTextField";
import TextMaxLine from "@/components/TextMaxLine";
import { EditIcon, TrashIcon } from "@/lib/constants/icons";
import { ArrowForward, Verified } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Container, Stack, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import useOverviewTab from "./hooks";

export default function CourseOverview() {
  const theme = useTheme();
  const router = useRouter();
  const {
    isEdittingDescription,
    editingOutcomeIndex,
    isAddingOutcomes,
    handleEnableEditDescription,
    handleCancelEditDescription,
    handleEditOutcome,
    handleCancelEditOutcome,
    handleAddChapter,
    control,
    description,
    outcomes,
    handleChangeDescription,
    handleAddOutcome,
    handleCancelAddOutcome,
    handleChangeOutcome,
    courseData,
    isModalConfirmDeleteOutcomeOpen,
    isEditingOutcomes,
    handleDeleteOutcome,
    handleCancelDeleteOutcome,
    handleConfirmDeleteOutcome,
    setIsEditLesson,
    setEdittingChapter,
    setEdittingLesson,
    handleChangeTab,
    isLoadingOutcomes,
    isLoadingDescription,
  } = useOverviewTab();

  return (
    <Container maxWidth="md" sx={{ py: 9 }}>
      <Stack gap={6}>
        <Stack gap={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
          >
            <Typography sx={{ fontSize: 30, fontWeight: 600 }}>
              Mô tả khóa học
            </Typography>
            {(() => {
              if (isEdittingDescription)
                return (
                  <Stack direction="row" gap={2}>
                    <Button
                      variant="outlined"
                      onClick={handleCancelEditDescription}
                    >
                      Hủy
                    </Button>
                    <LoadingButton
                      variant="contained"
                      onClick={handleChangeDescription}
                      loading={isLoadingDescription}
                      disabled={description.length === 0}
                    >
                      Lưu
                    </LoadingButton>
                  </Stack>
                );
              if (!isEdittingDescription && !courseData?.description) return;
              return (
                <Button
                  variant="outlined"
                  onClick={handleEnableEditDescription}
                >
                  Chỉnh sửa
                </Button>
              );
            })()}
          </Stack>
          {(() => {
            if (!isEdittingDescription && !courseData?.description)
              return (
                <>
                  <Typography
                    variant="caption"
                    sx={{ color: theme.palette.grey[500] }}
                  >
                    (Lưu ý: Phần này chỉ hiển thị khi có thông tin)
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{ width: "fit-content" }}
                    onClick={handleEnableEditDescription}
                  >
                    Thêm thông tin
                  </Button>
                </>
              );
            if (!isEdittingDescription && courseData?.description)
              return (
                <TextMaxLine TypographyProps={{ variant: "body2" }} withExpand>
                  {courseData?.description}
                </TextMaxLine>
              );
            return (
              <RHFTextField
                control={control}
                name="description"
                TextFieldProps={{
                  multiline: true,
                  rows: 6,
                  autoComplete: "off",
                }}
              />
            );
          })()}
        </Stack>
        <Stack gap={3}>
          <Typography sx={{ fontSize: 30, fontWeight: 600 }}>
            Mục tiêu khóa học
          </Typography>
          <Stack gap={1.5}>
            {courseData?.learningOutcomes?.length === 0 &&
              !isAddingOutcomes && (
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.grey[500] }}
                >
                  (Lưu ý: Phần này chỉ hiển thị khi có thông tin)
                </Typography>
              )}
            {courseData?.learningOutcomes?.map((outcome, i) => (
              <Stack key={i} direction="row" alignItems="center" gap={1}>
                <Verified color="primary" fontSize="small" />
                {editingOutcomeIndex === i && isEditingOutcomes ? (
                  <>
                    <RHFTextField
                      name={`outcomes.${i}`}
                      control={control}
                      sx={{ flexGrow: 1 }}
                      TextFieldProps={{
                        placeholder: "Điền thông tin",
                        autoComplete: "off",
                      }}
                    />
                    <Button
                      variant="outlined"
                      sx={{ textWrap: "nowrap" }}
                      onClick={handleCancelEditOutcome}
                    >
                      Hủy bỏ
                    </Button>
                    <LoadingButton
                      variant="contained"
                      onClick={handleChangeOutcome}
                      loading={isLoadingOutcomes}
                      disabled={outcomes[i].length === 0}
                    >
                      Lưu
                    </LoadingButton>
                  </>
                ) : (
                  <>
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                      {outcome}
                    </Typography>
                    <Stack direction="row" gap={1}>
                      <EditIcon
                        fontSize="small"
                        sx={{
                          cursor: "pointer",
                          fill: theme.palette.grey[500],
                        }}
                        onClick={() => handleEditOutcome(i)}
                      />
                      <TrashIcon
                        fontSize="small"
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleDeleteOutcome(i)}
                      />
                    </Stack>
                  </>
                )}
              </Stack>
            ))}
            {isAddingOutcomes && (
              <Stack direction="row" alignItems="center" gap={1}>
                <Verified color="primary" fontSize="small" />
                <RHFTextField
                  name={`outcomes.${outcomes.length - 1}`}
                  control={control}
                  sx={{ flexGrow: 1 }}
                  TextFieldProps={{
                    placeholder: "Điền thông tin",
                    autoComplete: "off",
                  }}
                />
                <Button
                  variant="outlined"
                  sx={{ textWrap: "nowrap" }}
                  onClick={handleCancelAddOutcome}
                >
                  Hủy bỏ
                </Button>
                <LoadingButton
                  variant="contained"
                  onClick={handleChangeOutcome}
                  loading={isLoadingOutcomes}
                  disabled={outcomes[outcomes.length - 1].length === 0}
                >
                  Lưu
                </LoadingButton>
              </Stack>
            )}
          </Stack>
          <Button
            variant="outlined"
            sx={{ width: "fit-content" }}
            onClick={handleAddOutcome}
          >
            Thêm thông tin
          </Button>
        </Stack>

        <Stack gap={3}>
          <Stack gap={1.5}>
            <Typography sx={{ fontSize: 30, fontWeight: 600 }}>
              Nội dung khóa học
            </Typography>
            {courseData?.modules?.length === 0 && (
              <Typography
                variant="caption"
                sx={{ color: theme.palette.grey[500] }}
              >
                (Lưu ý: Phần này chỉ hiển thị khi có thông tin)
              </Typography>
            )}
            <Typography
              variant="body2"
              fontWeight="medium"
              sx={{
                color: theme.palette.grey[500],
              }}
            >
              {courseData?.modules?.reduce(
                (accumulator, currentValue) =>
                  accumulator + (currentValue.lessons?.length ?? 0),
                0
              ) ?? 0}
              &nbsp;bài học
            </Typography>
          </Stack>
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
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          color="primary"
                          sx={{ cursor: "pointer", userSelect: "none" }}
                          onClick={() => {
                            setIsEditLesson(true);
                            setEdittingChapter(chapter);
                            setEdittingLesson(lesson);
                            handleChangeTab("content");
                          }}
                        >
                          Chỉnh sửa
                        </Typography>
                      </Stack>
                    ))}
                  </>
                }
              />
            );
          })}
          <Button
            variant="outlined"
            endIcon={<ArrowForward fontSize="small" />}
            sx={{ width: "fit-content" }}
            onClick={handleAddChapter}
          >
            Thêm nội dung khóa học
          </Button>
        </Stack>
      </Stack>
      <ConfirmDeleteModal
        title="Xóa mục tiêu"
        isOpen={isModalConfirmDeleteOutcomeOpen}
        onApply={handleConfirmDeleteOutcome}
        onClose={handleCancelDeleteOutcome}
      >
        <Typography
          variant="body2"
          sx={{ color: theme.palette.grey[500], textAlign: "center" }}
        >
          Bạn có chắc chắc muốn xóa mục tiêu học này không?
        </Typography>
      </ConfirmDeleteModal>
    </Container>
  );
}
