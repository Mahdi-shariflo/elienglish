'use client';
import { BASEURL } from '@/lib/variable';
import { Media } from '@/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import BaseDialog from '../common/BaseDialog';
import Button from '../common/Button';
import { convertDatePer } from '@/lib/convert';
import Link from 'next/link';
import useGlobalStore from '@/store/global-store';
import { Delete_icon } from '../common/icon';

type Props = {
  media: Media;
  onCloseMedia?: () => void;
  onSelect?: (selectedMedia: Media[] | Media) => void; // حالا آرایه ارسال می‌شود
  multiple?: boolean;
  selectedMedia: Media[];
  setSelectedMedia: React.Dispatch<React.SetStateAction<Media[]>>;
};

const CardMedia = ({
  media,
  onSelect,
  onCloseMedia,
  multiple,
  selectedMedia,
  setSelectedMedia,
}: Props) => {
  const { setVerifyDelete } = useGlobalStore();
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
    };
    img.onerror = () => {};
    img.src = `${BASEURL}/${media?.url}`;
  }, [media?.url]);

  const onDeleteImage = () => {
    setVerifyDelete({
      open: true,
      description: 'رسانه‌ها',
      title: 'حذف رسانه',
      info: media.title,
      updateCache: 'media-admin',
      url: `/admin/media/remove/${media._id}`,
    });
    onClose();
  };

  const onClick = () => {
    if (multiple) {
      setSelectedMedia((prevSelected) => {
        const isSelected = prevSelected.some((item) => item._id === media._id);
        const updatedSelection = isSelected
          ? prevSelected.filter((item) => item._id !== media._id) // حذف از لیست
          : [...prevSelected, media]; // اضافه کردن به لیست

        return updatedSelection;
      });
    } else {
      if (onSelect) {
        onSelect(media);
        if (onCloseMedia) {
          onCloseMedia();
        }
      } else {
        setOpen(true);
      }
    }
  };

  return (
    <>
      <Button
        onClick={onClick}
        className={`flex h-[150px] items-center justify-center rounded-xl border ${
          selectedMedia.some((item) => item._id === media._id) ? 'border-blue-500' : ''
        }`}
      >
        <Image
          loading="eager"
          className="object-contain"
          width={100}
          height={100}
          src={`${BASEURL}/${media.url}`}
          alt={media.title}
        />
      </Button>

      <BaseDialog size="full" isOpen={open} title={media.title} onClose={onClose}>
        <div className="my-auto flex h-[90%] items-start gap-4">
          <div className="flex h-full w-[70%] items-center justify-center rounded-xl border">
            <span className="relative h-[400px] w-[400px]">
              <Image
                loading="eager"
                fill
                className="object-contain"
                src={`${BASEURL}/${media.url}`}
                alt={media.title}
              />
            </span>
          </div>
          <div className="relative flex h-full w-full flex-col justify-between">
            <div className="flex flex-col gap-3 font-regular text-[14px]">
              <p>
                تاریخ بارگذاری:{' '}
                <span className="text-xs text-gray-600">{convertDatePer(media.createdAt)}</span>
              </p>
              <p>
                شده توسط بارگذاری:{' '}
                <Link href={'/'} className="text-xs text-blue-500 underline">
                  {media.author?.firstName} {media.author?.lastName}
                </Link>
              </p>
              <p>
                حجم:{' '}
                <span className="text-xs text-blue-500 underline">
                  {imageSize?.width}px * {imageSize?.height}px
                </span>
              </p>
              <p>
                نام پرونده:{' '}
                <a
                  target="_blank"
                  href={`${BASEURL}/${media?.url}`}
                  className="cursor-pointer text-xs text-blue-500"
                >
                  {`${BASEURL}/${media.url}`}
                </a>
              </p>
            </div>
            <div className="mb-10 flex justify-start gap-2">
              <Button onClick={onClose} className="w-[200px] border bg-main px-2 text-white">
                بستن
              </Button>
            </div>
            <Button
              onClick={onDeleteImage}
              className="absolute left-0 top-0 w-fit min-w-fit border px-2 font-regular"
            >
              <Delete_icon />
              <span>حذف عکس</span>
            </Button>
          </div>
        </div>
      </BaseDialog>
    </>
  );
};

export default CardMedia;
