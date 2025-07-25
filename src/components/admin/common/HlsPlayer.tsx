'use client';
import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';
import Button from '@/components/common/Button';
import Watermark from './Watermark';
import { Course } from '@/types/home';
import { useUpdateWatchVideo } from '@/hooks/watchedVideo/useUpdateWatchVideo';
import { useParams } from 'next/navigation';
type Props = {
  src: string;
  isHls?: boolean;
  course?: Course;
  poster?: string;
  watchedTime?: number;
};
const HlsPlayer = ({ src, course, isHls, watchedTime }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentTimeRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(watchedTime);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // پیش‌فرض صدا: 100%
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hlsInstance = useRef<Hls | null>(null);
  const [qualities, setQualities] = useState<{ label: string; level: number }[]>([]);
  const [currentQuality, setCurrentQuality] = useState<number>(-1); // -1 = Auto
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => {
      if (watchedTime && watchedTime > 0) {
        video.currentTime = watchedTime;
      }
    };

    // برای HLS
    if (Hls.isSupported() && src.endsWith('.m3u8')) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const qualityList = hls.levels.map((level, index) => ({
          label: `${level.height}p`,
          level: index,
        }));

        setQualities([{ label: 'خودکار', level: -1 }, ...qualityList]);
        setCurrentQuality(hls.currentLevel);
        setIsLoading(false);
      });

      video.addEventListener('loadedmetadata', handleLoaded);

      hlsInstance.current = hls;
    }
    // برای فایل‌های MP4
    else if (video.canPlayType('application/vnd.apple.mpegurl') || src.endsWith('.mp4')) {
      video.src = src;
      video.load();
      video.addEventListener('loadedmetadata', handleLoaded);
      setIsPlaying(true);
      setIsLoading(false);
    }

    return () => {
      hlsInstance.current?.destroy?.();
      video.removeEventListener('loadedmetadata', handleLoaded);
    };
  }, [src, watchedTime]);

  const { mutate } = useUpdateWatchVideo();
  const { id } = useParams();

  useEffect(() => {
    if (!isPlaying || !isHls || !course || !src) return;

    const episode = course?.chapters
      ?.flatMap((chapter) => chapter.episodes)
      ?.find((ep) => ep.video === src);

    if (!episode?._id) return;

    const checkAndUpdate = () => {
      const current = currentTimeRef.current;
      const end = duration;

      const remaining = end - current;

      const isCompleted = remaining <= 29 || current >= end;

      mutate({
        data: {
          isCompleted,
          courseId: id,
          episodeId: episode._id,
          watchedTime: current,
        },
      });
    };

    const interval = setInterval(checkAndUpdate, 10000); // هر ۱۰ ثانیه بررسی

    // وقتی ویدیو کامل تموم شد
    const video = videoRef.current;
    const handleEnded = () => {
      mutate({
        data: {
          isCompleted: true,
          courseId: id,
          episodeId: episode._id,
          watchedTime: duration,
        },
      });
    };

    video?.addEventListener('ended', handleEnded);

    return () => {
      clearInterval(interval);
      video?.removeEventListener('ended', handleEnded);
    };
  }, [isHls, isPlaying, src, course, mutate, id, duration]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      currentTimeRef.current = video.currentTime; // ← این خط اضافه بشه
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault(); // جلوگیری از نمایش منوی راست کلیک
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('contextmenu', handleContextMenu);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  // 🎚 کنترل ولوم
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // تغییر حالت پخش/توقف
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // عقب رفتن 10 ثانیه
  const handleRewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
    }
  };

  // جلو رفتن 10 ثانیه
  const handleForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 10);
    }
  };

  const handleQualityChange = (level: number) => {
    if (hlsInstance.current) {
      hlsInstance.current.currentLevel = level;
      setCurrentQuality(level);
    }
  };
  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 ثانیه

    return () => clearTimeout(timeout);
  }, [src]);

  return (
    <div
      ref={containerRef}
      dir="ltr"
      className="video-player relative h-full w-full overflow-hidden rounded-lg"
    >
      <Watermark />
      {!isPlaying && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
          <span>
            <svg
              width="42"
              height="43"
              viewBox="0 0 42 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="0.5" width="42" height="42" rx="21" fill="#101010" fill-opacity="0.4" />
              <path
                d="M27.5402 18.9983L17.8802 13.4583C17.3575 13.1565 16.7642 12.9984 16.1606 13C15.557 13.0017 14.9646 13.163 14.4435 13.4678C13.9225 13.7725 13.4914 14.2096 13.194 14.7349C12.8966 15.2601 12.7435 15.8547 12.7502 16.4583V27.5783C12.7502 28.4854 13.1105 29.3552 13.7519 29.9966C14.3933 30.638 15.2632 30.9983 16.1702 30.9983C16.7707 30.9973 17.3603 30.8387 17.8802 30.5383L27.5402 24.9983C28.0593 24.6979 28.4902 24.2663 28.7898 23.7468C29.0894 23.2272 29.2471 22.638 29.2471 22.0383C29.2471 21.4386 29.0894 20.8494 28.7898 20.3299C28.4902 19.8103 28.0593 19.3787 27.5402 19.0783V18.9983ZM26.5402 23.1883L16.8802 28.8083C16.6637 28.931 16.4191 28.9955 16.1702 28.9955C15.9213 28.9955 15.6767 28.931 15.4602 28.8083C15.2443 28.6837 15.065 28.5044 14.9404 28.2885C14.8158 28.0725 14.7502 27.8276 14.7502 27.5783V16.4183C14.7502 16.169 14.8158 15.9241 14.9404 15.7082C15.065 15.4923 15.2443 15.313 15.4602 15.1883C15.6776 15.0675 15.9215 15.0022 16.1702 14.9983C16.4187 15.0034 16.6624 15.0686 16.8802 15.1883L26.5402 20.7683C26.7562 20.8929 26.9356 21.0722 27.0603 21.2881C27.185 21.504 27.2506 21.749 27.2506 21.9983C27.2506 22.2477 27.185 22.4926 27.0603 22.7085C26.9356 22.9244 26.7562 23.1037 26.5402 23.2283V23.1883Z"
                fill="white"
              />
            </svg>
          </span>
        </div>
      )}
      <video
        onClick={togglePlay}
        ref={videoRef}
        controls={false}
        className="h-full w-full rounded object-fill shadow"
      />
      {!isLoading && (
        <div
          dir="ltr"
          className="absolute bottom-0 left-1/2 z-[9999] w-[95%] -translate-x-1/2 space-y-3"
        >
          <input
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={currentTime}
            onChange={handleRangeChange}
            className="custom-range"
          />

          <div className="flex w-full items-center justify-between">
            <div className="flex items-center justify-start gap-4">
              <button onClick={handleRewind}>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.832 31.6654L2.83203 19.9987L17.832 8.33203V31.6654Z"
                    stroke="white"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M36.1641 31.6654L21.1641 19.9987L36.1641 8.33203V31.6654Z"
                    stroke="white"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button onClick={togglePlay}>
                {isPlaying ? (
                  <svg
                    className="text-white"
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    height="30px"
                    width="30px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Pause_1">
                      <g>
                        <path d="M8.25,21.937H6.564a2.5,2.5,0,0,1-2.5-2.5V4.563a2.5,2.5,0,0,1,2.5-2.5H8.25a2.5,2.5,0,0,1,2.5,2.5V19.437A2.5,2.5,0,0,1,8.25,21.937ZM6.564,3.063a1.5,1.5,0,0,0-1.5,1.5V19.437a1.5,1.5,0,0,0,1.5,1.5H8.25a1.5,1.5,0,0,0,1.5-1.5V4.563a1.5,1.5,0,0,0-1.5-1.5Z"></path>
                        <path d="M17.436,21.937H15.75a2.5,2.5,0,0,1-2.5-2.5V4.563a2.5,2.5,0,0,1,2.5-2.5h1.686a2.5,2.5,0,0,1,2.5,2.5V19.437A2.5,2.5,0,0,1,17.436,21.937ZM15.75,3.063a1.5,1.5,0,0,0-1.5,1.5V19.437a1.5,1.5,0,0,0,1.5,1.5h1.686a1.5,1.5,0,0,0,1.5-1.5V4.563a1.5,1.5,0,0,0-1.5-1.5Z"></path>
                      </g>
                    </g>
                  </svg>
                ) : (
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.97656 5L31.3099 20L7.97656 35V5Z"
                      stroke="white"
                      stroke-width="2.85714"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                )}
              </button>
              <button onClick={handleForward}>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.1641 31.6654L36.1641 19.9987L21.1641 8.33203V31.6654Z"
                    stroke="white"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.83203 31.6654L17.832 19.9987L2.83203 8.33203V31.6654Z"
                    stroke="white"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <span>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.168 6.66797L7.5013 12.0013H2.16797V20.0013H7.5013L14.168 25.3346V6.66797Z"
                      stroke="white"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M24.9293 6.57422C27.4289 9.07459 28.8331 12.4654 28.8331 16.0009C28.8331 19.5364 27.4289 22.9272 24.9293 25.4276M20.2227 11.2809C21.4725 12.5311 22.1746 14.2265 22.1746 15.9942C22.1746 17.762 21.4725 19.4574 20.2227 20.7076"
                      stroke="white"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="custom-volume"
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="text-md w-[100px] text-right font-medium text-white">
                  {formatTime(currentTime!)} / {formatTime(duration)}
                </div>
                <Button className="!w-fit !min-w-fit" onClick={toggleFullscreen}>
                  {isFullscreen ? (
                    <svg
                      width="32"
                      height="33"
                      viewBox="0 0 32 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.1667 4.9375H6.16667C5.45942 4.9375 4.78115 5.21845 4.28105 5.71855C3.78095 6.21865 3.5 6.89692 3.5 7.60417V11.6042M27.5 11.6042V7.60417C27.5 6.89692 27.219 6.21865 26.719 5.71855C26.2189 5.21845 25.5406 4.9375 24.8333 4.9375H20.8333M20.8333 28.9375H24.8333C25.5406 28.9375 26.2189 28.6565 26.719 28.1565C27.219 27.6564 27.5 26.9781 27.5 26.2708V22.2708M3.5 22.2708V26.2708C3.5 26.9781 3.78095 27.6564 4.28105 28.1565C4.78115 28.6565 5.45942 28.9375 6.16667 28.9375H10.1667"
                        stroke="white"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="32"
                      height="33"
                      viewBox="0 0 32 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.1667 4.9375H6.16667C5.45942 4.9375 4.78115 5.21845 4.28105 5.71855C3.78095 6.21865 3.5 6.89692 3.5 7.60417V11.6042M27.5 11.6042V7.60417C27.5 6.89692 27.219 6.21865 26.719 5.71855C26.2189 5.21845 25.5406 4.9375 24.8333 4.9375H20.8333M20.8333 28.9375H24.8333C25.5406 28.9375 26.2189 28.6565 26.719 28.1565C27.219 27.6564 27.5 26.9781 27.5 26.2708V22.2708M3.5 22.2708V26.2708C3.5 26.9781 3.78095 27.6564 4.28105 28.1565C4.78115 28.6565 5.45942 28.9375 6.16667 28.9375H10.1667"
                        stroke="white"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </Button>
                <select
                  value={currentQuality}
                  onChange={(e) => handleQualityChange(Number(e.target.value))}
                  className="rounded-lg p-1 font-medium"
                >
                  {qualities.map((q) => (
                    <option className="font-medium text-[14px]" key={q.level} value={q.level}>
                      {q.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <style jsx>{`
            .custom-range {
              width: 100%;
              height: 6px;
              appearance: none;
              background: linear-gradient(
                to right,
                #ffffff ${(currentTime! / duration) * 100}%,
                #ffffff80 ${(currentTime! / duration) * 100}%
              );
              border-radius: 4px;
              outline: none;
            }

            .custom-range::-webkit-slider-thumb {
              appearance: none;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: #ffffff;
              cursor: pointer;
            }

            .custom-range::-moz-range-thumb {
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: #ffffff;
              cursor: pointer;
            }

            .custom-range::-ms-thumb {
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: #ffffff;
              cursor: pointer;
            }
            .custom-volume {
              width: 100%;
              height: 6px;
              appearance: none;
              background: linear-gradient(
                to right,
                #ffffff ${volume * 100}%,
                #ffffff80 ${volume * 100}%
              );
              border-radius: 4px;
              outline: none;
              transition: background 0.3s ease;
            }

            .custom-volume::-webkit-slider-thumb {
              appearance: none;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: #ffffff;
              cursor: pointer;
              border: none;
              margin-top: 0px;
            }

            .custom-volume::-moz-range-thumb {
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: #ffffff;
              cursor: pointer;
              border: none;
            }

            .custom-volume::-ms-thumb {
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: #ffffff;
              cursor: pointer;
              border: none;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default HlsPlayer;

// تابع تبدیل زمان به دقیقه:ثانیه
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
};
