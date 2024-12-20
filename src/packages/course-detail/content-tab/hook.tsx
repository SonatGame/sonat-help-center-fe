import { useCourseDetailContext } from "../context";

export default function useContentTab() {
  const { setValue: setTabValue, courseData } = useCourseDetailContext();

  return {
    setTabValue,
    courseData,
  };
}
