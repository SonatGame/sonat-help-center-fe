import { useCourseDetailContext } from "../context";

export default function useContentTab() {
  const { courseData, setIsAddingLesson, isAddingLesson } =
    useCourseDetailContext();

  function handleAddLesson() {
    setIsAddingLesson(true);
  }

  function handleCancel() {
    setIsAddingLesson(false);
  }

  function handleUploadDocs() {}

  return {
    courseData,
    handleAddLesson,
    isAddingLesson,
    handleCancel,
  };
}
