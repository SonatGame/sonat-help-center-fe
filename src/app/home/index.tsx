"use client";

import PageWithLayout from "@/packages/common/layout/page-with-layout";
import WithLogin from "@/packages/common/layout/WithLogin";
import HomeSection from "@/packages/home";

export default function HomePage() {
  return (
    <WithLogin>
      <PageWithLayout>
        <HomeSection />
      </PageWithLayout>
    </WithLogin>
  );
}
