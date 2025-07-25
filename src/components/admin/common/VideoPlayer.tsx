'use client';

import React from 'react';
import HlsPlayer from './HlsPlayer';
import { Course } from '@/types/home';
import Video from 'next-video';

type Props = {
  url: string;
  poster: string;
  isHls?: boolean;
  course?: Course;
  watchedTime?: number;
};

const VideoPlayer = ({ url }: Props) => {
  return (
    <div>
      <Video src={'http://localhost:3000/api/video'} />
    </div>
  );

  // return <HlsPlayer watchedTime={watchedTime} course={course} isHls={isHls} src={url} />;
};

export default VideoPlayer;
