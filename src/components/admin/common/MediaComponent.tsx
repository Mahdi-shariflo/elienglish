'use client';
import CardMedia from '@/components/admin/CardMedia';
import UploadNewFile from '@/components/admin/common/UploadNewFile';
import Button from '@/components/common/Button';
import Input from '@/components/common/form/Input';
import { SearchIcon } from '@/components/common/icon';
import { useGetMediaAdmin } from '@/hooks/admin/media/useGetMediaAdmin';
import { Media as MediaType } from '@/types';
import { SelectItem, Select, Spinner, Pagination } from '@heroui/react';
import React, { useState } from 'react';
type Props = {
  onSelect?: (media: MediaType[] | MediaType) => void;
  withModal?: boolean;
  onCloseMedia?: () => void;
  multiple?: boolean;
};
const MediaComponent = ({ onSelect, withModal, onCloseMedia, multiple }: Props) => {
  const [selectedMedia, setSelectedMedia] = useState<MediaType[]>([]); // مدیریت آرایه انتخاب‌شده‌ها

  const [filter, setFilter] = useState({
    page: '1',
    sort: 'createdAt_desc',
    search: '',
  });
  const { isLoading, data } = useGetMediaAdmin({
    page: filter.page,
    search: filter.search,
    sort: filter.sort,
  });

  const onChangeInput = (search: string) => {
    setFilter({
      ...filter,
      search: search,
    });
  };

  const media: { media: MediaType[]; totalPages: number } = data?.data?.data;
  const onChangeSort = (sort: string) => {
    setFilter({
      page: '1',
      search: '',
      sort: sort,
    });
  };
  const onChangePage = (page: number) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setFilter({
      page: page.toString(),
      search: '',
      sort: 'createdAt_desc',
    });
  };

  const onCliseSaveSelectImg = () => {
    if (onSelect) onSelect(selectedMedia);
    if (onCloseMedia) onCloseMedia();
  };
  return (
    <>
      <div className="w-full">
        {!withModal && (
          <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
            عکس‌وفیلم
          </p>
        )}
        {isLoading && !filter.search ? (
          <Spinner size="lg" className="flex items-center justify-center py-10" />
        ) : (
          <div>
            <div className="flex items-center gap-3">
              <Input
                value={filter.search}
                onChange={(e) => onChangeInput(e.target.value)}
                startContent={<SearchIcon className="stroke-[#616A76]" />}
                className="!mb-5 !mt-7"
                classNameLabel="text-[#616A76] text-[14px]"
                classNameInput="bg-[#f5f6f6] !h-[48px]"
              />
              <Select
                selectedKeys={[filter.sort!]}
                onChange={(e) => onChangeSort(e.target.value)}
                dir="rtl"
                classNames={{
                  value: 'text-[12px] font-medium ',
                  label: '!text-gray-700 font-medium  text-[12px]',
                  trigger: 'border h-[48px] min-h-[48px] rounded-lg mt-2',
                  listboxWrapper: 'font-medium ',
                }}
                label="مرتب کردن"
              >
                <SelectItem key={'createdAt_desc'}>جدید ترین</SelectItem>
                <SelectItem key={'createdAt_asc'}>قدیمی ترین</SelectItem>
              </Select>
              <UploadNewFile />
              {multiple && (
                <Button
                  onClick={onCliseSaveSelectImg}
                  className="mt-2 w-fit border bg-main px-4 text-white"
                >
                  انتخاب و بستن رسانه
                </Button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-7 lg:grid-cols-3 2xl:grid-cols-5">
              {media?.media?.map((media, idx) => (
                <CardMedia
                  setSelectedMedia={setSelectedMedia}
                  selectedMedia={selectedMedia}
                  multiple={multiple}
                  onCloseMedia={onCloseMedia}
                  onSelect={onSelect}
                  media={media}
                  key={idx}
                />
              ))}
            </div>
            {media?.totalPages !== 0 && (
              <Pagination
                page={Number(filter.page)}
                dir="ltr"
                total={media?.totalPages!}
                onChange={onChangePage}
                classNames={{ base: 'flex justify-center mt-10 font-medium', cursor: 'bg-main' }}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default MediaComponent;
