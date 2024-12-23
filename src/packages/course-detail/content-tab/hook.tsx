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
  const [edittingChapter, setEdittingChapter] = useState<Chapter>();
  const [edittingLesson, setEdittingLesson] = useState<Lesson>();
  const [showModalUpload, setShowModalUpload] = useState<boolean>(false);
  const [showConfirmDeleteChapterModal, setShowConfirmDeleteChapterModal] =
    useState<boolean>(false);
  const [googleDocsUrl, setGoogleDocsUrl] = useState<string>("");
  const [googleDocsContent, setGoogleDocsContent] = useState<string>("");

  function handleAddChapter() {
    if (!courseData) return;
    CourseApi.createChapter(courseData?._id, {
      title: "",
      lessons: [],
    });
  }

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

  function handleOpenConfirmDeleteChapterModal(chapter: Chapter) {
    setEdittingChapter(chapter);
    setShowConfirmDeleteChapterModal(true);
  }

  function handleCloseConfirmDeleteChapterModal() {
    setShowConfirmDeleteChapterModal(false);
    setEdittingChapter(undefined);
  }

  async function handleConfirmDeleteChapter() {
    if (!edittingChapter) return;
    await CourseApi.deleteChapter(edittingChapter?._id);
    await mutateCourse();
    handleCloseConfirmDeleteChapterModal();
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
    showConfirmDeleteChapterModal,
    handleOpenConfirmDeleteChapterModal,
    handleCloseConfirmDeleteChapterModal,
    handleConfirmDeleteChapter,
    googleDocsUrl,
    setGoogleDocsUrl,
    googleDocsContent,
    setGoogleDocsContent,
  };
}
