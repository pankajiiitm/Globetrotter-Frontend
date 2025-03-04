"use client";
import React, { Suspense } from "react";
import ChallengePageContent from "./ChallengePageContent";

const ChallengePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChallengePageContent />
    </Suspense>
  );
};

export default ChallengePage;
