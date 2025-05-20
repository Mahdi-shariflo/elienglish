'use client';
import React from 'react';
import BaseDialog from './BaseDialog';
import Button from './Button';
import useGlobalStore from '@/store/global-store';

const CommingSoon = () => {
  const { comingSoon, setComingSoon } = useGlobalStore();
  const onClose = () => {
    setComingSoon(false);
  };
  return (
    <BaseDialog isOpen={comingSoon} title="به زودی" size="md" onClose={onClose}>
      <div>
        <p className="text-center font-regular leading-7">
          ما به زودی این ویژگی‌ها رو ارائه می‌دیم تا تجربه شما از سایت لذت‌بخش‌تر از همیشه بشه. 😊
        </p>
        <Button onClick={onClose} className="mt-5 bg-main text-white">
          متوجه شدم
        </Button>
      </div>
    </BaseDialog>
  );
};

export default CommingSoon;
