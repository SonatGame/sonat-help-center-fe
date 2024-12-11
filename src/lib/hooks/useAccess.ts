import { useAuthorization } from "@/contexts/authorizationContext";
import { AccessMode } from "../types/role";
import { isAuth } from "../utils/auth.helper";

export default function useAccess({
  permissionKey,
}: {
  permissionKey: string;
}) {
  const { permissions }: any = useAuthorization();
  return isAuth(permissions, [
    { permission: permissionKey, value: AccessMode.Read },
  ]);
}
