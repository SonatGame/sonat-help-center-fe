"use client";

import PageWithLayout from "@/lib/common/layout/page-with-layout";
import WithLogin from "@/lib/common/layout/WithLogin";
import CourseSection from "@/packages/course";

export default function CoursePage() {
  return (
    <WithLogin>
      <PageWithLayout>
        <CourseSection />
      </PageWithLayout>
    </WithLogin>
  );
}
