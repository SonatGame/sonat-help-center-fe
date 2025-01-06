import { CourseApi } from "@/api/CourseApi";
import { RHFImagePicker } from "@/components/form/RHFImagePicker";
import RHFSelect from "@/components/form/RHFSelect";
import RHFTextField from "@/components/form/RHFTextField";
import ModalWrapper from "@/components/modal";
import { ksaOptions, teamOptions } from "@/packages/course/constants";
import { Add } from "@mui/icons-material";
import { Grid2, Stack } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCourseDetailContext } from "../context";

export interface ICreateCourseModalProps {
  isModalOpen: boolean;
  handleOpen: () => any;
  handleClose: () => any;
  isEditing?: boolean;
  mutate?: () => any;
}

interface IForm {
  title: string;
  team: string;
  KSA: string;
  thumbnail: File;
  coverImage: File;
}

export default function CreateCourseModal(props: ICreateCourseModalProps) {
  const { isModalOpen, handleOpen, handleClose, isEditing, mutate } = props;
  const { courseData: editingCourse } = useCourseDetailContext();

  const { control, handleSubmit, reset } = useForm<IForm>({
    defaultValues: {
      title: "",
      team: "",
      KSA: "",
    },
  });

  async function onSubmit(data: IForm) {
    const { title, team, KSA, thumbnail, coverImage } = data;
    let res;
    if (!editingCourse)
      res = await CourseApi.createCourse({
        title,
        team,
        KSA,
        thumbnail,
        coverImage,
      });
    else
      res = await CourseApi.updateCourse(editingCourse._id, {
        title,
        team,
        KSA,
        thumbnail,
        coverImage,
      });
    if (res && mutate) {
      await mutate();
      reset();
      handleClose();
    }
  }

  useEffect(() => {
    if (!editingCourse) {
      reset();
      return;
    }
    reset({
      title: editingCourse.title,
      team: editingCourse.team,
      KSA: editingCourse.KSA,
    });
  }, [editingCourse, reset]);

  return (
    <ModalWrapper
      title={!isEditing ? "Tạo khóa học mới" : "Chỉnh sửa khóa học"}
      buttonTitle={!isEditing ? "Tạo khóa học mới" : "Chỉnh sửa"}
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
          label="Tên khóa học"
          name="title"
          control={control}
          required
          rules={{
            required: "Vui lòng nhập tên khóa học",
          }}
        />
        <RHFSelect
          label="Team"
          name="team"
          control={control}
          options={teamOptions}
          required
          rules={{
            required: "Vui lòng chọn team",
          }}
        />
        <RHFSelect
          label="KSA"
          name="KSA"
          control={control}
          options={ksaOptions}
          required
          rules={{
            required: "Vui lòng chọn KSA",
          }}
        />
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <RHFImagePicker
              label="Ảnh đại diện"
              name="thumbnail"
              control={control}
              required
              rules={
                !editingCourse
                  ? {
                      required: "Vui lòng chọn Ảnh đại diện",
                    }
                  : undefined
              }
              imageUrl={editingCourse?.thumbnail}
              sx={{ height: "100%" }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <RHFImagePicker
              label="Ảnh bìa"
              name="coverImage"
              control={control}
              required
              rules={
                !editingCourse
                  ? {
                      required: "Vui lòng chọn Ảnh bìa",
                    }
                  : undefined
              }
              imageUrl={editingCourse?.coverImage}
              sx={{ height: "100%" }}
            />
          </Grid2>
        </Grid2>
      </Stack>
    </ModalWrapper>
  );
}
