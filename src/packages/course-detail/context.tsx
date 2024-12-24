"use client";

import { CourseApi } from "@/api/CourseApi";
import { Chapter, Course, Lesson } from "@/lib/types/course";
import { useParams } from "next/navigation";
import {
  createContext,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useContext,
  useState,
} from "react";
import useSWR, { KeyedMutator } from "swr";

interface ContextProps {
  children?: React.ReactNode;
}

interface CourseDetailContextProps {
  value: string;
  setValue: (value: SetStateAction<string>) => void;
  handleChange: (e: SyntheticEvent, newValue: string) => void;
  courseData?: Course;
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
  setValue: () => {},
  handleChange: () => {},
  isAddingLesson: false,
  setIsAddingLesson: () => {},
  isLoading: false,
  mutate: () => Promise.resolve(undefined),
  setEdittingChapter: () => {},
  setEdittingLesson: () => {},
});

const CourseDetailProvider = ({ children }: ContextProps) => {
  const { courseId } = useParams<{ courseId: string }>();
  const [value, setValue] = useState("overview");
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const [editingChapter, setEdittingChapter] = useState<Chapter>();
  const [editingLesson, setEdittingLesson] = useState<Lesson>();

  const { data, isLoading, mutate } = useSWR(
    ["get-course-detail", courseId],
    () => CourseApi.getCourse(courseId),
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
    }
  );

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <CourseDetailContext.Provider
      value={{
        value,
        setValue,
        handleChange,
        courseData: data,
        isLoading,
        mutate,
        isAddingLesson,
        setIsAddingLesson,
        editingChapter,
        setEdittingChapter,
        editingLesson,
        setEdittingLesson,
      }}
    >
      {children}
    </CourseDetailContext.Provider>
  );
};

const useCourseDetailContext = () => useContext(CourseDetailContext);

export { CourseDetailProvider, useCourseDetailContext };
