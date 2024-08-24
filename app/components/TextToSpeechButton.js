

'use client';

import { useState } from 'react';
import { Icons } from './icons';

export default function TextToSpeechButton({ text }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  const handleClick = async () => {
    if (isPlaying) {
      audio?.pause();
      setIsPlaying(false);
      return;
    }

    try {
      setIsPlaying(true);
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate audio');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const newAudio = new Audio(url);
      setAudio(newAudio);

      newAudio.play();
      newAudio.onended = () => {
        setIsPlaying(false);
      };
    } catch (error) {
      console.error('Error generating audio:', error);
      setIsPlaying(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-3 px-3 rounded"
    >
      {isPlaying ? <Icons.pause/> : <Icons.play />} 
    </button>
  );
}