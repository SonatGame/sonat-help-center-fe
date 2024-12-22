import { Course } from "@/lib/types/course";
import { ApiUtils } from "./ApiUtils";

const { HOST, METHOD, fetchList, fetchOne } = ApiUtils;

async function getCourseList(params?: {
  order?: "ASC" | "DESC";
  page?: number;
  take?: number;
  title?: string;
}) {
  return await fetchList<Course>({
    functionName: "Get courses",
    url: HOST + "course",
    method: METHOD.GET,
    params,
  });
}

async function getCourse(courseId: string) {
  return await fetchOne<Course>({
    functionName: "Get course detail",
    url: HOST + "course/" + courseId,
    method: METHOD.GET,
  });
}

async function createCourse(data: {
  title: string;
  team: string;
  KSA: string;
  thumbnail: File;
  coverImage: File;
}) {
  return fetchOne({
    functionName: "Create course",
    url: HOST + "course",
    method: METHOD.POST,
    hasErrorMsg: true,
    hasSuccessfulMsg: true,
    body: data,
  });
}

async function updateCourse(
  courseId: string,
  data: {
    title?: string;
    team?: string;
    KSA?: string;
    thumbnail?: File;
    coverImage?: File;
    learningOutcomes?: string[];
    description?: string;
  }
) {
  return fetchOne({
    functionName: "Update course",
    url: HOST + "course/" + courseId,
    method: METHOD.PATCH,
    hasErrorMsg: true,
    hasSuccessfulMsg: true,
    body: data,
  });
}

async function createChapter(
  courseId: string,
  data: {
    title: string;
  }
) {
  return fetchOne({
    functionName: "Create chapter",
    url: HOST + "course/" + courseId + "/module",
    method: METHOD.POST,
    hasErrorMsg: true,
    hasSuccessfulMsg: true,
    body: data,
  });
}

async function updateChapter(
  chapterId: string,
  data: {
    title: string;
  }
) {
  return fetchOne({
    functionName: "Update chapter",
    url: HOST + "course/module/" + chapterId,
    method: METHOD.PATCH,
    hasErrorMsg: true,
    hasSuccessfulMsg: true,
    body: data,
  });
}

async function deleteChapter(chapterId: string) {
  return fetchOne({
    functionName: "Delete chapter",
    url: HOST + "course/module/" + chapterId,
    method: METHOD.DELETE,
    hasErrorMsg: true,
    hasSuccessfulMsg: true,
  });
}

async function createLesson(
  chapterId: string,
  data: {
    title: string;
  }
) {
  return fetchOne({
    functionName: "Create lesson",
    url: HOST + "course/module/" + chapterId + "/lesson",
    method: METHOD.POST,
    hasErrorMsg: true,
    hasSuccessfulMsg: true,
    body: data,
  });
}

async function updateLesson(
  lessonId: string,
  data: {
    title?: string;
    googleDocUrl?: string;
  }
) {
  return fetchOne({
    functionName: "Update lesson",
    url: HOST + "course/lesson/" + lessonId,
    method: METHOD.PATCH,
    hasErrorMsg: true,
    hasSuccessfulMsg: true,
    body: data,
  });
}

async function deleteLesson(lessonId: string) {
  return fetchOne({
    functionName: "Delete lesson",
    url: HOST + "course/lesson/" + lessonId,
    method: METHOD.DELETE,
    hasErrorMsg: true,
    hasSuccessfulMsg: true,
  });
}

export const CourseApi = {
  getCourseList,
  getCourse,
  createCourse,
  updateCourse,
  createChapter,
  updateChapter,
  deleteChapter,
  createLesson,
  updateLesson,
  deleteLesson,
};
