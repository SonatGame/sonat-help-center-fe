import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import Tag from "@/components/Tag";
import { MoreVert } from "@mui/icons-material";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import CourseContent from "./content-tab";
import CreateCourseModal from "./create-course-modal";
import useCourseDetail from "./hooks";
import CourseOverview from "./overview-tab";

export default function CourseDetail() {
  const theme = useTheme();
  const {
    handleChangeTab,
    value,
    isAddingLesson,
    courseData,
    isModalOpen,
    handleOpenModalEdit,
    handleCloseModalEdit,
    anchorEl,
    open,
    handleClick,
    handleClose,
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
    {
      label: "Đánh giá của học viên",
      value: "rating",
      component: "",
    },
    {
      label: "Làm test",
      value: "test",
      component: "",
    },
  ];

  return (
    <Stack
      sx={{
        height: "100%",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {!isAddingLesson && (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              px: 4,
              pt: 3,
              pb: 1.5,
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
                width={300}
                height={300}
                style={{
                  objectFit: "cover",
                  width: 96,
                  height: 96,
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
              <Button
                variant="outlined"
                sx={{ minWidth: "fit-content", px: 1 }}
                onClick={handleClick}
              >
                <MoreVert fontSize="small" />
              </Button>
            </Stack>
          </Stack>
          <Box sx={{ borderBottom: 1, borderColor: "divider", px: 4 }}>
            <Tabs
              value={value}
              onChange={(_, value: string) => handleChangeTab(value)}
            >
              {tabList.map((tab, index) => (
                <Tab key={`tab-${index}`} value={tab.value} label={tab.label} />
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
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={(e) => e.stopPropagation()}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          "& .MuiList-root": {
            py: 0,
          },
          "& .MuiMenuItem-root": {
            fontSize: 14,
          },
        }}
      >
        <MenuItem sx={{ color: theme.palette.grey[500] }}>Tạo bản sao</MenuItem>
        <MenuItem
          sx={{
            color: theme.palette.error.main,
            ":hover": {
              background: theme.palette.error[100],
              color: theme.palette.error.main,
            },
          }}
          onClick={handleOpenModalConfirm}
        >
          Xoá khoá học
        </MenuItem>
      </Menu>

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
