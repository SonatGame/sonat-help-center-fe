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
  isAddingLesson: boolean;
  setIsAddingLesson: Dispatch<SetStateAction<boolean>>;
  editingChapter?: Chapter;
  setEdittingChapter: Dispatch<SetStateAction<Chapter | undefined>>;
  editingLesson?: Lesson;
  setEdittingLesson: Dispatch<SetStateAction<Lesson | undefined>>;
}

const CourseDetailContext = createContext<CourseDetailContextProps>({
  value: "",
  handleChangeTab: () => {},
  isAddingLesson: false,
  setIsAddingLesson: () => {},
  isLoading: false,
  mutate: () => Promise.resolve(undefined),
  setEdittingChapter: () => {},
  setEdittingLesson: () => {},
  setCourseData: () => {},
});

const CourseDetailProvider = ({ children }: ContextProps) => {
  const router = useRouter();
  const { courseId } = useParams<{ courseId: string }>();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [value, setValue] = useState("overview");
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const [editingChapter, setEdittingChapter] = useState<Chapter>();
  const [editingLesson, setEdittingLesson] = useState<Lesson>();
  const [courseData, setCourseData] = useState<Course>();

  const { data, isLoading, mutate } = useSWR(
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

  return (
    <CourseDetailContext.Provider
      value={{
        value,
        handleChangeTab,
        courseData,
        isLoading,
        mutate,
        isAddingLesson,
        setIsAddingLesson,
        editingChapter,
        setEdittingChapter,
        editingLesson,
        setEdittingLesson,
        setCourseData,
      }}
    >
      {children}
    </CourseDetailContext.Provider>
  );
};

const useCourseDetailContext = () => useContext(CourseDetailContext);

export { CourseDetailProvider, useCourseDetailContext };
