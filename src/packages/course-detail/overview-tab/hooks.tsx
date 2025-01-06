import { CourseApi } from "@/api/CourseApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCourseDetailContext } from "../context";

interface IForm {
  isEdittingDescription: boolean;
  isAddingOutcomes: boolean;
  isEditingOutcomes: boolean;
  isLoadingOutcomes: boolean;
  isLoadingDescription: boolean;
  description: string;
  outcomes: string[];
  isModalConfirmDeleteOutcomeOpen: boolean;
  editingOutcomeIndex?: number;
}

export default function useOverviewTab() {
  const {
    handleChangeTab,
    courseData,
    mutate,
    isLoading,
    setIsEditLesson,
    setEdittingChapter,
    setEdittingLesson,
  } = useCourseDetailContext();
  const { control, setValue, watch, reset } = useForm<IForm>({
    defaultValues: {
      description: "",
      outcomes: [],
      isAddingOutcomes: false,
      isEditingOutcomes: false,
      isModalConfirmDeleteOutcomeOpen: false,
      isLoadingOutcomes: false,
      isLoadingDescription: false,
    },
  });
  const editingOutcomeIndex = watch("editingOutcomeIndex");
  const isEdittingDescription = watch("isEdittingDescription");
  const isAddingOutcomes = watch("isAddingOutcomes");
  const isEditingOutcomes = watch("isEditingOutcomes");
  const description = watch("description");
  const outcomes = watch("outcomes");
  const isLoadingOutcomes = watch("isLoadingOutcomes");
  const isLoadingDescription = watch("isLoadingDescription");

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
    handleChangeTab("content");
  }

  async function handleChangeDescription() {
    if (!courseData) return;
    setValue("isLoadingDescription", true);
    await CourseApi.updateCourse(courseData._id, {
      description: description,
    });
    await mutate();
    setValue("isLoadingDescription", false);
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
    setValue("isLoadingOutcomes", true);
    await CourseApi.updateCourse(courseData._id, {
      learningOutcomes: outcomes,
    });
    await mutate();
    setValue("isLoadingOutcomes", false);
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
    description,
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
    setIsEditLesson,
    setEdittingChapter,
    setEdittingLesson,
    handleChangeTab,
    isLoadingOutcomes,
    isLoadingDescription,
  };
}
