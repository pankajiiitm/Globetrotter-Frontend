"use client"
import React, { useState } from "react";

const ChallengeFriend = ({ username, score }) => {
  const [friendName, setFriendName] = useState("");

  const generateWhatsAppLink = async () => {
    const inviteeName = friendName.trim() === "" ? "Guest" : friendName; // Default to "Guest" if empty

    const response = await fetch("https://test-demo-r76u.onrender.com/api/invite/generateInviteLink", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inviter: username, invitee: inviteeName })
    });

    const data = await response.json();
    console.log(data);

    if (data.inviteLink) {
      const message = `Hey ${inviteeName}! 🎮 I scored ${score} in this awesome game! Can you beat my score? Click here to play: http://localhost:3000/challenge?inviter=${username}&invitee=${inviteeName}&score=${score}`;

      const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
      window.open(whatsappLink, "_blank");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter friend's name"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />
      <button onClick={generateWhatsAppLink}>Challenge a Friend</button>
    </div>
  );
};

export default ChallengeFriend;
