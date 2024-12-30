import { Resource } from "@/lib/types/document";
import { useParams } from "next/navigation";
import { useDocumentDetailContext } from "./context";

export default function useDocumentDetail() {
  const {
    resourceData,
    isLoading: loadingResources,
    setSelectedResource,
    selectedResource,
    createResourceInCollection,
    treeData,
  } = useDocumentDetailContext();
  const { collectionId } = useParams<{ collectionId: string }>();

  const handleNodeClick = (data: Resource) => {
    setSelectedResource(data);
  };

  return {
    collectionId,
    loadingResources,
    treeData,
    handleNodeClick,
    selectedResource,
    createResourceInCollection,
  };
}
