'use client';

import React, { useRef, useState } from 'react';
import Video from 'next-video';
import Image from 'next/image';
import PlayIcon from '@/../public/icons/play.svg';

const VideoPlayer = ({ url, poster }: { url: string; poster: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div
      className="relative aspect-video h-full w-full overflow-hidden rounded-xl bg-black"
      dir="ltr"
    >
      <Video
        ref={videoRef}
        poster={poster}
        // src={url}
        src={
          'https://caspian19.cdn.asset.aparat.com/aparat-video/7a13c601c23aca9e0bde8ffc755d13c063599691-1080p.mp4?wmsAuthSign=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQ0Y2YzYmNlOWY5MjVjMDdiMmU0MmVjNDY0YWYwMzk1IiwiZXhwIjoxNzQ5OTc4MTAyLCJpc3MiOiJTYWJhIElkZWEgR1NJRyJ9.R9ziFcoWJ1Xy-8yKM4jmw6mizSdhmK2wyoX3QopLYtM'
        }
      />
      {!isPlaying && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 transition hover:bg-black/60"
        >
          <Image src={PlayIcon} alt="Play" width={64} height={64} />
        </button>
      )}
    </div>
  );
};

export default VideoPlayer;
