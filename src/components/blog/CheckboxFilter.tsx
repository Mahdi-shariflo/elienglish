import { Accordion, AccordionItem, Checkbox } from '@heroui/react';
import React, { useEffect, useMemo, useTransition } from 'react';
import { FilterCategory } from '@/store/types';
import { usePathname, useRouter } from 'next/navigation';
import useGlobalStore from '@/store/global-store';

type Props = {
  resultFilter?: FilterCategory;
  searchParams: {
    attribiutes?: string;
    available?: string;
    discounted?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    search?: string;
  };
};

const CheckboxFilter = ({ resultFilter, searchParams }: Props) => {
  const { setIsPendingCategory } = useGlobalStore();
  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();
  const router = useRouter();

  // ✅ به‌روزرسانی خودکار فیلترهای انتخاب شده از روی searchParams
  const selectedAttributes = useMemo(() => {
    return Object.fromEntries(
      Object.entries(searchParams).map(([key, value]) => [key, value?.split(',') ?? []])
    );
  }, [searchParams]);

  const singleSelectTypes = [
    'courseStatus',
    'sort',
    'available',
    'blogType',
    'courseType',
    'productType',
    'productTypeCategory',
    'weekday',
    'lpaStatus',
    'searchItemType',
  ];
  const onAttributes = ({
    checked,
    type,
    isLink,
    id,
    page,
  }: {
    id: string;
    type: string;
    checked: boolean;
    page?: string;
    isLink?: boolean;
  }) => {
    startTransition(() => {
      // اگر لینک هست و صفحه داره
      if (isLink && page) {
        // اگر سینگل هست و غیرفعال میشه، برگرد عقب
        if (singleSelectTypes.includes(type) && !checked) {
          if (pathname.startsWith('/category-product')) return router.push('/product');
          if (pathname.startsWith('/course-category')) return router.push('/courses');
          if (pathname.startsWith('/category')) return router.push('/courses');
          return router.back();
        }
        // در غیر این صورت به صفحه جدید برو
        return router.push(page);
      }

      const currentUrl = new URL(window.location.href);
      const searchParams = new URLSearchParams(currentUrl.search);
      const isSingle = singleSelectTypes.includes(type);

      let updated: string[] = [];

      if (isSingle) {
        if (checked) {
          updated = [id];
        } else {
          updated = [];
        }
      } else {
        const existing = searchParams.get(type)?.split(',').filter(Boolean) || [];
        if (checked) {
          updated = [...new Set([...existing, id])];
        } else {
          updated = existing.filter((item) => item !== id);
        }
      }

      if (updated.length > 0) {
        searchParams.set(type, updated.join(','));
      } else {
        searchParams.delete(type);
      }

      const newQueryString = searchParams.toString();

      router.push(`${pathname}/?${newQueryString}`, { scroll: true });
    });
  };

  useEffect(() => {
    setIsPendingCategory(isPending);
  }, [isPending]);
  return (
    // @ts-expect-error error
    <Accordion defaultSelectedKeys={['0', '1']} className="px-0">
      <></>
      {resultFilter?.properties?.map((property, idx) => {
        const filteredAttributes = property?.attributes;

        return (
          <AccordionItem
            indicator={
              <svg
                className="h-5 w-5 rotate-90 stroke-[#8E98A8]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            key={idx}
            aria-label={`Accordion ${idx}`}
            classNames={{
              base: 'border-b last:border-none dark:!border-[#263248] !border-[#E4E7E9]',
              title: 'text-[#172334] !text-[14px] lg:text-[16px] dark:text-[#E5EAEF] font-demibold',
            }}
            title={property.title}
          >
            <div>
              {/* <Input
                classNameInput="!h-[45px] !bg-white dark:!bg-[#33435A] border-none"
                placeholder="جستجو"
                value={searchTerm}
                onChange={(e) => handleSearchChange(idx, e.target.value)}
              /> */}

              <div className="flex flex-col gap-4">
                {filteredAttributes?.length > 0 ? (
                  filteredAttributes?.map((attribute) => (
                    <Checkbox
                      size="lg"
                      key={attribute._id}
                      isSelected={
                        selectedAttributes[attribute.type]?.includes(attribute.url) ?? false
                      }
                      classNames={{
                        label: 'pr-1 !text-[14px] !font-medium text-[#33435A] dark:text-[#8E98A8]',
                        wrapper: 'after:!bg-main',
                      }}
                      onValueChange={(value) =>
                        onAttributes({
                          checked: value,
                          id: attribute.url,
                          type: attribute.type,
                          page: attribute.page,
                          isLink: attribute.isLink,
                        })
                      }
                    >
                      <div className="flex items-center gap-2">{attribute.title}</div>
                    </Checkbox>
                  ))
                ) : (
                  <p className="font-regular text-[14px] text-gray-500">موردی یافت نشد</p>
                )}
              </div>
            </div>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default CheckboxFilter;
