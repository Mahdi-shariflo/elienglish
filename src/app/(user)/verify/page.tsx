'use client';
import React from 'react';
import Success from './Success';
import { useSearchParams } from 'next/navigation';
import { useGetStatusCheckout } from '@/hooks/checkout/useGetStatusCheckout';
import Loading from '@/components/common/Loading';
import Faild from './Faild';

const Page = () => {
  return <div>{true ? <Success result={undefined} /> : <Faild result={undefined} />}</div>;
};

export default Page;
