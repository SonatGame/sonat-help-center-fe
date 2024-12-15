import { ApiUtils } from "./ApiUtils";

const PATH = "users/";
const suffix = {
  role: PATH + "role/",
};

const { HOST, METHOD, fetchList, fetchOne } = ApiUtils;

// export async function getCurrentRolePermission() {
//   return fetchOne(
//     "Get current role permission",
//     HOST + suffix.role,
//     METHOD.GET,
//     false,
//     false
//   );
// }

export const UserApi = {};
