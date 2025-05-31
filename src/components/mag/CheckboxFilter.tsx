import { Accordion, AccordionItem, Checkbox } from '@heroui/react';
import React, { useEffect, useState, useTransition } from 'react';
import { FilterCategory } from '@/types';
import { usePathname, useRouter } from 'next/navigation';
import useGlobalStore from '@/store/global-store';
import Input from '../common/form/Input';

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
  const [searchTerms, setSearchTerms] = useState<{ [key: number]: string }>({});
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const selectedAttributes = searchParams.attribiutes?.split(',') || [];
  const defaultOpenAccordions = resultFilter?.properties
    ?.map((property, idx) =>
      property.attributes.some((attr) => selectedAttributes.includes(attr._id))
        ? idx.toString()
        : null
    )
    .filter(Boolean) as string[];

  const handleSearchChange = (index: number, value: string) => {
    setSearchTerms((prev) => ({ ...prev, [index]: value }));
  };

  const onAttributes = (checked: boolean, id: string) => {
    startTransition(() => {
      const currentUrl = new URL(window.location.href);
      const searchParams = new URLSearchParams(currentUrl.search);
      const attributes = searchParams.get('attribiutes')?.split(',').filter(Boolean) || [];

      if (checked) {
        if (!attributes.includes(id)) {
          attributes.push(id);
        }
      } else {
        const index = attributes.indexOf(id);
        if (index !== -1) {
          attributes.splice(index, 1);
        }
      }

      if (attributes.length > 0) {
        searchParams.set('attribiutes', attributes.join(','));
      } else {
        searchParams.delete('attribiutes');
      }
      searchParams.set('page', '1');
      const newQueryString = searchParams.toString();
      router.push(`${pathname}/?${newQueryString}`, { scroll: true });
    });
  };

  useEffect(() => {
    setIsPendingCategory(isPending);
  }, [isPending]);

  return (
    // @ts-expect-error error
    <Accordion
      defaultSelectedKeys={defaultOpenAccordions}
      className="container_accordion_filter px-0"
    >
      <AccordionItem
        indicator={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995"
              stroke="#393B40"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        key={'range'}
        aria-label={`Accordion range`}
        classNames={{
          base: 'border-b border-[#E4E7E9] hidden lg:block',
          title: 'text-[#0C0C0C] text-[18px] font-regular',
        }}
        title="محدوده قیمت"
      ></AccordionItem>

      {resultFilter?.properties?.map((property, idx) => {
        const searchTerm = searchTerms[idx] || '';
        const filteredAttributes = property.attributes.filter((attr) =>
          attr.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const selectedAttributesForProperty = property.attributes.filter((attr) =>
          selectedAttributes.includes(attr._id)
        );

        return (
          <AccordionItem
            indicator={
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995"
                  stroke="#393B40"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            key={idx}
            aria-label={`Accordion ${idx}`}
            classNames={{
              base: 'border-b !border-[#E4E7E9]',
              title: 'text-[#0C0C0C] text-[14px] lg:text-[18px] font-regular',
            }}
            title={property.title}
          >
            <div>
              {/* نمایش فیلترهای انتخاب شده */}
              {selectedAttributesForProperty?.length > 0 && (
                <div className="!mb-10">
                  <p className="mb-3 font-regular text-[14px] text-[#616A76]">
                    {' '}
                    فیلترهای انتخاب شده:
                  </p>
                  <ul className="flex list-disc flex-col gap-2">
                    {selectedAttributesForProperty?.map((attribute) => (
                      <Checkbox
                        // انتخاب پیش‌فرض چک‌باکس‌ها
                        isSelected={selectedAttributes.includes(attribute._id)}
                        key={attribute._id}
                        classNames={{
                          label: 'pr-1 text-[14px] !font-regular text-[#0C0C0C]',
                          wrapper: 'after:!bg-main',
                        }}
                        onValueChange={(value) => onAttributes(value, attribute._id)}
                      >
                        <div className="flex items-center gap-2">
                          {property.displayType === 'color' ? (
                            <span
                              style={{ backgroundColor: attribute.color }}
                              className="block h-4 w-4 rounded-full border"
                            ></span>
                          ) : null}
                          {attribute.title}
                        </div>
                      </Checkbox>
                    ))}
                  </ul>
                </div>
              )}

              <Input
                classNameInput="!h-[45px] bg-[#f5f6f6]"
                placeholder="جستجو"
                value={searchTerm}
                onChange={(e) => handleSearchChange(idx, e.target.value)}
              />

              <div className="mt-5 flex flex-col gap-4">
                {filteredAttributes?.length > 0 ? (
                  filteredAttributes?.map((attribute) => (
                    <Checkbox
                      // انتخاب پیش‌فرض چک‌باکس‌ها
                      isSelected={selectedAttributes.includes(attribute._id)}
                      key={attribute._id}
                      classNames={{
                        label: 'pr-1 text-[14px] !font-regular text-[#0C0C0C]',
                        wrapper: 'after:!bg-main',
                      }}
                      onValueChange={(value) => onAttributes(value, attribute._id)}
                    >
                      <div className="flex items-center gap-2">
                        {property.displayType === 'color' ? (
                          <span
                            style={{ backgroundColor: attribute.color }}
                            className="block h-4 w-4 rounded-full border"
                          ></span>
                        ) : null}
                        {attribute.title}
                      </div>
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
