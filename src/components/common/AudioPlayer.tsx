'use client';
import React from 'react';
import { AudioPlayerControlSprite, Audio } from 'react-audio-player-pro';
import 'react-audio-player-pro/dist/style.css';

const mediaMetadata = {
  // required
  title: 'Pure Water',
};

export function AudioPlayer({ src, className }: { src: string; className?: string }) {
  return (
    <div className={className} dir="ltr">
      <AudioPlayerControlSprite />
      <Audio
        src={src}
        preload="auto"
        duration={0}
        className="my-class-name"
        useRepeatButton={true}
      />
    </div>
  );
}
