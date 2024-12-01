"use client";
import ChangePassword from "@/components/ChangePassword";
import VerifyEmail from "@/components/VerifyEmail";
import { useSearchParams } from "next/navigation";
import React from "react";

const FirebaseAction = () => {
  const searchParams = useSearchParams();

  if (searchParams) console.log(searchParams.get("mode"));
  // console.log(searchParams?.size);

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

export default FirebaseAction;
