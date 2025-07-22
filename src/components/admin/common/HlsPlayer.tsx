'use client';
import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';
import Button from '@/components/common/Button';

const HlsPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // پیش‌فرض صدا: 100%
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const hlsInstance = useRef<Hls | null>(null);
  const [qualities, setQualities] = useState<{ label: string; level: number }[]>([]);
  const [currentQuality, setCurrentQuality] = useState<number>(-1); // -1 = Auto
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // اگر HLS هست
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
        setIsPlaying(true);
        video.play(); // اتوپلی
      });

      hlsInstance.current = hls;
    }
    // اگر Safari یا لینک معمولی (mp4)
    else if (video.canPlayType('application/vnd.apple.mpegurl') || src.endsWith('.mp4')) {
      video.src = src;
      video.load();
      video.play(); // اتوپلی
      setIsPlaying(true);
    }

    return () => {
      hlsInstance.current?.destroy?.();
    };
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
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

  return (
    <div
      ref={containerRef}
      dir="ltr"
      className="video-player relative h-full w-full overflow-hidden rounded-lg"
    >
      <video ref={videoRef} controls={false} className="h-full w-full rounded shadow" />
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
                {formatTime(currentTime)} / {formatTime(duration)}
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
              #ffffff ${(currentTime / duration) * 100}%,
              #ffffff80 ${(currentTime / duration) * 100}%
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
