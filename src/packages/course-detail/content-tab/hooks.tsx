import { CourseApi } from "@/api/CourseApi";
import { Chapter, Lesson } from "@/lib/types/course";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCourseDetailContext } from "../context";

export default function useContentTab() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    courseData,
    setCourseData,
    setIsEditLesson,
    isEditLesson,
    mutate: mutateCourse,
    editingChapter,
    setEdittingChapter,
    setEdittingLesson,
    setIsEditingChapterTitle,
    setChapterTitle,
    chapterTitle,
    isEditingChapterTitle,
    setShowModalCreate,
    editingLesson,
  } = useCourseDetailContext();

  const [showConfirmDeleteChapterModal, setShowConfirmDeleteChapterModal] =
    useState<boolean>(false);

  const inputRefs = useRef<{ [key: string]: HTMLDivElement | null }>({
    new: null,
  });

  const createQueryString = useCallback(
    (data: { name: string; value: string }[]) => {
      const params = new URLSearchParams(searchParams.toString());
      data.forEach((item) => params.set(item.name, item.value));

      return params.toString();
    },
    [searchParams]
  );

  function handleEditChapter(chapter?: Chapter) {
    if (chapter) {
      inputRefs.current[chapter._id]?.focus();
      setEdittingChapter(chapter);
      setChapterTitle(chapter.title);
    }
    setIsEditingChapterTitle(true);
  }

  function handleCancelEditChapter() {
    setEdittingChapter(undefined);
    setIsEditingChapterTitle(false);
    setChapterTitle("");
  }

  function handleSelectLesson(chapter: Chapter, lesson: Lesson) {
    router.push(
      pathname +
        "?" +
        createQueryString([
          { name: "chapterId", value: chapter._id },
          { name: "lessonId", value: lesson._id },
        ])
    );
    setEdittingChapter(chapter);
    setEdittingLesson(lesson);
    setIsEditLesson(true);
  }

  function handleCancel() {
    setIsEditLesson(false);
    setEdittingChapter(undefined);
    setEdittingLesson(undefined);
    router.push(pathname + "?tab=content");
  }

  function handleCreateLesson(chapter?: Chapter) {
    setEdittingChapter(chapter);
    setShowModalCreate(true);
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

  useEffect(() => {
    async function handleClickOutside(e: MouseEvent) {
      if (!isEditingChapterTitle || !courseData) return;
      if (
        !editingChapter &&
        chapterTitle.length > 0 &&
        inputRefs.current.new &&
        !inputRefs.current.new.contains(e.target as Node)
      ) {
        const temp = { ...courseData };
        temp.modules.push({
          _id: "",
          title: chapterTitle,
          lessons: [],
        });
        await CourseApi.createChapter(courseData._id, {
          title: chapterTitle,
          lessons: [],
        });
        await mutateCourse();
        handleCancelEditChapter();
        return;
      }
      if (
        editingChapter &&
        inputRefs.current[editingChapter._id] &&
        !inputRefs.current[editingChapter._id]?.contains(e.target as Node)
      ) {
        const temp = { ...courseData };
        for (let i = 0; i < temp.modules.length; i++) {
          const chapter = temp.modules[i];
          if (editingChapter._id === chapter._id) console.log(chapter._id);
          if (
            editingChapter._id === chapter._id &&
            chapter.title !== chapterTitle
          ) {
            chapter.title = chapterTitle;
            CourseApi.updateChapter(editingChapter._id, {
              title: chapterTitle,
            });
            break;
          }
        }
        setCourseData(temp);
        handleCancelEditChapter();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditingChapterTitle, chapterTitle, courseData, editingChapter]);

  return {
    courseData,
    editingChapter,
    isEditLesson,
    handleCancel,
    handleCreateLesson,
    showConfirmDeleteChapterModal,
    handleOpenConfirmDeleteChapterModal,
    handleConfirmDeleteChapter,
    handleEditChapter,
    handleCancelEditChapter,
    isEditingChapterTitle,
    inputRefs,
    setChapterTitle,
    chapterTitle,
    handleSelectLesson,
    handleCloseConfirmDeleteChapterModal,
    editingLesson,
  };
}
