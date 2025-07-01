'use client';
import React from 'react';
import Image from '../common/Image';
import { Blog } from '@/types';
import VideoPlayer from '../admin/common/VideoPlayer';
import { BASEURL } from '@/lib/variable';
import dynamic from 'next/dynamic';
const MediaThemeSutroAudio = dynamic(() => import('player.style/sutro-audio/react'), {
  ssr: false,
});

const MediaPreview = ({ media, className }: { media: Blog; className?: string }) => {
  return (
    <>
      <div
        className={`mt-3 h-[193px] overflow-hidden rounded-xl border border-[#E5EAEF] dark:!border-none lg:mt-[24px] lg:h-[480px] 3xl:h-[500px] ${className}`}
      >
        {media?.video?.url ? (
          <VideoPlayer poster={`${BASEURL}/${media?.coverVideo?.url}`} url={media?.video?.url} />
        ) : (
          <Image
            className="h-full w-full"
            classImg="object-fill"
            src={media.thumbnailImage.url}
            alt=""
          />
        )}
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
          <img
            slot="poster"
            src={`${BASEURL}/${media.thumbnailImage.url}`}
            alt="Audio Poster"
            style={{ width: '100%', objectFit: 'cover' }}
          />
          <audio
            slot="media"
            src={`${BASEURL}/${media.audio.url}`}
            playsInline
            crossOrigin="anonymous"
          ></audio>
        </MediaThemeSutroAudio>
      ) : null}
    </>
  );
};

export default MediaPreview;
