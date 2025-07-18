'use client';
import Input from '@/components/common/form/Input';
import Textarea from '@/components/common/form/Textarea';
import Select from '@/components/common/Select';
import { optionRedirectType, StatusOptionsAdmin } from '@/lib/data';
import React, { useEffect, useRef, useState } from 'react';
import Editor from '../../../../../components/admin/common/Editor';
import Media from '@/components/admin/common/Media';
import { useParams, useRouter } from 'next/navigation';
import SelectCategoryBlog from '@/components/admin/blog/SelectCategoryBlog';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BASEURL, BASEURL_SITE } from '@/lib/variable';
import Button from '@/components/common/Button';
import { createURL, removeEmptyFields } from '@/lib/fun';
import { useGetTagsBlogAdmin } from '@/hooks/admin/blogs/useGetTagsBlogAdmin';
import { useActionMag } from '@/hooks/admin/blogs/useActionBlog';
import { useGetBlogById } from '@/hooks/admin/blogs/useGetBlogById';
import { Checkbox } from '@heroui/react';
import SeoOptions from '@/components/admin/common/SeoOptions';
import Video from 'react-player';
import { AudioPlayer } from '@/components/common/AudioPlayer';
import DownloadFile from '@/components/admin/blog/DownloadFile';
import { Delete_icon } from '@/components/common/icon';
interface InitialValues {
  tags: string[];
  readTime: string;
  isChosen: boolean;
  requiredLogin: boolean;
  url: string;
  video: { url: string; _id: string } | undefined;
  poddcast: { url: string; _id: string } | undefined;
  Published: string;
  description: string;
  category: string[];
  title: string;
  thumbnailImage: { url: string; _id: string } | undefined;
  metaTitle: string;
  metaDescription: string;
  keyWords: string;
  robots: string;
  redirecturl: string;
  redirecturltype: string;
  canonicalurl: string;
  type: string;
  shortDescription: string;
  coverVideo: { url: string; _id: string } | undefined;
  downloads: {
    title: string;
    size: string;
    url: string;
    icon: string;
  }[];
}
const Page = () => {
  const [show, setShow] = useState(false);
  const params = useParams();
  const { data: singleDataMag, isSuccess } = useGetBlogById();
  const { mutate, isPending } = useActionMag();
  const router = useRouter();

  const { data, isLoading: isPendingTag } = useGetTagsBlogAdmin({});
  const editorRef = useRef<HTMLInputElement | null>(null);
  const tagsOptions = data?.data?.data?.blogTag;
  const formik = useFormik<InitialValues>({
    initialValues: {
      downloads: [],
      shortDescription: '',
      requiredLogin: false,
      coverVideo: undefined,
      poddcast: undefined,
      video: undefined,
      tags: [],
      type: 'text',
      isChosen: false,
      url: '',
      Published: 'false',
      description: '',
      category: [],
      title: '',
      thumbnailImage: undefined,
      metaTitle: '',
      metaDescription: '',
      keyWords: '',
      robots: '',
      redirecturl: '',
      redirecturltype: '',
      canonicalurl: '',
      readTime: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('فیلد اجباری است'),
      shortDescription: Yup.string().required('فیلد اجباری است'),
      category: Yup.array().required('فیلد اجباری است'),
      // thumbnailImage: Yup.object(),
    }),
    onSubmit: (values) => {
      const formdata = {
        title: values.title,
        Published: values.Published === 'true' ? true : false,
        url: values?.url ? values?.url : createURL(values.title),
        shortDescription: values?.shortDescription,
        isChosen: values.isChosen,
        requiredLogin: values.requiredLogin,
        coverVideo: values.coverVideo?._id,
        video: values.video?._id,
        audio: values.poddcast?._id,
        readTime: values.readTime,
        type: values.type,
        downloads: values.downloads,
        // @ts-ignore
        description: editorRef.current.getContent(),
        tags: values?.tags,
        category: values.category.map((option: string) => option).join(','),
        thumbnailImage: values.thumbnailImage?._id,
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

  const blog = singleDataMag?.data?.data;

  useEffect(() => {
    if (isSuccess && singleDataMag?.data?.data) {
      formik.setValues({
        ...formik.values,
        ...blog,
        category: [blog.category?._id],
        Published: blog.Published ? 'true' : 'false',
        isChosen: blog.isChosen,
        tags: blog?.tags?.map((item: { _id: string }) => item._id),
        thumbnailImage: blog.thumbnailImage,
        video: blog.video,
        poddcast: blog.audio,
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
  const onRemoveDownloadFile = (idx: number) => {
    const updatedDownloads = [...formik.values.downloads]; // یک کپی از آرایه می‌گیریم
    updatedDownloads.splice(idx, 1); // آیتم با ایندکس مشخص رو حذف می‌کنیم
    formik.setFieldValue('downloads', updatedDownloads); // مقدار جدید رو ست می‌کنیم
  };

  return (
    <div>
      <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        {params.id === 'add' ? 'اضافه کردن بلاگ' : 'ویرایش بلاگ'}
      </p>
      <div className="mt-6 flex items-start gap-5">
        <div className="grid w-full grid-cols-2 gap-4">
          <Input
            url
            isRequired
            label="عنوان بلاگ"
            classNameInput="!h-[48px]"
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
            label="نوع بلاگ"
            options={[
              { title: 'متن', _id: 'text' },
              { title: 'ویدیو', _id: 'video' },
              { title: 'پادکست', _id: 'poddcast' },
            ]}
            name="type"
            nameLabel="title"
            nameValue="_id"
            formik={formik}
            isLoading={isPendingTag}
          />
          <Input
            label="زمان مطالعه (برحسب دقیقه)"
            classNameInput="!h-[48px]"
            name="readTime"
            type="number"
            className="lg:col-span-2"
            formik={formik}
          />
          <Select
            label="وضعیت انتشار "
            options={StatusOptionsAdmin}
            nameLabel="label"
            nameValue="value"
            name="Published"
            formik={formik}
          />
          <Textarea
            isRequired
            label="توضیحات کوتاه درباره مقاله"
            className="lg:col-span-2"
            name="shortDescription"
            formik={formik}
          />
          <Editor
            value={formik.values.description}
            // @ts-expect-error editor
            editorRef={editorRef}
          />
        </div>
        <div className="min-w-[350px] max-w-[350px] space-y-3 rounded-lg">
          <div className="rounded-lg border p-2">
            <p className="relative mb-5 pr-4 font-extrabold text-lg after:absolute after:right-0 after:h-full after:w-1 after:rounded-bl-full after:rounded-tl-full after:bg-main">
              فایل دانلود‌ها
            </p>
            <div className="grid grid-cols-3 gap-3">
              <Button onClick={() => setShow(true)} className="h-[100px] min-w-fit border">
                فایل جدید
              </Button>
              {formik.values.downloads.map((item, idx) => (
                <div
                  key={idx}
                  className="relative flex h-[100px] min-w-fit items-center justify-center rounded-xl border"
                >
                  <img src={`${item.icon}`} />
                  <Button
                    onClick={() => onRemoveDownloadFile(idx)}
                    className="absolute left-0 top-0 flex h-10 w-10 min-w-fit items-center justify-center border bg-white"
                  >
                    <Delete_icon />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <Media
            title="انتخاب پوستر"
            className="w-full"
            withModal
            onSelect={(img) => formik.setFieldValue('thumbnailImage', img)}
          >
            <div className="flex h-[250px] w-full items-center justify-center overflow-hidden rounded-xl border">
              {typeof formik.values.thumbnailImage === 'object' ? (
                <img
                  className="h-full w-full object-contain"
                  src={`${BASEURL}/${formik.values?.thumbnailImage?.url}`}
                  alt="thumbnail"
                />
              ) : (
                <p className="text-center font-regular text-lg">
                  انتخاب پوستر <span className="text-red-500">*</span>
                </p>
              )}
            </div>
          </Media>
          {formik.values.type === 'video' ? (
            <>
              <Media
                className="w-full"
                withModal
                onSelect={(img) => formik.setFieldValue('video', img)}
              >
                <div className="flex h-[250px] w-full items-center justify-center overflow-hidden rounded-xl border">
                  {typeof formik.values.video === 'object' ? (
                    <Video
                      width={'100%'}
                      height={'100%'}
                      controls
                      url={`${BASEURL}/${formik.values?.video?.url}`}
                    />
                  ) : (
                    <p className="text-center font-regular text-lg">انتخاب ویدیو</p>
                  )}
                </div>
              </Media>
              <Media
                className="w-full"
                withModal
                title="انتخاب کاور ویدیو"
                onSelect={(img) => formik.setFieldValue('coverVideo', img)}
              >
                <div className="flex h-[250px] w-full items-center justify-center overflow-hidden rounded-xl border">
                  {typeof formik.values.coverVideo === 'object' ? (
                    <img
                      className="h-full w-full object-contain"
                      src={`${BASEURL}/${formik.values?.coverVideo?.url}`}
                      alt="thumbnail"
                    />
                  ) : (
                    <p className="text-center font-regular text-lg">انتخاب کاور ویدیو</p>
                  )}
                </div>
              </Media>
            </>
          ) : null}
          {formik.values.type === 'poddcast' ? (
            <>
              <Media
                className="w-full"
                withModal
                onSelect={(img) => formik.setFieldValue('poddcast', img)}
              >
                <div className="flex h-[250px] w-full items-center justify-center overflow-hidden rounded-xl border">
                  {typeof formik.values.poddcast === 'object' ? (
                    <AudioPlayer src={`${BASEURL}/${formik.values?.poddcast?.url}`} />
                  ) : (
                    <p className="text-center font-regular text-lg">انتخاب پادکست</p>
                  )}
                </div>
              </Media>
            </>
          ) : null}
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
            <Checkbox
              isSelected={formik.values.requiredLogin}
              onValueChange={(value) => formik.setFieldValue('requiredLogin', value)}
              size="lg"
              classNames={{
                label: 'text-[14px] !font-regular text-[#0C0C0C]',
                wrapper: 'after:!bg-main',
              }}
            >
              آیا برای دانلود فایل ها، نیاز به لاگین دارد؟
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
      <DownloadFile
        onSubmit={(values) =>
          formik.setFieldValue('downloads', [...formik.values.downloads, values])
        }
        show={show}
        setShow={setShow}
      />
    </div>
  );
};

export default Page;
