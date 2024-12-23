"use client";

import { CourseApi } from "@/api/CourseApi";
import { Course } from "@/lib/types/course";
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
}

const CourseDetailContext = createContext<CourseDetailContextProps>({
  value: "",
  setValue: () => {},
  handleChange: () => {},
  isAddingLesson: false,
  setIsAddingLesson: () => {},
  isLoading: false,
  mutate: () => Promise.resolve(undefined),
});

const CourseDetailProvider = ({ children }: ContextProps) => {
  const [value, setValue] = useState("overview");
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const { courseId } = useParams<{ courseId: string }>();

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
      }}
    >
      {children}
    </CourseDetailContext.Provider>
  );
};

const useCourseDetailContext = () => useContext(CourseDetailContext);

export { CourseDetailProvider, useCourseDetailContext };
