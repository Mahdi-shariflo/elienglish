'use client';
import ActionCategoryBlog from '@/components/admin/blog/ActionCategoryBlog';
import VerifyDelete from '@/components/admin/common/VerifyDelete';
import Button from '@/components/common/Button';
import Input from '@/components/common/form/Input';
import {
  Arrow_back_desktop,
  Arrow_back_mobile,
  Delete_icon,
  Edit_icon,
  Plus_icon,
} from '@/components/common/icon';
import { useGetCategoriesBlog } from '@/hooks/admin/blogs/useGetCategoriesBlog';
import useGlobalStore from '@/store/global-store';
import { Category } from '@/types/home';
import { Accordion, AccordionItem, Spinner } from '@heroui/react';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const { setVerifyDelete } = useGlobalStore();
  const [modal, setModal] = useState<{ open: boolean; info: null | Category; parent: boolean }>({
    open: false,
    parent: false,
    info: null,
  });
  const { data, isLoading, isSuccess, isFetching } = useGetCategoriesBlog({});
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    if (isSuccess || isFetching) {
      const categories = data?.data?.data?.MagCategories;
      setCategories(categories);
    }
  }, [isSuccess, isFetching]);

  const onDelete = (category: Category) =>
    setVerifyDelete({
      open: true,
      title: 'حذف دسته‌بندی',
      description: 'دسته‌بندی',
      info: category.title,
      updateCache: 'categories-blog-admin',
      url: `/blog/admin/category/${category._id}`,
    });

  return (
    <div>
      <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        دسته بندی مقالات
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
          <div className="mt-8 space-y-3 lg:w-[50%]">
            {categories?.map((item, idx) => {
              if (item?.children?.length !== 0)
                return (
                  <Accordion className="!px-0" key={idx} defaultSelectedKeys={'all'}>
                    <AccordionItem
                      startContent={<Arrow_back_mobile className="mr-3 h-6 w-6 stroke-[#232429]" />}
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
                            onClick={() => setModal({ open: true, info: item, parent: true })}
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
                      <div className="mr-10">
                        {item?.children?.map((item, idx) => (
                          <div
                            className="flex h-[55px] items-center justify-between rounded-lg border border-gray-200 px-3 font-medium text-[14px] shadow-sm"
                            key={idx}
                          >
                            <p>{item.title}</p>
                            <div className="flex items-center gap-3">
                              <Button
                                onClick={() => setModal({ open: true, info: item, parent: false })}
                                className="w-fit"
                              >
                                <Edit_icon />
                              </Button>
                              <Button onClick={() => onDelete(item)} className="w-fit">
                                <Delete_icon />
                              </Button>
                              <Button
                                onClick={() => setModal({ open: true, info: item, parent: true })}
                                className="w-fit"
                              >
                                <Plus_icon className="stroke-[#232429]" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionItem>
                  </Accordion>
                );
              return (
                <div
                  className="flex h-[55px] items-center justify-between rounded-lg border border-gray-200 px-3 font-medium text-[14px] shadow-sm"
                  key={idx}
                >
                  <p>{item.title}</p>
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => setModal({ info: item, open: true, parent: false })}
                      className="w-fit"
                    >
                      <Edit_icon />
                    </Button>
                    <Button onClick={() => onDelete(item)} className="w-fit">
                      <Delete_icon />
                    </Button>
                    <Button
                      onClick={() => setModal({ open: true, info: item, parent: true })}
                      className="w-fit"
                    >
                      <Plus_icon className="stroke-[#232429]" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <ActionCategoryBlog modal={modal} setModal={setModal} />
      <VerifyDelete />
    </div>
  );
};

export default Page;
