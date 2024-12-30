import { CourseApi } from "@/api/CourseApi";
import { getGoogleDocId } from "@/packages/course-detail/helper";
import { useMemo } from "react";
import useSWR from "swr";
import { useDocumentDetailContext } from "../context";

export default function useResourceContent() {
  const {
    setSelectedResource,
    selectedResource,
    handleOpenUploadDocsModal,
    googleDocs,
    resourceData,
    createResourceInResource,
  } = useDocumentDetailContext();

  const { data, isLoading } = useSWR(
    ["get-html-content", selectedResource?._id],
    () => {
      if (!selectedResource?.googleDocUrl) return;
      const googleDocsId = getGoogleDocId(selectedResource.googleDocUrl);
      if (!googleDocsId) return;
      return CourseApi.getHTMLContent(googleDocsId);
    },
    {
      refreshInterval: 0,
    }
  );

  const htmlContent = useMemo(() => {
    if (!googleDocs) return;
    return googleDocs.htmlContent.length > 0
      ? googleDocs.htmlContent
      : data?.htmlContent ?? "";
  }, [googleDocs, data]);

  return {
    resourceData,
    selectedResource,
    handleOpenUploadDocsModal,
    isLoading,
    htmlContent,
    googleDocs,
    setSelectedResource,
    createResourceInResource,
  };
}
