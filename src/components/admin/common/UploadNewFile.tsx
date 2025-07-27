'use client';
import BaseDialog from '@/components/common/BaseDialog';
import Button from '@/components/common/Button';
import Input from '@/components/common/form/Input';
import { useAddMediaAdmin } from '@/hooks/admin/media/useAddMediaAdmin';
import { useFormik } from 'formik';
import React, { useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const UploadNewFile = () => {
  const { mutate, isPending, isSuccess, reset } = useAddMediaAdmin();
  const [files, setFiles] = useState<File[]>([]);
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      'image/*': [],
      'video/*': [],
      'application/pdf': [],
      'audio/mp3': [],
    },
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      altText: '',
    },
    onSubmit: (values) => {
      files.forEach((file: File) => {
        const formdata = new FormData();
        formdata.append('title', file.name);
        formdata.append('files', file);
        formdata.append('altText', values.altText || 'upload');
        mutate({ data: formdata });
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setFiles([]);
      formik.resetForm();
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
        title="آپلود فیلم/ عکس / pdf جدید"
        onClickFooter={formik.handleSubmit}
      >
        <div>
          <Input
            classNameInput="bg-[#f5f6f6] !h-[48px]"
            label={'عنوان'}
            formik={formik}
            name="altText"
          />

          {/* Dropzone */}
          <div
            {...getRootProps()}
            className="mt-6 flex h-40 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>فایل را رها کنید...</p>
            ) : (
              <p>فایل را بکشید و رها کنید، یا کلیک کنید</p>
            )}
          </div>

          {/* نمایش فایل‌ها */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {files.map((file: File) => {
              if (file.type.includes('video')) {
                return (
                  <video
                    key={file.name}
                    controls
                    className="h-24 w-24 rounded-lg border object-cover"
                    src={URL.createObjectURL(file)}
                  />
                );
              }
              if (file.type.includes('audio')) {
                return (
                  <div
                    key={file.name}
                    className="flex h-24 w-24 items-center justify-center rounded-lg border bg-gray-100"
                  >
                    🎵 فایل صوتی
                  </div>
                );
              }
              if (file.type.includes('pdf')) {
                return (
                  <div
                    key={file.name}
                    className="flex h-24 w-24 items-center justify-center rounded-lg border bg-gray-100"
                  >
                    📄 PDF
                  </div>
                );
              }
              return (
                <img
                  key={file.name}
                  className="h-24 w-24 rounded-lg border object-cover"
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                />
              );
            })}
          </div>
        </div>
      </BaseDialog>
    </div>
  );
};

export default UploadNewFile;
