import { Box, Stack, Tabs, useTheme } from "@mui/material";
import CreateCourseModal from "../course-detail/create-course-modal";
import CourseCard from "../home/components/course-list/CourseCard";
import useCourseSection from "./hook";

export default function CourseSection() {
  const theme = useTheme();
  const { isModalOpen, handleOpen, handleClose, data, isLoading } =
    useCourseSection();

  return (
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
        />
      </Stack>
      <Tabs
        variant="scrollable"
        sx={{
          position: "relative",
          "& .MuiTabs-flexContainer": {
            gap: 3,
          },
          "& .MuiTabScrollButton-root": {
            width: 56,
            height: 56,
            borderRadius: "50%",
            zIndex: 1,
            backgroundColor: theme.palette.grey[700],
            color: theme.palette.grey[400],
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            border: 1,
            borderColor: theme.palette.grey[400],
            opacity: 1,
          },
          ".MuiTabs-scrollButtons.Mui-disabled": { display: "none" },
          "& .MuiTabScrollButton-root:first-child": {
            left: 32,
          },
          "& .MuiTabScrollButton-root:last-child": {
            right: 32,
          },
        }}
      >
        {data?.map((course) => (
          <Box key={course._id} sx={{ width: 400 }}>
            <CourseCard
              team={course.team}
              title={course.title}
              description={course.description}
              courseCount={18}
              ksa={course.KSA}
              thumbnail={course.thumbnailUrl}
            />
          </Box>
        ))}
      </Tabs>
    </Stack>
  );
}
