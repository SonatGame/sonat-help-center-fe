import { CourseApi } from "@/api/CourseApi";
import { CourseRes } from "@/lib/types/course";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface IForm {
  title: string;
  team: string;
  KSA: string;
}

export default function useCourseSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { control, watch } = useForm<IForm>({
    defaultValues: {
      title: "",
      team: "",
      KSA: "",
    },
  });
  const title = watch("title");
  const team = watch("team");
  const ksa = watch("KSA");

  const {
    data = {} as CourseRes,
    isLoading,
    mutate,
  } = useSWR(
    ["get-course-list", title, team, ksa],
    () =>
      CourseApi.getCourseList({
        title,
        team,
        ksa,
      }),
    { refreshInterval: 0, revalidateOnFocus: false }
  );

  function handleOpen() {
    setIsModalOpen(true);
  }
  function handleClose() {
    setIsModalOpen(false);
  }

  return {
    control,
    isModalOpen,
    handleOpen,
    handleClose,
    data,
    isLoading,
    mutate,
    title,
    team,
    ksa,
  };
}
