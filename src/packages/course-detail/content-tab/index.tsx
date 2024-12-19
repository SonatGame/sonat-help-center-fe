import StyledAccordion from "@/components/accordion";
import { EditIcon } from "@/packages/course/icons";
import { Grid2, Stack, Typography, useTheme } from "@mui/material";
import LessonCard from "./LessonCard";

export default function CourseContent() {
  const theme = useTheme();

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
            20 bài học
          </Typography>
        </Stack>
        <Stack gap={1.5} sx={{ px: 2, pb: 2 }}>
          <StyledAccordion
            summary={
              <Stack>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    color: theme.palette.grey[700],
                  }}
                >
                  Tổng quan về phần mềm Excel
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight="medium"
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                >
                  4 bài học
                </Typography>
              </Stack>
            }
            detail={
              <>
                {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
                  <Typography
                    key={i}
                    variant="body2"
                    sx={{
                      color: theme.palette.grey[700],
                      px: 1.5,
                      py: 3,
                      borderBottom:
                        i < 5
                          ? `1px solid ${theme.palette.divider}`
                          : undefined,
                    }}
                  >
                    {i}. Giới thiệu chung về giao diện Excel
                  </Typography>
                ))}
              </>
            }
          />
          <StyledAccordion
            summary={
              <Stack>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    color: theme.palette.grey[700],
                  }}
                >
                  Tổng quan về phần mềm Excel
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight="medium"
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                >
                  4 bài học
                </Typography>
              </Stack>
            }
            detail={
              <>
                {Array.from({ length: 3 }, (_, i) => i + 1).map((i) => (
                  <Typography
                    key={i}
                    variant="body2"
                    sx={{
                      color: theme.palette.grey[700],
                      px: 1.5,
                      py: 3,
                      borderBottom:
                        i < 3
                          ? `1px solid ${theme.palette.divider}`
                          : undefined,
                    }}
                  >
                    {i}. Giới thiệu chung về giao diện Excel
                  </Typography>
                ))}
              </>
            }
          />
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
