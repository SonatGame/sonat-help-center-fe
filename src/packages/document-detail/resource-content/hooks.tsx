import { CourseApi } from "@/api/CourseApi";
import { getGoogleDocId } from "@/packages/course-detail/helper";
import { useEffect, useMemo, useState } from "react";
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
    updateResource,
  } = useDocumentDetailContext();
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const [loadingRename, setLoadingRename] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

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

  function handleEnableRename() {
    setIsRenaming(true);
  }

  function handleCancelRename() {
    setIsRenaming(false);
  }

  async function handleRename() {
    if (!selectedResource) return;
    setLoadingRename(true);
    await updateResource(selectedResource._id, {
      title: title,
    });
    setLoadingRename(false);
    setIsRenaming(false);
  }

  useEffect(() => {
    if (!selectedResource) return;
    setTitle(selectedResource.title);
  }, [selectedResource]);

  return {
    resourceData,
    selectedResource,
    handleOpenUploadDocsModal,
    isLoading,
    htmlContent,
    googleDocs,
    setSelectedResource,
    createResourceInResource,
    isRenaming,
    handleEnableRename,
    handleCancelRename,
    title,
    setTitle,
    loadingRename,
    handleRename,
  };
}
