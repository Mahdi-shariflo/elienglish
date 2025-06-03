'use client';
import Input from '@/components/common/form/Input';
import Textarea from '@/components/common/form/Textarea';
import Select from '@/components/common/Select';
import { optionRedirectType, StatusOptionsAdmin } from '@/lib/data';
import React, { useEffect, useRef } from 'react';
import Editor from '../../../../../components/admin/common/Editor';
import Media from '@/components/admin/common/Media';
import { useParams, useRouter } from 'next/navigation';
import SelectCategoryBlog from '@/components/admin/blog/SelectCategoryBlog';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BASEURL } from '@/lib/variable';
import Button from '@/components/common/Button';
import { createURL, removeEmptyFields } from '@/lib/fun';
import { useGetTagsBlogAdmin } from '@/hooks/admin/blogs/useGetTagsBlogAdmin';
import { useActionMag } from '@/hooks/admin/blogs/useActionBlog';
import { useGetBlogById } from '@/hooks/admin/blogs/useGetBlogById';
import { Checkbox } from '@heroui/react';
import SeoOptions from '@/components/admin/common/SeoOptions';
interface InitialValues {
  tags: string[];
  isChosen: boolean;
  url: string;
  isPublic: string;
  description: string;
  short_des: string;
  category: string[];
  title: string;
  thumbnailimage: { url: string; _id: string } | undefined;
  metaTitle: string;
  metaDescription: string;
  keyWords: string;
  robots: string;
  redirecturl: string;
  redirecturltype: string;
  canonicalurl: string;
}
const Page = () => {
  const params = useParams();
  const { data: singleDataMag, isSuccess } = useGetBlogById();
  const { mutate, isPending } = useActionMag();
  const router = useRouter();

  const { data, isLoading: isPendingTag } = useGetTagsBlogAdmin({});
  const editorRef = useRef<HTMLInputElement | null>(null);
  const tagsOptions = data?.data?.data?.magTag;
  const formik = useFormik<InitialValues>({
    initialValues: {
      tags: [],
      isChosen: false,
      url: '',
      isPublic: 'false',
      description: '',
      short_des: '',
      category: [],
      title: '',
      thumbnailimage: undefined,
      metaTitle: '',
      metaDescription: '',
      keyWords: '',
      robots: '',
      redirecturl: '',
      redirecturltype: '',
      canonicalurl: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('فیلد اجباری است'),
      short_des: Yup.string().required('فیلد اجباری است'),
      category: Yup.array().required('فیلد اجباری است'),
      // thumbnailimage: Yup.object(),
    }),
    onSubmit: (values) => {
      const formdata = {
        title: values.title,
        isPublic: values.isPublic === 'true' ? true : false,
        url: values?.url ? values?.url : createURL(values.title),
        short_des: values?.short_des,
        isChosen: values.isChosen,
        // @ts-ignore
        description: editorRef.current.getContent(),
        tags: values?.tags?.map((option: string) => option).join(','),
        category: values.category.map((option: string) => option).join(','),
        thumbnailimage: values.thumbnailimage?._id,
        robots: values.robots,
        canonicalurl: values.canonicalurl,
        redirecturltype: Number(values?.redirecturltype),
        redirecturl: values.redirecturl,
        metaTitle: values.metaTitle,
        metaDescription: values.metaDescription,
        keyWords: values.keyWords,
      };

      mutate({ data: removeEmptyFields(formdata) });
    },
    enableReinitialize: true,
  });

  const blog = Array.isArray(singleDataMag?.data?.data?.blog)
    ? singleDataMag?.data?.data?.blog[0]
    : null;

  useEffect(() => {
    if (isSuccess && blog) {
      formik.setValues({
        ...formik.values,
        category: [blog.category?._id],
        isPublic: blog.isPublic ? 'true' : 'false',
        isChosen: blog.isChosen,
        tags: blog?.tags?.map((item: { _id: string }) => item._id),
        thumbnailimage: blog.thumbnailimage,
        title: blog.title,
        url: blog?.url!,
        description: blog.description,
        short_des: blog.short_des,
        metaTitle: blog.metaTitle,
        metaDescription: blog.metaDescription,
        keyWords: blog.keyWords.map((item: string) => item).join(','),
        ...(blog.robots ? { robots: blog.robots } : null),
        ...(blog.canonicalurl ? { canonicalurl: blog.canonicalurl } : null),
        ...(blog.redirecturl ? { redirecturl: blog.redirecturl } : null),
        ...(blog.redirecturltype
          ? {
              redirecturltype: optionRedirectType.find(
                (item) => item.value === blog.redirecturltype
              )?.value,
            }
          : ''),
      });
    }
  }, [isSuccess]);
  return (
    <div>
      <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        {params.id === 'add' ? 'اضافه کردن بلاگ' : 'ویرایش بلاگ'}
      </p>
      <div className="mt-6 flex items-start gap-5">
        <div className="grid w-full grid-cols-2 gap-4">
          <Input
            isRequired
            label="عنوان بلاگ"
            classNameInput="!h-[48px] bg-[#f5f6f6]"
            name="title"
            className="lg:col-span-2"
            helperText={blog?.url ? blog.url : createURL(formik.values.title)}
            isAvailable={Boolean(blog?.url)}
            formik={formik}
          />

          <SeoOptions formik={formik} />

          <Select
            label="انتخاب تگ"
            options={tagsOptions}
            name="tags"
            nameLabel="title"
            nameValue="_id"
            formik={formik}
            selectionMode="multiple"
            isLoading={isPendingTag}
          />

          <Select
            label="وضعیت انتشار "
            options={StatusOptionsAdmin}
            nameLabel="label"
            nameValue="value"
            name="isPublic"
            formik={formik}
          />
          <Textarea
            isRequired
            label="توضیحات کوتاه درباره مقاله"
            classNameInput="bg-[#f5f6f6]"
            className="lg:col-span-2"
            name="short_des"
            formik={formik}
          />
          <Editor
            value={formik.values.description}
            // @ts-expect-error editor
            editorRef={editorRef}
          />
        </div>
        <div className="min-w-[350px] max-w-[350px] space-y-3 rounded-lg">
          <Media
            className="w-full"
            withModal
            onSelect={(img) => formik.setFieldValue('thumbnailimage', img)}
          >
            <div className="flex h-[250px] w-full items-center justify-center overflow-hidden rounded-xl border">
              {typeof formik.values.thumbnailimage === 'object' ? (
                <img
                  className="h-full w-full object-contain"
                  src={`${BASEURL}/${formik.values?.thumbnailimage?.url}`}
                  alt="thumbnail"
                />
              ) : (
                <p className="text-center font-regular text-lg">
                  انتخاب پوستر <span className="text-red-500">*</span>
                </p>
              )}
            </div>
          </Media>
          <SelectCategoryBlog
            onSelect={(values) => formik.setFieldValue('category', values)}
            selected={formik.values.category}
          />
          <div>
            <Checkbox
              isSelected={formik.values.isChosen}
              onValueChange={(value) => formik.setFieldValue('isChosen', value)}
              size="lg"
              classNames={{
                label: 'text-[14px] !font-regular text-[#0C0C0C]',
                wrapper: 'after:!bg-main',
              }}
            >
              آیا جز بلاگ های منتخب است؟
            </Checkbox>
          </div>
          <div className="!mt-7 flex items-center gap-3">
            <Button
              isPending={isPending}
              onClick={() => formik.handleSubmit()}
              className="bg-main text-white"
            >
              {params.id === 'add' ? 'افزودن' : 'ویرایش'}
            </Button>
            <Button onClick={() => router.back()} className="border">
              بازگشت
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
