import { AppRoutes } from "@/lib/constants/routesAndPermissions";
import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export interface ICourseListProps {
  team: string;
}

export default function CourseList() {
  const router = useRouter();

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
      {/* <Grid2 container spacing={3}>
        {[].map((item, i) => {

          return  <Grid2 size={{ xs: 12, sm: 6, xl: 4 }}>
          <CourseCard
            key={i}
            courseData={}
          />
        </Grid2>
        })}
      </Grid2> */}
    </Stack>
  );
}
