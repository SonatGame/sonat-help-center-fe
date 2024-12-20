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
import useSWR from "swr";

interface ContextProps {
  children?: React.ReactNode;
}

interface CourseDetailContextProps {
  value: string;
  setValue: (value: SetStateAction<string>) => void;
  handleChange: (e: SyntheticEvent, newValue: string) => void;
  courseData?: Course;
  isAddingLesson: boolean;
  setIsAddingLesson: Dispatch<SetStateAction<boolean>>;
}

const CourseDetailContext = createContext<CourseDetailContextProps>({
  value: "",
  setValue: () => {},
  handleChange: () => {},
  isAddingLesson: false,
  setIsAddingLesson: () => {},
});

const CourseDetailProvider = ({ children }: ContextProps) => {
  const [value, setValue] = useState("overview");
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const { courseId } = useParams<{ courseId: string }>();

  const { data, isLoading } = useSWR(
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
