import { CourseApi } from "@/api/CourseApi";
import RHFTextField from "@/components/form/RHFTextField";
import ModalWrapper from "@/components/modal";
import { Lesson } from "@/lib/types/course";
import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export interface ICreateCourseModalProps {
  isModalOpen: boolean;
  handleClose: () => any;
  edittingLesson?: Lesson;
}

interface IForm {
  googleDocUrl: string;
}

export default function UploadDocsModal(props: ICreateCourseModalProps) {
  const { isModalOpen, handleClose, edittingLesson } = props;
  const { control, handleSubmit, reset } = useForm<IForm>({
    defaultValues: {
      googleDocUrl: "",
    },
  });

  async function onSubmit(data: IForm) {
    if (!edittingLesson) return;
    const { googleDocUrl } = data;
    const res = await CourseApi.updateLesson(edittingLesson._id, {
      googleDocUrl,
    });
  }

  useEffect(() => {
    if (!edittingLesson) reset();
    reset({ googleDocUrl: edittingLesson?.googleDocsUrl });
  }, [edittingLesson, reset]);

  return (
    <ModalWrapper
      title="Đăng tải tài liệu"
      dialogProps={{
        maxWidth: "sm",
        fullWidth: true,
      }}
      usingActions
      isOpen={isModalOpen}
      onClose={handleClose}
      onApply={handleSubmit(onSubmit)}
      disableCloseOnApply
    >
      <Stack gap={3}>
        <RHFTextField
          label="Đường dẫn (tài liệu dưới dạng Doc)"
          name="googleDocUrl"
          control={control}
          required
          rules={{
            required: "Vui lòng nhập tên khóa học",
          }}
          TextFieldProps={{
            placeholder: "Nhập đường dẫn ",
          }}
        />
      </Stack>
    </ModalWrapper>
  );
}
