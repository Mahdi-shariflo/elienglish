'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SwipeBack() {
  const router = useRouter();

  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY; // نقطه شروع لمس
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].clientY; // نقطه پایان لمس

      if (touchEndY - touchStartY > 100) {
        router.back(); // برگرد به صفحه قبل
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [router]);

  return null; // این کامپوننت چیزی نمایش نمی‌دهد، فقط لیسنر دارد
}
