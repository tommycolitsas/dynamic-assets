"use client";

import React, { createContext, useState, useContext } from "react";

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [currentAudio, setCurrentAudio] = useState(null);

  const playAudio = (newAudio) => {
    if (currentAudio && currentAudio !== newAudio) {
      currentAudio.pause();
    }
    setCurrentAudio(newAudio);
  };

  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }
  };

  return (
    <AudioContext.Provider value={{ currentAudio, playAudio, stopAudio }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
