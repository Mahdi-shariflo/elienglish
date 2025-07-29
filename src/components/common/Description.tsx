'use client';
import { useState } from 'react';
import Button from '../common/Button';
import { Arrow_back_mobile } from '../common/icon';

export default function Description({ description }: { description: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div
        dangerouslySetInnerHTML={{ __html: description }}
        className={`container_page container_des_category mt-14 overflow-hidden font-medium leading-8 drop-shadow dark:text-[#8E98A8] ${open ? '' : '!h-[250px]'}`}
        style={{ height: 'auto' }}
      ></div>
      <span className="container_page flex justify-center border-b border-[#E4E7E9]">
        <Button onClick={() => setOpen(!open)} className="w-fit min-w-fit text-main">
          <Arrow_back_mobile className="h-4 w-4 rotate-90 stroke-main" />
          <span>{open ? 'مشاهده کمتر' : 'مشاهده بیشتر'}</span>
        </Button>
      </span>
    </div>
  );
}
