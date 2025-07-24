'use client';

import React from 'react';
import HlsPlayer from './HlsPlayer';
import { Course } from '@/types/home';

type Props = {
  url: string;
  poster: string;
  isHls?: boolean;
  course: Course;
};

const VideoPlayer = ({ url, isHls, course }: Props) => {
  return <HlsPlayer course={course} isHls={isHls} src={url} />;
};

export default VideoPlayer;
