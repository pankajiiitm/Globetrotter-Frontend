import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PlayGame = () => {
  const [searchParams] = useSearchParams();
  const inviter = searchParams.get("inviter");
  const inviterScore = searchParams.get("score");

  return (
    <div>
      {inviter && (
        <p>{inviter} challenged you! They scored {inviterScore}. Can you beat them?</p>
      )}
      <button>Start Game</button>
    </div>
  );
};

export default PlayGame;
