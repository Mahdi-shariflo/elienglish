'use client';

import React, { useRef, useState } from 'react';
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
      <video
        ref={videoRef}
        src={url}
        poster={poster}
        controls={isPlaying} // فقط بعد از کلیک دکمه پخش
        className="h-full w-full rounded-xl object-cover"
        controlsList="nodownload"
        disablePictureInPicture
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
