'use client';
import { useSession } from '@/lib/auth/useSession';
import useGlobalStore from '@/store/global-store';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '../Button';
import Logo from '../Logo';
import Sidebar from '../Sidebar';
import Cart from './Cart';
import CategoryMenu from './CategoryMenu';
import Search from './Search';
import UserInformation from './UserInformation';
const quickLicks = [
  // {
  //   name: "محصولات تخفیف‌دار",
  //   icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  //     <path opacity="0.4" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#7D8793" />
  //     <path d="M15 16C14.44 16 13.99 15.55 13.99 15C13.99 14.45 14.44 14 14.99 14C15.54 14 15.99 14.45 15.99 15C15.99 15.55 15.55 16 15 16Z" fill="#7D8793" />
  //     <path d="M9.01001 10C8.45001 10 8 9.55 8 9C8 8.45 8.45 8 9 8C9.55 8 10 8.45 10 9C10 9.55 9.56001 10 9.01001 10Z" fill="#7D8793" />
  //     <path d="M8.99997 15.75C8.80997 15.75 8.61994 15.68 8.46994 15.53C8.17994 15.24 8.17994 14.7599 8.46994 14.4699L14.4699 8.46994C14.7599 8.17994 15.24 8.17994 15.53 8.46994C15.82 8.75994 15.82 9.24 15.53 9.53L9.53 15.53C9.38 15.68 9.18997 15.75 8.99997 15.75Z" fill="#7D8793" />
  //   </svg>
  //   ,
  //   src: "/"
  // },
  // {
  //   name: "جدیدترین‌ها",
  //   icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  //     <path opacity="0.4" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#7D8793" />
  //     <path d="M12.3301 16.9999C12.1501 17.0599 11.8401 17.0599 11.6601 16.9999C10.1001 16.4699 6.6001 14.2399 6.6001 10.4599C6.6001 8.78993 7.9401 7.43994 9.6001 7.43994C10.5801 7.43994 11.4501 7.90993 12.0001 8.64993C12.5401 7.91993 13.4201 7.43994 14.4001 7.43994C16.0601 7.43994 17.4001 8.78993 17.4001 10.4599C17.4001 14.2399 13.9001 16.4699 12.3301 16.9999Z" fill="#7D8793" />
  //   </svg>
  //   ,
  //   src: "/"
  // },
  // {
  //   name: "پرفروش‌ترین‌ها",
  //   icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  //     <path opacity="0.4" d="M9.31994 13.28H12.4099V20.48C12.4099 21.54 13.7299 22.04 14.4299 21.24L21.9999 12.64C22.6599 11.89 22.1299 10.72 21.1299 10.72H18.0399V3.51997C18.0399 2.45997 16.7199 1.95997 16.0199 2.75997L8.44994 11.36C7.79994 12.11 8.32994 13.28 9.31994 13.28Z" fill="#7D8793" />
  //     <path d="M8.5 4.75H1.5C1.09 4.75 0.75 4.41 0.75 4C0.75 3.59 1.09 3.25 1.5 3.25H8.5C8.91 3.25 9.25 3.59 9.25 4C9.25 4.41 8.91 4.75 8.5 4.75Z" fill="#7D8793" />
  //     <path d="M7.5 20.75H1.5C1.09 20.75 0.75 20.41 0.75 20C0.75 19.59 1.09 19.25 1.5 19.25H7.5C7.91 19.25 8.25 19.59 8.25 20C8.25 20.41 7.91 20.75 7.5 20.75Z" fill="#7D8793" />
  //     <path d="M4.5 12.75H1.5C1.09 12.75 0.75 12.41 0.75 12C0.75 11.59 1.09 11.25 1.5 11.25H4.5C4.91 11.25 5.25 11.59 5.25 12C5.25 12.41 4.91 12.75 4.5 12.75Z" fill="#7D8793" />
  //   </svg>
  //   ,
  //   src: "/"
  // },
  {
    name: 'برندها',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.73 3.51001L15.49 7.03001C15.73 7.52001 16.37 7.99001 16.91 8.08001L20.1 8.61001C22.14 8.95001 22.62 10.43 21.15 11.89L18.67 14.37C18.25 14.79 18.02 15.6 18.15 16.18L18.86 19.25C19.42 21.68 18.13 22.62 15.98 21.35L12.99 19.58C12.45 19.26 11.56 19.26 11.01 19.58L8.02003 21.35C5.88003 22.62 4.58003 21.67 5.14003 19.25L5.85003 16.18C5.98003 15.6 5.75003 14.79 5.33003 14.37L2.85003 11.89C1.39003 10.43 1.86003 8.95001 3.90003 8.61001L7.09003 8.08001C7.62003 7.99001 8.26003 7.52001 8.50003 7.03001L10.26 3.51001C11.22 1.60001 12.78 1.60001 13.73 3.51001Z"
          fill="#7D8793"
          stroke="#7D8793"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    src: '/brands',
  },
  {
    name: 'بلاگ‌ها ',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.4"
          d="M20 8.25V18C20 21 18.21 22 16 22H8C5.79 22 4 21 4 18V8.25C4 5 5.79 4.25 8 4.25C8 4.87 8.24997 5.43 8.65997 5.84C9.06997 6.25 9.63 6.5 10.25 6.5H13.75C14.99 6.5 16 5.49 16 4.25C18.21 4.25 20 5 20 8.25Z"
          fill="#7D8793"
        />
        <path
          d="M16 4.25C16 5.49 14.99 6.5 13.75 6.5H10.25C9.63 6.5 9.06997 6.25 8.65997 5.84C8.24997 5.43 8 4.87 8 4.25C8 3.01 9.01 2 10.25 2H13.75C14.37 2 14.93 2.25 15.34 2.66C15.75 3.07 16 3.63 16 4.25Z"
          fill="#7D8793"
        />
        <path
          d="M12 13.75H8C7.59 13.75 7.25 13.41 7.25 13C7.25 12.59 7.59 12.25 8 12.25H12C12.41 12.25 12.75 12.59 12.75 13C12.75 13.41 12.41 13.75 12 13.75Z"
          fill="#7D8793"
        />
        <path
          d="M16 17.75H8C7.59 17.75 7.25 17.41 7.25 17C7.25 16.59 7.59 16.25 8 16.25H16C16.41 16.25 16.75 16.59 16.75 17C16.75 17.41 16.41 17.75 16 17.75Z"
          fill="#7D8793"
        />
      </svg>
    ),
    src: '/mag',
  },
  {
    name: 'تماس با ما',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.62 10.75C17.19 10.75 16.85 10.4 16.85 9.97998C16.85 9.60998 16.48 8.83998 15.86 8.16998C15.25 7.51998 14.58 7.13998 14.02 7.13998C13.59 7.13998 13.25 6.78998 13.25 6.36998C13.25 5.94998 13.6 5.59998 14.02 5.59998C15.02 5.59998 16.07 6.13998 16.99 7.10998C17.85 8.01998 18.4 9.14998 18.4 9.96998C18.4 10.4 18.05 10.75 17.62 10.75Z"
          fill="#7D8793"
        />
        <path
          d="M21.23 10.75C20.8 10.75 20.46 10.4 20.46 9.98C20.46 6.43 17.57 3.55 14.03 3.55C13.6 3.55 13.26 3.2 13.26 2.78C13.26 2.36 13.6 2 14.02 2C18.42 2 22 5.58 22 9.98C22 10.4 21.65 10.75 21.23 10.75Z"
          fill="#7D8793"
        />
        <path
          opacity="0.4"
          d="M11.79 14.21L8.52 17.48C8.16 17.16 7.81 16.83 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.09 13.57 11.44 13.91 11.79 14.21Z"
          fill="#7D8793"
        />
        <path
          d="M21.9701 18.33C21.9701 18.61 21.9201 18.9 21.8201 19.18C21.7901 19.26 21.7601 19.34 21.7201 19.42C21.5501 19.78 21.3301 20.12 21.0401 20.44C20.5501 20.98 20.0101 21.37 19.4001 21.62C19.3901 21.62 19.3801 21.63 19.3701 21.63C18.7801 21.87 18.1401 22 17.4501 22C16.4301 22 15.3401 21.76 14.1901 21.27C13.0401 20.78 11.8901 20.12 10.7501 19.29C10.3601 19 9.9701 18.71 9.6001 18.4L12.8701 15.13C13.1501 15.34 13.4001 15.5 13.6101 15.61C13.6601 15.63 13.7201 15.66 13.7901 15.69C13.8701 15.72 13.9501 15.73 14.0401 15.73C14.2101 15.73 14.3401 15.67 14.4501 15.56L15.2101 14.81C15.4601 14.56 15.7001 14.37 15.9301 14.25C16.1601 14.11 16.3901 14.04 16.6401 14.04C16.8301 14.04 17.0301 14.08 17.2501 14.17C17.4701 14.26 17.7001 14.39 17.9501 14.56L21.2601 16.91C21.5201 17.09 21.7001 17.3 21.8101 17.55C21.9101 17.8 21.9701 18.05 21.9701 18.33Z"
          fill="#7D8793"
        />
      </svg>
    ),
    src: '/contact-us',
  },
];

const profilePages = ['/category', '/home', '/address', '/checkout', '/profile'];
type Props = {
  categories: string;
};
const Header = ({ categories }: Props) => {
  const router = useRouter();
  const user = useSession();
  const { setComingSoon } = useGlobalStore();
  const pathname = usePathname();
  const isProfilePage = profilePages.some(
    (page) => pathname === page || pathname.startsWith(`${page}`)
  );
  const { setCategories } = useGlobalStore();
  useEffect(() => {
    setCategories(categories);
  }, [categories]);

  // const [position, setPosition] = useState(0);
  // const [visible, setVisible] = useState(true);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     let moving = window.scrollY;

  //     setVisible(position > moving);
  //     setPosition(moving);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // });
  // const cls = visible ? "yes" : "no";
  const cls: string = 'yes';

  // useEffect(() => {
  //   setPosition(window.scrollY);
  // }, []);
  console.log(isProfilePage, 'isProfilePage');
  if (pathname.startsWith('/mag')) return null;
  return (
    <>
      <header
        className={`fixed top-0 z-40 w-full bg-white pt-2 shadow-sm ${
          cls === 'yes' ? 'pb-2 lg:pb-4' : 'lg:pb-2'
        } ${isProfilePage ? '!hidden lg:!block' : ''}`}
      >
        <div className={`container_page`}>
          <div
            className={`items-center justify-between ${
              cls === 'yes' ? 'flex lg:hidden' : 'hidden'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sidebar />
              <Link href={'/search/'}>
                <span>
                  <svg
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="8.5" cy="8.50041" r="7.5" stroke="#A6AFB9" strokeWidth="2" />
                    <line
                      x1="16.0931"
                      y1="15.5377"
                      x2="20.6682"
                      y2="19.8082"
                      stroke="#A6AFB9"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </Link>
            </div>
            <Logo className="h-10 w-24" />
            <div className="flex items-center gap-2">
              <UserInformation />
              <Cart />
            </div>
          </div>

          <div className="hidden items-center justify-between lg:flex">
            <div
              className={`flex flex-[1.6] items-start gap-10 ${
                cls === 'yes' ? 'lg:py-3' : 'lg:py-3'
              }`}
            >
              <Logo className="hidden w-44 lg:block" />
              <Search />
            </div>
            <div className="hidden flex-1 justify-end gap-2 lg:flex">
              <UserInformation />
              <Cart />
            </div>
          </div>

          <div
            className={`items-center justify-between ${
              cls === 'yes' ? 'hidden lg:flex' : 'hidden'
            }`}
          >
            <div className="flex items-center gap-[16px]">
              {categories && <CategoryMenu categories={categories} />}
              {quickLicks.map((link, idx) => (
                <Link className="flex items-center gap-2" href={`${link.src}/`} key={idx}>
                  {link.icon && <span>{link.icon}</span>}
                  <span className="font-medium text-[14px] text-[#7D8793]">{link.name}</span>
                </Link>
              ))}
              <div className="h-[32px] w-px bg-[#E4E7E9]" />
              <Link href={'/common-questions/'} className="font-medium text-[14px] text-[#7D8793]">
                سوالات متداول
              </Link>
            </div>
            {user?.Role === 'ADMIN' || user?.Role === 'SUPERADMIN' ? (
              <Button
                onClick={() => router.push('/admin/')}
                className="flex h-[42px] w-[112px] items-center justify-center gap-1 rounded-lg border border-[#E4E7E9] font-medium text-main"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.37851 12.6859C9.23451 12.8169 9.05351 12.8819 8.87351 12.8819C8.66951 12.8819 8.46651 12.7989 8.31851 12.6369L6.49551 10.6369C6.21651 10.3309 6.23851 9.85588 6.54451 9.57788C6.84951 9.29688 7.32451 9.31987 7.60451 9.62586L9.42751 11.6259C9.70651 11.9329 9.68451 12.4069 9.37851 12.6859ZM21.0715 8.82088L18.1305 4.50188C17.6735 3.82588 16.9135 3.42188 16.0965 3.42188H7.90951C7.09351 3.42188 6.33351 3.82586 5.87751 4.49986L2.92651 8.82088C2.28551 9.76088 2.37251 11.0139 3.13951 11.8689L10.4455 19.8889C10.8425 20.3259 11.4085 20.5769 11.9985 20.5769C12.5885 20.5769 13.1545 20.3259 13.5505 19.8879L20.8575 11.8589C21.6275 11.0149 21.7155 9.76588 21.0715 8.82088Z"
                    fill="#DD338B"
                  />
                </svg>
                <span>پنل ادمین</span>
              </Button>
            ) : (
              <Button
                onClick={() => setComingSoon(true)}
                className="flex h-[42px] w-[112px] items-center justify-center gap-1 rounded-lg border border-[#E4E7E9] font-medium text-main"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.37851 12.6859C9.23451 12.8169 9.05351 12.8819 8.87351 12.8819C8.66951 12.8819 8.46651 12.7989 8.31851 12.6369L6.49551 10.6369C6.21651 10.3309 6.23851 9.85588 6.54451 9.57788C6.84951 9.29688 7.32451 9.31987 7.60451 9.62586L9.42751 11.6259C9.70651 11.9329 9.68451 12.4069 9.37851 12.6859ZM21.0715 8.82088L18.1305 4.50188C17.6735 3.82588 16.9135 3.42188 16.0965 3.42188H7.90951C7.09351 3.42188 6.33351 3.82586 5.87751 4.49986L2.92651 8.82088C2.28551 9.76088 2.37251 11.0139 3.13951 11.8689L10.4455 19.8889C10.8425 20.3259 11.4085 20.5769 11.9985 20.5769C12.5885 20.5769 13.1545 20.3259 13.5505 19.8879L20.8575 11.8589C21.6275 11.0149 21.7155 9.76588 21.0715 8.82088Z"
                    fill="#DD338B"
                  />
                </svg>
                <span>رز کلاب</span>
              </Button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
