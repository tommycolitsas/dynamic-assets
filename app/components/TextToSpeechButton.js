"use client";

import { useState, useEffect } from "react";
import { Icons } from "./icons";
import { useAudio } from "./AudioContext";

export default function TextToSpeechButton({ text, voiceId, voiceName }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const { currentAudio, playAudio, stopAudio } = useAudio();

  useEffect(() => {
    if (currentAudio !== audio) {
      setIsPlaying(false);
    }
  }, [currentAudio, audio]);

  const handleClick = async () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
      return;
    }

    try {
      setIsPlaying(true);
      const response = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, voiceId }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate audio");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const newAudio = new Audio(url);
      setAudio(newAudio);

      newAudio.play();
      playAudio(newAudio);
      newAudio.onended = () => {
        setIsPlaying(false);
        stopAudio();
      };
    } catch (error) {
      console.error("Error generating audio:", error);
      setIsPlaying(false);
      stopAudio();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-4 px-6 rounded flex items-center justify-start transition-colors duration-200"
    >
      <div className="w-8 h-8 flex items-center justify-center mr-3">
        {isPlaying ? (
          <Icons.pause className="w-6 h-6" />
        ) : (
          <Icons.play className="w-6 h-6" />
        )}
      </div>
      <span>{voiceName}</span>
    </button>
  );
}
