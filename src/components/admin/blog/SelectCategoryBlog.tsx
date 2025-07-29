import { useGetCategoriesBlog } from '@/hooks/admin/blogs/useGetCategoriesBlog';
import { Category } from '@/store/types/home';
import { Checkbox, Spinner } from '@heroui/react';
import React, { useEffect, useState } from 'react';

type Props = {
  title?: string;
  onSelect: (values: string[]) => void;
  selected: string[];
  multiple?: boolean;
};

const SelectCategoryBlog = ({
  onSelect,
  selected,
  multiple,
  title = 'دسته‌بندی بلاگ‌ها ',
}: Props) => {
  const { isPending, data } = useGetCategoriesBlog({});
  const magCategory: Category[] = data?.data?.data?.blogCategory || [];
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
    <div className="!mt-5 h-[350px] rounded-lg border p-3">
      {isPending ? (
        <Spinner />
      ) : (
        <div>
          <p className="hidden pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
            {title} <span className="text-red-500">*</span>
          </p>
          <div className="custom_sidebar_category flex flex-col gap-3 overflow-y-auto font-regular">
            {magCategory.map((category, idx) => (
              <div key={idx}>
                <Checkbox
                  isSelected={selectedCategories.includes(category._id)}
                  onValueChange={() => handleChange(category._id)}
                  classNames={{
                    label: 'text-[14px] !font-regular text-[#0C0C0C]',
                    wrapper: 'after:!bg-main',
                  }}
                >
                  {category.title}
                </Checkbox>

                <div className="mr-3 mt-2">
                  {category?.children?.map((child, idx) => (
                    <Checkbox
                      key={idx}
                      isSelected={selectedCategories.includes(child._id)}
                      onValueChange={() => handleChange(child._id)}
                      classNames={{
                        label: 'text-[14px] !font-regular text-[#0C0C0C]',
                        wrapper: 'after:!bg-main',
                      }}
                    >
                      {category.title}
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

export default SelectCategoryBlog;
