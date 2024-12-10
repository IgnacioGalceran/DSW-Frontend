"use client";

import ChangePassword from "@/components/ChangePassword";
import Loader from "@/components/Loader";
import VerifyEmail from "@/components/VerifyEmail";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const FirebaseActionContent = () => {
  const searchParams = useSearchParams();

  return (
    <React.Fragment>
      {searchParams && searchParams.get("mode") === "resetPassword" && (
        <ChangePassword searchParams={searchParams} />
      )}
      {(searchParams?.size === 0 ||
        searchParams?.get("mode") === "verifyEmail") && (
        <VerifyEmail searchParams={searchParams} />
      )}
    </React.Fragment>
  );
};

const FirebaseAction = () => {
  return (
    <Suspense fallback={<Loader />}>
      <FirebaseActionContent />
    </Suspense>
  );
};

export default FirebaseAction;
