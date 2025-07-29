'use client';
import ActionCategoryProduct from '@/components/admin/product/ActionCategoryProduct';
import Button from '@/components/common/Button';
import Input from '@/components/common/form/Input';
import { Arrow_back_mobile, Delete_icon, Edit_icon, Plus_icon } from '@/components/common/icon';
import { useGetCategoryProductAdmin } from '@/hooks/admin/products/useGetCategoryProductAdmin';
import useGlobalStore from '@/store/global-store';
import { Category } from '@/store/types/home';
import { Accordion, AccordionItem, Spinner } from '@heroui/react';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const { setVerifyDelete } = useGlobalStore();
  const [modal, setModal] = useState<{ open: boolean; info: null | Category; parent: boolean }>({
    open: false,
    parent: false,
    info: null,
  });

  const { data, isLoading, isSuccess, isFetching } = useGetCategoryProductAdmin({});
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (isSuccess || isFetching) {
      const categories = data?.data?.data;
      setCategories(categories);
    }
  }, [isSuccess, isFetching]);

  const onDelete = (category: Category) =>
    setVerifyDelete({
      open: true,
      title: 'حذف دسته‌بندی',
      description: 'دسته‌بندی',
      info: category.title,
      updateCache: 'category-products-admin',
      url: `/product/admin/category/${category._id}`,
    });

  // تابع بازگشتی برای نمایش دسته‌بندی‌ها و زیرمجموعه‌های آن‌ها
  const renderCategories = (categories: Category[]) => {
    return categories.map((item, idx) => (
      <Accordion key={idx} className="!px-0">
        <AccordionItem
          startContent={
            item.children && item.children.length > 0 ? (
              <Arrow_back_mobile className="mr-3 h-6 w-6 stroke-[#232429]" />
            ) : null
          }
          indicator={
            <div className="flex items-center gap-3 pl-2">
              <Button
                onClick={() => setModal({ open: true, info: item, parent: false })}
                className="!h-7 w-fit"
              >
                <Edit_icon />
              </Button>
              <Button onClick={() => onDelete(item)} className="!h-fit w-fit">
                <Delete_icon />
              </Button>
              <Button
                // @ts-expect-error error
                onClick={() => setModal({ open: true, info: { _id: item._id }, parent: true })}
                className="!h-fit w-fit"
              >
                <Plus_icon className="stroke-[#232429]" />
              </Button>
            </div>
          }
          title={item.title}
          classNames={{
            base: '!px-0 ',
            title: 'px-2 font-medium text-[14px]',
            trigger: '!px-0 !h-[55px] border rounded-lg',
            indicator: '!rotate-0',
          }}
        >
          {item.children && item.children.length > 0 ? (
            <div className="mr-10 mt-2 space-y-2">
              {item.children && item.children.length > 0 ? renderCategories(item.children) : null}
            </div>
          ) : null}
        </AccordionItem>
      </Accordion>
    ));
  };

  return (
    <div>
      <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        دسته بندی محصولات
      </p>

      {isLoading ? (
        <Spinner className="mt-10 flex items-center justify-center" size="lg" />
      ) : (
        <div className="mt-10">
          <div className="flex items-center gap-3">
            <Input classNameInput={'!h-[48px] bg-[#f5f6f6]'} />
            <Button
              onClick={() => setModal({ info: null, open: true, parent: false })}
              className="!h-[48px] w-fit bg-main px-2 text-white"
            >
              <Plus_icon />
              <span>اضافه کردن سر دسته</span>
            </Button>
          </div>
          <div className="mt-8 space-y-2 lg:w-[50%]">
            {categories?.length > 0 ? (
              renderCategories(categories)
            ) : (
              <p className="text-right font-medium">دسته‌بندی‌ای وجود ندارد</p>
            )}
          </div>
        </div>
      )}

      <ActionCategoryProduct modal={modal} setModal={setModal} />
    </div>
  );
};

export default Page;
