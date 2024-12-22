import { useState } from "react";
import { useCourseDetailContext } from "./context";

export default function useCourseDetail() {
  const { handleChange, value, isAddingLesson, courseData } =
    useCourseDetailContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  function handleOpenModalEdit() {
    setIsModalOpen(true);
  }
  function handleCloseModalEdit() {
    setIsModalOpen(false);
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
    handleChange,
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
  };
}
