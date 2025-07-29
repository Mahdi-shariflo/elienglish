'use client';
import { BASEURL } from '@/lib/variable';
import { Media } from '@/store/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import BaseDialog from '../common/BaseDialog';
import Button from '../common/Button';
import { convertDatePer } from '@/lib/convert';
import Link from 'next/link';
import useGlobalStore from '@/store/global-store';
import { Delete_icon } from '../common/icon';
import Video from 'next-video';
import ReactPlayer from 'react-player';
import { AudioPlayer } from '../common/AudioPlayer';

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
      url: `/media/admin/${media._id}`,
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
      {
        <Button
          onClick={onClick}
          className={`flex h-[150px] items-center justify-center rounded-xl border ${
            selectedMedia.some((item) => item._id === media._id) ? 'border-blue-500' : ''
          }`}
        >
          {media.fileType === 'mp4' ? (
            <div className="flex h-[150px] w-full items-center justify-center rounded-lg border">
              <ReactPlayer
                width={'100%'}
                height={'100%'}
                url={`${BASEURL}/${media.url}`}
                playing={false}
                controls
              />
            </div>
          ) : media.fileType === 'pdf' ? (
            <div className="flex h-[150px] w-full items-center justify-center rounded-lg border">
              <svg
                width="55"
                height="55"
                viewBox="0 0 26 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.7341 21.6016C20.3442 21.7167 19.7717 21.7297 19.1579 21.6406C18.4992 21.5451 17.8273 21.3437 17.1669 21.047C18.3446 20.8757 19.2582 20.9284 20.0396 21.2053C20.2247 21.2709 20.5288 21.4463 20.7341 21.6016ZM14.1634 20.5213C14.1155 20.5344 14.0683 20.5467 14.0213 20.5597C13.7044 20.646 13.3961 20.7301 13.099 20.805L12.6983 20.9066C11.8924 21.1105 11.0684 21.3188 10.2546 21.5669C10.5639 20.8211 10.8512 20.067 11.1326 19.3297C11.3409 18.784 11.5536 18.2264 11.7736 17.6761C11.8852 17.8604 12.0017 18.0448 12.1229 18.2297C12.6751 19.0707 13.3691 19.8482 14.1634 20.5213ZM12.1134 12.1107C12.1656 13.031 11.9671 13.9164 11.6758 14.7657C11.317 13.7155 11.1498 12.5557 11.5983 11.6194C11.7134 11.3794 11.8076 11.2511 11.8687 11.1841C11.9631 11.3299 12.0873 11.656 12.1134 12.1107ZM7.90599 23.7689C7.7044 24.1296 7.49863 24.4672 7.28772 24.786C6.77875 25.553 5.94636 26.3743 5.51875 26.3743C5.47667 26.3743 5.42575 26.3675 5.35134 26.2889C5.30344 26.2387 5.29577 26.2027 5.29809 26.1536C5.31251 25.8716 5.68615 25.3693 6.22743 24.9037C6.71873 24.4812 7.27403 24.1056 7.90599 23.7689ZM22.0957 21.6415C22.0303 20.7021 20.4491 20.0995 20.4335 20.0939C19.8222 19.8772 19.1581 19.7719 18.4034 19.7719C17.5955 19.7719 16.7244 19.8888 15.6058 20.1501C14.6104 19.4445 13.7506 18.5612 13.1082 17.5833C12.8245 17.1512 12.5695 16.7199 12.3471 16.2986C12.8899 15.0009 13.3786 13.6056 13.2898 12.0429C13.2182 10.7899 12.6531 9.94821 11.8847 9.94821C11.3576 9.94821 10.9038 10.3386 10.5347 11.1096C9.87642 12.4836 10.0495 14.2416 11.0488 16.3393C10.6889 17.1847 10.3545 18.0611 10.0308 18.9095C9.6281 19.9644 9.21314 21.0529 8.74546 22.0882C7.43389 22.6072 6.3564 23.2365 5.45843 24.0092C4.87018 24.5145 4.161 25.2868 4.12052 26.0932C4.10076 26.4729 4.23097 26.8212 4.49557 27.1002C4.77668 27.3965 5.12985 27.5525 5.51818 27.5529C6.80073 27.5529 8.03513 25.7908 8.2693 25.4373C8.74058 24.7269 9.1817 23.9345 9.61394 23.0205C10.7026 22.6271 11.8627 22.3334 12.9872 22.0496L13.3899 21.9472C13.6927 21.8703 14.0073 21.7852 14.33 21.6968C14.6715 21.6045 15.0229 21.5088 15.38 21.4178C16.5347 22.1521 17.7763 22.6311 18.9873 22.8069C20.0073 22.9552 20.9131 22.8692 21.5263 22.5495C22.0781 22.2621 22.1085 21.8187 22.0957 21.6415ZM24.5796 29.7189C24.5796 31.4392 23.0634 31.5453 22.7575 31.5487H3.19511C1.48101 31.5487 1.37779 30.0221 1.37452 29.7189L1.37429 3.72975C1.37429 2.00773 2.89332 1.90333 3.19487 1.89987H16.4096L16.4167 1.90685V7.06378C16.4167 8.09871 17.0423 10.0581 19.4119 10.0581H24.5355L24.5795 10.102L24.5796 29.7189ZM23.365 8.88269H19.4127C17.6991 8.88269 17.5955 7.36436 17.5931 7.06395V3.08707L23.365 8.88269ZM25.755 29.7189V9.61717L17.5931 1.42143V1.38329H17.5541L16.8986 0.724609H3.19515C2.15885 0.724609 0.199219 1.35288 0.199219 3.7303V29.7194C0.199219 30.7588 0.825583 32.7246 3.19515 32.7246H22.7593C23.7954 32.7244 25.755 32.0961 25.755 29.7189Z"
                  fill="#EB5757"
                />
              </svg>
            </div>
          ) : media.fileType === 'mp3' ? (
            <div className="flex h-[150px] w-full items-center justify-center rounded-lg border">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="70px"
                width="70px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7l0 72 0 264c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L448 147 192 223.8 192 432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L128 200l0-72c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z"></path>
              </svg>
            </div>
          ) : (
            <Image
              loading="eager"
              className="object-contain"
              width={100}
              height={100}
              src={`${BASEURL}/${media.url}`}
              alt={media.title}
            />
          )}
        </Button>
      }

      <BaseDialog size="full" isOpen={open} title={media.title} onClose={onClose}>
        <div className="my-auto flex h-[90%] items-start gap-4">
          <div className="flex h-full w-[70%] items-center justify-center rounded-xl border">
            <span className="relative h-[400px] w-[400px]">
              {media.fileType === 'mp4' ? (
                <video controls src={`${BASEURL}/${media.url}`} />
              ) : media.fileType === 'mp3' ? (
                <AudioPlayer src={`${BASEURL}/${media.url}`} />
              ) : (
                <Image
                  loading="eager"
                  fill
                  className="object-contain"
                  src={`${BASEURL}/${media.url}`}
                  alt={media.title}
                />
              )}
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
                  {/* {media.author?.firstName} {media.author?.lastName} */}
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
              <span>
                حذف{' '}
                {media.fileType === 'mp4'
                  ? 'ویدیو'
                  : media.fileType === 'pdf'
                    ? 'pdf'
                    : media.fileType === 'mp3'
                      ? 'mp3'
                      : 'عکس'}
              </span>
            </Button>
          </div>
        </div>
      </BaseDialog>
    </>
  );
};

export default CardMedia;
