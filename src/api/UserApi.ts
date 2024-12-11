import { ApiUtils } from "./ApiUtils";

export namespace UserApi {
  const PATH = "users/";
  const suffix = {
    role: PATH + "role/",
  };

  const { METHOD, fetchList, fetchOne } = ApiUtils;

  // export async function getCurrentRolePermission() {
  //   return fetchOne(
  //     "Get current role permission",
  //     ApiUtils.HOST + suffix.role,
  //     METHOD.GET,
  //     false,
  //     false
  //   );
  // }
}
