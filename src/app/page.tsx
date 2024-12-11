import { Metadata } from "next";
import LoginPage from ".";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginLayout() {
  return <LoginPage />;
}
