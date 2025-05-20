import type { Robots } from 'next/dist/lib/metadata/types/metadata-types';

export const getRobotsMeta = (robots?: Robots): Robots | undefined => {
  if (process.env.APP_ENV !== 'production' && process.env.APP_ENV !== 'development') {
    return {
      index: false,
      follow: false,
    };
  }
  if (robots) {
    return robots;
  } else {
    return {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': '-1',
    };
  }
};
