import { Grid2, Stack, Typography } from "@mui/material";
import { BookSettingIcon } from "../../lib/constants/icons";
import CreateCourseModal from "../course-detail/create-course-modal";
import CourseCard from "../home/components/course-list/CourseCard";
import useCourseSection from "./hook";

export default function CourseSection() {
  const { isModalOpen, handleOpen, handleClose, data, isLoading, mutate } =
    useCourseSection();

  return !data || data.data.length === 0 ? (
    <Stack
      justifyContent="center"
      alignItems="center"
      gap={3}
      sx={{
        height: "100%",
      }}
    >
      <BookSettingIcon sx={{ fontSize: 255 }} />
      <Typography variant="h5">
        Khai thác sức mạnh bản thân với bộ bài test toàn diện
      </Typography>
      <CreateCourseModal
        isModalOpen={isModalOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        mutate={mutate}
      />
    </Stack>
  ) : (
    <Stack
      sx={{
        px: 4,
        py: 3,
      }}
      gap={4}
    >
      <Stack direction="row" justifyContent="space-between">
        <div></div>
        <CreateCourseModal
          isModalOpen={isModalOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          mutate={mutate}
        />
      </Stack>
      <Grid2 container spacing={2}>
        {data?.data?.map((course) => (
          <Grid2 key={course._id} size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
            <CourseCard courseData={course} />
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
}
