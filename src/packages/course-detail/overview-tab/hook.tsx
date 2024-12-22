import { CourseApi } from "@/api/CourseApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCourseDetailContext } from "../context";

interface IForm {
  isEdittingDescription: boolean;
  isEdittingOutcomes: boolean;
  description: string;
  outcomes: string[];
}

export default function useOverviewTab() {
  const {
    setValue: setTabValue,
    courseData,
    mutate,
    isLoading,
  } = useCourseDetailContext();
  const { control, setValue, watch, reset } = useForm<IForm>({
    defaultValues: {
      isEdittingDescription: false,
      isEdittingOutcomes: false,
      description: "",
      outcomes: [],
    },
  });
  const isEdittingDescription = watch("isEdittingDescription");
  const isEdittingOutcomes = watch("isEdittingOutcomes");
  const description = watch("description");
  const outcomes = watch("outcomes");

  function handleEnableEditDescription() {
    setValue("isEdittingDescription", true);
  }

  function handleCancelEditDescription() {
    setValue("isEdittingDescription", false);
  }

  function handleAddChapter() {
    setTabValue("content");
  }

  async function handleChangeDescription() {
    if (!courseData) return;
    await CourseApi.updateCourse(courseData._id, {
      description: description,
    });
    await mutate();
    handleCancelEditDescription();
  }

  function handleAddOutcome() {
    setValue("isEdittingOutcomes", true);
    setValue("outcomes", [...(outcomes ?? []), ""]);
  }

  function handleCancelEditOutcome() {
    setValue("isEdittingOutcomes", false);
  }

  async function handleChangeOutcome() {
    if (!courseData) return;
    await CourseApi.updateCourse(courseData._id, {
      learningOutcomes: outcomes,
    });
    await mutate();
    handleCancelEditOutcome();
  }

  useEffect(() => {
    if (!courseData) reset();
    reset({
      description: courseData?.description,
      outcomes: courseData?.learningOutcomes,
    });
  }, [courseData, reset]);

  return {
    isEdittingDescription,
    isEdittingOutcomes,
    handleEnableEditDescription,
    handleCancelEditDescription,
    handleCancelEditOutcome,
    handleAddChapter,
    control,
    handleChangeDescription,
    handleAddOutcome,
    handleChangeOutcome,
    courseData,
  };
}
