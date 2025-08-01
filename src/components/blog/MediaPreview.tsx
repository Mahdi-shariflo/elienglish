'use client';
import React from 'react';
import Image from '../common/Image';
import { Blog } from '@/store/types';
import { BASEURL, BASEURL_SITE } from '@/lib/variable';
import dynamic from 'next/dynamic';
import { Course } from '@/store/types/home';
import VideoPlayer from '../admin/common/VideoPlayer';
import MediaThemeTailwindAudio from 'player.style/tailwind-audio/react';

const MediaPreview = ({ media, className }: { media: Blog | Course; className?: string }) => {
  if (!media) return null;

  // تشخیص دسکتاپ سمت کلاینت
  console.log(media?.audio?.url);
  return (
    <>
      <div
        className={`mt-3 overflow-hidden rounded-xl border border-[#E5EAEF] dark:!border-gray-700 lg:mt-[24px] ${className}`}
      >
        {media?.video?.url ? (
          <VideoPlayer
            poster={`${BASEURL}/${media?.coverVideo?.url}`}
            url={`${BASEURL}/${media?.video?.url}`}
          />
        ) : media?.thumbnailImage?.url ? (
          <Image
            className="h-[230px] w-full lg:h-[480px]"
            classImg="object-fill"
            src={media?.thumbnailImage?.url}
            alt=""
          />
        ) : null}
      </div>

      {media?.audio?.url ? (
        <audio
          controlsList="nodownload noplaybackrate"
          className="mt-5 w-full rounded-lg border border-gray-200/60 !bg-transparent font-medium dark:!bg-[#172334]"
          controls
        >
          <source src={`${BASEURL}/${media.audio.url}`} type="audio/ogg" />
          <source src={`${BASEURL}/${media.audio.url}`} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      ) : // </MediaThemeTailwindAudio>
      null}
    </>
  );
};

export default MediaPreview;
