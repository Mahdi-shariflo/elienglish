import { useGetCategoryCourseWithChildrenAdmin } from '@/hooks/admin/courses/useGetCategoryCourseWithChildrenAdmin';
import { useGetCategoryProductAdmin } from '@/hooks/admin/products/useGetCategoryProductAdmin';
import { Category } from '@/types/home';
import { Checkbox, Spinner } from '@heroui/react';
import React, { useEffect, useState } from 'react';

type Props = {
  onSelect: (values: string[]) => void;
  selected: string[];
  multiple?: boolean;
  title: string;
};

const SelectCategoryCourse = ({ onSelect, selected, multiple, title }: Props) => {
  const { isLoading, data } = useGetCategoryCourseWithChildrenAdmin({});
  const productCategory: Category[] = data?.data?.data || [];
  const [selectedCategories, setSelectedCategories] = useState<string[]>(selected);

  // تابع برای مدیریت تغییر وضعیت دسته‌بندی‌ها
  const handleChange = (categoryId: string) => {
    setSelectedCategories((prevSelected) => {
      const isSelected = prevSelected.includes(categoryId);

      let updatedSelection;
      if (multiple) {
        // اگر چندتایی فعال باشد، آیتم را اضافه یا حذف می‌کنیم
        updatedSelection = isSelected
          ? prevSelected.filter((id) => id !== categoryId) // حذف
          : [...prevSelected, categoryId]; // اضافه کردن
      } else {
        // اگر چندتایی غیرفعال باشد، فقط یک گزینه نگه می‌داریم
        updatedSelection = isSelected ? [] : [categoryId];
      }

      onSelect(updatedSelection); // ارسال لیست نهایی به والد
      return updatedSelection;
    });
  };

  useEffect(() => {
    if (selected) {
      setSelectedCategories(selected);
    }
  }, [selected]);
  return (
    <div className="!mt-5 h-[350px] overflow-auto rounded-lg border p-3">
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <p className="hidden items-center justify-center gap-2 pb-3 font-medium text-[14px] text-[#0C0C0C] lg:flex lg:text-[18px]">
            {title}
            <span className="block rounded-full border px-4 text-[12px] text-black">
              {selectedCategories?.length} مورد
            </span>
          </p>
          <div className="custom_sidebar_category flex flex-col space-y-2 overflow-auto overflow-y-auto font-regular">
            {productCategory?.map((category, idx) => (
              <div className="pt-2" key={idx}>
                <Checkbox
                  isSelected={
                    Array.isArray(selectedCategories)
                      ? selectedCategories?.includes(category._id)
                      : undefined
                  }
                  onValueChange={() => handleChange(category._id)}
                  classNames={{
                    label: 'text-[14px] !font-regular text-[#0C0C0C]',
                    wrapper: 'after:!bg-main',
                  }}
                >
                  {category.title}
                </Checkbox>

                <div className="mr-5 flex flex-col gap-3 pt-2">
                  {category?.children?.map((child, idx) => (
                    <Checkbox
                      key={idx}
                      isSelected={
                        Array.isArray(selectedCategories)
                          ? selectedCategories?.includes(child._id)
                          : undefined
                      }
                      onValueChange={() => handleChange(child._id)}
                      classNames={{
                        label: 'text-[14px] !font-regular text-[#0C0C0C]',
                        wrapper: 'after:!bg-main',
                      }}
                    >
                      {child.title}
                    </Checkbox>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectCategoryCourse;
