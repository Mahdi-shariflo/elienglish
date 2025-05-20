'use client';

import React, { useRef, useState } from 'react';

import Image from 'next/image';

import styles from './magnifier.module.css';
import BaseDialog from '../common/BaseDialog';

const Magnifier = ({
  src,
  className,
  mixImgClasses = 'default',
}: {
  src: string;
  className?: string;
  containerClasses?: string;
  mixImgClasses?: 'default' | 'mixed' | 'isolated';
  mixContainerClasses?: 'default' | 'mixed' | 'isolated';
}) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startDragPosition, setStartDragPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [lastTap, setLastTap] = useState<number | null>(null);
  const imgContainerRef = useRef<HTMLDivElement | null>(null);

  const handleDoubleTap = (e: React.TouchEvent) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - (lastTap || 0);
    if (tapLength < 300 && tapLength > 0) {
      // Double-tap detected
      setScale((prevScale) => (prevScale === 1 ? 2 : 1)); // Toggle between 1x and 2x
      setPosition({ x: 0, y: 0 }); // Reset position
    }
    setLastTap(currentTime);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      // Drag start
      setIsDragging(true);
      setStartDragPosition({
        x: e.touches[0].pageX - position.x,
        y: e.touches[0].pageY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1 && isDragging) {
      // Drag move
      setPosition({
        x: e.touches[0].pageX - startDragPosition.x,
        y: e.touches[0].pageY - startDragPosition.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => {
    setOpenDialog(false);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div>
      <div onClick={handleOpen}>
        <Image
          className={
            mixImgClasses === 'default'
              ? `${styles.zoomImage}`
              : mixImgClasses === 'mixed'
                ? `${styles.zoomImage} ${className}`
                : `${className}`
          }
          layout="responsive"
          width={100}
          height={100}
          src={src}
          alt="zoomable image"
        />
      </div>
      <BaseDialog size="full" isOpen={openDialog} onClose={handleClose}>
        <div
          ref={imgContainerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onDoubleClick={(e) => e.preventDefault()}
          onTouchEndCapture={handleDoubleTap}
          className="relative overflow-hidden"
          style={{
            touchAction: 'none', // Prevent default touch behaviors
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.3s ease',
          }}
        >
          <Image
            src={src}
            alt="zoomable image"
            layout="responsive"
            width={100}
            height={100}
            className={
              mixImgClasses === 'default'
                ? `${styles.zoomImage}`
                : mixImgClasses === 'mixed'
                  ? `${styles.zoomImage} ${className}`
                  : `${className}`
            }
          />
        </div>
      </BaseDialog>
    </div>
  );
};

export default Magnifier;
