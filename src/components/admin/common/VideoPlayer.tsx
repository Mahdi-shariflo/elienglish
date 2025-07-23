'use client';

import React, { useEffect } from 'react';
import HlsPlayer from './HlsPlayer';
import { useUpdateWatchVideo } from '@/hooks/watchedVideo/useUpdateWatchVideo';
import { useParams, useRouter } from 'next/navigation';

type Props = {
  url: string;
  poster: string;
  isHls?: boolean;
};

const VideoPlayer = ({ url, isHls }: Props) => {
  const { mutate } = useUpdateWatchVideo();
  const router = useRouter();
  const { id } = useParams();
  // useEffect(() => {
  //   if (!isHls) return;

  //   const interval = setInterval(() => {
  //     mutate({
  //       data: {
  //         courseId: '6876511040f32a0e79dd5c49',
  //         episodeId: '6876511040f32a0e79dd5c4a',
  //         watchedTime: 11,
  //       },
  //     }); // اینجا درخواستت رو می‌فرستی
  //   }, 30000); // هر ۳۰ ثانیه

  //   return () => clearInterval(interval); // پاک‌سازی وقتی کامپوننت unmount میشه
  // }, [isHls, mutate]);

  useEffect(() => {
    if (url && isHls) {
      router.push(`/course/video/${id}?video=${url}`);
    }
  }, [url]);

  return <HlsPlayer src={url} />;
};

export default VideoPlayer;
