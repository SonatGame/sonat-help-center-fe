import { DocumentApi } from "@/api/DocumentApi";
import { useState } from "react";
import useSWR from "swr";

export default function useDocumentSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, mutate } = useSWR(
    "get-document",
    () => DocumentApi.getCollectionList(),
    {
      refreshInterval: 0,
    }
  );

  function handleOpen() {
    setIsModalOpen(true);
  }
  function handleClose() {
    setIsModalOpen(false);
  }

  return {
    isModalOpen,
    handleOpen,
    handleClose,
    data,
    isLoading,
    mutate,
  };
}
