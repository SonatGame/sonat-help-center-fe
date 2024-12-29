"use client";

import { DocumentApi } from "@/api/DocumentApi";
import { Resource } from "@/lib/types/document";
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
  setIsCreatingResource: Dispatch<SetStateAction<boolean>>;
  isCreatingResource: boolean;
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
  setIsCreatingResource: () => {},
  isCreatingResource: false,
});

const DocumentDetailProvider = ({ children }: ContextProps) => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const [resourceData, setResourceData] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource>();
  const [isCreatingResource, setIsCreatingResource] = useState<boolean>(false);

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

  useEffect(() => {
    setResourceData(data);
  }, [data]);

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
        setIsCreatingResource,
        isCreatingResource,
      }}
    >
      {children}
    </DocumentDetailContext.Provider>
  );
};

const useDocumentDetailContext = () => useContext(DocumentDetailContext);

export { DocumentDetailProvider, useDocumentDetailContext };
