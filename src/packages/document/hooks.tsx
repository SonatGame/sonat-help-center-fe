import { DocumentApi } from "@/api/DocumentApi";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function useDocumentSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const { data, isLoading, mutate } = useSWR(
    ["get-collection", searchText],
    () => DocumentApi.getCollectionList({ title: searchText }),
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
    }
  );

  function handleOpen() {
    setIsModalOpen(true);
  }
  function handleClose() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearchText(inputValue);
    }, 350);
    return () => clearTimeout(delayDebounce);
  }, [inputValue]);

  return {
    isModalOpen,
    handleOpen,
    handleClose,
    data,
    isLoading,
    mutate,
    inputValue,
    setInputValue,
  };
}
