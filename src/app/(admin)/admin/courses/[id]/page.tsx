'use client';
import Editor from '@/components/admin/common/Editor';
import Media from '@/components/admin/common/Media';
import SeoOptions from '@/components/admin/common/SeoOptions';
import DemoCourse from '@/components/admin/courses/DemoCourse';
import SelectCategoryCourse from '@/components/admin/courses/SelectCategoryCourse';
import SelectChaptersCourse from '@/components/admin/courses/SelectChaptersCourse';
import SelectDemoCourse from '@/components/admin/courses/SelectDemoCourse';
import GeneralProduct from '@/components/admin/product/GeneralProduct';
import SelectProductTag from '@/components/admin/product/SelectProductTag';
import SelectPropertyModal from '@/components/admin/product/SelectPropertModal';
import Button from '@/components/common/Button';
import Input from '@/components/common/form/Input';
import IsClient from '@/components/common/IsClient';
import Select from '@/components/common/Select';
import { useActionCourseAdmin } from '@/hooks/admin/courses/useActionCourseAdmin';
import { useGetCourseById } from '@/hooks/admin/courses/useGetCourseById';
import { converDateGre, converDatePer, removeNumNumeric } from '@/lib/convert';
import { StatusOptionsAdmin } from '@/lib/data';
import { createURL, generateRandomString, removeEmptyFields } from '@/lib/fun';
import { getMediaType } from '@/lib/utils';
import { BASEURL } from '@/lib/variable';
import { Chip, Tab, Tabs } from '@heroui/react';
import { useFormik } from 'formik';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Video from 'next-video';
const initialValues = {
  title: '',
  type: '',
  canonicalurl: '',
  url: '',
  description: '',
  thumbnailImage: undefined,
  coverVideo: undefined,
  video: undefined,
  galleryImage: [],
  tags: [],
  properties: [],
  variables: [],
  category: [],
  categories: [],
  price: '',
  discountPrice: '',
  discountTime: '',
  count: 1,
  published: 'false',
  rozeBox: '',
  metaTitle: '',
  metaDescription: '',
  keyWords: '',
  variablesAttribiutes: [],
  robots: '',
  redirecturltype: '',
  redirecturl: '',
  demo: [],
  chapters: [],
};
const mapProductToFormValues = (product: any) => ({
  title: product.title || '',
  type: product.type || '',
  canonicalurl: product.canonicalurl || '',
  url: product.url || '',
  enTitle: product.enTitle || '',
  description: product.description || '',
  thumbnailImage: product.thumbnailImage || undefined,
  coverVideo: product.coverVideo || undefined,
  video: product.video || undefined,
  tags: product.tags || [],
  properties: product?.properties,
  category: product?.category?._id ? [product.category._id] : [],
  categories: product.categories.map((item: { _id: string }) => item._id) || [],
  price: product.price?.toString() || '',
  discountPrice: product.discountPrice?.toString() || '',
  discountTime: converDatePer(product.discountTime) || '',
  count: product.count || 1,
  published: product.published ? 'true' : 'false',
  metaTitle: product.metaTitle || '',
  metaDescription: product.metaDescription || '',
  keyWords: product.keyWords || '',
  robots: product.robots || '',
  redirecturltype: product.redirecturltype || '',
  redirecturl: product.redirecturl || '',
  demo: product?.demo,
  chapters: product?.chapters,
});

const Page = () => {
  const [showDemoProductModal, setShowDemoProductModal] = useState(false);
  const { id }: { id: string } = useParams();
  const { data: singleProduct, isSuccess, isFetching } = useGetCourseById();
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useActionCourseAdmin();
  const editorRef = useRef<HTMLInputElement | null>(null);
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      const data = {
        ...values,
        discountTime: converDateGre(values.discountTime),
        published: values.published === 'false' ? false : true,
        // @ts-expect-error error
        thumbnailImage: values?.thumbnailImage?._id!,
        // @ts-expect-error error
        video: values?.video?._id!,
        // @ts-expect-error error
        coverVideo: values?.coverVideo?._id!,
        // @ts-expect-error error
        galleryImage: values?.galleryImage?.map((item) => item._id),
        // @ts-expect-error error
        tags: values?.tags.map((item) => item._id),
        ...(Array.isArray(values?.category) ? { category: values?.category[0] } : null),
        categories: values?.categories,
        price: +removeNumNumeric(values.price),
        discountPrice: +removeNumNumeric(values.discountPrice),
        count: Number(values.count),
        // @ts-expect-error error
        description: editorRef?.current?.getContent(),
        properties: values?.properties,
        demo: values.demo.map((item: any) => {
          return {
            title: item.title,
            order: Number(item.order),
            episodes: item.episodes.map((episode: any) => {
              return {
                title: episode.title,
                order: Number(episode.order),
                type: getMediaType(episode?.mediaUrl ? episode?.mediaUrl : episode.media.url),
                mediaUrl: episode?.mediaUrl
                  ? episode?.mediaUrl
                  : `${BASEURL}/${episode?.media?.url}`,
              };
            }),
          };
        }),
        chapters: values.chapters.map((item: any) => {
          return {
            title: item.title,
            order: Number(item.order),
            lessons: item.lessons,
            duration: item.duration,
            episodes: item.episodes.map((episode: any) => {
              return {
                title: episode.title,
                order: Number(episode.order),
                duration: episode.duration,
              };
            }),
          };
        }),
      };
      // add and update product
      mutate({ data: removeEmptyFields(data), id: id! });
      // add and update cariable product
    },
  });
  const product = singleProduct?.data?.data;

  useEffect(() => {
    if (isSuccess) {
      if (product) {
        // @ts-expect-error error
        formik.setValues(mapProductToFormValues(product));
      }
    }
  }, [isSuccess, singleProduct, isFetching]);

  const handleAddVariableProduct = () => {
    const newProductId = generateRandomString();
    // اضافه کردن مقدار جدید به فرمیک
    formik.setFieldValue('demo', [
      {
        productId: newProductId,
        mainVariableProperty: false,
      },
      ...(formik.values.demo || []),
    ]);
  };
  const handleAddChaptersProduct = () => {
    const newProductId = generateRandomString();
    // اضافه کردن مقدار جدید به فرمیک
    formik.setFieldValue('chapters', [
      {
        productId: newProductId,
        mainVariableProperty: false,
      },
      ...(formik.values.chapters || []),
    ]);
  };

  console.log(formik.values);
  return (
    <IsClient>
      <div>
        <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
          ایجاد محصول
        </p>
        <div className="mt-10">
          <div className="flex items-start gap-5">
            <div className="flex-1 space-y-3">
              <Input
                isRequired
                label="عنوان محصول"
                classNameInput="!h-[48px] bg-[#f5f6f6]"
                name="title"
                className="lg:col-span-2"
                url
                helperText={product?.url ? product?.url : createURL(formik.values.title)}
                isAvailable={Boolean(product?.url)}
                formik={formik}
              />

              <Select
                label="وضعیت انتشار "
                options={StatusOptionsAdmin}
                nameLabel="label"
                nameValue="value"
                name="published"
                formik={formik}
              />
              <Select
                label="نوع محصول"
                options={[
                  { label: 'حضوری', value: 'inPerson' },
                  { label: 'آنلاین', value: 'virtual' },
                ]}
                nameLabel="label"
                nameValue="value"
                name="type"
                formik={formik}
              />
              <SelectProductTag
                title="انتخاب تگ"
                onChange={(values) => formik.setFieldValue('tags', values)}
                values={formik.values.tags}
              />

              <SeoOptions formik={formik} />
              <Editor
                value={formik.values.description}
                // @ts-expect-error error
                editorRef={editorRef!}
              />
              <div className="!mt-10 border-b">
                <p className="font-bold">لطفا ویژگی ها و اتریبیوت های محصول را انتخاب کنید</p>
                {/* property */}
                <div className="my-5 flex flex-wrap gap-3 !font-regular">
                  <Chip
                    onClick={() => setOpen(!open)}
                    color="success"
                    variant="shadow"
                    className="cursor-pointer"
                  >
                    مشاهده ویژگی
                  </Chip>
                  {formik?.values?.properties?.map((item) => (
                    <Chip
                      onClick={() => setOpen(!open)}
                      color="warning"
                      variant="shadow"
                      className="relative cursor-pointer"
                    >
                      {/* @ts-expect-error ERROR */}
                      {item.property}: {item.attribiute}
                    </Chip>
                  ))}
                </div>
              </div>
              <Tabs
                variant="underlined"
                classNames={{
                  base: 'w-full flex !mt-10 flex-col',
                  tabList:
                    'gap-4 sm:gap-6 w-full font-regular relative rounded-none p-0 border-b border-divider',
                  cursor: 'w-full h-[1.3px] bg-main',
                  tab: 'max-w-full !text-[12px] text-[#616A76] lg:!text-[18px] px-0 h-10 lg:h-14',
                  tabContent: 'group-data-[selected=true]:text-[#0C0C0C]',
                }}
              >
                <Tab key={'1'} title={<p>محصول ساده</p>}>
                  <GeneralProduct formik={formik}>
                    <Button
                      isLoading={isPending}
                      className="col-span-2 !mt-8 bg-main text-white"
                      onClick={() => formik.handleSubmit()}
                    >
                      {id === 'new' ? 'ثبت محصول' : 'ویرایش محصول'}
                    </Button>
                  </GeneralProduct>
                </Tab>
                <Tab key={'2'} title={<p>دمو </p>}>
                  <div>
                    {
                      <>
                        <div className="flex items-center justify-between gap-10 border-b pb-4">
                          <Button
                            onClick={handleAddVariableProduct}
                            className="mt-6 w-[120px] bg-orange-400 text-white"
                          >
                            افزودن
                          </Button>
                        </div>

                        {formik.values?.demo?.map((product, idx) => {
                          if (!product) return null;
                          return (
                            <SelectDemoCourse
                              product={product}
                              idx={idx}
                              key={idx}
                              // @ts-expect-error error
                              formik={formik}
                            />
                          );
                        })}
                      </>
                    }
                  </div>
                </Tab>
                <Tab key={'3'} title={<p>فصل‌ها</p>}>
                  <div>
                    {
                      <>
                        <div className="flex items-center justify-between gap-10 border-b pb-4">
                          <Button
                            onClick={handleAddChaptersProduct}
                            className="mt-6 w-[120px] bg-orange-400 text-white"
                          >
                            افزودن
                          </Button>
                        </div>

                        {formik.values?.chapters?.map((product, idx) => {
                          if (!product) return null;
                          return (
                            <SelectChaptersCourse
                              product={product}
                              idx={idx}
                              key={idx}
                              // @ts-expect-error error
                              formik={formik}
                            />
                          );
                        })}
                      </>
                    }
                  </div>
                </Tab>
              </Tabs>
            </div>
            <div className="flex !w-[400px] min-w-[400px] flex-col gap-4 rounded-lg border p-3">
              <Media
                title="تصویر محصول"
                className="w-full"
                withModal
                onSelect={(img) => formik.setFieldValue('thumbnailImage', img)}
              >
                <div className="flex h-[250px] w-full items-center justify-center overflow-hidden rounded-xl border">
                  {typeof formik.values.thumbnailImage === 'object' ? (
                    <img
                      className="h-full w-full object-contain"
                      // @ts-expect-error error
                      src={`${BASEURL}/${formik.values?.thumbnailImage?.url}`}
                      alt="thumbnail"
                    />
                  ) : (
                    <p className="text-center font-regular text-lg">
                      انتخاب تصویر محصول <span className="text-red-500">*</span>
                    </p>
                  )}
                </div>
              </Media>
              <Media
                title="پوستر ویدیو"
                className="w-full"
                withModal
                onSelect={(img) => formik.setFieldValue('coverVideo', img)}
              >
                <div className="flex h-[250px] w-full items-center justify-center overflow-hidden rounded-xl border">
                  {typeof formik.values.coverVideo === 'object' ? (
                    <img
                      className="h-full w-full object-contain"
                      // @ts-expect-error error
                      src={`${BASEURL}/${formik.values?.coverVideo?.url}`}
                      alt="thumbnail"
                    />
                  ) : (
                    <p className="text-center font-regular text-lg">
                      انتخاب پوستر ویدیو <span className="text-red-500">*</span>
                    </p>
                  )}
                </div>
              </Media>
              <Media
                title="ویدیو محصول"
                className="w-full"
                withModal
                onSelect={(img) => formik.setFieldValue('video', img)}
              >
                <div className="flex h-[250px] w-full items-center justify-center overflow-hidden rounded-xl border">
                  {typeof formik.values.video === 'object' ? (
                    // @ts-expect-error error G
                    <Video autoPlay src={`${BASEURL}/${formik?.values?.video?.url}`} />
                  ) : (
                    <p className="text-center font-regular text-lg">
                      انتخاب ویدیو محصول <span className="text-red-500">*</span>
                    </p>
                  )}
                </div>
              </Media>

              <SelectCategoryCourse
                title="دسته بندی محصول پیش فرض"
                selected={formik.values.category}
                onSelect={(values) => formik.setFieldValue('category', values)}
              />
              <SelectCategoryCourse
                multiple
                title="دسته بندی محصول"
                selected={formik.values.categories}
                onSelect={(values) => formik.setFieldValue('categories', values)}
              />
            </div>
          </div>
        </div>
      </div>
      {open && <SelectPropertyModal formik={formik} open={open} setOpen={setOpen} />}
      {showDemoProductModal && (
        <DemoCourse open={showDemoProductModal} setOpen={setShowDemoProductModal} />
      )}
    </IsClient>
  );
};

export default Page;
