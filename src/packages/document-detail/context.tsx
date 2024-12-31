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
  useMemo,
  useState,
} from "react";
import useSWR, { KeyedMutator } from "swr";
import { convertResourcesToTree, getChildById } from "./helper";

interface ContextProps {
  children?: React.ReactNode;
}

interface DocumentDetailContextProps {
  collectionResources: Resource[] | undefined;
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
    url: string;
    pdf: string;
  };
  setGoogleDocs: Dispatch<
    SetStateAction<{
      url: string;
      pdf: string;
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
  setInputValue: Dispatch<SetStateAction<string>>;
  inputValue: string;
  searchText: string;
}

const DocumentDetailContext = createContext<DocumentDetailContextProps>({
  collectionResources: undefined,
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
    url: "",
    pdf: "",
  },
  setGoogleDocs: () => {},
  createResourceInCollection: () => Promise.resolve(undefined),
  createResourceInResource: () => Promise.resolve(undefined),
  updateResource: () => Promise.resolve(undefined),
  deleteResource: () => Promise.resolve(undefined),
  treeData: [],
  setInputValue: () => {},
  inputValue: "",
  searchText: "",
});

const DocumentDetailProvider = ({ children }: ContextProps) => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const [resourceData, setResourceData] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource>();
  const [treeData, setTreeData] = useState<Resource[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const [googleDocs, setGoogleDocs] = useState<{
    url: string;
    pdf: string;
  }>({
    url: "",
    pdf: "",
  });
  const [showModalUpload, setShowModalUpload] = useState<boolean>(false);

  const {
    data: collectionResources,
    isLoading,
    mutate,
  } = useSWR(
    ["get-resources-of-collection", collectionId, searchText],
    () => {
      if (!collectionId) return;
      return DocumentApi.getResourcesOfCollection({
        collection: collectionId,
        title: searchText,
      });
    },
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
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
    const delayDebounce = setTimeout(() => {
      setSearchText(inputValue);
    }, 200);
    return () => clearTimeout(delayDebounce);
  }, [inputValue]);

  useEffect(() => {
    if (collectionResources) setResourceData(collectionResources);
  }, [collectionResources]);

  useEffect(() => {
    if (!resourceData) return;
    const newTreeData = convertResourcesToTree(resourceData);
    setTreeData(newTreeData);
    if (!selectedResource) return;
    const childItem = getChildById(newTreeData, selectedResource?._id);
    if (childItem) {
      setSelectedResource(childItem);
    } else {
      if (newTreeData.length > 0) setSelectedResource(newTreeData[0]);
      setSelectedResource(undefined);
    }
  }, [resourceData]);

  const value = useMemo(
    () => ({
      collectionResources,
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
      setInputValue,
      inputValue,
      searchText,
    }),
    [
      collectionResources,
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
      setInputValue,
      inputValue,
      searchText,
    ]
  );

  return (
    <DocumentDetailContext.Provider value={value}>
      {children}
    </DocumentDetailContext.Provider>
  );
};

const useDocumentDetailContext = () => useContext(DocumentDetailContext);

export { DocumentDetailProvider, useDocumentDetailContext };
