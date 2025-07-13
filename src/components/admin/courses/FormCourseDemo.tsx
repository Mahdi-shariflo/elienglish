import BaseDialog from '@/components/common/BaseDialog';
import React, { Dispatch, useState } from 'react';
import Media from '../common/Media';
import { FormikProps } from 'formik';
import Input from '@/components/common/form/Input';
import { BASEURL } from '@/lib/variable';
import Button from '@/components/common/Button';
import { getMediaType } from '@/lib/utils';
import { Media as MediaType } from '@/types';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import { Delete_icon } from '@/components/common/icon';

type Props = {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  formik: FormikProps<any>;
  idx?: number;
};

const FormCourseDemo = ({ open, setOpen, formik, idx }: Props) => {
  const [newEpisode, setNewEpisode] = useState<{
    media: MediaType | null;
    title: string;
    order: string;
  }>({
    title: '',
    order: '',
    media: null,
  });

  const onClose = () => setOpen(false);
  if (idx === undefined) return null;

  const baseName = `demo.${idx}`;

  const addEpisode = () => {
    if (!newEpisode.title || !newEpisode?.media?.url) return;
    const newData = {
      title: newEpisode.title,
      order: newEpisode.order,
      type: getMediaType(newEpisode.media.url),
      mediaUrl: `${BASEURL}/${newEpisode?.media?.url}`,
    };
    const currentEpisodes = formik.values.demo[idx]?.episodes || [];
    const updatedEpisodes = [...currentEpisodes, newEpisode];

    formik.setFieldValue(`${baseName}.episodes`, updatedEpisodes);
    setNewEpisode({ title: '', order: '', media: null });
  };

  const removeEpisode = (epIndexToRemove: number) => {
    const currentEpisodes = formik.values.demo[idx]?.episodes || [];
    const updatedEpisodes = currentEpisodes.filter(
      (_: any, index: number) => index !== epIndexToRemove
    );
    formik.setFieldValue(`${baseName}.episodes`, updatedEpisodes);
  };

  return (
    <BaseDialog
      classBody="!overflow-x-hidden px-4"
      onClickFooter={onClose}
      onClose={onClose}
      isOpen={open}
      title="دمو"
      size="full"
    >
      <div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            formik={formik}
            classNameInput="!h-[48px] bg-[#f5f6f6]"
            label={'عنوان'}
            name={`${baseName}.title`}
            value={formik.values?.demo?.[idx].title}
          />
          <Input
            formik={formik}
            classNameInput="!h-[48px] bg-[#f5f6f6]"
            label={'شماره گذاری'}
            name={`${baseName}.order`}
            value={formik.values?.demo?.[idx].order}
          />
        </div>

        <div className="mt-5 flex gap-3 rounded-lg border p-4">
          <div>
            <Media
              // @ts-expect-error error
              onSelect={(media) => setNewEpisode((prev) => ({ ...prev, media }))}
              className="col-span-2 mt-5 flex w-full items-center justify-center"
              withModal
            >
              <div className="flex h-[150px] w-[150px] items-center justify-center overflow-hidden rounded-xl border">
                {newEpisode.media ? (
                  newEpisode.media.fileType === 'mp4' ? (
                    <div className="flex h-[150px] w-full items-center justify-center rounded-lg border">
                      <ReactPlayer
                        width={'100%'}
                        height={'100%'}
                        url={`${BASEURL}/${newEpisode.media.url}`}
                        playing={false}
                        controls
                      />
                    </div>
                  ) : newEpisode.media.fileType === 'pdf' ? (
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
                  ) : newEpisode.media.fileType === 'mp3' ? (
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
                      src={`${BASEURL}/${newEpisode.media?.url}`}
                      alt={newEpisode.media.title}
                    />
                  )
                ) : (
                  <p className="text-center font-regular text-sm">
                    انتخاب رسانه <span className="text-red-500">*</span>
                  </p>
                )}
              </div>
            </Media>
            <Button className="mt-4 w-full bg-main text-white" onClick={addEpisode}>
              ذخیره اپیزود
            </Button>
          </div>

          <div className="w-full space-y-3">
            <Input
              label="عنوان اپیزود"
              classNameInput="!h-[48px] bg-[#f5f6f6]"
              value={newEpisode.title}
              onChange={(e) => setNewEpisode({ ...newEpisode, title: e.target.value })}
            />
            <Input
              label="شماره"
              classNameInput="!h-[48px] bg-[#f5f6f6]"
              value={newEpisode.order.toString()}
              onChange={(e) => setNewEpisode({ ...newEpisode, order: e.target.value })}
            />
          </div>
        </div>

        {/* لیست اپیزودهای فعلی */}
        <div className="mt-6 space-y-6">
          {(formik.values.demo[idx]?.episodes || []).map((ep: any, epIndex: number) => (
            <div className="flex items-center justify-between" key={epIndex}>
              <div className="flex items-center gap-2">
                <span>
                  {ep.type === 'video' ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_9_30619)">
                        <path
                          d="M23 7L16 12L23 17V7Z"
                          stroke="#6E3DFF"
                          stroke-width="2.4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M14 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H14C15.1046 19 16 18.1046 16 17V7C16 5.89543 15.1046 5 14 5Z"
                          stroke="#6E3DFF"
                          stroke-width="2.4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_9_30619">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  ) : ep.type === 'document' ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 8C7.73478 8 7.48043 8.10536 7.29289 8.29289C7.10536 8.48043 7 8.73478 7 9C7 9.26522 7.10536 9.51957 7.29289 9.70711C7.48043 9.89464 7.73478 10 8 10H9C9.26522 10 9.51957 9.89464 9.70711 9.70711C9.89464 9.51957 10 9.26522 10 9C10 8.73478 9.89464 8.48043 9.70711 8.29289C9.51957 8.10536 9.26522 8 9 8H8ZM13 20H6C5.73478 20 5.48043 19.8946 5.29289 19.7071C5.10536 19.5196 5 19.2652 5 19V5C5 4.73478 5.10536 4.48043 5.29289 4.29289C5.48043 4.10536 5.73478 4 6 4H11V7C11 7.79565 11.3161 8.55871 11.8787 9.12132C12.4413 9.68393 13.2044 10 14 10H17V12C17 12.2652 17.1054 12.5196 17.2929 12.7071C17.4804 12.8946 17.7348 13 18 13C18.2652 13 18.5196 12.8946 18.7071 12.7071C18.8946 12.5196 19 12.2652 19 12V9C19 9 19 9 19 8.94C18.9896 8.84813 18.9695 8.75763 18.94 8.67V8.58C18.8919 8.47718 18.8278 8.38267 18.75 8.3L12.75 2.3C12.6673 2.22222 12.5728 2.15808 12.47 2.11C12.4369 2.10421 12.4031 2.10421 12.37 2.11C12.2728 2.058 12.1683 2.02092 12.06 2H6C5.20435 2 4.44129 2.31607 3.87868 2.87868C3.31607 3.44129 3 4.20435 3 5V19C3 19.7956 3.31607 20.5587 3.87868 21.1213C4.44129 21.6839 5.20435 22 6 22H13C13.2652 22 13.5196 21.8946 13.7071 21.7071C13.8946 21.5196 14 21.2652 14 21C14 20.7348 13.8946 20.4804 13.7071 20.2929C13.5196 20.1054 13.2652 20 13 20ZM13 5.41L15.59 8H14C13.7348 8 13.4804 7.89464 13.2929 7.70711C13.1054 7.51957 13 7.26522 13 7V5.41ZM14 12H8C7.73478 12 7.48043 12.1054 7.29289 12.2929C7.10536 12.4804 7 12.7348 7 13C7 13.2652 7.10536 13.5196 7.29289 13.7071C7.48043 13.8946 7.73478 14 8 14H14C14.2652 14 14.5196 13.8946 14.7071 13.7071C14.8946 13.5196 15 13.2652 15 13C15 12.7348 14.8946 12.4804 14.7071 12.2929C14.5196 12.1054 14.2652 12 14 12ZM20.71 18.29C20.617 18.1963 20.5064 18.1219 20.3846 18.0711C20.2627 18.0203 20.132 17.9942 20 17.9942C19.868 17.9942 19.7373 18.0203 19.6154 18.0711C19.4936 18.1219 19.383 18.1963 19.29 18.29L19 18.59V16C19 15.7348 18.8946 15.4804 18.7071 15.2929C18.5196 15.1054 18.2652 15 18 15C17.7348 15 17.4804 15.1054 17.2929 15.2929C17.1054 15.4804 17 15.7348 17 16V18.59L16.71 18.29C16.5217 18.1017 16.2663 17.9959 16 17.9959C15.7337 17.9959 15.4783 18.1017 15.29 18.29C15.1017 18.4783 14.9959 18.7337 14.9959 19C14.9959 19.2663 15.1017 19.5217 15.29 19.71L17.29 21.71C17.3851 21.801 17.4972 21.8724 17.62 21.92C17.7397 21.9729 17.8691 22.0002 18 22.0002C18.1309 22.0002 18.2603 21.9729 18.38 21.92C18.5028 21.8724 18.6149 21.801 18.71 21.71L20.71 19.71C20.8037 19.617 20.8781 19.5064 20.9289 19.3846C20.9797 19.2627 21.0058 19.132 21.0058 19C21.0058 18.868 20.9797 18.7373 20.9289 18.6154C20.8781 18.4936 20.8037 18.383 20.71 18.29ZM12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17C13 16.7348 12.8946 16.4804 12.7071 16.2929C12.5196 16.1054 12.2652 16 12 16H8C7.73478 16 7.48043 16.1054 7.29289 16.2929C7.10536 16.4804 7 16.7348 7 17C7 17.2652 7.10536 17.5196 7.29289 17.7071C7.48043 17.8946 7.73478 18 8 18H12Z"
                        fill="#6E3DFF"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 21C7.65685 21 9 19.6569 9 18C9 16.3431 7.65685 15 6 15C4.34315 15 3 16.3431 3 18C3 19.6569 4.34315 21 6 21Z"
                        stroke="#6E3DFF"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9 18V5L21 3V16"
                        stroke="#6E3DFF"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18 19C19.6569 19 21 17.6569 21 16C21 14.3431 19.6569 13 18 13C16.3431 13 15 14.3431 15 16C15 17.6569 16.3431 19 18 19Z"
                        stroke="#6E3DFF"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span className="font-medium text-main">{ep.title}</span>
              </div>
              <div className="flex items-center gap-4">
                {ep.type === 'video' ? (
                  <Button className="h-[36px] w-fit min-w-fit !rounded-lg bg-[#EDE8FC] !px-2 text-main">
                    مشاهده ویدئو
                  </Button>
                ) : (
                  <a className="flex h-[36px] w-fit items-center justify-center rounded-lg bg-[#EDE8FC] px-2 !font-medium text-main">
                    دانلود فایل
                  </a>
                )}
                <Button className="h-fit w-fit" onClick={() => removeEpisode(epIndex)}>
                  <Delete_icon />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseDialog>
  );
};

export default FormCourseDemo;
