"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

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
      const response = await fetch("https://test-demo-r76u.onrender.com/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name }),
      });

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
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-900 to-black text-white relative overflow-hidden">
      {/* Background animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/globe-bg.jpg')" }}
      />
      
      {/* Title Animation */}
      <motion.h1
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-6xl font-extrabold text-white drop-shadow-lg z-10"
      >
        Welcome to <span className="text-blue-400">Globetrotter</span>
      </motion.h1>
      
      {/* Button Animation */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-6 px-8 py-3 bg-blue-600 text-lg font-semibold rounded-xl shadow-lg hover:bg-blue-500 transition-all duration-300 z-10"
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
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 p-8 rounded-xl shadow-2xl text-center w-96 border border-gray-700"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Enter Your Name</h2>
              <input
                type="text"
                className="px-4 py-2 w-full rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <div className="flex justify-between mt-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-500"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
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