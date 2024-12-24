import { Metadata } from "next";
import DocumentPage from ".";

export const metadata: Metadata = {
  title: "Document",
};

export default function DocumentLayout() {
  return <DocumentPage />;
}
