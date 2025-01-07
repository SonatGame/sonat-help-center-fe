import { Chapter, Course, CourseRes, Lesson } from "@/lib/types/course";
import { ApiUtils } from "./ApiUtils";

const { HOST, METHOD, fetchList, fetchOne, fetchOneFormData } = ApiUtils;

async function getCourseList(params?: {
  order?: "ASC" | "DESC";
  page?: number;
  take?: number;
  title?: string;
  team?: string;
  ksa?: string;
}) {
  return await fetchOne<CourseRes>({
    functionName: "Lấy danh sách khóa học",
    url: HOST + "course",
    method: METHOD.GET,
    params,
  });
}

async function getCourse(courseId: string) {
  return await fetchOne<Course>({
    functionName: "Lấy chi tiết khóa học",
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
  return fetchOneFormData({
    functionName: "Tạo khóa học",
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
  return fetchOneFormData<Course>({
    functionName: "Cập nhật khóa học",
    url: HOST + "course/" + courseId,
    method: METHOD.PATCH,
    hasErrorMsg: true,
    hasSuccessfulMsg: true,
    body: data,
  });
}

async function deleteCourse(courseId: string) {
  return fetchOne({
    functionName: "Xóa khóa học",
    url: HOST + "course/" + courseId,
    method: METHOD.DELETE,
    hasErrorMsg: true,
    hasSuccessfulMsg: true,
  });
}

async function createChapter(
  courseId: string,
  data: {
    title: string;
    lessons: Omit<Lesson, "_id">[];
  }
) {
  return fetchOne({
    functionName: "Tạo chương",
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
  return fetchOne<Chapter>({
    functionName: "Cập nhật chương",
    url: HOST + "course/module/" + chapterId,
    method: METHOD.PATCH,
    hasErrorMsg: true,
    hasSuccessfulMsg: true,
    body: data,
  });
}

async function deleteChapter(chapterId: string) {
  return fetchOne({
    functionName: "Xóa chương",
    url: HOST + "course/module/" + chapterId,
    method: METHOD.DELETE,
    hasErrorMsg: true,
    hasSuccessfulMsg: true,
  });
}

async function getLessonById(lessonId: string) {
  return fetchOne<Lesson>({
    functionName: "Lấy chi tiết bài học",
    url: HOST + "course/lesson/" + lessonId,
    method: METHOD.GET,
  });
}

async function createLesson(
  chapterId: string,
  data: {
    title: string;
    description: string;
    googleDocUrl: string;
  }
) {
  return fetchOne({
    functionName: "Tạo bài học",
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
    description?: string;
    googleDocUrl?: string;
  }
) {
  return fetchOne({
    functionName: "Cập nhật bài học",
    url: HOST + "course/lesson/" + lessonId,
    method: METHOD.PATCH,
    hasErrorMsg: true,
    hasSuccessfulMsg: true,
    body: data,
  });
}

async function deleteLesson(lessonId: string) {
  return fetchOne({
    functionName: "Xóa bài học",
    url: HOST + "course/lesson/" + lessonId,
    method: METHOD.DELETE,
    hasErrorMsg: true,
    hasSuccessfulMsg: true,
  });
}

async function getDocsContent(googleDocId: string) {
  return fetchOne<{ title: string; description: string; htmlContent: string }>({
    functionName: "Lấy nội dung HTML",
    url: HOST + "course/google-doc/" + googleDocId,
    method: METHOD.GET,
  });
}

async function getPDFFile(googleDocId: string) {
  return fetchOne<Blob>({
    functionName: "Tải file pdf",
    url: HOST + "google/pdf",
    method: METHOD.GET,
    params: { googleDocId },
  });
}

export const CourseApi = {
  getCourseList,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  createChapter,
  updateChapter,
  deleteChapter,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
  getDocsContent,
  getPDFFile,
};
