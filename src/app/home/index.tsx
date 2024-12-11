"use client";

import PageWithLayout from "@/packages/common/layout/page-with-layout";
import WithLogin from "@/packages/common/layout/WithLogin";
import WithPermissions from "@/packages/common/layout/WithPermissions";

export default function HomePage() {
  return (
    <WithLogin>
      <WithPermissions
      // requiredPermissions={[
      //   {
      //     permission: Permission.APP_AB_TESTING,
      //     value: AccessMode.Manage,
      //   },
      // ]}
      >
        <PageWithLayout></PageWithLayout>
      </WithPermissions>
    </WithLogin>
  );
}
