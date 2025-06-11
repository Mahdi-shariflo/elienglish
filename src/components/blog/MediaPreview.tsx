import React from 'react';
import Image from '../common/Image';
import { Blog } from '@/types';
import VideoPlayer from '../admin/common/VideoPlayer';
import { BASEURL } from '@/lib/variable';
import { AudioPlayer } from '../common/AudioPlayer';
const MediaPreview = ({ blog }: { blog: Blog }) => {
  return (
    <>
      <div className="mt-[24px] h-[480px] overflow-hidden rounded-xl border border-[#E5EAEF] dark:!border-none">
        {blog?.video?.url ? (
          <VideoPlayer poster={`${BASEURL}/${blog?.coverVideo?.url}`} url={blog?.video?.url} />
        ) : (
          <Image
            className="h-full w-full"
            classImg="object-fill"
            src={blog.thumbnailImage.url}
            alt=""
          />
        )}
      </div>
      {blog?.audio?.url ? <AudioPlayer className="mt-10" src={blog?.audio?.url} /> : null}
    </>
  );
};

export default MediaPreview;
