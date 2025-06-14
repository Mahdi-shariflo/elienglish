'use client';

import { BASEURL } from '@/lib/variable';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url, poster }: { url: string; poster: string }) => {
  const [play, setPlay] = useState(false);

  return (
    <div
      className="relative aspect-video h-full w-full overflow-hidden rounded-xl bg-black"
      onContextMenu={(e) => e.preventDefault()} // غیرفعال کردن کلیک راست
    >
      {/* // <Video poster={poster} src={`${BASEURL}/${url}`} /> */}
      <ReactPlayer
        url={`${BASEURL}/${url}`}
        playing={play}
        controls
        width="100%"
        height="100%"
        style={{ pointerEvents: play ? 'auto' : 'none' }}
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload', // مخفی کردن دکمه دانلود در مرورگرهای پشتیبانی‌شده
            },
          },
        }}
      />
      {!play && (
        <div
          className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/60"
          onClick={() => setPlay(true)}
        >
          {/* تصویر کاور */}
          <img
            src={poster}
            alt="video cover"
            className="absolute inset-0 z-0 h-full w-full object-fill"
          />
          {/* آیکن پلی */}
          <div className="relative z-10">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="80" height="80" rx="40" fill="#101010" fill-opacity="0.4" />
              <path
                d="M30 26.4004L50.8 40.0004L30 53.6004V26.4004Z"
                stroke="white"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
