import { CourseApi } from "@/api/CourseApi";
import RHFRadioGroup from "@/components/form/RHFRadioGroup";
import RHFTextField from "@/components/form/RHFTextField";
import ModalWrapper from "@/components/modal";
import { Stack, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCourseDetailContext } from "../../context";
import { getGoogleDocId } from "../../helper";
interface IForm {
  title: string;
  description: string;
  importSource: string;
  googleDocUrl: string;
}

export default function CreateLessonModal() {
  const theme = useTheme();
  const {
    courseData,
    setLessonData,
    lessonData,
    setShowModalCreate,
    showModalCreate,
    editingChapter,
    editingLesson,
    mutate: mutateCourse,
    isEditLesson,
  } = useCourseDetailContext();

  const { control, handleSubmit, reset, watch } = useForm<IForm>({
    defaultValues: {
      googleDocUrl: "",
      title: "",
      description: "",
      importSource: "docs",
    },
  });
  const importSource = watch("importSource");
  console.log(lessonData);
  async function onSubmit(data: IForm) {
    const { googleDocUrl, title, description, importSource } = data;
    const googleDocsId = getGoogleDocId(googleDocUrl);
    if (!googleDocsId) return;
    const [res, pdfBlob] = await Promise.all([
      CourseApi.getDocsContent(googleDocsId),
      isEditLesson ? CourseApi.getPDFFile(googleDocsId) : new Blob(),
    ]);

    const pdfUrl = URL.createObjectURL(pdfBlob);
    const newTitle = importSource === "docs" ? res.title : title;
    const newDescription =
      importSource === "docs" ? res.description : description;

    const lessonPayload = {
      title: newTitle,
      googleDocUrl,
      detail: newDescription,
    };

    if (!editingChapter && !editingLesson) {
      if (!courseData) return;
      await CourseApi.createChapter(courseData._id, {
        title: "Chương không có tiêu đề",
        lessons: [lessonPayload],
      });
    } else if (editingLesson) {
      await CourseApi.updateLesson(editingLesson._id, lessonPayload);
    } else if (editingChapter) {
      await CourseApi.createLesson(editingChapter._id, lessonPayload);
    }

    await mutateCourse();
    setLessonData({
      title: res.title,
      description: res.description,
      url: googleDocUrl,
      pdf: pdfUrl,
    });
    handleCloseModal();
  }

  function handleCloseModal() {
    setShowModalCreate(false);
    reset();
  }

  useEffect(() => {
    reset({
      googleDocUrl: lessonData.url,
      title: lessonData.title,
      description: lessonData.description,
    });
  }, [lessonData, reset]);

  return (
    <ModalWrapper
      title="Đăng tải tài liệu"
      dialogProps={{
        maxWidth: "sm",
        fullWidth: true,
      }}
      usingActions
      isOpen={showModalCreate}
      onClose={handleCloseModal}
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
          name="importSource"
          control={control}
          defaultValue={"docs"}
          options={[
            {
              label: "Nhập tiêu đề và mô tả từ docs",
              value: "docs",
            },
            {
              label: "Tự nhập tiêu đề và mô tả",
              value: "custom",
            },
          ]}
        />
        {importSource === "custom" && (
          <>
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
          </>
        )}
      </Stack>
    </ModalWrapper>
  );
}
