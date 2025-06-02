import React from 'react';
import Input from '../common/form/Input';
import Textarea from '../common/form/Textarea';
import Button from '../common/Button';
import CardComment from './CardComment';

const Comments = () => {
  return (
    <>
      <div className="mt-[24px] rounded-[16px] border border-[#E5EAEF] p-[24px]">
        <p className="relative mb-5 pr-4 font-extrabold text-2xl after:absolute after:right-0 after:h-full after:w-1 after:rounded-bl-full after:rounded-tl-full after:bg-main">
          ارسال دیدگاه
        </p>
        <form className="grid grid-cols-2 gap-3">
          <Input
            placeholder="نام و نام خانوادگی خود را وارد کنید"
            label={'نام و نام خانوادگی'}
            isRequired
          />
          <Input placeholder="آدرس ایمیل خود را وارد کنید" label={'ایمیل'} isRequired />
          <Textarea
            className="col-span-2"
            placeholder="متن دیدگاه خود را یادداشت کنید"
            label={'متن دیدگاه'}
            isRequired
          />
          <div className="col-span-2 mt-[24px] flex justify-end">
            <Button className="!h-[56px] !w-[149px] bg-main text-[14px] text-white shadow-button">
              ارسال دیدگاه
            </Button>
          </div>
        </form>
      </div>
      <div className="mt-[24px]">
        <p className="relative mb-5 pr-4 font-extrabold text-2xl after:absolute after:right-0 after:h-full after:w-1 after:rounded-bl-full after:rounded-tl-full after:bg-main">
          دیدگاه‌ها
        </p>
        <div className="mt-[24px]">
          <CardComment />
        </div>
      </div>
    </>
  );
};

export default Comments;
