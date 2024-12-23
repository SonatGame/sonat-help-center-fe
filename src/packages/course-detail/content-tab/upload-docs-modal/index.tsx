import { CourseApi } from "@/api/CourseApi";
import RHFTextField from "@/components/form/RHFTextField";
import ModalWrapper from "@/components/modal";
import { Lesson } from "@/lib/types/course";
import { Stack } from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getGoogleDocId } from "../../helper";

export interface ICreateCourseModalProps {
  isModalOpen: boolean;
  handleClose: () => any;
  googleDocs: {
    title: string;
    url: string;
    htmlContent: string;
  };
  setGoogleDocs: Dispatch<
    SetStateAction<{
      title: string;
      url: string;
      htmlContent: string;
    }>
  >;
  edittingLesson?: Lesson;
}

interface IForm {
  googleDocUrl: string;
}

export default function UploadDocsModal(props: ICreateCourseModalProps) {
  const {
    isModalOpen,
    handleClose,
    googleDocs,
    setGoogleDocs,
    edittingLesson,
  } = props;
  const { control, handleSubmit, reset } = useForm<IForm>({
    defaultValues: {
      googleDocUrl: "",
    },
  });

  async function onSubmit(data: IForm) {
    const { googleDocUrl } = data;
    setGoogleDocs({ ...googleDocs, url: googleDocUrl });
    const googleDocsId = getGoogleDocId(googleDocUrl);
    if (!googleDocsId) return;
    const res = await CourseApi.getHTMLContent(googleDocsId);
    setGoogleDocs({ ...googleDocs, ...res });
    handleClose();
    reset();
  }

  useEffect(() => {
    if (!edittingLesson) reset();
    reset({ googleDocUrl: edittingLesson?.googleDocUrl });
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
            required: "Vui lòng nhập đường dẫn tới google docs",
          }}
          TextFieldProps={{
            placeholder: "Nhập đường dẫn ",
            autoComplete: "off",
          }}
        />
      </Stack>
    </ModalWrapper>
  );
}
