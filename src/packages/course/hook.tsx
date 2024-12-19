import { useState } from "react";

export default function useCourseSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  };
}
