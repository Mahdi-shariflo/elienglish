'use client';
import BackPrevPage from '@/components/common/BackPrevPage';
import ActionUser from '@/components/profile/ActionUser';

const Page = () => {
  return (
    <div className="pt-4 lg:pt-0">
      <BackPrevPage title="اطلاعات کاربر" />
      <div className="mx-auto !mt-5 w-[95%] space-y-4 rounded-2xl border-[#E4E7E9] dark:border-[#505B74] dark:bg-[#263248] lg:mr-0 lg:!w-full lg:border lg:bg-white lg:p-[16px]">
        <div className="flex items-center justify-between">
          <p className="hidden font-medium text-[18px] text-[#0C0C0C] dark:text-white lg:block">
            اطلاعات کاربری
          </p>
        </div>
        {/* <div className='p-[24px] rounded-xl bg-[#FFF9EB] flex lg:hidden items-center justify-center gap-2'>
                    <span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#DB8110" />
                            <path d="M12 13.75C12.41 13.75 12.75 13.41 12.75 13V8C12.75 7.59 12.41 7.25 12 7.25C11.59 7.25 11.25 7.59 11.25 8V13C11.25 13.41 11.59 13.75 12 13.75Z" fill="#DB8110" />
                            <path d="M12.92 15.6199C12.87 15.4999 12.8 15.3899 12.71 15.2899C12.61 15.1999 12.5 15.1299 12.38 15.0799C12.14 14.9799 11.86 14.9799 11.62 15.0799C11.5 15.1299 11.39 15.1999 11.29 15.2899C11.2 15.3899 11.13 15.4999 11.08 15.6199C11.03 15.7399 11 15.8699 11 15.9999C11 16.1299 11.03 16.2599 11.08 16.3799C11.13 16.5099 11.2 16.6099 11.29 16.7099C11.39 16.7999 11.5 16.8699 11.62 16.9199C11.74 16.9699 11.87 16.9999 12 16.9999C12.13 16.9999 12.26 16.9699 12.38 16.9199C12.5 16.8699 12.61 16.7999 12.71 16.7099C12.8 16.6099 12.87 16.5099 12.92 16.3799C12.97 16.2599 13 16.1299 13 15.9999C13 15.8699 12.97 15.7399 12.92 15.6199Z" fill="#DB8110" />
                        </svg>
                    </span>
                    <p className='text-[#DB8110] font-medium text-[13px]'>
                        لطفا تمامی اطلاعات وارد شده اعم از شماره کارت با نام و نام‌خانوادگی مطابقت داشته باشد
                    </p>
                </div> */}
        <ActionUser disable={false} />
      </div>
    </div>
  );
};

export default Page;
