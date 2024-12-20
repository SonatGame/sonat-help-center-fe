import StyledAccordion from "@/components/accordion";
import RHFTextField from "@/components/form/RHFTextField";
import TextMaxLine from "@/components/TextMaxLine";
import { ArrowForward, Verified } from "@mui/icons-material";
import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import useOverviewTab from "./hook";

export default function CourseOverview() {
  const theme = useTheme();
  const {
    isEdittingDescription,
    isEdittingOutcomes,
    handleEnableEditDescription,
    handleCancelEditDescription,
    handleCancelEditOutcome,
    handleAddChapter,
    control,
    handleChangeDescription,
    handleAddOutcome,
    handleChangeOutcome,
    courseData,
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
            <Typography variant="h4">Mô tả khóa học</Typography>
            {isEdittingDescription ? (
              <Stack direction="row" gap={2}>
                <Button
                  variant="outlined"
                  onClick={handleCancelEditDescription}
                >
                  Hủy
                </Button>
                <Button variant="contained" onClick={handleChangeDescription}>
                  Lưu
                </Button>
              </Stack>
            ) : (
              <Button variant="outlined" onClick={handleEnableEditDescription}>
                Chỉnh sửa
              </Button>
            )}
          </Stack>
          {!isEdittingDescription ? (
            <TextMaxLine TypographyProps={{ variant: "body2" }} withExpand>
              {courseData?.description}
            </TextMaxLine>
          ) : (
            <RHFTextField
              control={control}
              name="description"
              TextFieldProps={{
                multiline: true,
                rows: 10,
              }}
            />
          )}
        </Stack>
        <Stack gap={3}>
          <Typography variant="h4">Mục tiêu khóa học</Typography>
          <Stack gap={1.5}>
            {courseData?.learningOutcomes.map((outcome, i) => (
              <Stack key={i} direction="row" alignItems="center" gap={1}>
                <Verified color="primary" fontSize="small" />
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                  {outcome}
                </Typography>
                <Stack direction="row" gap={1}></Stack>
              </Stack>
            ))}
            {isEdittingOutcomes && (
              <Stack direction="row" alignItems="center" gap={1}>
                <Verified color="primary" fontSize="small" />
                <TextField placeholder="Điền thông tin" sx={{ flexGrow: 1 }} />
                <Button variant="outlined" onClick={handleCancelEditOutcome}>
                  Hủy bỏ
                </Button>
                <Button variant="contained" onClick={handleChangeOutcome}>
                  Lưu
                </Button>
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
            <Typography variant="h4">Nội dung khóa học</Typography>
            <Typography
              variant="body2"
              fontWeight="medium"
              sx={{
                color: theme.palette.grey[500],
              }}
            >
              {courseData?.modules.reduce(
                (accumulator, currentValue) =>
                  accumulator + currentValue.lessons.length,
                0
              )}
              &nbsp; bài học
            </Typography>
          </Stack>
          {courseData?.modules.map((chapter) => {
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
                      {chapter.lessons.length}
                    </Typography>
                  </Stack>
                }
                detail={
                  <>
                    {chapter.lessons.map((lesson, i) => (
                      <Stack
                        key={lesson._id}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                          px: 1.5,
                          py: 3,
                          borderBottom:
                            i < 5
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
                        >
                          Học ngay
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
    </Container>
  );
}
