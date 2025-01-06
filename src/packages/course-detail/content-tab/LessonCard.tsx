import { CourseApi } from "@/api/CourseApi";
import ButtonMenu from "@/components/button-menu";
import TextMaxLine from "@/components/TextMaxLine";
import { Chapter, Lesson } from "@/lib/types/course";
import { AddRounded, ArrowForwardRounded, MoreVert } from "@mui/icons-material";
import { Box, Card, Stack, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import ConfirmDeleteLessonModal from "../confirm-delete-modal";
import { useCourseDetailContext } from "../context";

interface IProps {
  chapterData?: Chapter;
  lessonData?: Lesson;
  isEmpty?: boolean;
  onClick?: () => any;
  isAdmin?: boolean;
}

export default function LessonCard(props: IProps) {
  const theme = useTheme();
  const { isEmpty = false, chapterData, lessonData, onClick, isAdmin } = props;
  const {
    mutate: mutateCourse,
    setEdittingChapter,
    setEdittingLesson,
    setShowModalCreate,
    setLessonData,
  } = useCourseDetailContext();
  const [hovering, setHovering] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const handleEditLesson = () => {
    setEdittingChapter(chapterData);
    setEdittingLesson(lessonData);
    setLessonData({
      title: lessonData?.title ?? "",
      description: lessonData?.description ?? "",
      url: lessonData?.googleDocUrl ?? "",
      pdf: "",
    });
    setShowModalCreate(true);
  };

  const handleOpenModalConfirm = () => {
    setIsOpenConfirmModal(true);
  };

  const handleCloseModalConfirm = () => {
    setIsOpenConfirmModal(false);
  };

  const handleDeleteLesson = async () => {
    if (!lessonData) return;
    await CourseApi.deleteLesson(lessonData._id);
    await mutateCourse();
    setIsOpenConfirmModal(false);
  };

  if (isEmpty)
    return (
      <Card
        sx={{
          borderRadius: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: theme.palette.primary.main,
          cursor: "pointer",
          userSelect: "none",
          height: 170,
          boxShadow: 0,
          border: 1,
          borderColor: theme.palette.divider,
        }}
        onClick={onClick}
      >
        <AddRounded fontSize="small" />
        <Typography variant="body2">Thêm bài học mới</Typography>
      </Card>
    );

  return (
    <Card
      sx={{
        position: "relative",
        cursor: "pointer",
        userSelect: "none",
        height: 170,
        boxShadow: 0,
        border: 1,
        borderColor: theme.palette.divider,
        p: 2,
      }}
      onClick={onClick}
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Stack justifyContent="space-between" sx={{ height: "100%" }}>
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="start"
            gap={1}
          >
            <TextMaxLine
              TypographyProps={{ fontWeight: "bold" }}
              sx={{
                color: theme.palette.grey[700],
              }}
            >
              {lessonData?.title}
            </TextMaxLine>
            {hovering && (
              <ButtonMenu
                usingIconButton
                icon={
                  <MoreVert
                    fontSize="small"
                    sx={{ color: theme.palette.grey[500] }}
                  />
                }
                buttonProps={{
                  size: "small",
                }}
                menuOptions={[
                  {
                    label: (
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.grey[500] }}
                      >
                        Chỉnh sửa
                      </Typography>
                    ),
                    onClick: handleEditLesson,
                  },
                  {
                    label: <Typography variant="body2">Xoá bài học</Typography>,
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
            )}
          </Stack>
          <TextMaxLine
            TypographyProps={{ variant: "body2" }}
            sx={{
              color: theme.palette.grey[500],
              wordBreak: "break-word",
            }}
          >
            {lessonData?.description}
          </TextMaxLine>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          sx={{ color: theme.palette.primary.main }}
        >
          <Typography variant="body2">
            {isAdmin ? "Chỉnh sửa" : "Học ngay"}
          </Typography>
          <ArrowForwardRounded fontSize="small" />
        </Stack>
      </Stack>
      <ConfirmDeleteLessonModal
        isModalOpen={isOpenConfirmModal}
        handleOpen={handleOpenModalConfirm}
        handleClose={handleCloseModalConfirm}
        handleDelete={handleDeleteLesson}
      />
    </Card>
  );
}
