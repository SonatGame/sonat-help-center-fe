import { CourseApi } from "@/api/CourseApi";
import RHFRadioGroup from "@/components/form/RHFRadioGroup";
import RHFTextField from "@/components/form/RHFTextField";
import ModalWrapper from "@/components/modal";
import { Stack, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCourseDetailContext } from "../../context";
import { getGoogleDocId } from "../../helper";

export interface ICreateCourseModalProps {
  isModalOpen: boolean;
}

interface IForm {
  title: string;
  description: string;
  importFromFile: string;
  googleDocUrl: string;
}

export default function CreateLessonModal(props: ICreateCourseModalProps) {
  const { isModalOpen } = props;
  const theme = useTheme();
  const { googleDocs, setGoogleDocs, setShowModalCreate } =
    useCourseDetailContext();
  const { control, handleSubmit, reset } = useForm<IForm>({
    defaultValues: {
      googleDocUrl: "",
      title: "",
      description: "",
      importFromFile: "docs",
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
    setShowModalCreate(false);
    reset();
  }

  useEffect(() => {
    reset({ googleDocUrl: googleDocs.url });
  }, [googleDocs, reset]);

  return (
    <ModalWrapper
      title="Đăng tải tài liệu"
      dialogProps={{
        maxWidth: "sm",
        fullWidth: true,
      }}
      usingActions
      isOpen={isModalOpen}
      onClose={() => setShowModalCreate(false)}
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
            placeholder: "Nhập đường dẫn",
            autoComplete: "off",
          }}
        />
        <Typography
          variant="caption"
          sx={{ color: theme.palette.grey[500], wordBreak: "break-all" }}
        >
          Vui lòng chia sẻ tài liệu của bạn với email:
          docs-922@sonat-help-center-be-dev.iam.gserviceaccount.com
        </Typography>
        <RHFRadioGroup
          name="importFromFile"
          control={control}
          options={[
            {
              label: "Nhập tên tài liệu và mô tả từ docs",
              value: "docs",
            },
            {
              label: "Tự ",
              value: "custom",
            },
          ]}
        />
        <RHFTextField
          label="Tên bài học"
          name="title"
          control={control}
          required
          rules={{
            required: "Vui lòng nhập tên bài học",
          }}
          TextFieldProps={{
            placeholder: "Nhập tên bài học",
            autoComplete: "off",
          }}
        />
        <RHFTextField
          label="Mô tả"
          name="description"
          control={control}
          required
          rules={{
            required: "Vui lòng nhập mô tả",
          }}
          TextFieldProps={{
            placeholder: "Nhập mô tả",
            autoComplete: "off",
          }}
        />
      </Stack>
    </ModalWrapper>
  );
}
