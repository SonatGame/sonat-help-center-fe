import { CourseApi } from "@/api/CourseApi";
import TextMaxLine from "@/components/TextMaxLine";
import { Lesson } from "@/lib/types/course";
import { AddRounded, ArrowForwardRounded, MoreVert } from "@mui/icons-material";
import {
  Box,
  Card,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import ConfirmDeleteLessonModal from "../confirm-delete-modal";
import { useCourseDetailContext } from "../context";

interface IProps {
  lessonData?: Lesson;
  isEmpty?: boolean;
  onClick?: () => any;
}

export default function LessonCard(props: IProps) {
  const theme = useTheme();
  const { isEmpty = false, lessonData, onClick } = props;
  const { mutate: mutateCourse } = useCourseDetailContext();
  const [hovering, setHovering] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnchorEl(null);
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
            {/* {hovering && (
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <DragIndicator
                  fontSize="small"
                  sx={{ color: theme.palette.grey[500] }}
                />
              </IconButton>
            )} */}
            <TextMaxLine
              TypographyProps={{ fontWeight: "bold" }}
              sx={{
                color: theme.palette.grey[700],
              }}
            >
              {lessonData?.title}
            </TextMaxLine>
            {hovering && (
              <IconButton
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                size="small"
                onClick={handleClick}
              >
                <MoreVert
                  fontSize="small"
                  sx={{ color: theme.palette.grey[500] }}
                />
              </IconButton>
            )}
          </Stack>
          <TextMaxLine
            TypographyProps={{ variant: "body2" }}
            sx={{
              color: theme.palette.grey[500],
              wordBreak: "break-word",
            }}
          >
            {lessonData?.detail}
          </TextMaxLine>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          sx={{ color: theme.palette.primary.main }}
        >
          <Typography variant="body2">Học ngay</Typography>
          <ArrowForwardRounded fontSize="small" />
        </Stack>
      </Stack>
      <ConfirmDeleteLessonModal
        isModalOpen={isOpenConfirmModal}
        handleOpen={handleOpenModalConfirm}
        handleClose={handleCloseModalConfirm}
        handleDelete={handleDeleteLesson}
      />
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
        <MenuItem sx={{ color: theme.palette.grey[500] }} onClick={onClick}>
          Chỉnh sửa
        </MenuItem>
        <MenuItem sx={{ color: theme.palette.grey[500] }}>
          Thay đổi link
        </MenuItem>
        <MenuItem sx={{ color: theme.palette.grey[500] }}>
          Sao chép link
        </MenuItem>
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
          Xoá bài học
        </MenuItem>
      </Menu>
    </Card>
  );
}
