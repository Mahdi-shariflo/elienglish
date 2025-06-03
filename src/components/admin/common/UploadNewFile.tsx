import BaseDialog from '@/components/common/BaseDialog';
import Button from '@/components/common/Button';
import Input from '@/components/common/form/Input';
import { useAddMediaAdmin } from '@/hooks/admin/media/useAddMediaAdmin';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
const UploadNewFile = () => {
  const { mutate, isPending, isSuccess, reset } = useAddMediaAdmin();
  const [files, setFiles] = useState<any>([]);

  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);

  const onChange = (e: any) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };
  const formik = useFormik({
    initialValues: {
      title: '',
      altpic: '',
      url: null,
    },
    validationSchema: Yup.object({
      altpic: Yup.string().required('فیلد اجباری است'),
    }),
    onSubmit: (values) => {
      files.map((file: any) => {
        const formdata = new FormData();
        formdata.append('title', file.name);
        formdata.append('url', file);
        formdata.append('altpic', values.altpic);
        return mutate({ data: formdata });
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setFiles(null);
      formik.setValues({
        altpic: '',
        title: '',
        url: null,
      });
      reset();
      onClose();
    }
  }, [isSuccess]);
  return (
    <div>
      <Button
        className="mt-2 !h-[50px] w-[150px] rounded-lg bg-main bg-opacity-10 px-2 text-main"
        onClick={() => setOpen(true)}
      >
        عکس / فیلم جدید
      </Button>
      <BaseDialog
        isLoadingFooterBtn={isPending}
        size="lg"
        isOpen={open}
        onClose={onClose}
        title="آپلود فیلم/ عکس جدید"
        onClickFooter={formik.handleSubmit}
      >
        <div>
          <Input
            classNameInput="bg-[#f5f6f6] !h-[48px]"
            label={'عنوان'}
            formik={formik}
            name="altpic"
          />
          <div className="!mt-5 flex flex-wrap items-center gap-3">
            <div
              className={
                'relative flex h-24 w-24 !cursor-pointer items-center justify-center rounded-lg border'
              }
            >
              <label
                htmlFor="upload-photo"
                className="z-50 flex cursor-pointer flex-col items-center gap-1"
              >
                {/* <FiUploadCloud size={20} className='cursor-pointer' /> */}
                <p className="cursor-pointer text-center font-bold text-xs text-gray-500">
                  آپلود تصویر یا ویدیو
                </p>
              </label>
              <input
                id="upload-photo"
                onChange={onChange}
                type="file"
                multiple
                className="absolute z-0 w-0"
              />
            </div>
            {files?.map((file: any) => {
              if (file.type.includes('video')) {
                return (
                  <div
                    key={file.name}
                    className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg border object-cover"
                  >
                    <video
                      controls
                      className="h-full w-full rounded-lg object-cover"
                      src={URL.createObjectURL(file)}
                    />
                  </div>
                );
              }
              return (
                <div
                  key={file.name}
                  className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg border object-cover"
                >
                  <img
                    className="h-full w-full rounded-lg object-cover"
                    src={URL.createObjectURL(file)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </BaseDialog>
    </div>
  );
};

export default UploadNewFile;
