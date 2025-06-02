import React from 'react';
import Poster from '@/../public/images/poster-blog-1.png';
import Image from '../common/Image';
const MediaPreview = () => {
  return (
    <div className="mt-[24px] h-[420px] rounded-xl border border-[#E5EAEF]">
      <Image className="h-full w-full" src={Poster.src} alt="" />
    </div>
  );
};

export default MediaPreview;
