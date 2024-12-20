import StyledAccordion from "@/components/accordion";
import { EditIcon } from "@/packages/course/icons";
import { Grid2, Stack, Typography, useTheme } from "@mui/material";
import LessonCard from "./LessonCard";
import useContentTab from "./hook";

export default function CourseContent() {
  const theme = useTheme();
  const { courseData } = useContentTab();

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
        </Stack>
      </Stack>
      <Stack
        gap={5}
        sx={{
          backgroundColor: theme.palette.grey[50],
          flexGrow: 1,
          p: 4,
        }}
      >
        <Stack gap={2}>
          <Stack direction="row" alignItems="center" gap={1.5}>
            <Typography variant="h5">Chương 1</Typography>
            <EditIcon fontSize="small" sx={{ cursor: "pointer" }} />
          </Stack>
          <Grid2 container spacing={3}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
              <Grid2 key={i} size={{ md: 6, lg: 4, xl: 3 }}>
                <LessonCard
                  title={`${i}. Giới thiệu chung về giao diện Excel`}
                  content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"
                />
              </Grid2>
            ))}
            <Grid2 size={{ md: 6, lg: 4, xl: 3 }}>
              <LessonCard isEmpty />
            </Grid2>
          </Grid2>
        </Stack>

        <Stack gap={2}>
          <Stack direction="row" alignItems="center" gap={1.5}>
            <Typography variant="h5">Chương 2</Typography>
            <EditIcon fontSize="small" sx={{ cursor: "pointer" }} />
          </Stack>
          <Grid2 container spacing={3}>
            <Grid2 size={{ md: 6, lg: 4, xl: 3 }}>
              <LessonCard isEmpty />
            </Grid2>
          </Grid2>
        </Stack>
      </Stack>
    </Stack>
  );
}
