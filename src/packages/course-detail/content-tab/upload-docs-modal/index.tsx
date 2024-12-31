import { CourseApi } from "@/api/CourseApi";
import RHFTextField from "@/components/form/RHFTextField";
import ModalWrapper from "@/components/modal";
import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCourseDetailContext } from "../../context";
import { getGoogleDocId } from "../../helper";

export interface ICreateCourseModalProps {
  isModalOpen: boolean;
  handleClose: () => any;
}

interface IForm {
  googleDocUrl: string;
}

export default function UploadDocsModal(props: ICreateCourseModalProps) {
  const { isModalOpen, handleClose } = props;
  const { editingLesson, googleDocs, setGoogleDocs } = useCourseDetailContext();
  const { control, handleSubmit, reset } = useForm<IForm>({
    defaultValues: {
      googleDocUrl: "",
    },
  });

  async function onSubmit(data: IForm) {
    const { googleDocUrl } = data;
    const googleDocsId = getGoogleDocId(googleDocUrl);
    if (!googleDocsId) return;
    const res = await CourseApi.getHTMLContent(googleDocsId);
    const pdfBlob = await CourseApi.getPDFFile(googleDocsId);
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setGoogleDocs({
      title: res.title,
      url: googleDocUrl,
      pdf: pdfUrl,
    });
    handleClose();
    reset();
  }

  useEffect(() => {
    console.log(googleDocs);
    if (!editingLesson) reset();
    reset({ googleDocUrl: editingLesson?.googleDocUrl });
  }, [editingLesson, googleDocs, reset]);

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
      <Stack gap={1}>
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
        <Typography variant="caption" sx={{ wordBreak: "break-all" }}>
          Vui lòng chia sẻ tài liệu của bạn với email:
          docs-922@sonat-help-center-be-dev.iam.gserviceaccount.com
        </Typography>
      </Stack>
    </ModalWrapper>
  );
}
