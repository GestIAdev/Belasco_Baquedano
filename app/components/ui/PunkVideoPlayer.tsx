"use client";

import React, { useRef, useState } from 'react';

const PunkVideoPlayer: React.FC<{ src: string }> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="relative w-full h-full group bg-black min-h-0 overflow-hidden box-border max-h-full">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover max-h-full"
        loop
        playsInline
      />
      <div 
        className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer pointer-events-auto"
        onClick={togglePlay}
        aria-hidden={false}
      >
        <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-bodega-gold/70 flex items-center justify-center backdrop-blur-sm">
          {isPlaying ? (
            <svg className="w-10 h-10 text-bodega-dark" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v4a1 1 0 11-2 0V8z" clipRule="evenodd"></path></svg>
          ) : (
            <svg className="w-10 h-10 text-bodega-dark" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"></path></svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default PunkVideoPlayer;
