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
  const { setValue: setTabValue, courseData } = useCourseDetailContext();
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

  function handleChangeDescription() {
    handleCancelEditDescription();
  }

  function handleAddOutcome() {
    setValue("isEdittingOutcomes", true);
    setValue("outcomes", [...outcomes, ""]);
  }

  function handleCancelEditOutcome() {
    setValue("isEdittingOutcomes", false);
  }

  function handleChangeOutcome() {
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
