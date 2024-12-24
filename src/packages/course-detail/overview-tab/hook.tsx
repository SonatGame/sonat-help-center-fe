import { CourseApi } from "@/api/CourseApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCourseDetailContext } from "../context";

interface IForm {
  isEdittingDescription: boolean;
  isAddingOutcomes: boolean;
  isEditingOutcomes: boolean;
  description: string;
  outcomes: string[];
  isModalConfirmDeleteOutcomeOpen: boolean;
  editingOutcomeIndex?: number;
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
      description: "",
      outcomes: [],
      isAddingOutcomes: false,
      isEditingOutcomes: false,
      isModalConfirmDeleteOutcomeOpen: false,
    },
  });
  const editingOutcomeIndex = watch("editingOutcomeIndex");
  const isEdittingDescription = watch("isEdittingDescription");
  const isAddingOutcomes = watch("isAddingOutcomes");
  const isEditingOutcomes = watch("isEditingOutcomes");
  const description = watch("description");
  const outcomes = watch("outcomes");
  const isModalConfirmDeleteOutcomeOpen = watch(
    "isModalConfirmDeleteOutcomeOpen"
  );

  function handleEnableEditDescription() {
    setValue("description", courseData?.description ?? "");
    setValue("isEdittingDescription", true);
  }

  function handleCancelEditDescription() {
    setValue("description", courseData?.description ?? "");
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
    setValue("isAddingOutcomes", true);
    setValue("outcomes", [...(outcomes ?? []), ""]);
    setValue("editingOutcomeIndex", undefined);
    setValue("isEditingOutcomes", false);
  }

  function handleCancelAddOutcome() {
    setValue("isAddingOutcomes", false);
  }

  function handleDeleteOutcome(index: number) {
    setValue("editingOutcomeIndex", index);
    setValue("isModalConfirmDeleteOutcomeOpen", true);
  }

  function handleCancelDeleteOutcome() {
    setValue("editingOutcomeIndex", undefined);
    setValue("isModalConfirmDeleteOutcomeOpen", false);
  }

  async function handleConfirmDeleteOutcome() {
    if (!courseData) return;
    await CourseApi.updateCourse(courseData._id, {
      learningOutcomes: outcomes.filter((_, i) => i !== editingOutcomeIndex),
    });
    await mutate();
    handleCancelDeleteOutcome();
  }

  function handleEditOutcome(index: number) {
    setValue("isEditingOutcomes", true);
    setValue("outcomes", courseData?.learningOutcomes ?? []);
    setValue("isAddingOutcomes", false);
    setValue("editingOutcomeIndex", index);
  }

  function handleCancelEditOutcome() {
    setValue("outcomes", courseData?.learningOutcomes ?? []);
    setValue("editingOutcomeIndex", undefined);
    setValue("isEditingOutcomes", false);
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
    editingOutcomeIndex,
    isAddingOutcomes,
    handleEnableEditDescription,
    handleCancelEditDescription,
    handleCancelEditOutcome,
    handleEditOutcome,
    handleAddChapter,
    control,
    outcomes,
    handleChangeDescription,
    handleAddOutcome,
    handleCancelAddOutcome,
    handleChangeOutcome,
    courseData,
    isModalConfirmDeleteOutcomeOpen,
    isEditingOutcomes,
    handleDeleteOutcome,
    handleCancelDeleteOutcome,
    handleConfirmDeleteOutcome,
  };
}
