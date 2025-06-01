import Button from '@/components/common/Button';
import { signIn } from 'next-auth/react';
import React from 'react';

const BtnGoogle = () => {
  return (
    <Button
      onClick={() => {
        signIn('google');
      }}
      // isLoading={isPending}
      className="disabled !h-[48px] w-full border border-[#E5EAEF] font-bold text-black lg:mt-14 lg:!h-[48px]"
    >
      <span>
        <svg
          width="20"
          height="22"
          viewBox="0 0 20 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.0639 11.25C19.0639 10.47 18.9939 9.72 18.8639 9H8.50391V13.26H14.4239C14.1639 14.63 13.3839 15.79 12.2139 16.57V19.34H15.7839C17.8639 17.42 19.0639 14.6 19.0639 11.25Z"
            fill="#4285F4"
          />
          <path
            d="M8.50359 22.0001C11.4736 22.0001 13.9636 21.0201 15.7836 19.3401L12.2136 16.5701C11.2336 17.2301 9.98359 17.6301 8.50359 17.6301C5.64359 17.6301 3.21359 15.7001 2.34359 13.1001H-1.31641V15.9401C0.493594 19.5301 4.20359 22.0001 8.50359 22.0001Z"
            fill="#34A853"
          />
          <path
            d="M2.34 13.0888C2.12 12.4288 1.99 11.7288 1.99 10.9988C1.99 10.2688 2.12 9.56885 2.34 8.90885V6.06885H-1.32C-2.07 7.54885 -2.5 9.21885 -2.5 10.9988C-2.5 12.7788 -2.07 14.4488 -1.32 15.9288L1.53 13.7088L2.34 13.0888Z"
            fill="#FBBC05"
          />
          <path
            d="M8.50359 4.38C10.1236 4.38 11.5636 4.94 12.7136 6.02L15.8636 2.87C13.9536 1.09 11.4736 0 8.50359 0C4.20359 0 0.493594 2.47 -1.31641 6.07L2.34359 8.91C3.21359 6.31 5.64359 4.38 8.50359 4.38Z"
            fill="#EA4335"
          />
        </svg>
      </span>
      <span className="dark:text-white">ورود با حساب گوگل</span>
    </Button>
  );
};

export default BtnGoogle;
