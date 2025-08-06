'use client';
import BaseDialog from '@/components/common/BaseDialog';
import { useRouter } from 'next/navigation';
import React from 'react';

const NotAccess = () => {
  const router = useRouter();
  return (
    <div className="min-h-[60vh]">
      <BaseDialog
        nameBtnFooter="متوجه شدم"
        onClickFooter={() => router.back()}
        nameBtnBack="بازگشت به صفحه اصلی"
        onClickCancel={() => router.push('/')}
        title="دسترسی رد شد"
        isOpen={true}
      >
        <div className="py-5">
          <p className="text-center font-medium text-[16px] text-black dark:text-[#8E98A8]">
            {' '}
            دوره برای شما فعال نشده یا خریداری نکرده اید
          </p>
          <span className="block pt-4 text-center font-regular text-[14px] dark:text-[#8E98A8]">
            لطفا جهت دیدن دوره ابتدا دوره را خریداری نمایید
          </span>
        </div>
      </BaseDialog>
    </div>
  );
};

export default NotAccess;
