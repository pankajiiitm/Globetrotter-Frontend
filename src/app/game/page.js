"use client";
import React, { useState, useEffect, Suspense } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import ChallengeFriend from "@/components/ChallengeFriend";

const Home = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
};

const HomeContent = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  const [city, setCity] = useState(null);
  const [clues, setClues] = useState([]);
  const [correctClues, setCorrectClues] = useState([]);
  const [selectedClues, setSelectedClues] = useState([]);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null);
  const [funFact, setFunFact] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

  useEffect(() => {
    fetchRandomCity();
  }, []);

  const fetchRandomCity = async () => {
    try {
      const response = await fetch(
        "https://test-demo-r76u.onrender.com/api/destinations/random"
      );
      const data = await response.json();
      setCity(data.city);
      setClues(data.clues);
      setCorrectClues(data.correctClues);
      setResult(null);
      setFunFact(null);
      setSelectedClues([]);
      setCorrect(0);
      setIncorrect(0);
    } catch (error) {
      console.error("Error fetching city:", error);
    }
  };

  const submitAnswer = () => {
    try {
      const correctSelected = selectedClues.filter((clue) =>
        correctClues.includes(clue)
      );
      const incorrectSelected = selectedClues.filter(
        (clue) => !correctClues.includes(clue)
      );

      setCorrect(correctSelected.length);
      setIncorrect(incorrectSelected.length);

      // Apply correct scoring logic
      setScore(
        (prev) =>
          prev + correctSelected.length * 5 - incorrectSelected.length * 2
      );

      if (correctSelected.length > 0 && incorrectSelected.length === 0) {
        setResult("success");
      } else if (correctSelected.length > 0 && incorrectSelected.length > 0) {
        setResult("mixed");
      } else {
        setResult("failure");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
      {result === "success" && <Confetti />}
      <h1 className="text-4xl font-extrabold mb-4">
        🌍 Globetrotter Challenge
      </h1>
      {city && (
        <h2 className="text-2xl mt-4 font-semibold">
          Select the correct clues for {city}! 🏙️
        </h2>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 w-full max-w-xl">
        {clues.map((clue, index) => (
          <motion.div
            key={index}
            className={`p-4 border-2 rounded-xl cursor-pointer text-lg font-semibold transition-all duration-300 shadow-lg 
              ${
                selectedClues.includes(clue)
                  ? "bg-green-500 text-white"
                  : "bg-white text-black"
              }`}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              setSelectedClues((prev) =>
                prev.includes(clue)
                  ? prev.filter((c) => c !== clue)
                  : [...prev, clue]
              )
            }
          >
            {clue}
          </motion.div>
        ))}
      </div>

      <button
        onClick={submitAnswer}
        className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
      >
        Submit Answer
      </button>

      {result && (
        <div className="mt-6 p-6 text-center text-lg font-semibold bg-white text-black rounded-lg shadow-lg w-full max-w-md">
          {result === "success" && (
            <>
              🎉{" "}
              <span className="text-green-600">
                Fantastic! You got them all right!
              </span>
            </>
          )}
          {result === "mixed" && (
            <>
              😊{" "}
              <span className="text-yellow-600">
                Good effort! Some were correct, some weren&rsquo;t. Keep going!
              </span>
            </>
          )}
          {result === "failure" && (
            <>
              😢{" "}
              <span className="text-red-600">
                Oops! All incorrect. Try again! You&rsquo;ll get it next time.
              </span>
            </>
          )}
          <p className="mt-2">
            ✅ Correct: {correct} | ❌ Incorrect: {incorrect}
          </p>
          {funFact && <p className="mt-2 italic">Fun Fact: {funFact}</p>}
        </div>
      )}

      <button
        onClick={fetchRandomCity}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
      >
        Next Challenge
      </button>

      <div className="mt-6 text-xl font-bold">🏆 Score: {score}</div>
      <ChallengeFriend username={username} score={score} />
    </div>
  );
};

export default Home;
