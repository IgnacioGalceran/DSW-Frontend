"use client";

import React, { useState } from "react";
import RecoveryAccount from "./RecoveryAccount";

export default function Page() {
  const [resetPassword, setResetPassword] = useState<any>(false);

  return (
    <RecoveryAccount
      resetPassword={resetPassword}
      setResetPassword={setResetPassword}
    />
  );
}
