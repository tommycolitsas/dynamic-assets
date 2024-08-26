"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Loader } from "lucide-react";
import { useAudio } from "./AudioContext";

const audioCache = new Map();

export default function TextToSpeechButton({ text, voiceId, voiceName }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);
  const { currentAudio, playAudio, stopAudio } = useAudio();

  useEffect(() => {
    if (currentAudio !== audioRef.current) {
      setIsPlaying(false);
    }
  }, [currentAudio]);

  useEffect(() => {
    // Preload audio
    if (!audioCache.has(voiceId)) {
      setIsLoading(true);
      fetchAudio().then(() => setIsLoading(false));
    }
  }, [voiceId, text]);

  const fetchAudio = async () => {
    try {
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
      const audio = new Audio(url);
      audioCache.set(voiceId, audio);
      audioRef.current = audio;
    } catch (error) {
      console.error("Error generating audio:", error);
    }
  };

  const handleClick = async () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
      return;
    }

    let audio = audioCache.get(voiceId);
    if (!audio) {
      setIsLoading(true);
      await fetchAudio();
      audio = audioCache.get(voiceId);
      setIsLoading(false);
    }

    if (audio) {
      setIsPlaying(true);
      audio.currentTime = 0; // reset to start
      audio.play();
      playAudio(audio);
      audio.onended = () => {
        setIsPlaying(false);
        stopAudio();
      };
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-4 px-6 rounded flex items-center justify-start transition-colors duration-200 ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <div className="w-8 h-8 flex items-center justify-center mr-3">
        {isLoading ? (
          <Loader className="w-6 h-6 animate-spin" />
        ) : isPlaying ? (
          <Pause className="w-6 h-6" />
        ) : (
          <Play className="w-6 h-6" />
        )}
      </div>
      <span>{voiceName}</span>
    </button>
  );
}
