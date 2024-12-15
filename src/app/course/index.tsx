"use client";

import PageWithLayout from "@/packages/common/layout/page-with-layout";
import WithLogin from "@/packages/common/layout/WithLogin";
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
