import { CourseApi } from "@/api/CourseApi";
import { AppRoutes } from "@/lib/constants/routesAndPermissions";
import { Grid2, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import CourseCard from "./CourseCard";

export interface ICourseListProps {
  team: string;
}

export default function CourseList() {
  const router = useRouter();
  const { data, isLoading, mutate } = useSWR(
    "get-course-list",
    () => CourseApi.getCourseList(),
    { refreshInterval: 0, revalidateOnFocus: false }
  );

  return (
    <Stack spacing={1.5}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Khóa học</Typography>
        <Typography
          variant="body2"
          color="primary"
          sx={{
            fontWeight: 600,
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={() => router.push(AppRoutes.COURSE)}
        >
          Xem thêm
        </Typography>
      </Stack>
      <Grid2 container spacing={2}>
        {data?.data?.map((course) => (
          <Grid2 key={course._id} size={{ xs: 12, sm: 6, lg: 4, xxl: 3 }}>
            <CourseCard courseData={course} />
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
}
