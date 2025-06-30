import BaseDialog from '@/components/common/BaseDialog';
import React, { Dispatch, useState } from 'react';
import { FormikProps } from 'formik';
import Input from '@/components/common/form/Input';
import { BASEURL } from '@/lib/variable';
import Button from '@/components/common/Button';
import { getMediaType } from '@/lib/utils';
import { Media as MediaType } from '@/types';
import { Delete_icon } from '@/components/common/icon';

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
  }>({
    title: '',
    order: '',
    duration: '',
  });

  const onClose = () => setOpen(false);
  if (idx === undefined) return null;

  const baseName = `chapters.${idx}`;

  const addEpisode = () => {
    if (!newEpisode.title) return;

    const currentEpisodes = formik.values.chapters[idx]?.episodes || [];
    const updatedEpisodes = [...currentEpisodes, newEpisode];

    formik.setFieldValue(`${baseName}.episodes`, updatedEpisodes);
    setNewEpisode({ title: '', order: '', duration: '' });
  };

  const removeEpisode = (epIndexToRemove: number) => {
    const currentEpisodes = formik.values.chapters[idx]?.episodes || [];
    const updatedEpisodes = currentEpisodes.filter(
      (_: any, index: number) => index !== epIndexToRemove
    );
    formik.setFieldValue(`${baseName}.episodes`, updatedEpisodes);
  };

  console.log(open, 'shferuitfityheruityure');

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
          <Button className="mt-8 w-full bg-main text-white" onClick={addEpisode}>
            ذخیره اپیزود
          </Button>
        </div>

        {/* لیست اپیزودهای فعلی */}
        <div className="mt-6 space-y-2">
          {(formik.values.chapters[idx]?.episodes || []).map((ep: any, epIndex: number) => (
            <div
              key={epIndex}
              className="flex items-center justify-between gap-4 rounded-md border border-dashed p-3"
            >
              <div className="flex items-center gap-4">
                <span>
                  {ep.order}. {ep.title}
                </span>
                {/* <video src={ep.mediaUrl} controls className="h-[60px] rounded" /> */}
              </div>
              <Button
                className="w-fit min-w-fit rounded-full border border-main px-3 py-1 text-red-500"
                onClick={() => removeEpisode(epIndex)}
              >
                <Delete_icon />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </BaseDialog>
  );
};

export default FormChapters;
