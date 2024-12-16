import { AppRoutes } from "@/lib/constants/routesAndPermissions";
import { Grid2, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import CourseCard from "./CourseCard";

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
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, sm: 6, xl: 4 }}>
          <CourseCard
            team="Business Intelligence"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"
            courseCount={18}
            ksa="Skill"
            thumbnail="/assets/img/sample_course.png"
            title="THÀNH THẠO XỬ LÝ DỮ LIỆU VỚI PYTHON TỪ SỐ 0 - 2024"
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, xl: 4 }}>
          <CourseCard
            team="Business Intelligence"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"
            courseCount={18}
            ksa="Skill"
            thumbnail="/assets/img/sample_course.png"
            title="Khóa học Graphics Design"
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, xl: 4 }}>
          <CourseCard
            team="Business Intelligence"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"
            courseCount={18}
            ksa="Skill"
            thumbnail="/assets/img/sample_course.png"
            title="THÀNH THẠO XỬ LÝ DỮ LIỆU VỚI PYTHON TỪ SỐ 0 - 2024"
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, xl: 4 }}>
          <CourseCard
            team="Business Intelligence"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"
            courseCount={18}
            ksa="Skill"
            thumbnail="/assets/img/sample_course.png"
            title="Khóa học Graphics Design"
          />
        </Grid2>
      </Grid2>
    </Stack>
  );
}
