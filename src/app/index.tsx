"use client";

import FullPageLoader from "@/components/FullPageLoader";
import { useAuthentication } from "@/contexts/authenticationContext";
import LoginSection from "@/packages/app-login";

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuthentication();

  if (isLoading) return <FullPageLoader />;

  if (!isAuthenticated) return <LoginSection />;

  return null;
}
