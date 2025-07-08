'use client';
import useGlobalStore from '@/store/global-store';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import Link from 'next/link';
import { User_Icon } from '../icon';
import { SITE_NAME } from '@/lib/variable';
import { useSession } from '@/lib/auth/useSession';

export default function UserInformation() {
  const session = useSession();
  const user: any = session;
  const { setLogout } = useGlobalStore();
  const links = [
    {
      name: `${user?.firstName ? user.firstName : 'کاربر'} ${
        user?.lastName ? user.lastName : SITE_NAME
      }`,
      icon: (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 12.5C14.7614 12.5 17 10.2614 17 7.5C17 4.73858 14.7614 2.5 12 2.5C9.23858 2.5 7 4.73858 7 7.5C7 10.2614 9.23858 12.5 12 12.5Z"
            stroke="#616A76"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.5901 22.5C20.5901 18.63 16.7402 15.5 12.0002 15.5C7.26015 15.5 3.41016 18.63 3.41016 22.5"
            stroke="#616A76"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      sub: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.0002 13.28L5.65355 8.9333C5.14022 8.41997 5.14022 7.57997 5.65355 7.06664L10.0002 2.71997"
            stroke="#616A76"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      src: '/profile',
    },
    // {
    //     name: "رز کلاب",
    //     icon: <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    //         <path fillRule="evenodd" clipRule="evenodd" d="M8.8159 16.5549L1.50977 8.5277C0.899699 7.8564 0.829649 6.85321 1.34047 6.10401L4.29153 1.78104C4.6564 1.24589 5.26257 0.925781 5.91058 0.925781H14.0973C14.7453 0.925781 15.3524 1.24687 15.7173 1.78201L18.6596 6.10401C19.1704 6.85419 19.1004 7.8564 18.4893 8.5268L11.1822 16.5549C10.5478 17.2525 9.4503 17.2525 8.8159 16.5549Z" stroke="#616A76" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    //     </svg>
    //     ,
    //     sub: "0 امتیاز",
    //     src: "/profile"
    // },
    // {
    //     name: "کیف پول",
    //     icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //         <path d="M13 9H7" stroke="#616A76" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    //         <path d="M22.0002 10.9699V13.03C22.0002 13.58 21.5602 14.0299 21.0002 14.0499H19.0402C17.9602 14.0499 16.9702 13.2599 16.8802 12.1799C16.8202 11.5499 17.0602 10.9599 17.4802 10.5499C17.8502 10.1699 18.3602 9.94995 18.9202 9.94995H21.0002C21.5602 9.96995 22.0002 10.4199 22.0002 10.9699Z" stroke="#616A76" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    //         <path d="M17.48 10.55C17.06 10.96 16.82 11.55 16.88 12.18C16.97 13.26 17.96 14.05 19.04 14.05H21V15.5C21 18.5 19 20.5 16 20.5H7C4 20.5 2 18.5 2 15.5V8.5C2 5.78 3.64 3.88 6.19 3.56C6.45 3.52 6.72 3.5 7 3.5H16C16.26 3.5 16.51 3.50999 16.75 3.54999C19.33 3.84999 21 5.76 21 8.5V9.95001H18.92C18.36 9.95001 17.85 10.17 17.48 10.55Z" stroke="#616A76" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    //     </svg>,
    //     sub: `0 تومان`,
    //     src: "/profile"
    // },
    {
      name: 'سفارش‌های‌من',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 8.25V18C20 21 18.21 22 16 22H8C5.79 22 4 21 4 18V8.25C4 5 5.79 4.25 8 4.25C8 4.87 8.24997 5.43 8.65997 5.84C9.06997 6.25 9.63 6.5 10.25 6.5H13.75C14.99 6.5 16 5.49 16 4.25C18.21 4.25 20 5 20 8.25Z"
            stroke="#616A76"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 4.25C16 5.49 14.99 6.5 13.75 6.5H10.25C9.63 6.5 9.06997 6.25 8.65997 5.84C8.24997 5.43 8 4.87 8 4.25C8 3.01 9.01 2 10.25 2H13.75C14.37 2 14.93 2.25 15.34 2.66C15.75 3.07 16 3.63 16 4.25Z"
            stroke="#616A76"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 13H12"
            stroke="#616A76"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 17H16"
            stroke="#616A76"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      src: '/profile/orders',
    },
    {
      name: 'دیدگاه‌های‌من',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.98 10.79V14.79C17.98 15.05 17.97 15.3 17.94 15.54C17.71 18.24 16.12 19.58 13.19 19.58H12.79C12.54 19.58 12.3 19.7 12.15 19.9L10.95 21.5C10.42 22.21 9.56 22.21 9.03 21.5L7.82999 19.9C7.69999 19.73 7.41 19.58 7.19 19.58H6.79001C3.60001 19.58 2 18.79 2 14.79V10.79C2 7.86001 3.35001 6.27001 6.04001 6.04001C6.28001 6.01001 6.53001 6 6.79001 6H13.19C16.38 6 17.98 7.60001 17.98 10.79Z"
            stroke="#616A76"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21.98 6.79001V10.79C21.98 13.73 20.63 15.31 17.94 15.54C17.97 15.3 17.98 15.05 17.98 14.79V10.79C17.98 7.60001 16.38 6 13.19 6H6.79004C6.53004 6 6.28004 6.01001 6.04004 6.04001C6.27004 3.35001 7.86004 2 10.79 2H17.19C20.38 2 21.98 3.60001 21.98 6.79001Z"
            stroke="#616A76"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.4955 13.25H13.5045"
            stroke="#616A76"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.9955 13.25H10.0045"
            stroke="#616A76"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.4955 13.25H6.5045"
            stroke="#616A76"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      src: '/profile/comments',
    },
    {
      name: 'لیست‌ علاقه‌مندی‌ها',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
            stroke="#616A76"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      src: '/profile/favorite',
    },
    {
      name: 'لیست‌ آدرس‌ها',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.9999 13.4304C13.723 13.4304 15.1199 12.0336 15.1199 10.3104C15.1199 8.5873 13.723 7.19043 11.9999 7.19043C10.2768 7.19043 8.87988 8.5873 8.87988 10.3104C8.87988 12.0336 10.2768 13.4304 11.9999 13.4304Z"
            stroke="#7D8793"
            strokeWidth="1.5"
          />
          <path
            d="M3.61995 8.49C5.58995 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.38995 20.54C5.62995 17.88 2.46995 13.57 3.61995 8.49Z"
            stroke="#7D8793"
            strokeWidth="1.5"
          />
        </svg>
      ),
      src: '/profile/address',
    },
  ];

  console.log(user, 'jjffjfjfjjfj');
  const onAction = (key: string) => {
    if (key === 'logout') {
      setLogout();
    }
  };
  return (
    <div>
      {!user?.accessToken ? (
        <Link
          href={'/auth/'}
          className="!flex !h-[48px] items-center justify-center gap-2 rounded-xl bg-transparent font-medium text-[14px] text-white lg:!w-[169px] lg:bg-main lg:shadow-button"
        >
          <span>
            <svg
              className="hidden lg:block"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 12.5C14.7614 12.5 17 10.2614 17 7.5C17 4.73858 14.7614 2.5 12 2.5C9.23858 2.5 7 4.73858 7 7.5C7 10.2614 9.23858 12.5 12 12.5Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.59 22.5C20.59 18.63 16.74 15.5 12 15.5C7.26003 15.5 3.41003 18.63 3.41003 22.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className="lg:hidden"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.0035 24C15.9209 24 18.7188 22.8411 20.7817 20.7782C22.8446 18.7153 24.0035 15.9174 24.0035 13C24.0035 10.0826 22.8446 7.28473 20.7817 5.22183C18.7188 3.15893 15.9209 2 13.0035 2"
                stroke="#D0006A"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M2 12.9988H15.75M15.75 12.9988L11.625 8.87385M15.75 12.9988L11.625 17.1238"
                stroke="#D0006A"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="hidden lg:inline-block">ورود | ثبت نام</span>
        </Link>
      ) : (
        <>
          <Link className="lg:hidden" href={'/profile/'}>
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 13C15.9915 13 18.4167 10.5749 18.4167 7.58333C18.4167 4.59179 15.9915 2.16667 13 2.16667C10.0085 2.16667 7.58334 4.59179 7.58334 7.58333C7.58334 10.5749 10.0085 13 13 13Z"
                stroke="#A6AFB9"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.69417 23.8333C3.69417 19.6408 7.865 16.25 13 16.25C14.04 16.25 15.0475 16.3908 15.99 16.6508"
                stroke="#A6AFB9"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M23.8333 19.5C23.8333 20.3125 23.6058 21.0817 23.205 21.7317C22.9775 22.1217 22.685 22.4683 22.3492 22.75C21.5908 23.4325 20.5942 23.8333 19.5 23.8333C17.9183 23.8333 16.5425 22.9883 15.795 21.7317C15.3941 21.0817 15.1667 20.3125 15.1667 19.5C15.1667 18.135 15.795 16.9108 16.7917 16.12C17.5392 15.5242 18.4817 15.1667 19.5 15.1667C21.8942 15.1667 23.8333 17.1058 23.8333 19.5Z"
                stroke="#A6AFB9"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.81 19.5L18.8825 20.5725L21.19 18.4384"
                stroke="#A6AFB9"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <span className="hidden lg:block">
            <Dropdown placement="bottom-start" shouldBlockScroll={false}>
              <DropdownTrigger className="!w-[80px] !min-w-[80px] !max-w-[80px]">
                <Button className="bg-transparent">
                  <User_Icon />
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.9201 9.44995L13.4001 15.97C12.6301 16.74 11.3701 16.74 10.6001 15.97L4.08008 9.44995"
                      stroke="#616A76"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </DropdownTrigger>
              <DropdownMenu onAction={(key) => onAction(key as string)} aria-label="Static Actions">
                <>
                  {links.map((link, idx) => (
                    <DropdownItem key={idx}>
                      <Link
                        className="flex items-center justify-between font-regular text-[12px] text-[#545A66]"
                        href={`${link.src}/`}
                      >
                        <span className="flex items-center gap-2 font-regular text-[14px]">
                          {link.icon}
                          {link.name}
                        </span>
                        {link.sub && link.sub}
                      </Link>
                    </DropdownItem>
                  ))}
                  <DropdownItem key={'logout'}>
                    <span className="flex !h-[25px] gap-2 bg-transparent !px-0 font-regular text-[#ED2E2E]">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.4399 14.62L19.9999 12.06L17.4399 9.5"
                          stroke="#ED2E2E"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.75977 12.0601H19.9298"
                          stroke="#ED2E2E"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.7598 20C7.33977 20 3.75977 17 3.75977 12C3.75977 7 7.33977 4 11.7598 4"
                          stroke="#ED2E2E"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      خروج از حساب
                    </span>
                  </DropdownItem>
                </>
              </DropdownMenu>
            </Dropdown>
          </span>
        </>
      )}
    </div>
  );
}
