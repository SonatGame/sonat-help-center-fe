"use client";

import { Course } from "@/lib/types/course";
import {
  createContext,
  SetStateAction,
  SyntheticEvent,
  useContext,
  useState,
} from "react";

interface ContextProps {
  children?: React.ReactNode;
}

interface CourseDetailContextProps {
  value: string;
  setValue: (value: SetStateAction<string>) => void;
  handleChange: (e: SyntheticEvent, newValue: string) => void;
  courseData?: Course;
}

const CourseDetailContext = createContext<CourseDetailContextProps>({
  value: "",
  setValue: () => {},
  handleChange: () => {},
});

const CourseDetailProvider = ({ children }: ContextProps) => {
  const [value, setValue] = useState("overview");
  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <CourseDetailContext.Provider
      value={{ value, setValue, handleChange, courseData: fakeCourseData }}
    >
      {children}
    </CourseDetailContext.Provider>
  );
};

const useCourseDetailContext = () => useContext(CourseDetailContext);

export { CourseDetailProvider, useCourseDetailContext };

const fakeCourseData = {
  _id: "6763c00805d7f3569e8aeb03",
  title: "Onboarding course",
  description: "Onboarding course overview",
  learningOutcomes: ["Learn the basics", "Understand the process"],
  modules: [
    {
      title: "Module 1",
      description: "Module 1 description",
      lessons: [
        {
          _id: "6763c00805d7f3569e8aeaff",
          title: "Game domain part 1",
        },
      ],
      _id: "6763c00805d7f3569e8aeb04",
    },
  ],
  team: "BI",
  KSA: "Knowledge",
  thumbnailUrl: "https://example.com/thumbnail.jpg",
  coverImageUrl: "https://example.com/cover.jpg",
  ratings: [],
  comments: [],
  tests: [
    {
      _id: "6763c00805d7f3569e8aeb01",
      name: "Test VHDN",
    },
  ],
  createdAt: "2024-12-19T06:41:12.475Z",
  updatedAt: "2024-12-19T06:41:12.475Z",
  rating: {
    rating: 0,
    count: 0,
  },
};
