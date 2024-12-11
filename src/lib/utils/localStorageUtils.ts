import { User } from "firebase/auth";

export namespace LocalStorageUtils {
  const key = {
    username: "username",
    email: "email",
    displayName: "displayName",
    photoURL: "photoURL",
    sidebarCollapsed: "sidebar-collapsed",
  };

  const logoutKey = {
    username: "username",
    email: "email",
    displayName: "displayName",
    photoURL: "photoURL",
  };

  export function setUsername(username: string | null) {
    localStorage.setItem(key.username, JSON.stringify(username));
  }

  export function getUsername() {
    return localStorage.getItem(key.username);
  }

  export function setEmail(email: string | null) {
    localStorage.setItem(key.email, JSON.stringify(email));
  }

  export function setDisplayName(displayName: string | null) {
    localStorage.setItem(key.displayName, JSON.stringify(displayName));
  }

  export function getDisplayName() {
    return localStorage.getItem(key.displayName);
  }

  export function setPhotoUrl(photoUrl: string | null) {
    localStorage.setItem(key.photoURL, JSON.stringify(photoUrl));
  }

  export function getPhotoUrl() {
    const photoURL = localStorage.getItem(key.photoURL);
    return TypeUtils.isNullOrEmpty(photoURL)
      ? ""
      : JSON.parse(photoURL as string);
  }

  export function clearUserData() {
    for (const k in logoutKey) {
      const userKey = k;
      localStorage.removeItem(userKey);
    }
  }

  export async function importUserData(data: User) {
    const oldEmail = getEmail();
    if (oldEmail != data.email) clearUserData();
    setDisplayName(data.displayName);
    setEmail(data.email);
    setPhotoUrl(data.photoURL);
  }

  export function getSidebarCollapsed() {
    return localStorage.getItem(key.sidebarCollapsed);
  }

  export function setSidebarCollapsed(value: boolean) {
    localStorage.setItem(key.sidebarCollapsed, value ? "true" : "false");
  }
}
