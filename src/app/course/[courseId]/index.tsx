"use client";

import PageWithLayout from "@/lib/common/layout/page-with-layout";
import WithLogin from "@/lib/common/layout/WithLogin";
import CourseDetail from "@/packages/course/detail";

export default function CoursePage() {
  return (
    <WithLogin>
      <PageWithLayout>
        <CourseDetail />
      </PageWithLayout>
    </WithLogin>
  );
}
