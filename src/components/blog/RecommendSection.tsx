import React from 'react';
import Image from '../common/Image';
import Link from 'next/link';
type Props = {
  blogSidebar: {
    recommendSection: {
      href: string;
      imageUrl: string;
      title: string;
    };
  };
};
const RecommendSection = ({ blogSidebar }: Props) => {
  return (
    <Link
      href={blogSidebar?.recommendSection?.href}
      className="block w-full overflow-hidden rounded-lg bg-[#F4F6FA] p-4 dark:bg-[#172334]"
    >
      <Image
        alt=""
        baseUrl={false}
        src={blogSidebar?.recommendSection?.imageUrl}
        className="h-[200px] w-full overflow-hidden rounded-xl lg:h-[270px]"
        classImg="object-fill"
      />
      <p className="mt-4 font-medium text-[#33435A] dark:text-[#8E98A8]">
        {blogSidebar?.recommendSection?.title}
      </p>
    </Link>
  );
};

export default RecommendSection;
