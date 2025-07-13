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
          'https://elienglish.com/wp-content/uploads/dornalms/storage/676f64ade150a574861c2ca690af386a/l087a7e0cf97b0e499e976a237ce3615e.mp4'
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
