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

export const CourseApi = { getCourseList, getCourse, createCourse };
