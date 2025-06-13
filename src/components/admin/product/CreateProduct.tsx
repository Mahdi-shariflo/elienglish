import BaseDialog from '@/components/common/BaseDialog';
import Input from '@/components/common/form/Input';
import React, { useRef } from 'react';
import SeoOptions from '../common/SeoOptions';
import { useFormik } from 'formik';
import SelectProductTag from './SelectProductTag';
import Editor from '../common/Editor';
import Select from '@/components/common/Select';
import { StatusOptionsAdmin } from '@/lib/data';
import Media from '../common/Media';
import { RiUploadCloud2Line } from 'react-icons/ri';

const CreateProduct = () => {
  const formik = useFormik({
    initialValues: {
      description: '',
    },
    onSubmit: () => {},
  });
  const editorRef = useRef<HTMLInputElement | null>(null);
  return (
    <BaseDialog isOpen size="full" title={'ایجاد محصول'}>
      <div className="flex items-start gap-5 px-4">
        <div className="grid flex-1 grid-cols-2 gap-4">
          <Input
            isRequired
            label="عنوان بلاگ"
            classNameInput="!h-[48px] bg-[#f5f6f6]"
            name="title"
            // helperText={blog?.url ? blog.url : createURL(formik.values.title)}
            // isAvailable={Boolean(blog?.url)}
            formik={formik}
          />
          <Input
            isRequired
            label="عنوان انگلیسی"
            classNameInput="!h-[48px] bg-[#f5f6f6]"
            name="title"
            // helperText={blog?.url ? blog.url : createURL(formik.values.title)}
            // isAvailable={Boolean(blog?.url)}
            formik={formik}
          />
          <Input
            isRequired
            label="عنوان کوتاه"
            classNameInput="!h-[48px] bg-[#f5f6f6]"
            name="title"
            // helperText={blog?.url ? blog.url : createURL(formik.values.title)}
            // isAvailable={Boolean(blog?.url)}
            formik={formik}
          />
          <Select
            label="وضعیت انتشار "
            options={StatusOptionsAdmin}
            nameLabel="label"
            nameValue="value"
            name="isPublic"
            formik={formik}
          />
          <SelectProductTag
            onChange={() => {}}
            values={[]}
            title="انتخاب تگ محصول"
            className="col-span-2"
          />
          <SeoOptions formik={formik} />
          <Editor
            value={formik.values.description}
            // @ts-expect-error editor
            editorRef={editorRef}
          />
        </div>
        <div className="flex min-w-[400px] flex-col gap-4">
          <Media withModal className="w-full rounded-lg border-2 border-dashed" title="ویدیو محصول">
            <div className="flex h-[200px] w-full items-center justify-center font-regular">
              <div className="flex flex-col items-center justify-center text-black">
                <RiUploadCloud2Line size={40} />
                <p>
                  انتخاب <span className="text-main">ویدیو</span> برای محصول
                </p>
              </div>
            </div>
          </Media>
          <Media withModal className="w-full rounded-lg border-2 border-dashed" title="عکس محصول">
            <div className="flex h-[200px] w-full items-center justify-center font-regular">
              <div className="flex flex-col items-center justify-center text-black">
                <RiUploadCloud2Line size={40} />
                <p>
                  انتخاب <span className="text-main">عکس</span> برای محصول
                </p>
              </div>
            </div>
          </Media>
          <Media withModal className="w-full rounded-lg border-2 border-dashed" title="گالری محصول">
            <div className="flex h-[200px] w-full items-center justify-center font-regular">
              <div className="flex flex-col items-center justify-center text-black">
                <RiUploadCloud2Line size={40} />
                <p>
                  انتخاب <span className="text-main">گالری</span> محصول
                </p>
              </div>
            </div>
          </Media>
        </div>
      </div>
    </BaseDialog>
  );
};

export default CreateProduct;
