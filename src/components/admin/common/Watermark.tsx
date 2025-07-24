import { useSession } from '@/lib/auth/useSession';
import React, { useEffect, useRef, useState } from 'react';

const Watermark = () => {
  const [position, setPosition] = useState({ top: 10, left: 10 });
  const session = useSession();

  useEffect(() => {
    const interval = setInterval(() => {
      const top = Math.floor(Math.random() * 80); // برای جلوگیری از خارج شدن واترمارک
      const left = Math.floor(Math.random() * 80);
      setPosition({ top, left });
    }, 5000); // هر ۵ ثانیه جابه‌جا می‌شود

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="pointer-events-none absolute select-none font-medium text-sm text-white opacity-20 transition-all duration-1000"
      style={{
        top: `${position.top}%`,
        left: `${position.left}%`,
      }}
    >
      {session?.mobile}
    </div>
  );
};

export default Watermark;
