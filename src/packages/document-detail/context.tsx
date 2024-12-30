"use client";

import { DocumentApi } from "@/api/DocumentApi";
import { Resource, ResourseType } from "@/lib/types/document";
import { useParams } from "next/navigation";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import useSWR, { KeyedMutator } from "swr";
import { convertResourcesToTree } from "./helper";

interface ContextProps {
  children?: React.ReactNode;
}

interface DocumentDetailContextProps {
  resourceData: Resource[];
  setResourceData: Dispatch<SetStateAction<Resource[]>>;
  isLoading: boolean;
  mutate: KeyedMutator<Resource[] | undefined>;
  setSelectedResource: Dispatch<SetStateAction<Resource | undefined>>;
  selectedResource: Resource | undefined;
  showModalUpload: boolean;
  handleOpenUploadDocsModal(): void;
  handleCloseUploadDocsModal(): void;
  googleDocs: {
    title: string;
    url: string;
    htmlContent: string;
  };
  setGoogleDocs: Dispatch<
    SetStateAction<{
      title: string;
      url: string;
      htmlContent: string;
    }>
  >;
  createResourceInCollection(
    type: ResourseType,
    collectionId: string
  ): Promise<void>;
  createResourceInResource(
    type: ResourseType,
    resourceId: string
  ): Promise<void>;
  updateResource(
    resourceId: string,
    data: {
      title?: string;
      googleDocUrl?: string;
    }
  ): Promise<void>;
  deleteResource(resourceId: string): Promise<void>;
  treeData: Resource[];
}

const DocumentDetailContext = createContext<DocumentDetailContextProps>({
  resourceData: [],
  isLoading: false,
  mutate: () => Promise.resolve(undefined),
  setResourceData: () => {},
  setSelectedResource: () => {},
  selectedResource: undefined,
  showModalUpload: false,
  handleOpenUploadDocsModal: () => {},
  handleCloseUploadDocsModal: () => {},
  googleDocs: {
    title: "",
    url: "",
    htmlContent: "",
  },
  setGoogleDocs: () => {},
  createResourceInCollection: () => Promise.resolve(undefined),
  createResourceInResource: () => Promise.resolve(undefined),
  updateResource: () => Promise.resolve(undefined),
  deleteResource: () => Promise.resolve(undefined),
  treeData: [],
});

const DocumentDetailProvider = ({ children }: ContextProps) => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const [resourceData, setResourceData] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource>();
  const [treeData, setTreeData] = useState<Resource[]>([]);

  const [googleDocs, setGoogleDocs] = useState<{
    title: string;
    url: string;
    htmlContent: string;
  }>({
    title: "",
    url: "",
    htmlContent: "",
  });
  const [showModalUpload, setShowModalUpload] = useState<boolean>(false);

  const {
    data = [],
    isLoading,
    mutate,
  } = useSWR(
    ["get-resources", collectionId],
    () => {
      if (!collectionId) return;
      return DocumentApi.getResourcesOfCollection({ collection: collectionId });
    },
    {
      refreshInterval: 0,
    }
  );

  function handleOpenUploadDocsModal() {
    setShowModalUpload(true);
  }

  function handleCloseUploadDocsModal() {
    setShowModalUpload(false);
  }

  async function createResourceInCollection(
    type: ResourseType,
    collectionId: string
  ) {
    const res = await DocumentApi.createResourceInCollection(collectionId, {
      type: type,
      title:
        type === ResourseType.document
          ? "Tài liệu không có tiêu đề"
          : "Thư mục không có tiêu đề",
      googleDocUrl: type === ResourseType.document ? "" : undefined,
    });
    setResourceData([...resourceData, res]);
  }

  async function createResourceInResource(
    type: ResourseType,
    resourceId: string
  ) {
    const res = await DocumentApi.createResourceInResource(resourceId, {
      type: type,
      title:
        type === ResourseType.document
          ? "Tài liệu không có tiêu đề"
          : "Thư mục không có tiêu đề",
      googleDocUrl: type === ResourseType.document ? "" : undefined,
    });
    setResourceData([...resourceData, res]);
  }

  async function updateResource(
    resourceId: string,
    data: {
      title?: string;
      googleDocUrl?: string;
    }
  ) {
    const res = await DocumentApi.updateResource(resourceId, {
      title: data.title,
      googleDocUrl: data.googleDocUrl,
    });
    const temp = [...resourceData];
    for (let i = 0; i < temp.length; i++) {
      if (temp[i]._id === res._id) {
        temp[i] = { ...temp[i], ...res };
        break;
      }
    }
    setResourceData(temp);
  }

  async function deleteResource(resourceId: string) {
    await DocumentApi.deleteResource(resourceId);
    await mutate();
  }

  useEffect(() => {
    setResourceData(data);
  }, [data]);

  useEffect(() => {
    if (!resourceData) return;
    const newTreeData = convertResourcesToTree(resourceData);
    setTreeData(newTreeData);
    const resource = resourceData.find(
      (item) => item._id === selectedResource?._id
    );
    if (!resource) setSelectedResource(treeData[0]);
  }, [resourceData]);

  return (
    <DocumentDetailContext.Provider
      value={{
        isLoading,
        mutate,
        setResourceData,
        resourceData,
        selectedResource,
        setSelectedResource,
        showModalUpload,
        handleOpenUploadDocsModal,
        handleCloseUploadDocsModal,
        googleDocs,
        setGoogleDocs,
        createResourceInCollection,
        createResourceInResource,
        updateResource,
        deleteResource,
        treeData,
      }}
    >
      {children}
    </DocumentDetailContext.Provider>
  );
};

const useDocumentDetailContext = () => useContext(DocumentDetailContext);

export { DocumentDetailProvider, useDocumentDetailContext };
