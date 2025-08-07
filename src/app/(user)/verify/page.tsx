'use client';
import React from 'react';
import Success from './Success';
import { useSearchParams } from 'next/navigation';
import Faild from './Faild';

const Page = () => {
  const searchParams = useSearchParams();
  return (
    <div>
      {searchParams.get('status') === 'success' ? (
        <Success />
      ) : searchParams.get('status') === 'error' ? (
        <Faild />
      ) : null}
    </div>
  );
};

export default Page;
