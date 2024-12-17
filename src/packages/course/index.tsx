import ModalWrapper from "@/components/modal";
import { Add } from "@mui/icons-material";
import { Box, Stack, Tabs, useTheme } from "@mui/material";
import CourseCard from "../home/components/course-list/CourseCard";

export default function CourseSection() {
  const theme = useTheme();

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
        <ModalWrapper
          buttonTitle="Khóa học mới"
          buttonProps={{
            variant: "contained",
            startIcon: <Add />,
          }}
        >
          <></>
        </ModalWrapper>
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
          "& .MuiTabs-scroller": {
            scrollBehavior: "smooth",
          },
        }}
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
          <Box key={i} sx={{ width: 400 }}>
            <CourseCard
              team="Business Intelligence"
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"
              courseCount={18}
              ksa="Skill"
              thumbnail="/assets/img/sample_course.png"
              title="THÀNH THẠO XỬ LÝ DỮ LIỆU VỚI PYTHON TỪ SỐ 0 - 2024"
            />
          </Box>
        ))}
      </Tabs>
    </Stack>
  );
}
