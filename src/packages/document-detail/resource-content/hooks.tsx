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
  const [numPages, setNumPages] = useState<number | null>(null);

  const { data, isLoading } = useSWR(
    ["get-pdf-file", selectedResource?._id],
    async () => {
      if (!selectedResource?.googleDocUrl) return;
      const googleDocsId = getGoogleDocId(selectedResource.googleDocUrl);
      if (!googleDocsId) return;
      const pdfBlob = await CourseApi.getPDFFile(googleDocsId);
      return URL.createObjectURL(pdfBlob);
    },
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
    }
  );

  const pdfUrl = useMemo(
    () => (googleDocs.pdf.length > 0 ? googleDocs.pdf : data ?? ""),
    [googleDocs, data]
  );

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

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
    pdfUrl,
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
    numPages,
    onDocumentLoadSuccess,
  };
}
