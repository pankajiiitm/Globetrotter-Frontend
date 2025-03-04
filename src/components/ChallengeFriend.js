"use client";
import React, { useState } from "react";

const ChallengeFriend = ({ username, score }) => {
  const [friendName, setFriendName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const generateInviteMessage = () => {
    const inviteeName = friendName.trim() === "" ? "Guest" : friendName;
    return `Hey ${inviteeName}! 🎮 I scored ${score} in this awesome game! Can you beat my score? Click here to play: https://dazzling-squirrel-e5a380.netlify.app/challenge?inviter=${username}&invitee=${inviteeName}&score=${score}`;
  };

  const handleShare = async (platform) => {
    const message = generateInviteMessage();
    const encodedMessage = encodeURIComponent(message);

    if (platform === "whatsapp") {
      window.open(`https://api.whatsapp.com/send?text=${encodedMessage}`, "_blank");
    } else if (platform === "gmail") {
      window.open(`mailto:?subject=Challenge%20Invitation&body=${encodedMessage}`, "_blank");
    } else if (navigator.share) {
      try {
        await navigator.share({ text: message });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }

    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 text-white p-6 rounded-lg shadow-xl max-w-sm mx-auto border border-gray-700">
      {/* Score Display */}
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-400">Your Score</h2>
        <p className="text-4xl font-bold text-yellow-400 mt-2 drop-shadow-lg">{score}</p>
      </div>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Enter friend's name"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
        className="mt-4 w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white text-center"
      />

      {/* Challenge Button */}
      <button
        onClick={() => setShowModal(true)}
        className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-4 rounded-md shadow-md transition duration-300"
      >
        🎮 Challenge a Friend
      </button>

      {/* Sharing Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-80">
            <h3 className="text-lg font-semibold text-white">Share via</h3>
            <button
              className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
              onClick={() => handleShare("whatsapp")}
            >
              📱 WhatsApp
            </button>
            <button
              className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
              onClick={() => handleShare("gmail")}
            >
              ✉️ Gmail
            </button>
            <button
              className="mt-3 w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
              onClick={() => handleShare("other")}
            >
              🔗 Other Apps
            </button>
            <button
              className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
              onClick={() => setShowModal(false)}
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeFriend;
