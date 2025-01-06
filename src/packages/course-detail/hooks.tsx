import { CourseApi } from "@/api/CourseApi";
import { AppRoutes } from "@/lib/constants/routesAndPermissions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCourseDetailContext } from "./context";

export default function useCourseDetail() {
  const {
    handleChangeTab,
    value,
    isEditLesson,
    courseData,
    mutate: mutateCourse,
  } = useCourseDetailContext();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);

  function handleOpenModalEdit() {
    setIsModalOpen(true);
  }

  function handleCloseModalEdit() {
    setIsModalOpen(false);
  }

  function handleOpenModalConfirm() {
    setIsModalConfirmOpen(true);
  }

  function handleCloseModalConfirm() {
    setIsModalConfirmOpen(false);
  }

  async function handleConfirmDeleteCourse() {
    if (!courseData) return;
    await CourseApi.deleteCourse(courseData._id);
    router.push(AppRoutes.COURSE);
    handleCloseModalConfirm();
  }

  return {
    handleChangeTab,
    value,
    isEditLesson,
    courseData,
    isModalOpen,
    handleOpenModalEdit,
    handleCloseModalEdit,
    mutateCourse,
    isModalConfirmOpen,
    handleOpenModalConfirm,
    handleCloseModalConfirm,
    handleConfirmDeleteCourse,
  };
}
