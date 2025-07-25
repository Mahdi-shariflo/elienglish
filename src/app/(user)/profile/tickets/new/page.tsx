'use client';
import BackPrevPage from '@/components/common/BackPrevPage';
import Button from '@/components/common/Button';
import Input from '@/components/common/form/Input';
import Textarea from '@/components/common/form/Textarea';
import Select from '@/components/common/Select';
import { useFormik } from 'formik';
import React from 'react';

const Page = () => {
  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {},
  });
  return (
    <div className="space-y-4 rounded-2xl border-[#E4E7E9] bg-white pt-4 dark:border-[#505B74] dark:bg-[#263248] lg:mb-10 lg:min-h-[90vh] lg:!w-full lg:border lg:p-[16px] lg:pt-0">
      <BackPrevPage url="/profile" title="درخواست پشتیبانی جدید" />

      <div>
        <div className="flex items-center gap-3 border-b border-gray-100">
          <span>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28 20C28 20.7072 27.719 21.3855 27.219 21.8856C26.7189 22.3857 26.0406 22.6667 25.3333 22.6667H9.33333L4 28V6.66667C4 5.95942 4.28095 5.28115 4.78105 4.78105C5.28115 4.28095 5.95942 4 6.66667 4H25.3333C26.0406 4 26.7189 4.28095 27.219 4.78105C27.719 5.28115 28 5.95942 28 6.66667V20Z"
                stroke="#6E3DFF"
                stroke-width="2.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <p className="container_page !my-6 hidden font-medium text-[14px] text-[#0C0C0C] dark:text-white lg:block lg:!w-full lg:text-[18px]">
            درخواست پشتیانی جدید
          </p>
        </div>
        <form className="mt-10 space-y-3">
          <Input isRequired name="title" formik={formik} label={'عنوان'} />
          <Select
            isRequired
            label="بخش"
            name="section"
            formik={formik}
            options={[
              {
                label: 'مالی',
                value: '',
              },
            ]}
          />
          <Textarea isRequired name="content" formik={formik} label={'توضیحات'} />
          {/* files */}
          <div>
            <p
              className={`mb-[6px] pr-1 font-medium text-[12px] dark:!text-[#8E98A8] lg:text-[14px]`}
            >
              {'ارسال فایل'} {<span className="text-red-500">*</span>}
            </p>
            <div className="relative h-[200px] w-full rounded-lg border-2 border-dashed">
              <label className="block h-full w-full" htmlFor="upload">
                <div className="flex h-full flex-col items-center justify-center gap-3">
                  <span>
                    <svg
                      width="72"
                      height="72"
                      viewBox="0 0 72 72"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M54 24C54 27.3137 51.3137 30 48 30C44.6863 30 42 27.3137 42 24C42 20.6863 44.6863 18 48 18C51.3137 18 54 20.6863 54 24Z"
                        fill="#6A7890"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M35.8279 3.75H36.1721C43.0973 3.74996 48.5244 3.74993 52.7589 4.31924C57.0931 4.90196 60.5132 6.11798 63.1976 8.80241C65.882 11.4868 67.098 14.9069 67.6808 19.2411C68.2501 23.4756 68.25 28.9027 68.25 35.8279V36.0927C68.25 41.8191 68.25 46.5068 67.939 50.3236C67.6265 54.1592 66.9861 57.3643 65.5527 60.0262C64.9204 61.2003 64.1435 62.2517 63.1976 63.1976C60.5132 65.882 57.0931 67.098 52.7589 67.6808C48.5244 68.2501 43.0973 68.25 36.1721 68.25H35.8279C28.9027 68.25 23.4756 68.2501 19.2411 67.6808C14.9069 67.098 11.4868 65.882 8.80241 63.1976C6.42257 60.8178 5.1936 57.8557 4.54005 54.1813C3.89805 50.5718 3.78061 46.0809 3.75621 40.5044C3.75 39.086 3.75 37.5857 3.75 36.003V35.8279C3.74996 28.9027 3.74993 23.4756 4.31924 19.2411C4.90196 14.9069 6.11798 11.4868 8.80241 8.80241C11.4868 6.11798 14.9069 4.90196 19.2411 4.31924C23.4756 3.74993 28.9027 3.74996 35.8279 3.75ZM19.8407 8.77911C16.0055 9.29474 13.6934 10.2754 11.9844 11.9844C10.2754 13.6934 9.29474 16.0055 8.77911 19.8407C8.25478 23.7407 8.25 28.8653 8.25 36C8.25 36.8715 8.25 37.7144 8.25103 38.5305L11.2544 35.9025C13.9882 33.5105 18.1085 33.6477 20.6771 36.2163L33.5463 49.0855C35.608 51.1472 38.8534 51.4283 41.2389 49.7518L42.1335 49.1231C45.5662 46.7106 50.2105 46.9901 53.3291 49.7969L61.8204 57.439C62.6752 55.644 63.1828 53.2854 63.4539 49.9582C63.7483 46.3448 63.75 41.8376 63.75 36C63.75 28.8653 63.7452 23.7407 63.2209 19.8407C62.7053 16.0055 61.7246 13.6934 60.0156 11.9844C58.3066 10.2754 55.9945 9.29474 52.1593 8.77911C48.2593 8.25478 43.1347 8.25 36 8.25C28.8653 8.25 23.7407 8.25478 19.8407 8.77911Z"
                        fill="#6A7890"
                      />
                    </svg>
                  </span>
                  <p className="text-center font-medium text-[#6A7890]">
                    برای آپلود روی فایل کلیک کنید یا به این قسمت بکشید
                  </p>
                  <span className="font-medium text-[12px] text-[#8E98A8]">
                    حجم فایل حداکثر10MBمجاز است.
                  </span>
                </div>
              </label>
              <input id="upload" type="file" className="absolute z-0 w-0" />
            </div>
          </div>
          <div className="!mt-10 flex justify-end">
            <Button className="h-[40px] w-[120px] min-w-[120px] rounded-lg bg-main text-white">
              <span className="text-[13px]">ثبت درخواست</span>
              <span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 12C18.7348 12 18.4804 12.1054 18.2929 12.2929C18.1054 12.4804 18 12.7348 18 13V17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18H3C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V13C2 12.7348 1.89464 12.4804 1.70711 12.2929C1.51957 12.1054 1.26522 12 1 12C0.734784 12 0.48043 12.1054 0.292893 12.2929C0.105357 12.4804 0 12.7348 0 13V17C0 17.7956 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17V13C20 12.7348 19.8946 12.4804 19.7071 12.2929C19.5196 12.1054 19.2652 12 19 12ZM9.29 13.71C9.3851 13.801 9.49725 13.8724 9.62 13.92C9.7397 13.9729 9.86913 14.0002 10 14.0002C10.1309 14.0002 10.2603 13.9729 10.38 13.92C10.5028 13.8724 10.6149 13.801 10.71 13.71L14.71 9.71C14.8983 9.5217 15.0041 9.2663 15.0041 9C15.0041 8.7337 14.8983 8.4783 14.71 8.29C14.5217 8.1017 14.2663 7.99591 14 7.99591C13.7337 7.99591 13.4783 8.1017 13.29 8.29L11 10.59V1C11 0.734784 10.8946 0.48043 10.7071 0.292893C10.5196 0.105357 10.2652 0 10 0C9.73478 0 9.48043 0.105357 9.29289 0.292893C9.10536 0.48043 9 0.734784 9 1V10.59L6.71 8.29C6.61676 8.19676 6.50607 8.1228 6.38425 8.07234C6.26243 8.02188 6.13186 7.99591 6 7.99591C5.86814 7.99591 5.73757 8.02188 5.61575 8.07234C5.49393 8.1228 5.38324 8.19676 5.29 8.29C5.19676 8.38324 5.1228 8.49393 5.07234 8.61575C5.02188 8.73757 4.99591 8.86814 4.99591 9C4.99591 9.13186 5.02188 9.26243 5.07234 9.38425C5.1228 9.50607 5.19676 9.61676 5.29 9.71L9.29 13.71Z"
                    fill="white"
                  />
                </svg>
              </span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
