"use client";

import { useRef, useEffect } from 'react';

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reproducir video en bucle al montar
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch((error) => {
      console.warn('Error reproduciendo video:', error);
    });
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 pointer-events-none"
      muted
      playsInline
      preload="auto"
      loop
      autoPlay
    >
      {/* Placeholder para video - reemplazar con tu video real */}
      <source src="/videos/hero-background.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

