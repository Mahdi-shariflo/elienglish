// components/HLSPlayer.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

const HLSPlayer = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hlsInstance, setHlsInstance] = useState<Hls | null>(null);
  const [levels, setLevels] = useState<any[]>([]);

  const videoSrc =
    'https://elienglish.arvanvod.ir/AqZjy04YNg/eyL1dp1Xdg/h_,144_200,240_400,360_800,480_1500,720_2500,1080_4500,k.mp4.list/master.m3u8';

  useEffect(() => {
    if (videoRef.current && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(videoRef.current);
      setHlsInstance(hls);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLevels(hls.levels);
      });

      return () => {
        hls.destroy();
      };
    } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
      // برای سافاری
      videoRef.current.src = videoSrc;
    }
  }, []);

  const handleQualityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = parseInt(e.target.value);
    if (hlsInstance) {
      hlsInstance.currentLevel = selectedIndex;
    }
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <video
        ref={videoRef}
        controls
        width="640"
        height="360"
        className="rounded"
        autoPlay
        style={{ backgroundColor: '#000' }}
      />
      {levels.length > 0 && (
        <select onChange={handleQualityChange} className="rounded border p-2">
          {levels.map((level, index) => (
            <option key={index} value={index}>
              {level.height}p
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default HLSPlayer;
