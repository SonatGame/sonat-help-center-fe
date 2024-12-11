import { AccessMode } from "@/lib/types/role";

export const isAuth = (
  permissions: any[] = [],
  requiredPermissions: { permission: string; value: AccessMode }[]
) => {
  for (var requiredPermission of requiredPermissions) {
    let hasPermission = false;
    let key = requiredPermission.permission;
    do {
      const foundPermission = permissions.find(
        (item: any) => item.permission === key
      );

      if (!foundPermission) return false;

      if (
        (requiredPermission.value === AccessMode.Read &&
          foundPermission.value !== AccessMode.None) ||
        requiredPermission.value === foundPermission.value
      )
        hasPermission = true;

      if (hasPermission || !key.includes(".")) break;
      key = key.substring(0, key.lastIndexOf("."));
    } while (!hasPermission);

    if (!hasPermission) return false;
  }
  return true;
};

export const canView = (permissions: any[], requirePermission: string) => {
  return (
    permissions?.find(
      (item: any) =>
        item.permission.startsWith(requirePermission) &&
        item.value !== AccessMode.None
    ) !== undefined
  );
};
