import { ApiUtils } from "./ApiUtils";

const PATH = "users/";
const suffix = {
  role: PATH + "role/",
};

const { HOST, METHOD, fetchList, fetchOne } = ApiUtils;

async function getCourses() {
  return fetchOne({
    functionName: "Get courses",
    url: HOST + "",
    method: METHOD.POST,
  });
}

// export async function getCurrentRolePermission() {
//   return fetchOne(
//     "Get current role permission",
//     HOST + suffix.role,
//     METHOD.GET,
//     false,
//     false
//   );
// }

export const CourseApi = { getCourses };
