import { DocumentApi } from "@/api/DocumentApi";
import { RHFImagePicker } from "@/components/form/RHFImagePicker";
import RHFTextField from "@/components/form/RHFTextField";
import ModalWrapper from "@/components/modal";
import { Add } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";

export interface ICreateDocumentModalProps {
  isModalOpen: boolean;
  handleOpen: () => any;
  handleClose: () => any;
  isEditing?: boolean;
  mutate?: any;
}

interface IForm {
  title: string;
  description: string;
  thumbnail: File;
  sharedUsers: string[];
}

export default function CreateDocumentModal(props: ICreateDocumentModalProps) {
  const { isModalOpen, handleOpen, handleClose, isEditing, mutate } = props;

  const { control, handleSubmit, reset } = useForm<IForm>({
    defaultValues: {
      title: "",
      description: "",
      sharedUsers: [],
    },
  });

  async function onSubmit(data: IForm) {
    const { title, description, thumbnail, sharedUsers } = data;
    await DocumentApi.createCollection({
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
      title={!isEditing ? "Tạo bộ tài liệu" : "Chỉnh sửa tài liệu"}
      buttonTitle={!isEditing ? "Tạo bộ tài liệu" : "Chỉnh sửa"}
      buttonProps={
        !isEditing
          ? {
              variant: "contained",
              startIcon: <Add />,
            }
          : {
              variant: "outlined",
            }
      }
      dialogProps={{
        maxWidth: "sm",
        fullWidth: true,
      }}
      usingActions
      isOpen={isModalOpen}
      onOpen={handleOpen}
      onClose={handleClose}
      onApply={handleSubmit(onSubmit)}
      disableCloseOnApply
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
          imageUrl={""}
          sx={{ height: "100%" }}
        />
      </Stack>
    </ModalWrapper>
  );
}
