import { Course } from "@/lib/types/course";
import { ApiUtils } from "./ApiUtils";

const { HOST, METHOD, fetchList, fetchOne } = ApiUtils;

async function getCourses() {
  return await fetchList<Course>({
    functionName: "Get courses",
    url: HOST + "",
    method: METHOD.GET,
  });
}

async function getCourse(courseId: string) {
  return await fetchOne<Course>({
    functionName: "Get course detail",
    url: HOST + "course/" + courseId,
    method: METHOD.GET,
  });
}

async function createCourse(data: any) {
  return fetchOne({
    functionName: "Create course",
    url: HOST + "course",
    method: METHOD.POST,
    hasErrorMsg: true,
    hasSuccessfulMsg: true,
    body: data,
  });
}

export const CourseApi = { getCourses, getCourse, createCourse };
