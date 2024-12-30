import { CourseApi } from "@/api/CourseApi";
import { AppRoutes } from "@/lib/constants/routesAndPermissions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCourseDetailContext } from "./context";

export default function useCourseDetail() {
  const {
    handleChangeTab,
    value,
    isAddingLesson,
    courseData,
    mutate: mutateCourse,
  } = useCourseDetailContext();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }

  function handleClose(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setAnchorEl(null);
  }
  return {
    handleChangeTab,
    value,
    isAddingLesson,
    courseData,
    isModalOpen,
    handleOpenModalEdit,
    handleCloseModalEdit,
    anchorEl,
    open,
    handleClick,
    handleClose,
    mutateCourse,
    isModalConfirmOpen,
    handleOpenModalConfirm,
    handleCloseModalConfirm,
    handleConfirmDeleteCourse,
  };
}
