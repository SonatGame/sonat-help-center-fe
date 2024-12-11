import { Metadata } from "next";
import HomePage from ".";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomeLayout() {
  return <HomePage />;
}
