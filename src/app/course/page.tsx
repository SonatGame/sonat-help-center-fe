import { Metadata } from "next";
import CoursePage from ".";

export const metadata: Metadata = {
  title: "Course",
};

export default function CourseLayout() {
  return <CoursePage />;
}
