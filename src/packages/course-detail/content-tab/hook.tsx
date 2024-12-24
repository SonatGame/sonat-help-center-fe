import { CourseApi } from "@/api/CourseApi";
import { Chapter, Lesson } from "@/lib/types/course";
import { useState } from "react";
import { useCourseDetailContext } from "../context";

export default function useContentTab() {
  const {
    courseData,
    setIsAddingLesson,
    isAddingLesson,
    mutate: mutateCourse,
  } = useCourseDetailContext();
  const [editingChapter, setEdittingChapter] = useState<Chapter>();
  const [editingLesson, setEdittingLesson] = useState<Lesson>();
  const [isEditingChapterTitle, setIsEditingChapterTitle] =
    useState<boolean>(false);
  const [chapterTitle, setChapterTitle] = useState<string>("");
  const [showModalUpload, setShowModalUpload] = useState<boolean>(false);
  const [showConfirmDeleteChapterModal, setShowConfirmDeleteChapterModal] =
    useState<boolean>(false);
  const [googleDocs, setGoogleDocs] = useState({
    title: "",
    url: "",
    htmlContent: "",
  });

  async function handleAddChapter() {
    if (!courseData) return;
    await CourseApi.createChapter(courseData?._id, {
      title: "",
      lessons: [],
    });
  }

  function handleEditChapter(chapter: Chapter) {
    setEdittingChapter(chapter);
    setIsEditingChapterTitle(true);
  }

  function handleCancelEditChapter() {
    setEdittingChapter(undefined);
    setIsEditingChapterTitle(false);
  }

  function handleAddLesson(chapter?: Chapter, lesson?: Lesson) {
    setEdittingChapter(chapter);
    setEdittingLesson(lesson);
    setIsAddingLesson(true);
    setGoogleDocs({
      title: "",
      url: "",
      htmlContent: "",
    });
  }

  function handleCancel() {
    setIsAddingLesson(false);
    setEdittingChapter(undefined);
    setEdittingLesson(undefined);
  }

  function handleOpenUploadDocsModal() {
    setShowModalUpload(true);
  }

  function handleCloseUploadDocsModal() {
    setShowModalUpload(false);
  }

  function handleOpenConfirmDeleteChapterModal(chapter: Chapter) {
    setEdittingChapter(chapter);
    setShowConfirmDeleteChapterModal(true);
  }

  function handleCloseConfirmDeleteChapterModal() {
    setShowConfirmDeleteChapterModal(false);
    setEdittingChapter(undefined);
  }

  async function handleConfirmDeleteChapter() {
    if (!editingChapter) return;
    await CourseApi.deleteChapter(editingChapter?._id);
    await mutateCourse();
    handleCloseConfirmDeleteChapterModal();
  }

  return {
    courseData,
    editingChapter,
    editingLesson,
    handleAddLesson,
    isAddingLesson,
    handleCancel,
    handleAddChapter,
    showModalUpload,
    handleOpenUploadDocsModal,
    handleCloseUploadDocsModal,
    showConfirmDeleteChapterModal,
    handleOpenConfirmDeleteChapterModal,
    handleCloseConfirmDeleteChapterModal,
    handleConfirmDeleteChapter,
    googleDocs,
    setGoogleDocs,
    handleEditChapter,
    handleCancelEditChapter,
  };
}
