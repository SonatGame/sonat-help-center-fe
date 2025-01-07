import RHFTextField from "@/components/form/RHFTextField";
import { CircularProgress, Grid2, Stack, Typography } from "@mui/material";
import { BookSettingIcon } from "../../lib/constants/icons";
import CreateCourseModal from "../course-detail/create-course-modal";
import CourseCard from "../home/components/course-list/CourseCard";
import useCourseSection from "./hooks";

export default function CourseSection() {
  const {
    control,
    isModalOpen,
    handleOpen,
    handleClose,
    data,
    isLoading,
    mutate,
    title,
    team,
    ksa,
  } = useCourseSection();

  if (isLoading && title.length === 0 && team.length === 0 && ksa.length === 0)
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "100%",
        }}
      >
        <CircularProgress />
      </Stack>
    );
  console.log(data, title, team, ksa);

  if (
    data.data?.length === 0 &&
    title.length === 0 &&
    team.length === 0 &&
    ksa.length === 0
  )
    return (
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
    );

  return (
    <Stack
      sx={{
        px: 4,
        py: 3,
        height: "100%",
      }}
      gap={4}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={1.5}
      >
        <Stack direction="row" alignItems="center" gap={1.5}>
          <RHFTextField
            name="title"
            control={control}
            required
            TextFieldProps={{
              placeholder: "Tìm kiếm khoá học",
              sx: {
                width: 300,
              },
            }}
          />
          {/* <RHFSelect
            name="team"
            control={control}
            options={teamOptions}
            SelectProps={{
              renderValue: (selected: string) => {
                if (!selected) return "Team";
                return selected;
              },
              sx: {
                width: 150,
              },
            }}
          />
          <RHFSelect
            name="KSA"
            control={control}
            options={ksaOptions}
            SelectProps={{
              renderValue: (selected: string) => {
                if (!selected) return "KSA";
                return selected;
              },
              sx: {
                width: 150,
              },
            }}
          /> */}
        </Stack>

        <CreateCourseModal
          isModalOpen={isModalOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          mutate={mutate}
        />
      </Stack>
      {isLoading ? (
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            height: "100%",
          }}
        >
          <CircularProgress />
        </Stack>
      ) : (
        <Grid2 container spacing={2}>
          {data?.data?.map((course) => (
            <Grid2
              key={course._id}
              size={{ xs: 12, sm: 6, md: 4, lg: 3, xxl: 2 }}
            >
              <CourseCard courseData={course} />
            </Grid2>
          ))}
        </Grid2>
      )}
    </Stack>
  );
}
