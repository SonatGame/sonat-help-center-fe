"use client";

import PageWithLayout from "@/lib/common/layout/page-with-layout";
import WithLogin from "@/lib/common/layout/WithLogin";
import DocumentDetail from "@/packages/document-detail";
import { DocumentDetailProvider } from "@/packages/document-detail/context";

export default function DocumentPage() {
  return (
    <WithLogin>
      <PageWithLayout>
        <DocumentDetailProvider>
          <DocumentDetail />
        </DocumentDetailProvider>
      </PageWithLayout>
    </WithLogin>
  );
}
