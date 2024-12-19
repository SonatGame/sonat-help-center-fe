"use client";

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
    <CourseDetailContext.Provider value={{ value, setValue, handleChange }}>
      {children}
    </CourseDetailContext.Provider>
  );
};

const useCourseDetail = () => useContext(CourseDetailContext);

export { CourseDetailProvider, useCourseDetail };
