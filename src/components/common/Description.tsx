'use client';
import { useState } from 'react';
import Button from '../common/Button';

export default function Description({ description }: { description: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="container_page relative rounded-[16px] border border-[#F4F6FA] p-5 shadow-md dark:border-[#263248] lg:rounded-[27px] lg:p-[25px]">
      <div
        dangerouslySetInnerHTML={{ __html: description }}
        className={`container_des_category relative overflow-hidden font-medium leading-8 drop-shadow transition-all duration-500 ease-in-out dark:text-[#8E98A8] lg:mt-14 ${open ? 'max-h-[1000px] opacity-100' : 'max-h-[250px] opacity-80'} `}
      ></div>

      <div
        className={`pointer-events-none absolute left-1/2 top-[81px] h-[238px] w-full -translate-x-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0.25)_25%,rgba(255,255,255,0.75)_50%,rgba(255,255,255,0.9)_75%,#ffffff_100%)] transition-opacity duration-300 dark:bg-[linear-gradient(180deg,rgba(0,0,0,0.25)_25%,rgba(0,0,0,0.5)_50%,rgba(0,0,0,0.7)_75%,#0f172a_100%)] ${open ? 'opacity-0' : 'opacity-100'} `}
      ></div>

      <span className="mt-4 flex justify-center">
        <Button onClick={() => setOpen(!open)} className="w-fit min-w-fit text-[#505B74]">
          <span>{open ? 'مشاهده کمتر' : 'مشاهده بیشتر'}</span>
        </Button>
      </span>
    </div>
  );
}
