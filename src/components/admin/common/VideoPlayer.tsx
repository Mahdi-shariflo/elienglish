'use client';

import React from 'react';
import HlsPlayer from './HlsPlayer';
import { Course } from '@/types/home';

type Props = {
  url: string;
  poster: string;
  isHls?: boolean;
  course: Course;
  watchedTime?: number;
};

const VideoPlayer = ({ url, isHls, course, watchedTime }: Props) => {
  return <HlsPlayer watchedTime={watchedTime} course={course} isHls={isHls} src={url} />;
};

export default VideoPlayer;
