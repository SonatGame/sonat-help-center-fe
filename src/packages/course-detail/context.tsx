"use client";

import { CourseApi } from "@/api/CourseApi";
import { AppRoutes } from "@/lib/constants/routesAndPermissions";
import { Chapter, Course, Lesson } from "@/lib/types/course";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import useSWR, { KeyedMutator } from "swr";

interface ContextProps {
  children?: React.ReactNode;
}

interface CourseDetailContextProps {
  value: string;
  handleChangeTab: (newValue: string) => void;
  courseData?: Course;
  setCourseData: Dispatch<SetStateAction<Course | undefined>>;
  isLoading: boolean;
  mutate: KeyedMutator<Course>;
  isEditLesson: boolean;
  setIsEditLesson: Dispatch<SetStateAction<boolean>>;
  editingChapter?: Chapter;
  setEdittingChapter: Dispatch<SetStateAction<Chapter | undefined>>;
  editingLesson?: Lesson;
  setEdittingLesson: Dispatch<SetStateAction<Lesson | undefined>>;
  setIsEditingChapterTitle: Dispatch<SetStateAction<boolean>>;
  isEditingChapterTitle: boolean;
  setChapterTitle: Dispatch<SetStateAction<string>>;
  chapterTitle: string;
  setLessonData: Dispatch<
    SetStateAction<{
      title: string;
      description: string;
      url: string;
      pdf: string;
    }>
  >;
  lessonData: {
    title: string;
    description: string;
    url: string;
    pdf: string;
  };
  setShowModalCreate: Dispatch<SetStateAction<boolean>>;
  showModalCreate: boolean;
}

const CourseDetailContext = createContext<CourseDetailContextProps>({
  value: "",
  handleChangeTab: () => {},
  isEditLesson: false,
  setIsEditLesson: () => {},
  isLoading: false,
  mutate: () => Promise.resolve(undefined),
  setEdittingChapter: () => {},
  setEdittingLesson: () => {},
  setCourseData: () => {},
  setIsEditingChapterTitle: () => {},
  isEditingChapterTitle: false,
  setChapterTitle: () => {},
  chapterTitle: "",
  setLessonData: () => {},
  lessonData: {
    title: "",
    description: "",
    url: "",
    pdf: "",
  },
  setShowModalCreate: () => {},
  showModalCreate: false,
});

const CourseDetailProvider = ({ children }: ContextProps) => {
  const router = useRouter();
  const { courseId } = useParams<{ courseId: string }>();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const chapterId = searchParams.get("chapterId");
  const lessonId = searchParams.get("lessonId");
  const [value, setValue] = useState("overview");
  const [isEditLesson, setIsEditLesson] = useState(false);
  const [editingChapter, setEdittingChapter] = useState<Chapter>();
  const [editingLesson, setEdittingLesson] = useState<Lesson>();
  const [courseData, setCourseData] = useState<Course>();
  const [isEditingChapterTitle, setIsEditingChapterTitle] =
    useState<boolean>(false);
  const [chapterTitle, setChapterTitle] = useState<string>("");
  const [lessonData, setLessonData] = useState({
    title: "",
    description: "",
    url: "",
    pdf: "",
  });
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);

  const {
    data,
    isLoading = true,
    mutate,
  } = useSWR(
    ["get-course-detail", courseId],
    () => CourseApi.getCourse(courseId),
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
    }
  );

  const handleChangeTab = (newValue: string) => {
    router.push(`${AppRoutes.COURSE}${courseId}?tab=${newValue}`);
  };

  useEffect(() => {
    setCourseData(data);
  }, [data]);

  useEffect(() => {
    if (tab) setValue(tab);
  }, [tab]);

  useEffect(() => {
    if (data && chapterId && lessonId) {
      const chapter = data?.modules?.find((item) => item._id === chapterId);
      const lesson = chapter?.lessons?.find((item) => item._id === lessonId);
      if (chapter && lesson) {
        setEdittingChapter(chapter);
        setEdittingLesson(lesson);
        setIsEditLesson(true);
      }
    }
  }, [data, chapterId, lessonId]);

  return (
    <CourseDetailContext.Provider
      value={{
        value,
        handleChangeTab,
        courseData,
        isLoading,
        mutate,
        isEditLesson,
        setIsEditLesson,
        editingChapter,
        setEdittingChapter,
        editingLesson,
        setEdittingLesson,
        setCourseData,
        setIsEditingChapterTitle,
        isEditingChapterTitle,
        setChapterTitle,
        chapterTitle,
        setLessonData,
        lessonData,
        setShowModalCreate,
        showModalCreate,
      }}
    >
      {children}
    </CourseDetailContext.Provider>
  );
};

const useCourseDetailContext = () => useContext(CourseDetailContext);

export { CourseDetailProvider, useCourseDetailContext };
