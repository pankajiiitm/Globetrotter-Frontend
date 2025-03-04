"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { SparklesCore } from "../components/ui/sparkles.js";


const Welcome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Name cannot be empty!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://test-demo-r76u.onrender.com/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: name }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to register");

      router.push(`/game?username=${data.username}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black to-blue-900 text-white relative overflow-hidden">
      {/* Background Particles */}
      <SparklesCore id="welcome-sparkles" className="absolute inset-0 w-full h-full opacity-30" />

      {/* Background Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/gaming-bg.jpg')" }}
      />

      {/* Title Animation */}
      <motion.h1
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-6xl font-extrabold text-white drop-shadow-glow z-10 tracking-widest"
      >
        Welcome to <span className="text-neon-blue">Globetrotter</span>
      </motion.h1>

      {/* Button Animation */}
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px #00f" }}
        whileTap={{ scale: 0.9 }}
        className="mt-12 px-8 py-3 bg-neon-blue text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 z-10"
        onClick={() => setIsOpen(true)}
      >
        Get Started
      </motion.button>

      {/* Modal with animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 p-8 rounded-xl shadow-2xl text-center w-96 border border-gray-700 neon-border"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Enter Your Name
              </h2>
              <input
                type="text"
                className="px-4 py-2 w-full rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <div className="flex justify-between mt-6">
                <motion.button
                  whileHover={{ scale: 1.1, boxShadow: "0px 0px 10px #00f" }}
                  className="px-4 py-2 bg-neon-blue rounded-md text-white hover:bg-blue-500"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, boxShadow: "0px 0px 10px #f00" }}
                  className="px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-500"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Welcome;