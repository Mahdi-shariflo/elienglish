'use client';
import React from 'react';
import {
  Activity_fill_icon,
  Activity_icon,
  Arrow_back_mobile,
  Blog_fill_icon,
  Blog_icon,
  Brand_fill_icon,
  Brand_icon,
  Comments_fill_icon,
  Comments_icon,
  Contact_fill_icon,
  Contact_icon,
  Courses_fill_icon,
  Courses_icon,
  Discount_fill_icon,
  Discount_icon,
  Home_fill_icon,
  Home_icon,
  Media_fill_icon,
  Media_icon,
  Menu_fill_icon,
  Menu_icon,
  Orders_fill_icon,
  Orders_icon,
  Products_fill_icon,
  Products_icon,
  Settings_fill_icon,
  Settings_icon,
  Slider_fill_icon,
  Slider_icon,
  Sms_fill_icon,
  Sms_icon,
  Support_icon,
  Transaction_fill_icon,
  Transaction_icon,
  Transport_fill_icon,
  Transport_icon,
  User_fill_icon,
  User_icon,
} from '../common/icon';
import Button from '../common/Button';
import { usePathname, useRouter } from 'next/navigation';
import { Accordion, AccordionItem } from '@heroui/react';
import Logo from '../common/Logo';
const menus = [
  {
    icon: Activity_icon,
    name: 'خلاصه فعالیت',
    href: '/admin/',
    activeIcon: Activity_fill_icon,
  },
  {
    icon: Blog_icon,
    name: 'بلاگ‌ها',
    activeIcon: Blog_fill_icon,
    href: ['/admin/blogs/', '/admin/blogs/categories/', '/admin/blogs/tags/'],
    children: [
      {
        name: 'همه بلاگ‌ها',
        href: '/admin/blogs/',
      },
      {
        name: 'دسته‌بندی بلاگ‌ها',
        href: '/admin/blogs/categories/',
      },
      {
        name: 'تگ بلاگ‌ها',
        href: '/admin/blogs/tags/',
      },
      {
        icon: Settings_icon,
        name: 'تنظیمات',
        href: '/admin/blogs/settings/',
        activeIcon: Settings_fill_icon,
      },
    ],
  },
  {
    icon: Products_icon,
    name: 'محصولات',
    href: ['/admin/products/', '/admin/products/create/', '/admin/products/categories/'],
    activeIcon: Products_fill_icon,
    children: [
      {
        name: 'همه محصولات',
        href: '/admin/products/',
      },
      {
        name: 'ایجاد محصول',
        href: '/admin/products/new/',
      },
      {
        name: 'تگ محصولات',
        href: '/admin/products/tags/',
      },
      {
        name: 'دسته‌بندی محصولات',
        href: '/admin/products/categories/',
      },
    ],
  },
  {
    icon: Courses_icon,
    name: 'دوره ها',
    href: ['/admin/courses/', '/admin/courses/create/', '/admin/courses/categories/'],
    activeIcon: Courses_fill_icon,
    children: [
      {
        name: 'دوره ها',
        href: '/admin/courses/',
      },
      {
        name: 'ایجاد دورره',
        href: '/admin/courses/new/',
      },
      {
        name: 'تگ دورره',
        href: '/admin/courses/tags/',
      },
      {
        name: 'دسته‌بندی دوره',
        href: '/admin/courses/categories/',
      },
    ],
  },
  {
    icon: Menu_icon,
    name: 'سوالات متداول',
    href: ['/admin/faq'],
    activeIcon: Menu_fill_icon,
    children: [
      {
        name: 'دسته‌بندی',
        href: '/admin/faq/categories/',
      },
      {
        name: 'سوالات متداول',
        href: '/admin/faq/',
      },
    ],
  },
  {
    icon: Transaction_icon,
    name: 'تراکنش‌ها',
    href: ['/admin/transactions/'],
    activeIcon: Transaction_fill_icon,
    children: [
      {
        name: 'تراکنش‌ها',
        href: '/admin/transactions/',
      },
      {
        name: 'تنظیمات پرداخت',
        href: '/admin/transactions/setting',
      },
    ],
  },
  // {
  //   icon: Slider_icon,
  //   name: 'اسلایدر‌ها',
  //   activeIcon: Slider_fill_icon,
  //   href: '/admin/sliders/',
  //   children: [
  //     {
  //       name: 'اسلایدر‌ها',
  //       href: '/admin/sliders/',
  //     },
  //     {
  //       name: 'دسته‌بندی اسلایدر‌ها',
  //       href: '/admin/sliders/categories/',
  //     },
  //   ],
  // },
  {
    icon: Comments_icon,
    name: 'دیدگاه‌ها',
    href: '/admin/comments/',
    activeIcon: Comments_fill_icon,
  },
  {
    icon: Home_icon,
    name: 'صفحه اصلی',
    href: '/admin/home/',
    activeIcon: Home_fill_icon,
  },
  {
    icon: Support_icon,
    name: 'پشتیبانی',
    href: '/admin/supports/',
    activeIcon: Comments_fill_icon,
  },
  {
    icon: Support_icon,
    name: 'اعلان‌ها',
    href: '/admin/notifications/',
    activeIcon: Comments_fill_icon,
  },
  {
    icon: User_icon,
    name: 'کاربران',
    href: '/admin/users/',
    activeIcon: User_fill_icon,
  },
  {
    icon: Media_icon,
    name: 'عکس‌وفیلم',
    href: '/admin/media/',
    activeIcon: Media_fill_icon,
  },
  {
    icon: Brand_icon,
    name: 'تعین سطح',
    href: '/admin/lpa/',
    activeIcon: Brand_fill_icon,
  },
  // {
  //   icon: Transport_icon,
  //   name: 'حمل‌ونقل',
  //   href: '/admin/transports/',
  //   activeIcon: Transport_fill_icon,
  // },
  // {
  //   icon: Menu_icon,
  //   name: 'فهرست',
  //   href: '/admin/menus/',
  //   activeIcon: Menu_fill_icon,
  // },
  // {
  //   icon: Sms_icon,
  //   name: 'پیامک‌ها',
  //   href: '/admin/sms/',
  //   activeIcon: Sms_fill_icon,
  // },
  {
    icon: Orders_icon,
    name: 'سفارش‌ها',
    href: [
      '/admin/orders/course',
      '/admin/orders/digital',
      '/admin/orders/physical',
      '/admin/orders/lpa',
    ],
    activeIcon: Orders_fill_icon,
    children: [
      {
        name: 'دوره ها',
        href: '/admin/orders/course',
      },
      {
        name: 'دیجیتال‌ها',
        href: '/admin/orders/digital',
      },
      {
        name: 'فیزیکی‌ها',
        href: '/admin/orders/physical',
      },
      {
        name: 'تعین سطح',
        href: '/admin/orders/lpa',
      },
    ],
  },
  {
    icon: Discount_icon,
    name: 'تخفیف‌ها',
    href: '/admin/discounts/',
    activeIcon: Discount_fill_icon,
  },
  {
    icon: Contact_icon,
    name: 'تماس با ما',
    href: '/admin/contact',
    activeIcon: Contact_fill_icon,
  },
  {
    icon: Settings_icon,
    name: 'تنظیمات',
    href: '/admin/settings/',
    activeIcon: Settings_fill_icon,
  },
];

type Props = {
  setOpenDrawer?: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  className?: string;
};
const Slidebar = ({ open, setOpen, className, setOpenDrawer }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const onRedirect = (href: string) => {
    router.push(`${href}/`);
    if (setOpenDrawer) {
      return setOpenDrawer(false);
    }
  };
  return (
    <>
      <div
        className={`custom_sidebar top-0 h-full overflow-x-hidden border border-[#e4e7e958] lg:fixed lg:h-[100vh] lg:overflow-y-auto lg:bg-white lg:transition-all lg:duration-300 ${open ? 'lg:w-[60px]' : 'lg:w-[270px]'} ${className}`}
      >
        <div className="border border-[#e4e7e984]">
          {!open && <Logo className="mx-auto my-4 flex w-32 items-center justify-center" />}
        </div>
        {/* menu */}
        <div>
          {menus.map((menu, idx) => {
            const href = Array.isArray(menu.href)
              ? menu.href.find((permission) => pathname === permission)
              : menu.href;
            if (Array.isArray(menu.children)) {
              return (
                <Accordion key={idx} defaultSelectedKeys={[href!]}>
                  <AccordionItem
                    key={href}
                    indicator={
                      <Arrow_back_mobile className="h-4 w-4 rotate-180 stroke-[#232429]" />
                    }
                    title={menu.name}
                    startContent={
                      pathname === href ? (
                        <menu.activeIcon className={`"w-5 h-5`} />
                      ) : (
                        <menu.icon className={`"w-5 h-5`} />
                      )
                    }
                    classNames={{
                      base: 'border-b border-[#e4e7e958]',
                      title: `font-regular pt-1 text-[14px] ${pathname === href ? 'text-main' : 'text-[#545A66] '}`,
                      trigger: ' py-0 h-[50px] flex justify-center items-center',
                      content: '!py-0',
                      indicator: open ? 'hidden' : '',
                      titleWrapper: open ? 'hidden' : '',
                    }}
                  >
                    {!open && (
                      <div>
                        {menu.children.map((menu, idx) => (
                          <Button
                            onClick={() => onRedirect(menu.href)}
                            key={idx}
                            className={`!h-10 w-full min-w-fit justify-start px-4 !font-regular font-medium text-[12px] ${pathname === menu.href ? 'text-main' : 'text-[#545A66]'}`}
                          >
                            {menu.name}
                          </Button>
                        ))}
                      </div>
                    )}
                  </AccordionItem>
                </Accordion>
              );
            }
            return (
              <Button
                onClick={() => onRedirect(menu.href as string)}
                key={idx}
                className={`flex h-[50px] w-full min-w-fit items-center rounded-none border-b border-[#e4e7e984] px-3 ${open ? 'justify-center' : 'justify-between'}`}
              >
                <span className="flex items-center gap-3">
                  {pathname === href ? (
                    <menu.activeIcon className={`${open ? 'h-6 w-6' : 'h-5 w-5'}`} />
                  ) : (
                    <menu.icon className={`${open ? 'h-6 w-6' : 'h-5 w-5'}`} />
                  )}
                  {!open && (
                    <span
                      className={`pt-1 font-regular ${pathname === href ? 'text-main' : 'text-[#545A66]'}`}
                    >
                      {menu.name}
                    </span>
                  )}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
      <Button
        onClick={() => setOpen(!open)}
        className={`fixed top-5 hidden h-[40px] w-[40px] border bg-white lg:flex ${open ? 'right-[50px] rotate-180' : 'right-[250px]'}`}
      >
        <Arrow_back_mobile className="h-4 w-4 stroke-[#232429]" />
      </Button>
    </>
  );
};

export default Slidebar;
