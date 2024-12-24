"use client";

import PageWithLayout from "@/lib/common/layout/page-with-layout";
import WithLogin from "@/lib/common/layout/WithLogin";
import DocumentSection from "@/packages/document";

export default function DocumentPage() {
  return (
    <WithLogin>
      <PageWithLayout>
        <DocumentSection />
      </PageWithLayout>
    </WithLogin>
  );
}
