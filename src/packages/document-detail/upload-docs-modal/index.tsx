import { CourseApi } from "@/api/CourseApi";
import RHFTextField from "@/components/form/RHFTextField";
import ModalWrapper from "@/components/modal";
import { getGoogleDocId } from "@/packages/course-detail/helper";
import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDocumentDetailContext } from "../context";

interface IForm {
  googleDocUrl: string;
}

export default function UploadDocsModal() {
  const {
    selectedResource: editingResource,
    showModalUpload: isModalOpen,
    handleCloseUploadDocsModal: handleClose,
    googleDocs,
    setGoogleDocs,
    updateResource,
  } = useDocumentDetailContext();
  const { control, handleSubmit, reset } = useForm<IForm>({
    defaultValues: {
      googleDocUrl: "",
    },
  });

  async function onSubmit(data: IForm) {
    const { googleDocUrl } = data;
    const googleDocsId = getGoogleDocId(googleDocUrl);
    if (!googleDocsId || !editingResource) return;
    const pdfBlob = await CourseApi.getPDFFile(googleDocsId);
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setGoogleDocs({
      url: googleDocUrl,
      pdf: pdfUrl,
    });
    await updateResource(editingResource._id, {
      googleDocUrl,
    });
    handleClose();
    reset();
  }

  useEffect(() => {
    if (!editingResource) reset();
    reset({ googleDocUrl: editingResource?.googleDocUrl });
  }, [editingResource, googleDocs, reset]);

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
