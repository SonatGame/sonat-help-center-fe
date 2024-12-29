import { Resource } from "@/lib/types/document";
import { useEffect, useState } from "react";
import { useDocumentDetailContext } from "./context";
import { convertResourcesToTree } from "./helper";

export default function useDocumentDetail() {
  const { resourceData, isLoading, setSelectedResource, selectedResource } =
    useDocumentDetailContext();
  const [treeData, setTreeData] = useState<Resource[]>([]);

  const handleNodeClick = (data: Resource) => {
    setSelectedResource(data);
  };

  useEffect(() => {
    if (!resourceData) return;
    setTreeData(convertResourcesToTree(resourceData));
  }, [resourceData]);

  return {
    isLoading,
    treeData,
    handleNodeClick,
    selectedResource,
  };
}
