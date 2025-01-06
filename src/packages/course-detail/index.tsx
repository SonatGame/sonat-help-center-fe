import ButtonMenu from "@/components/button-menu";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import Tag from "@/components/Tag";
import { AppRoutes } from "@/lib/constants/routesAndPermissions";
import { ArrowBack, MoreVert } from "@mui/icons-material";
import { Box, Stack, Tab, Tabs, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CourseContent from "./content-tab";
import CreateCourseModal from "./create-course-modal";
import useCourseDetail from "./hooks";
import CourseOverview from "./overview-tab";

export default function CourseDetail() {
  const theme = useTheme();
  const router = useRouter();
  const {
    handleChangeTab,
    value,
    isEditLesson,
    courseData,
    isModalOpen,
    handleOpenModalEdit,
    handleCloseModalEdit,
    mutateCourse,
    isModalConfirmOpen,
    handleOpenModalConfirm,
    handleCloseModalConfirm,
    handleConfirmDeleteCourse,
  } = useCourseDetail();

  const tabList = [
    {
      label: "Thông tin chung",
      value: "overview",
      component: <CourseOverview />,
    },
    {
      label: "Nội dung khoá học",
      value: "content",
      component: <CourseContent />,
    },
    // {
    //   label: "Đánh giá của học viên",
    //   value: "rating",
    //   component: "",
    // },
    // {
    //   label: "Làm test",
    //   value: "test",
    //   component: "",
    // },
  ];

  return (
    <Stack
      sx={{
        height: "100%",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {!isEditLesson && (
        <>
          <Stack
            direction="row"
            alignItems="center"
            gap={0.5}
            sx={{
              mt: 3,
              px: 4,
              cursor: "pointer",
              userSelect: "none",
              color: theme.palette.primary.main,
            }}
            onClick={() => router.push(AppRoutes.COURSE)}
          >
            <ArrowBack fontSize="small" />
            <Typography variant="body2" fontWeight="bold">
              Quay lại
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              px: 4,
              py: 1.5,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              gap={3}
            >
              <Image
                src={courseData?.thumbnail ?? ""}
                alt="course-thumbnail"
                width={200}
                height={200}
                style={{
                  objectFit: "cover",
                  width: 72,
                  height: 72,
                  borderRadius: 16,
                }}
              />
              <Stack gap={1.5}>
                <Typography variant="h5">{courseData?.title}</Typography>
                <Stack direction="row" gap={1}>
                  <Tag>
                    <Typography
                      variant="body2"
                      color="primary"
                      fontWeight="medium"
                    >
                      {courseData?.modules?.reduce(
                        (accumulator, currentValue) =>
                          accumulator + (currentValue.lessons?.length ?? 0),
                        0
                      ) ?? 0}
                      &nbsp;bài học
                    </Typography>
                  </Tag>
                  <Tag>
                    <Typography
                      variant="body2"
                      color="primary"
                      fontWeight="medium"
                    >
                      {courseData?.KSA}
                    </Typography>
                  </Tag>
                </Stack>
              </Stack>
            </Stack>
            <Stack direction="row" gap={1.5}>
              <CreateCourseModal
                isModalOpen={isModalOpen}
                handleOpen={handleOpenModalEdit}
                handleClose={handleCloseModalEdit}
                isEditing
                mutate={mutateCourse}
              />
              <ButtonMenu
                buttonTitle={<MoreVert fontSize="small" />}
                buttonProps={{
                  variant: "outlined",
                  sx: {
                    minWidth: "fit-content",
                    px: 1,
                  },
                }}
                menuOptions={[
                  {
                    label: (
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.grey[500] }}
                      >
                        Tạo bản sao
                      </Typography>
                    ),
                    onClick: () => {},
                  },
                  {
                    label: (
                      <Typography variant="body2">Xoá khoá học</Typography>
                    ),
                    onClick: handleOpenModalConfirm,
                    sx: {
                      color: theme.palette.error.main,
                      ":hover": {
                        backgroundColor: theme.palette.error[100],
                        color: theme.palette.error.main,
                      },
                    },
                  },
                ]}
              />
            </Stack>
          </Stack>
          <Box sx={{ borderBottom: 1, borderColor: "divider", px: 4 }}>
            <Tabs
              value={value}
              onChange={(_, value: string) => handleChangeTab(value)}
            >
              {tabList.map((tab, index) => (
                <Tab
                  key={`tab-${index}`}
                  value={tab.value}
                  label={tab.label}
                  sx={{ textTransform: "none" }}
                />
              ))}
            </Tabs>
          </Box>
        </>
      )}
      {tabList.map((tab, index) => (
        <Box
          key={`tab-panel-${index}`}
          role="tabpanel"
          hidden={value !== tab.value}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          sx={{ flexGrow: 1 }}
        >
          {value === tab.value && tab.component}
        </Box>
      ))}

      <ConfirmDeleteModal
        title="Xóa khóa học"
        isOpen={isModalConfirmOpen}
        onApply={handleConfirmDeleteCourse}
        onClose={handleCloseModalConfirm}
      >
        <Typography
          variant="body2"
          sx={{ color: theme.palette.grey[500], textAlign: "center" }}
        >
          Bạn có chắc muốn xóa khóa học này không?
        </Typography>
      </ConfirmDeleteModal>
    </Stack>
  );
}
