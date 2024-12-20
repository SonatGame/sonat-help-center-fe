import { CourseApi } from "@/api/CourseApi";
import { useState } from "react";
import useSWR from "swr";

export default function useCourseSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, mutate } = useSWR(
    "get-course-list",
    () => CourseApi.getCourseList(),
    { refreshInterval: 0, revalidateOnFocus: false }
  );
  function handleOpen() {
    setIsModalOpen(true);
  }
  function handleClose() {
    setIsModalOpen(false);
  }

  return {
    isModalOpen,
    handleOpen,
    handleClose,
    data,
    isLoading,
  };
}
