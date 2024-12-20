import StyledAccordion from "@/components/accordion";
import { EditIcon } from "@/packages/course/icons";
import {
  Button,
  Divider,
  Grid2,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import LessonCard from "./LessonCard";
import useContentTab from "./hook";

export default function CourseContent() {
  const theme = useTheme();
  const { courseData, handleAddLesson, isAddingLesson, handleCancel } =
    useContentTab();

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
                accumulator + currentValue.lessons.length,
              0
            )}
            &nbsp; bài học
          </Typography>
        </Stack>
        <Stack gap={1.5} sx={{ px: 2, pb: 2 }}>
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
                            i < chapter.lessons.length - 1
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
          {courseData?.modules.map((chapter) => (
            <Stack key={chapter._id} gap={2}>
              <Stack direction="row" alignItems="center" gap={1.5}>
                <Typography variant="h5">{chapter.title}</Typography>
                <EditIcon fontSize="small" sx={{ cursor: "pointer" }} />
              </Stack>
              <Grid2 container spacing={3}>
                <Grid2 size={{ md: 6, lg: 4, xl: 3 }}>
                  <LessonCard isEmpty onClick={handleAddLesson} />
                </Grid2>
                {chapter.lessons.map((lesson) => (
                  <Grid2 key={lesson._id} size={{ md: 6, lg: 4, xl: 3 }}>
                    <LessonCard
                      title={lesson.title}
                      content={lesson.description}
                    />
                  </Grid2>
                ))}
              </Grid2>
            </Stack>
          ))}
        </Stack>
      ) : (
        <Stack sx={{ flexGrow: 1 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}
          >
            <Stack direction="row" gap={1.5}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{ width: 96 }}
              >
                Hủy
              </Button>
              <Button variant="contained" sx={{ width: 96 }}>
                Lưu
              </Button>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            sx={{
              p: 1.5,
              border: 1,
              borderColor: "divider",
              color: theme.palette.primary.main,
            }}
          >
            <Typography variant="body2" fontWeight="bold">
              Đăng tải tài liệu Doc
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="body2" fontWeight="bold">
              Tạo mini test
            </Typography>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
