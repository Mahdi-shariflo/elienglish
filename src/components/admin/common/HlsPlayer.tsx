'use client';
import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';

const HlsPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS error:', data);
      });

      return () => {
        hls.destroy();
      };
    } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
      // برای سافاری که hls native ساپورت می‌کنه
      videoRef.current.src = src;
    }
  }, [src]);

  return (
    <div className="video-player relative h-full w-full overflow-hidden rounded-lg">
      <video ref={videoRef} controls className="h-full w-full rounded shadow" autoPlay />
    </div>
  );
};

export default HlsPlayer;
