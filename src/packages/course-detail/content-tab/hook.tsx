import { Chapter, Lesson } from "@/lib/types/course";
import { useState } from "react";
import { useCourseDetailContext } from "../context";

export default function useContentTab() {
  const { courseData, setIsAddingLesson, isAddingLesson } =
    useCourseDetailContext();
  const [edittingChapter, setEdittingChapter] = useState<Chapter>();
  const [edittingLesson, setEdittingLesson] = useState<Lesson>();
  const [showModalUpload, setShowModalUpload] = useState<boolean>(false);

  function handleAddChapter() {}

  function handleAddLesson(chapter?: Chapter, lesson?: Lesson) {
    setEdittingChapter(chapter);
    setEdittingLesson(lesson);
    setIsAddingLesson(true);
  }

  function handleCancel() {
    setIsAddingLesson(false);
  }

  function handleOpenUploadDocsModal() {
    setShowModalUpload(true);
  }

  function handleCloseUploadDocsModal() {
    setShowModalUpload(false);
  }

  return {
    courseData,
    edittingChapter,
    edittingLesson,
    handleAddLesson,
    isAddingLesson,
    handleCancel,
    handleAddChapter,
    showModalUpload,
    handleOpenUploadDocsModal,
    handleCloseUploadDocsModal,
  };
}
