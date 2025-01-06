import { DocumentApi } from "@/api/DocumentApi";
import { RHFImagePicker } from "@/components/form/RHFImagePicker";
import RHFTextField from "@/components/form/RHFTextField";
import ModalWrapper from "@/components/modal";
import { Collection } from "@/lib/types/document";
import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export interface IEditDocumentModalProps {
  isModalOpen: boolean;
  handleClose: () => any;
  mutate?: any;
  data: Collection;
}

interface IForm {
  title: string;
  description: string;
  thumbnail: File;
  sharedUsers: string[];
}

export default function EditDocumentModal(props: IEditDocumentModalProps) {
  const { isModalOpen, handleClose, mutate, data } = props;

  const { control, handleSubmit, reset, setValue } = useForm<IForm>({
    defaultValues: {
      title: data?.title ?? "",
      description: data?.description ?? "",
      sharedUsers: data?.sharedUsers ?? [],
      // thumbnail: data?.thumbnail ?? null,
    },
  });

  const handleSetThumbnail = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      // Create a File object from the blob
      const file = new File([blob], `${data._id}_thumbnail.jpg`, {
        type: blob.type,
      });

      // Set the value in the form
      setValue("thumbnail", file);
      console.log("Thumbnail set successfully:");
    } catch (error) {
      console.error("Error setting thumbnail:", error);
    }
  };

  useEffect(() => {
    if (data && isModalOpen) {
      setValue("title", data.title ?? "");
      setValue("description", data.description ?? "");
      setValue("sharedUsers", data.sharedUsers ?? []);
      handleSetThumbnail(data.thumbnail);
    }
  }, [data, isModalOpen, setValue]);

  async function onSubmit(formData: IForm) {
    const { title, description, thumbnail, sharedUsers } = formData;
    await DocumentApi.updateCollection(data._id, {
      title,
      description,
      thumbnail,
      sharedUsers,
    });
    reset();
    mutate();
    handleClose();
  }

  return (
    <ModalWrapper
      title={"Chỉnh sửa tài liệu"}
      isOpen={isModalOpen}
      usingActions
      onApply={handleSubmit(onSubmit)}
      onClose={handleClose}
      applyButtonProps={{
        color: "primary",
      }}
      disableCloseOnApply
      dialogProps={{
        maxWidth: "sm",
        fullWidth: true,
      }}
      applyButtonText="Lưu"
    >
      <Stack gap={3}>
        <RHFTextField
          label="Tên"
          name="title"
          control={control}
          required
          rules={{
            required: "Vui lòng nhập tên tài liệu",
          }}
          TextFieldProps={{
            placeholder: "Nhập tên tài liệu",
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
            multiline: true,
            rows: 5,
          }}
        />
        <RHFImagePicker
          label="Ảnh  "
          name="thumbnail"
          control={control}
          required
          rules={{
            required: "Vui lòng chọn ảnh bìa",
          }}
          imageUrl={data.thumbnail}
          sx={{ height: "100%" }}
        />
      </Stack>
    </ModalWrapper>
  );
}
