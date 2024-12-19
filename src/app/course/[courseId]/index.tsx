"use client";

import PageWithLayout from "@/lib/common/layout/page-with-layout";
import WithLogin from "@/lib/common/layout/WithLogin";
import CourseDetail from "@/packages/course-detail";
import { CourseDetailProvider } from "@/packages/course-detail/context";

export default function CoursePage() {
  return (
    <WithLogin>
      <PageWithLayout>
        <CourseDetailProvider>
          <CourseDetail />
        </CourseDetailProvider>
      </PageWithLayout>
    </WithLogin>
  );
}
