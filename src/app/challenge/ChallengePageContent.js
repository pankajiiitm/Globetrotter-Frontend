"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";

const ChallengePageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract inviter name and score from URL parameters
  const inviter = searchParams.get("inviter");
  const invitee = searchParams.get("invitee");
  const score = searchParams.get("score");

  const handleBeatHim = () => {
    // Redirect user to the game page with their name
    router.push(`/game?username=${invitee || "Guest"}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold">Challenge Accepted! 🎮</h1>
      {inviter && (
        <h2 className="text-xl mt-4">
          {inviter} scored <span className="font-bold">{score}</span> in this
          game&#39;s challenge!
        </h2>
      )}
      <button
        onClick={handleBeatHim}
        className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg text-lg"
      >
        Beat {inviter}!
      </button>
    </div>
  );
};

export default ChallengePageContent;
