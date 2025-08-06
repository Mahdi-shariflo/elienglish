import { useEffect, useRef } from 'react';

type OutsideClickHandler = (event: MouseEvent | TouchEvent | KeyboardEvent) => void;

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  handler: OutsideClickHandler,
  listenCapturing = true
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        handler(event);
      }
    };

    document.addEventListener('click', handleClick, listenCapturing);
    document.addEventListener('touchstart', handleClick, listenCapturing);
    document.addEventListener('pointerdown', handleClick, listenCapturing);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClick, listenCapturing);
      document.removeEventListener('touchstart', handleClick, listenCapturing);
      document.removeEventListener('pointerdown', handleClick, listenCapturing);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handler, listenCapturing]);

  return ref;
};
