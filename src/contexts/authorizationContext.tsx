"use client";

import { AccessMode } from "@/lib/types/role";
import { UserInfo } from "@/lib/types/userInfo";
import { createContext, useContext } from "react";
import { useAuthentication } from "./authenticationContext";

export function getAccessModeByNames(
  userInfo: UserInfo,
  permissions: string[]
): AccessMode[] {
  return permissions.map((permission) => {
    const foundPermission = userInfo.permissions?.find(
      (item) => item.prefix == permission
    );
    return foundPermission
      ? (foundPermission.default as AccessMode)
      : AccessMode.None;
  });
}

interface ContextProps {
  children?: React.ReactNode;
}

export interface PermissionProps {
  permission: string;
  value: AccessMode;
}

interface AuthorizationContextProps {
  // permissions: PermissionProps[];
  // isLoading: boolean;
  // userInfo: UserInfo;
}

const AuthorizationContext = createContext<AuthorizationContextProps>({
  // permissions: [],
  // isLoading: false,
  // userInfo: {} as UserInfo,
});

const AuthorizationProvider = ({ children }: ContextProps) => {
  const { isAuthenticated } = useAuthentication();
  // const { data: userInfo = {} as UserInfo, isLoading } = useSWR(
  //   ["Get current role permissions", isAuthenticated],
  //   () => {
  //     if (!isAuthenticated) return;
  //     else return ManageUserApi.getCurrentRolePermission();
  //   },
  //   {
  //     refreshInterval: 0,
  //     revalidateOnFocus: false,
  //   }
  // );

  // const permissionNames = Object.values(Permission);

  // const accessModes = getAccessModeByNames(userInfo, permissionNames);

  // const permissions: PermissionProps[] = useMemo(() => {
  //   const permissionProps: PermissionProps[] = [];
  //   if (accessModes.length === 0) {
  //     return permissionProps;
  //   }
  //   permissionNames.forEach((permission, index) => {
  //     if (permission === "apps.leveldesign.start/lose_by_level") {
  //       // return {
  //       //   permission: 'apps.leveldesign.start_by_level',
  //       //   value: accessModes[index],
  //       // };
  //       permissionProps.push({
  //         permission: "apps.leveldesign.start_by_level",
  //         value: accessModes[index],
  //       });
  //       permissionProps.push({
  //         permission: "apps.leveldesign.lose_by_level",
  //         value: accessModes[index],
  //       });
  //     }
  //     permissionProps.push({
  //       permission: permission,
  //       value: accessModes[index],
  //     });
  //   });
  //   return permissionProps;
  // }, [accessModes, permissionNames]);

  // const authorizationProviderValue = useMemo(
  //   () => ({
  //     permissions,
  //     isLoading,
  //     userInfo,
  //   }),
  //   [permissions, isLoading, userInfo]
  // );

  return (
    <AuthorizationContext.Provider value={{}}>
      {children}
    </AuthorizationContext.Provider>
  );
};

const useAuthorization = () => useContext(AuthorizationContext);

export { AuthorizationProvider, useAuthorization };
