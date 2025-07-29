'use client';
import React from 'react';
import Image from '../common/Image';
import { Blog } from '@/store/types';
import { BASEURL } from '@/lib/variable';
import dynamic from 'next/dynamic';
import { Course } from '@/store/types/home';
import VideoPlayer from '../admin/common/VideoPlayer';

// پخش‌کننده صوتی داینامیک
const MediaThemeSutroAudio = dynamic(() => import('player.style/sutro-audio/react'), {
  ssr: false,
});

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
        <MediaThemeSutroAudio
          className="drop_shadow_cart mt-8"
          style={{
            '--media-primary-color': '#6E3DFF',
            '--media-secondary-color': '#fff',
            '--media-accent-color': '#E0D7FB',
            width: '100%',
            direction: 'ltr',
          }}
        >
          {/* فقط در دسکتاپ رندر کن */}
          {isDesktop && (
            <div slot="poster">
              <img
                src={`${BASEURL}/${media.thumbnailImage.url}`}
                alt="Audio Poster"
                style={{ width: '100%', objectFit: 'cover' }}
              />
            </div>
          )}
          <audio slot="media" src={`${BASEURL}/${media.audio.url}`} playsInline />
        </MediaThemeSutroAudio>
      ) : null}
    </>
  );
};

export default MediaPreview;
