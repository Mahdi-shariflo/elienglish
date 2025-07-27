import React, { useEffect, useState, useTransition } from 'react';
import Button from './Button';
import {
  Accordion,
  AccordionItem,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from '@heroui/react';
import { BlogPage_icon, BrandPage_icon, ContactPage_icon, Home_icon } from './icon';
import { useRouter } from 'next/navigation';
import { CgClose } from 'react-icons/cg';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    title: string;
  } | null>(null);
  const router = useRouter();
  const menus = [
    {
      title: 'صفحه اصلی',
      Icon: Home_icon,
      src: '/',
    },
    {
      title: 'مقاله‌ها',
      Icon: BlogPage_icon,
      src: '/mag',
    },
    {
      title: 'تماس با ما',
      Icon: ContactPage_icon,
      src: '/contact-us',
    },
  ];
  // @ts-expect-error error
  const handleCategoryClick = (category) => {
    if (!category.src) {
      setSelectedCategory(category);
      setIsAccordionOpen(true);
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) setSelectedCategory(null);
  }, [open]);
  return (
    <div>
      <Button className="cursor-pointer" onClick={() => setOpen(true)}>
        <svg
          width="23"
          height="19"
          viewBox="0 0 23 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="1.1"
            y1="-1.1"
            x2="21.9"
            y2="-1.1"
            transform="matrix(-1 0 0 1 23 3)"
            stroke="#A6AFB9"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <line
            x1="1.1"
            y1="-1.1"
            x2="16.9"
            y2="-1.1"
            transform="matrix(-1 0 0 1 23 11)"
            stroke="#A6AFB9"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <line
            x1="1.1"
            y1="-1.1"
            x2="13.9"
            y2="-1.1"
            transform="matrix(-1 0 0 1 23 19)"
            stroke="#A6AFB9"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </Button>
      {open && (
        <Drawer
          hideCloseButton
          isOpen={open}
          onOpenChange={() => setOpen(false)}
          className="!z-[9999]"
        >
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerHeader>
                  {selectedCategory ? (
                    <div className="flex w-full items-center gap-2">
                      <Button
                        onClick={() => setSelectedCategory(null)}
                        className="w-fit !min-w-fit"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.91 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91 4.08008"
                            stroke="#545A66"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Button>
                      <p className="w-full whitespace-nowrap text-center font-medium text-[16px]">
                        {selectedCategory.title}
                      </p>
                      <Button onClick={onClose} className="w-fit min-w-fit">
                        <CgClose size={20} />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex w-full items-center justify-between">
                      <Button onClick={onClose} className="w-fit min-w-fit">
                        <CgClose size={20} />
                      </Button>
                    </div>
                  )}
                </DrawerHeader>
                <DrawerBody>
                  {isAccordionOpen && selectedCategory ? (
                    // نمایش اکاردئون دسته‌بندی

                    <ShowSelectCategory
                      onClose={onClose}
                      //  @ts-expect-error error
                      category={selectedCategory?.children}
                    />
                  ) : (
                    // نمایش منوی اصلی
                    <div className="mt-3 grid grid-cols-2 gap-4">
                      {menus.map((menu, idx) => (
                        <div
                          key={idx}
                          onClick={
                            menu?.src!
                              ? () => {
                                  onClose();
                                  router.push(`${menu.src!}/`);
                                }
                              : () => handleCategoryClick(menu)
                          }
                          className="flex h-[83px] w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border"
                        >
                          <menu.Icon
                            className={`!h-7 !w-7 ${menu.src === '/' ? 'stroke-main' : ''}`}
                          />
                          <span className="font-light text-[#4A4A4A]">{menu.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </DrawerBody>
              </>
            )}
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default Sidebar;

const ShowSelectCategory = ({ category, onClose }: { category: any[]; onClose: () => void }) => {
  const [, startTransition] = useTransition();
  const router = useRouter();

  const onRedirect = (url: string) => {
    onClose();
    startTransition(() => {
      router.push(`${url}/`);
    });
  };

  // گرفتن دسته‌بندی‌های والد
  const parentCategories = category.filter((item) => item.is_parent);

  return (
    <div className="container_category mt-2">
      <Accordion className="!px-0">
        {parentCategories.map((parent, idx) => {
          const children = category.filter((child) => child.position === parent.title);

          return (
            <AccordionItem
              title={parent.title}
              className="!p-0"
              key={idx}
              classNames={{
                base: 'border-b border-[#E4E7E9] !px-0',
                title: 'font-medium !text-[14px] text-[#232429]',
                subtitle: 'text-[10px] text-[#7D8793] font-regular line-clamp-1',
                trigger: 'items-start',
                content: '!py-0',
              }}
            >
              <div className="flex flex-col gap-2">
                {children.map((child, childIdx) => (
                  <Button
                    className="line-clamp-1 !h-fit w-fit justify-normal px-0 py-1 font-regular text-[12px] text-[#7d8793c3]"
                    key={childIdx}
                    onClick={() => onRedirect(child.url)}
                  >
                    {child.title}
                  </Button>
                ))}
              </div>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};
