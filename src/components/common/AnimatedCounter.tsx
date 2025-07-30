// components/AnimatedCounter.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  target: number;
  duration?: number; // milliseconds
}

export default function AnimatedCounter({ target, duration = 2000 }: Props) {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;

      const progress = Math.min(elapsed / duration, 1);
      const currentCount = Math.floor(progress * target);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return (
    <span className="font-black text-xl text-[#222222] dark:text-white lg:text-3xl">
      {count.toLocaleString()}
    </span>
  );
}
