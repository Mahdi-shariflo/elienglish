'use client';
import React, { useEffect, useState } from 'react';
import Button from './Button';
import { Arrow_back_mobile } from './icon';
import { usePathname } from 'next/navigation';
const profilePages = ['/', '/product', '/product-category', '/mag'];
const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const isProfilePage =
    pathname === '/' || profilePages.some((page) => page !== '/' && pathname.startsWith(page));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  if (!isProfilePage) return null;
  return (
    <div>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed left-1/2 top-20 !z-[35] h-[32px] w-[60px] -translate-x-1/2 bg-main bg-opacity-20 lg:top-36"
        >
          <Arrow_back_mobile className="block h-5 w-5 -rotate-90 stroke-main" />
        </Button>
      )}
    </div>
  );
};

export default ScrollTop;
