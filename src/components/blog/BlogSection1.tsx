import React from 'react';
import CardBlogSection1 from './CardBlogSection1';
import { Blog } from '@/types';
type Props = {
  blogs: Blog[];
};
const positions = [
  'col-span-4 row-span-4', // برای بلاگ 0
  'col-span-2 col-start-5 row-span-2 row-start-1', // برای بلاگ 1
  'col-span-2 col-start-5 row-span-2 row-start-3', // برای بلاگ 2
  'col-span-2 col-start-5 row-span-2 row-start-5', // برای بلاگ 3
  'col-span-2 col-start-3 row-span-2 row-start-5', // برای بلاگ 4
  'col-span-2 col-start-1 row-span-2 row-start-5', // برای بلاگ 5
];

const BlogSection1 = ({ blogs }: Props) => {
  return (
    <div className="grid !h-[700px] grid-cols-6 grid-rows-6 gap-4">
      {blogs.slice(0, positions.length).map((item, idx) => (
        <div key={item._id || idx} className={`${positions[idx]} overflow-hidden rounded-lg`}>
          <CardBlogSection1 blog={item} />
        </div>
      ))}
    </div>
  );
};

export default BlogSection1;
