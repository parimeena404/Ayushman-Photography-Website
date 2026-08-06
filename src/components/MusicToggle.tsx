'use client';

import { useState, useRef } from 'react';

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Soft ambient piano background track sample
  const ambientAudioUrl = 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=soft-ambient-piano-112199.mp3';

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(ambientAudioUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => console.log('Audio playback prevented'));
    }
  };

  return (
    <button
      onClick={toggleMusic}
      aria-label="Toggle background music"
      style={{
        position: 'fixed',
        bottom: '2.5rem',
        left: '2rem',
        zIndex: 90,
        backgroundColor: 'rgba(15, 35, 27, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(191, 164, 111, 0.4)',
        borderRadius: '20px',
        padding: '0.4rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#F8F5EF',
        fontSize: '0.75rem',
        letterSpacing: '0.1em',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'border-color 0.3s ease',
      }}
    >
      <span style={{ color: '#BFA46F' }}>{isPlaying ? '♫' : '♪'}</span>
      <span>{isPlaying ? 'Mute Atmosphere' : 'Sound On'}</span>
    </button>
  );
}
