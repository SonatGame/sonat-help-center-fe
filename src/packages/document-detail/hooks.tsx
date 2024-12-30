import { Resource } from "@/lib/types/document";
import { useParams } from "next/navigation";
import { useDocumentDetailContext } from "./context";

export default function useDocumentDetail() {
  const {
    collectionResources,
    isLoading: loadingResources,
    setSelectedResource,
    selectedResource,
    createResourceInCollection,
    treeData,
    setInputValue,
    inputValue,
    searchText,
  } = useDocumentDetailContext();
  const { collectionId } = useParams<{ collectionId: string }>();

  const handleNodeClick = (data: Resource) => {
    setSelectedResource(data);
  };

  return {
    collectionResources,
    collectionId,
    loadingResources,
    treeData,
    handleNodeClick,
    selectedResource,
    createResourceInCollection,
    setInputValue,
    inputValue,
    searchText,
  };
}
