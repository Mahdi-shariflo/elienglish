'use client';
import React, { useEffect } from 'react';
import BackPrevPage from '@/components/common/BackPrevPage';
import useGlobalStore from '@/store/global-store';
const Page = () => {
  const { setComingSoon } = useGlobalStore();
  // const {data,isPending} = useGetNotfication()
  useEffect(() => {
    setComingSoon(true);
  }, []);
  return (
    <div className="space-y-4 rounded-2xl border-[#E4E7E9] bg-white pt-4 lg:mb-10 lg:mt-5 lg:!w-full lg:border lg:p-[16px] lg:pt-0">
      <BackPrevPage title="لیست‌ اطلاع رسانی‌ها" />
      <p className="hidden font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        لیست‌ اطلاع رسانی‌ها
      </p>
      {/* <div className='container_page lg:!w-full grid lg:grid-cols-2 gap-3 !mt-7'>

                {
                    new Array(4).fill(4).map((_, idx) => (
                        <div key={idx} className='shadow-favorite p-4 rounded-xl'>
                            <div className='flex items-center gap-2'>
                                <span className='block w-[64px] h-[72px] relative'>
                                    <Image fill className='object-contain' src={Pro} alt='' />
                                </span>
                                <p className='text-[#232429] font-regular text-[14px]'>بادی اسپلش زنانه وودلایک مدل COCO MADEMOISELLE حجم 250 میل</p>
                            </div>
                            <div className='mt-[42px] flex items-center justify-between'>
                                <div className={`space-y-1 pb-3 transition-all duration-300`}>
                                    <span className='flex justify-center items-center font-medium rounded-md pt-px text-[10px] lg:text-[12px] text-white bg-main w-[39px] h-[20px] lg:w-[41px] lg:h-[24px] '>40%</span>
                                    <p className='font-medium hidden lg:block text-[12px] text-[#ED2E2E]'>تنها  ۳ عدد موجود در انبار</p>
                                </div>
                                <div >
                                    <p className='text-[#A8AFB8] text-left text-[12px] font-regular line-through'>{Number(192000).toLocaleString()}</p>
                                    <p className='flex items-center gap-1'>
                                        <span className='font-bold text-[12px] text-[#0C0C0C]'>{Number(190000).toLocaleString()}</span>
                                        <Toman_Icon />
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Button className='w-fit min-w-fit  h-[42px] border border-[#E4E7E9]'>
                                    <span className='pt-1'>
                                        حذف
                                    </span>
                                    <span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 5.98047C17.67 5.65047 14.32 5.48047 10.98 5.48047C9 5.48047 7.02 5.58047 5.04 5.78047L3 5.98047" stroke="#616A76" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="#616A76" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M18.8504 9.13965L18.2004 19.2096C18.0904 20.7796 18.0004 21.9996 15.2104 21.9996H8.79039C6.00039 21.9996 5.91039 20.7796 5.80039 19.2096L5.15039 9.13965" stroke="#616A76" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10.3301 16.5H13.6601" stroke="#616A76" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.5 12.5H14.5" stroke="#616A76" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </Button>

                            </div>
                        </div>
                    ))
                }
            </div> */}
    </div>
  );
};

export default Page;
