"use client";

import PageWithLayout from "@/lib/common/layout/page-with-layout";
import WithLogin from "@/lib/common/layout/WithLogin";
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
