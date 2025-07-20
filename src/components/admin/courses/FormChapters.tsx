import BaseDialog from '@/components/common/BaseDialog';
import React, { Dispatch, useState } from 'react';
import { FormikProps } from 'formik';
import Input from '@/components/common/form/Input';
import { BASEURL } from '@/lib/variable';
import Button from '@/components/common/Button';
import { getMediaType } from '@/lib/utils';
import { Media as MediaType } from '@/types';
import { Delete_icon } from '@/components/common/icon';
import { Accordion, AccordionItem } from '@heroui/react';
import Select from '@/components/common/Select';

type Props = {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  formik: FormikProps<any>;
  idx?: number;
};

const FormChapters = ({ open, setOpen, formik, idx }: Props) => {
  const [newEpisode, setNewEpisode] = useState<{
    title: string;
    order: string;
    duration: string;
    video: string;
    type: string;
  }>({
    title: '',
    order: '',
    duration: '',
    video: '',
    type: '',
  });

  const onClose = () => setOpen(false);
  if (idx === undefined) return null;

  const baseName = `chapters.${idx}`;

  const addEpisode = () => {
    if (!newEpisode.title) return;
    const currentEpisodes = formik.values.chapters[idx]?.episodes || [];
    const updatedEpisodes = [...currentEpisodes, { ...newEpisode }];

    formik.setFieldValue(`${baseName}.episodes`, updatedEpisodes);
    setNewEpisode({ title: '', order: '', duration: '', video: '', type: '' });
  };

  const removeEpisode = (epIndexToRemove: number) => {
    const currentEpisodes = formik.values.chapters[idx]?.episodes || [];
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
      title="سر فصل دوره"
      size="4xl"
    >
      <div>
        <Accordion>
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            classNames={{ title: 'font-medium', base: 'border-b ' }}
            title="تنظیمات عنوان سر فصل دوره"
          >
            <div className="grid grid-cols-2 gap-3">
              <Input
                formik={formik}
                classNameInput="!h-[48px] bg-[#f5f6f6]"
                label={'عنوان'}
                name={`${baseName}.title`}
                value={formik.values?.chapters?.[idx].title}
              />
              <Input
                formik={formik}
                classNameInput="!h-[48px] bg-[#f5f6f6]"
                label={'فصل'}
                name={`${baseName}.lessons`}
                value={formik.values?.chapters?.[idx].lessons}
              />

              <Input
                formik={formik}
                classNameInput="!h-[48px] bg-[#f5f6f6]"
                label={'زمان'}
                name={`${baseName}.duration`}
                value={formik.values?.chapters?.[idx].duration}
              />
              <Input
                formik={formik}
                price
                classNameInput="!h-[48px] bg-[#f5f6f6]"
                label={'شماره گذاری'}
                name={`${baseName}.order`}
                value={formik.values?.chapters?.[idx].order}
              />
            </div>
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Accordion 2"
            classNames={{ title: 'font-medium', base: 'border-b' }}
            title="اپیزود های دوره"
          >
            <div className="mt-5 grid grid-cols-2 gap-4 rounded-lg border p-4">
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
              <Input
                label="زمان"
                classNameInput="!h-[48px] bg-[#f5f6f6]"
                value={newEpisode.duration.toString()}
                onChange={(e) => setNewEpisode({ ...newEpisode, duration: e.target.value })}
              />
              <Input
                label="لینک ویدئو یا پادکست"
                classNameInput="!h-[48px] bg-[#f5f6f6]"
                value={newEpisode.video.toString()}
                onChange={(e) => setNewEpisode({ ...newEpisode, video: e.target.value })}
              />

              <Select
                value={newEpisode.type}
                formik={formik}
                options={[
                  { label: 'ویدیو', value: 'video' },
                  { label: 'پادکست', value: 'audio' },
                ]}
                name="type"
              />

              <Button className="w-full bg-main text-white" onClick={addEpisode}>
                ذخیره اپیزود
              </Button>
            </div>
          </AccordionItem>
        </Accordion>

        {/* لیست اپیزودهای فعلی */}
        <div className="mt-6 space-y-2">
          {(formik.values.chapters[idx]?.episodes || []).map((ep: any, epIndex: number) => (
            <div className="flex items-center justify-between" key={epIndex}>
              <div className="flex items-center gap-2">
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_83_13724)">
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
                      <clipPath id="clip0_83_13724">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <span className="font-extrabold text-[16px] text-main">{ep.title}</span>
              </div>
              <div className="flex h-[50px] items-center gap-4 rounded-lg px-4">
                <div className="flex items-center gap-2">
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.33203 2.33203H12.665C13.0628 2.33203 13.4443 2.49028 13.7256 2.77148C14.0069 3.05279 14.165 3.43421 14.165 3.83203V10.499C14.165 10.8967 14.0068 11.2783 13.7256 11.5596C13.4443 11.8407 13.0627 11.999 12.665 11.999H10.165V14.332H12.665C12.7092 14.332 12.7519 14.3496 12.7832 14.3809C12.8145 14.4121 12.832 14.4548 12.832 14.499C12.8319 14.543 12.8143 14.585 12.7832 14.6162C12.7519 14.6475 12.7092 14.665 12.665 14.665H3.33203C3.28783 14.665 3.24512 14.6475 3.21387 14.6162C3.18289 14.5851 3.16512 14.543 3.16504 14.499C3.16504 14.4549 3.18271 14.4121 3.21387 14.3809C3.24512 14.3496 3.28783 14.332 3.33203 14.332H5.83203V11.999H3.33203C2.93428 11.999 2.55277 11.8408 2.27148 11.5596C1.99026 11.2783 1.83212 10.8967 1.83203 10.499V3.83203C1.83203 3.43421 1.99018 3.05279 2.27148 2.77148C2.51757 2.5254 2.84029 2.37398 3.18359 2.33984L3.33203 2.33203ZM6.16504 14.332H9.83203V11.999H6.16504V14.332ZM2.16504 10.499C2.16513 10.8082 2.28832 11.1046 2.50684 11.3232C2.72563 11.542 3.02261 11.665 3.33203 11.665H12.665C12.9745 11.665 13.2714 11.542 13.4902 11.3232C13.7088 11.1045 13.8319 10.8082 13.832 10.499V9.33203H2.16504V10.499ZM3.33203 2.66504C3.02261 2.66504 2.72563 2.78804 2.50684 3.00684C2.28804 3.22563 2.16504 3.52261 2.16504 3.83203V8.99902H13.832V3.83203C13.832 3.52261 13.709 3.22563 13.4902 3.00684C13.2715 2.78815 12.9744 2.66504 12.665 2.66504H3.33203Z"
                        fill="#6A7890"
                        stroke="#6A7890"
                      />
                    </svg>
                  </span>
                  <span className="font-medium">{idx + 1} درس</span>
                </div>
                <div className="h-7 w-px bg-gray-300" />
                <div className="flex items-center gap-2">
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.33496 2.33203C8.14465 2.33207 8.94627 2.49191 9.69434 2.80176C10.4425 3.11166 11.1227 3.56604 11.6953 4.13867C12.2678 4.71123 12.7224 5.39064 13.0322 6.13867C13.3421 6.88685 13.501 7.6892 13.501 8.49902C13.5009 9.71856 13.1395 10.9108 12.4619 11.9248C11.7843 12.9389 10.8211 13.7296 9.69434 14.1963C8.56767 14.6629 7.32788 14.7847 6.13184 14.5469C4.93577 14.309 3.83698 13.7216 2.97461 12.8594C2.11226 11.997 1.52412 10.8982 1.28613 9.70215C1.04819 8.50593 1.17095 7.26548 1.6377 6.13867C2.10442 5.01203 2.89426 4.04864 3.9082 3.37109C4.92231 2.69349 6.11531 2.33203 7.33496 2.33203ZM9.56738 3.10938C8.50148 2.66786 7.32784 2.55226 6.19629 2.77734C5.06485 3.00246 4.0257 3.55829 3.20996 4.37402C2.39422 5.18976 1.8384 6.22891 1.61328 7.36035C1.3882 8.49191 1.5038 9.66554 1.94531 10.7314C2.38681 11.7971 3.13466 12.7077 4.09375 13.3486C5.05304 13.9896 6.18124 14.332 7.33496 14.332C8.88194 14.3319 10.3651 13.7169 11.459 12.623C12.5529 11.5292 13.1679 10.046 13.168 8.49902C13.168 7.3453 12.8255 6.2171 12.1846 5.25781C11.5437 4.29872 10.6331 3.55088 9.56738 3.10938ZM7.33496 4.99902C7.37905 4.99911 7.42097 5.01667 7.45215 5.04785C7.48333 5.07903 7.50089 5.12095 7.50098 5.16504V8.49902C7.50089 8.54311 7.48333 8.58503 7.45215 8.61621C7.42097 8.64739 7.37905 8.66495 7.33496 8.66504H5.33496C5.29076 8.66504 5.24805 8.64747 5.2168 8.61621C5.18572 8.58505 5.16805 8.54303 5.16797 8.49902C5.16797 8.45482 5.18554 8.41212 5.2168 8.38086C5.24805 8.3496 5.29076 8.33203 5.33496 8.33203H7.16797V5.16504C7.16805 5.12103 7.18572 5.07902 7.2168 5.04785C7.24805 5.01659 7.29076 4.99902 7.33496 4.99902Z"
                        fill="#6A7890"
                        stroke="#6A7890"
                      />
                    </svg>
                  </span>
                  <span className="whitespace-nowrap font-medium">{ep.duration} دقیقه</span>
                </div>
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

export default FormChapters;
