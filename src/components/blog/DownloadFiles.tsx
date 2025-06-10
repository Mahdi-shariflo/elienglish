'use client';
import { useSession } from '@/lib/auth/useSession';
import { Blog } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Button from '../common/Button';
import ModalNeedLoginUser from '../common/ModalNeedLoginUser';

const DownloadFiles = ({ blog }: { blog: Blog }) => {
  const [show, setShow] = useState(false);
  const user = useSession();
  if (Number(blog?.downloads?.length) < 1) return null;
  return (
    <>
      <div className="mt-[24px]">
        {!user?.accessToken ? (
          <div className="flex h-[88px] items-center gap-3 rounded-[16px] border-[3px] border-[#E0D7FB] bg-[#EDE8FC] px-[24px]">
            <span>
              <svg
                width="32"
                height="33"
                viewBox="0 0 32 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.3346 8.05862H16.9613L16.5346 6.72529C16.258 5.94293 15.745 5.26596 15.0665 4.78817C14.388 4.31038 13.5778 4.05542 12.748 4.05862H6.66797C5.6071 4.05862 4.58969 4.48005 3.83954 5.2302C3.0894 5.98034 2.66797 6.99776 2.66797 8.05862V25.392C2.66797 26.4528 3.0894 27.4702 3.83954 28.2204C4.58969 28.9705 5.6071 29.392 6.66797 29.392H25.3346C26.3955 29.392 27.4129 28.9705 28.1631 28.2204C28.9132 27.4702 29.3346 26.4528 29.3346 25.392V12.0586C29.3346 10.9978 28.9132 9.98034 28.1631 9.2302C27.4129 8.48005 26.3955 8.05862 25.3346 8.05862ZM26.668 25.392C26.668 25.7456 26.5275 26.0847 26.2774 26.3348C26.0274 26.5848 25.6883 26.7253 25.3346 26.7253H6.66797C6.31435 26.7253 5.97521 26.5848 5.72516 26.3348C5.47511 26.0847 5.33464 25.7456 5.33464 25.392V8.05862C5.33464 7.705 5.47511 7.36586 5.72516 7.11581C5.97521 6.86577 6.31435 6.72529 6.66797 6.72529H12.748C13.0275 6.72457 13.3002 6.81172 13.5275 6.97441C13.7548 7.13711 13.9252 7.36713 14.0146 7.63196L14.7346 9.81862C14.8241 10.0835 14.9945 10.3135 15.2218 10.4762C15.4491 10.6389 15.7218 10.726 16.0013 10.7253H25.3346C25.6883 10.7253 26.0274 10.8658 26.2774 11.1158C26.5275 11.3659 26.668 11.705 26.668 12.0586V25.392Z"
                  fill="#6E3DFF"
                />
              </svg>
            </span>
            <p className="flex items-center gap-1 font-medium">
              <span className="text-[16px]">برای دانلود فایل‌های پیوست این مقاله لطفا </span>
              <Link href={'/auth/'} className="text-[16px] text-main underline">
                وارد حساب کاربری
              </Link>
              <span className="text-[16px]">خود شوید یا</span>
              <Link href={'/auth/'} className="text-[16px] text-main underline">
                ثبت نام
              </Link>
              <span className="text-[16px]">کنید.</span>
            </p>
          </div>
        ) : null}
        <div>
          {blog.downloads.map((item, idx) => (
            <div
              key={idx}
              className="!mt-[24px] flex h-[88px] items-center justify-between gap-3 rounded-[16px] border-r-[3px] border-[#E0D7FB] bg-[#EDE8FC] px-[24px]"
            >
              <div className="flex items-center gap-4">
                <Image width={20} height={20} className="h-10 w-10" alt="" src={item.icon} />
                <div>
                  <p className="font-medium text-[16px] text-[#0B1524]">{item.title}</p>
                  <p>
                    <span className="font-light text-[14px] text-[#505B74]">حجم فایل: </span>
                    <span className="font-light text-[14px] text-[#505B74]">{item?.size}</span>
                  </p>
                </div>
              </div>
              {user?.accessToken ? (
                <a
                  href=""
                  className="flex h-[40px] w-[120px] items-center justify-center gap-2 rounded-lg bg-main font-medium text-white"
                >
                  <span>دانلود</span>
                  <span>
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 13.2246C19.1326 13.2246 19.2597 13.2773 19.3535 13.3711C19.4473 13.4649 19.5 13.592 19.5 13.7246V17.7246C19.5 18.3876 19.2364 19.0233 18.7676 19.4922C18.2987 19.961 17.663 20.2246 17 20.2246H3C2.41989 20.2246 1.86086 20.0226 1.41602 19.6582L1.23242 19.4922C0.763581 19.0233 0.5 18.3876 0.5 17.7246V13.7246L0.509766 13.627C0.522549 13.5628 0.547692 13.5017 0.583984 13.4473L0.646484 13.3711C0.740253 13.2773 0.867392 13.2246 1 13.2246C1.13261 13.2246 1.25975 13.2773 1.35352 13.3711C1.44728 13.4649 1.5 13.592 1.5 13.7246V17.7246C1.5 18.1224 1.65815 18.5039 1.93945 18.7852C2.22076 19.0665 2.60218 19.2246 3 19.2246H17C17.3978 19.2246 17.7792 19.0665 18.0605 18.7852C18.3419 18.5039 18.5 18.1224 18.5 17.7246V13.7246C18.5 13.592 18.5527 13.4649 18.6465 13.3711C18.7403 13.2773 18.8674 13.2246 19 13.2246ZM10 1.22461C10.0994 1.22461 10.1958 1.25424 10.2773 1.30859L10.3535 1.37109C10.4473 1.46486 10.5 1.592 10.5 1.72461V12.5254L11.3545 11.667L13.6436 9.36816C13.7381 9.27363 13.8663 9.2207 14 9.2207C14.1337 9.2207 14.2619 9.27363 14.3564 9.36816C14.451 9.4627 14.5039 9.59092 14.5039 9.72461C14.5039 9.82486 14.4737 9.92171 14.4189 10.0039L14.3564 10.0811L10.3643 14.0732C10.3406 14.0959 10.3146 14.1162 10.2871 14.1338L10.1992 14.1787L10.1885 14.1826L10.1777 14.1875C10.1218 14.2122 10.0612 14.2246 10 14.2246C9.93881 14.2246 9.87824 14.2122 9.82227 14.1875L9.81152 14.1826L9.80078 14.1787L9.71289 14.1338L9.63574 14.0732L5.64355 10.0811C5.59683 10.0343 5.55951 9.97899 5.53418 9.91797C5.50885 9.85681 5.49609 9.79081 5.49609 9.72461C5.49609 9.65841 5.50885 9.59241 5.53418 9.53125C5.55951 9.47023 5.59683 9.41489 5.64355 9.36816C5.69027 9.32144 5.74562 9.28412 5.80664 9.25879C5.8678 9.23346 5.9338 9.2207 6 9.2207C6.0662 9.2207 6.1322 9.23346 6.19336 9.25879C6.2239 9.27147 6.25292 9.28736 6.28027 9.30566L6.35645 9.36816L8.64551 11.667L9.5 12.5254V1.72461C9.5 1.62517 9.52963 1.5288 9.58398 1.44727L9.64648 1.37109C9.71689 1.30069 9.80611 1.25355 9.90234 1.23438L10 1.22461Z"
                        fill="black"
                        stroke="white"
                      />
                    </svg>
                  </span>
                </a>
              ) : (
                <Button
                  onClick={() => setShow(true)}
                  className="flex !h-[40px] !w-[120px] !min-w-fit items-center justify-center gap-2 rounded-lg bg-main font-medium text-white"
                >
                  دانلود
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      <ModalNeedLoginUser
        title="برای دانلود ابتدا وارد حساب کاربری خود شوید"
        open={show}
        setOpen={setShow}
      />
    </>
  );
};

export default DownloadFiles;
