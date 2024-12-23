import ModalWrapper from "@/components/modal";
import { Typography, useTheme } from "@mui/material";

export interface ICreateCourseModalProps {
  isModalOpen: boolean;
  handleOpen: () => any;
  handleClose: () => any;
  handleDelete: () => any;
}

export default function ConfirmDeleteLessonModal(
  props: ICreateCourseModalProps
) {
  const { isModalOpen, handleOpen, handleClose, handleDelete } = props;
  const theme = useTheme();

  return (
    <ModalWrapper
      title="Xóa bài học"
      dialogProps={{
        maxWidth: "sm",
        fullWidth: true,
        onClick: (e) => e.stopPropagation(),
      }}
      usingActions
      isOpen={isModalOpen}
      onOpen={handleOpen}
      onClose={handleClose}
      onApply={handleDelete}
      disableCloseOnApply
      applyButtonProps={{
        color: "error",
      }}
    >
      <Typography variant="body2" sx={{ color: theme.palette.grey[500] }}>
        Bạn có chắc chắn muốn xóa bài này không? Bạn sẽ không thể khôi phục lại
        chúng sau khi xóa. Hãy cân nhắc kỹ trước khi thực hiện.
      </Typography>
    </ModalWrapper>
  );
}
