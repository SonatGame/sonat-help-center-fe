import { Permissions } from "./role";

export interface UserInfo {
  id?: number;
  principalId: number;
  name: string | null | undefined;
  account: string;
  roleId: number | undefined;
  role: string | undefined;
  permissions: Permissions[] | undefined;
  authorities: Authority[] | null | undefined;
}

export interface Authority {
  subject: string;
  config:
    | {
        allowAccessToAllFutureApps: boolean | undefined;
        accessAll: boolean | undefined;
      }
    | null
    | undefined;
  ids: string[];
}
