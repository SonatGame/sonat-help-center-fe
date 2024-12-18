import { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  name: string;
  team: string;
  ksa: string;
  thumbnail: File;
  coverImage: File;
}

export default function useCourseSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { control, setValue, watch, handleSubmit, reset } = useForm<IForm>({
    defaultValues: {
      name: "",
      team: "",
      ksa: "",
    },
  });

  function handleOpen() {
    setIsModalOpen(true);
  }
  function handleClose() {
    setIsModalOpen(false);
  }

  function onSubmit(data: IForm) {}

  return {
    isModalOpen,
    handleOpen,
    handleClose,
    control,
    handleSubmit,
    onSubmit,
  };
}
