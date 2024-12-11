export interface Permissions {
  prefix: string;
  default: string;
}

export interface Principals {
  principalId: number;
  account: string;
  name: string;
}
export interface Role {
  readonly roleId: number;
  readonly name: string;
  readonly type: string;
  readonly duplicable: boolean;
  readonly permissions: Array<Permissions>;
}

export enum AccessMode {
  Manage = "manage",
  Read = "read",
  None = "none",
}

export interface AccessModeProps {
  mode: AccessMode;
}
