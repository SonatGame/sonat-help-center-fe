"use client";

import { Document } from "@/lib/types/document";
import { useParams } from "next/navigation";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import useSWR, { KeyedMutator } from "swr";

interface ContextProps {
  children?: React.ReactNode;
}

interface DocumentDetailContextProps {
  documentData?: Document;
  setDocumentData: Dispatch<SetStateAction<Document | undefined>>;
  isLoading: boolean;
  mutate: KeyedMutator<void>;
}

const DocumentDetailContext = createContext<DocumentDetailContextProps>({
  isLoading: false,
  mutate: () => Promise.resolve(undefined),
  setDocumentData: () => {},
});

const DocumentDetailProvider = ({ children }: ContextProps) => {
  const { documentId } = useParams<{ documentId: string }>();
  const [documentData, setDocumentData] = useState<Document>();

  const { data, isLoading, mutate } = useSWR(
    ["get-document-detail", documentId],
    () => {},
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
    }
  );

  // useEffect(() => {
  //   setDocumentData(data);
  // }, [data]);

  return (
    <DocumentDetailContext.Provider
      value={{
        isLoading,
        mutate,
        setDocumentData,
      }}
    >
      {children}
    </DocumentDetailContext.Provider>
  );
};

const useDocumentDetailContext = () => useContext(DocumentDetailContext);

export { DocumentDetailProvider, useDocumentDetailContext };
