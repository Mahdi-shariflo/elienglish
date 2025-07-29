'use client';

import React, { useRef, useState, useEffect } from 'react';
import Video from 'next-video';
import Image from 'next/image';
import PlayIcon from '@/../public/icons/play.svg';
import Watermark from './Watermark';
import { useParams } from 'next/navigation';
import { useUpdateWatchVideo } from '@/hooks/watchedVideo/useUpdateWatchVideo';
import { Course } from '@/store/types/home';
import { BASEURL_SITE } from '@/lib/variable';

type Props = {
  url: string;
  poster: string;
  isHls?: boolean;
  course?: Course;
  watchedTime?: number;
};

const VideoPlayer = ({ url, poster, course, watchedTime = 0 }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentTimeRef = useRef(watchedTime);
  const [isPlaying, setIsPlaying] = useState(false);
  const { mutate } = useUpdateWatchVideo();
  const { id } = useParams();
  const isHls = url.endsWith('.m3u8');
  const videoSrc = isHls ? url : `${BASEURL_SITE}/api/video/${encodeURIComponent(url)}`;
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      video.currentTime = watchedTime;
    };

    const handleTimeUpdate = () => {
      currentTimeRef.current = video.currentTime;
    };

    const handleEnded = () => {
      updateWatchedVideo(true, video.duration);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [watchedTime]);

  useEffect(() => {
    if (!isPlaying || !course) return;

    const episode = course.chapters?.flatMap((ch) => ch.episodes)?.find((ep) => ep.video === url);

    if (!episode?._id) return;

    const video = videoRef.current;
    if (!video) return;

    const interval = setInterval(() => {
      const current = video.currentTime;
      const end = video.duration;
      const remaining = end - current;
      const isCompleted = remaining <= 29 || current >= end;

      mutate({
        data: {
          courseId: id,
          episodeId: episode._id,
          isCompleted,
          watchedTime: Math.floor(current), // گرد کردن زمان
        },
      });
    }, 10000); // هر ۱۰ ثانیه

    return () => clearInterval(interval);
  }, [isPlaying, course, id, url]);

  const updateWatchedVideo = (isCompleted: boolean, current: number, episodeId?: string) => {
    const ep = course?.chapters?.flatMap((c) => c.episodes)?.find((e) => e.video === url);
    if (!ep && !episodeId) return;

    mutate({
      data: {
        courseId: id,
        episodeId: episodeId || ep?._id || '',
        isCompleted,
        watchedTime: current,
      },
    });
  };

  return (
    <div
      className="relative aspect-video h-full w-full overflow-hidden rounded-xl bg-black"
      dir="ltr"
    >
      <Video ref={videoRef} src={videoSrc} poster={poster} />
      <Watermark />
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
