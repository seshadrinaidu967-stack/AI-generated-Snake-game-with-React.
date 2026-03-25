import React, { useState, useRef, useEffect } from 'react';

const TRACKS = [
  {
    id: 1,
    title: "DATASTREAM_01",
    artist: "NULL_POINTER",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 2,
    title: "CORRUPTED_SECTOR",
    artist: "SIGSEGV",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 3,
    title: "VOID_RESONANCE",
    artist: "KERNEL_PANIC",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  }
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  return (
    <div className="w-full max-w-md bg-black border-4 border-fuchsia-500 p-6 relative z-10">
      <div className="absolute top-0 right-0 w-2 h-full bg-cyan-500 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-full h-2 bg-fuchsia-500 animate-pulse" />

      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
      />

      <div className="mb-6 border-b-2 border-cyan-500 pb-4">
        <h3 className="text-cyan-400 font-pixel text-sm truncate uppercase glitch" data-text={currentTrack.title}>
          {currentTrack.title}
        </h3>
        <p className="text-fuchsia-500 font-mono text-xs uppercase mt-2">
          AUTHORITY: {currentTrack.artist}
        </p>
      </div>

      {/* Visualizer bars */}
      <div className="flex gap-1 h-12 mb-6 items-end bg-gray-900 p-2 border border-fuchsia-500/30">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-cyan-500"
            style={{
              height: isPlaying ? `${Math.random() * 100}%` : '10%',
              transition: 'height 0.1s ease-in-out',
              opacity: Math.random() > 0.8 ? 0.5 : 1
            }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mb-8 relative">
        <div className="h-4 w-full bg-gray-900 border border-cyan-500 overflow-hidden relative">
          <div 
            className="h-full bg-fuchsia-500"
            style={{ width: `${progress}%` }}
          />
          <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpi2rV7928GBgYGBkgAAgwABKgCNXv9sXMAAAAASUVORK5CYII=')] opacity-30 pointer-events-none" />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4 font-pixel text-xs">
        <button 
          onClick={prevTrack}
          className="flex-1 py-3 bg-black text-cyan-400 border-2 border-cyan-400 hover:bg-cyan-400 hover:text-black"
        >
          &lt;&lt;
        </button>

        <button
          onClick={togglePlay}
          className="flex-1 py-3 bg-fuchsia-500 text-black border-2 border-fuchsia-500 hover:bg-white hover:border-white"
        >
          {isPlaying ? 'PAUSE' : 'PLAY'}
        </button>

        <button 
          onClick={nextTrack}
          className="flex-1 py-3 bg-black text-cyan-400 border-2 border-cyan-400 hover:bg-cyan-400 hover:text-black"
        >
          &gt;&gt;
        </button>
      </div>

      <div className="mt-6 flex items-center justify-between text-[8px] text-fuchsia-500 font-pixel uppercase">
        <span>OUT: RAW_PCM</span>
        <span className="animate-pulse">FREQ: 44.1K</span>
      </div>
    </div>
  );
};
