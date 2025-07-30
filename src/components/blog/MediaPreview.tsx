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
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;

  return (
    <>
      <div
        className={`mt-3 overflow-hidden rounded-xl border border-[#E5EAEF] lg:mt-[24px] ${className}`}
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
        // <MediaThemeTailwindAudio
        // style={{ "--media-primary-color": "#6E3DFF", "--media-secondary-color": "#fff", "--media-accent-color": "#6E3DFF",width:"100%",boxShadow:"none" }}
        // dir='ltr'
        // className='mt-10'
        // >
        <audio src={`${BASEURL}/${media.audio.url}`} playsInline></audio>
      ) : // </MediaThemeTailwindAudio>
      null}
    </>
  );
};

export default MediaPreview;
