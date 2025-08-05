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
import { Accordion, AccordionItem, Chip, Tab, Tabs } from '@heroui/react';
import { useFormik } from 'formik';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Video from 'next-video';
import Title from '@/components/common/Title';
import SelectPropertyCourseModal from '@/components/admin/courses/SelectPropertyCourseModal';
import { useGetCategoriesFaqAdmin } from '@/hooks/admin/faq/useGetCategoriesFaqAdmin';
import Textarea from '@/components/common/form/Textarea';
import Checkbox from '@/components/common/form/Checkbox';
import SelectCourseTag from '@/components/admin/courses/SelectCourseTag';
import VideoPlayer from '@/components/admin/common/VideoPlayer';
const initialValues = {
  title: '',
  faqIdCat: '',
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
  shortTitle: '',
  discountTime: '',
  count: 1,
  published: 'false',
  rozeBox: '',
  metaTitle: '',
  metaDescription: '',
  keyWords: '',
  variablesAttribiutes: [],
  robots: '',
  redirectType: '',
  redirecturl: '',
  demo: [],
  installmentPrice: '',
  installmentCount: '',
  isInstallment: false,
  chapters: [],
  short_des: '',
  btnCourse: {
    title: '',
    href: '',
  },
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
  redirectType: product.redirectType || '',
  redirecturl: product.redirecturl || '',
  faqIdCat: product.faqIdCat || '',
  shortTitle: product.shortTitle || '',
  short_des: product.short_des || '',
  demo: product?.demo,
  chapters: product?.chapters,
  btnCourse: product?.btnCourse,
  installmentPrice: product?.installmentPrice,
  installmentCount: product?.installmentCount,
  isInstallment: product?.isInstallment,
});

const Page = () => {
  const { data: dataCategoryFaq, isLoading } = useGetCategoriesFaqAdmin({});
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
        installmentPrice: +removeNumNumeric(values.installmentPrice),
        count: Number(values.count),
        installmentCount: Number(values.installmentCount),
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
                type: episode.type ?? 'video',
                video: episode.video,
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

  return (
    <IsClient>
      <div>
        <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
          ایجاد دوره
        </p>
        <div className="mt-10">
          <div className="flex items-start gap-5">
            <div className="flex-1 space-y-3">
              <Input
                isRequired
                label="عنوان دوره"
                classNameInput="!h-[48px] bg-[#f5f6f6]"
                name="title"
                className="lg:col-span-2"
                url
                helperText={product?.url ? product?.url : createURL(formik.values.title)}
                isAvailable={Boolean(product?.url)}
                formik={formik}
              />
              <Input
                isRequired
                label="عنوان کوتاه"
                classNameInput="!h-[48px] bg-[#f5f6f6]"
                name="shortTitle"
                className="lg:col-span-2"
                formik={formik}
              />
              <div className="flex items-center gap-4">
                <Input
                  value={formik.values?.btnCourse?.title}
                  label="عنوان دکمه لینک تلگرام برای دوره"
                  classNameInput="!h-[48px] bg-[#f5f6f6]"
                  name="btnCourse.title"
                  className="lg:col-span-2"
                  formik={formik}
                />
                <Input
                  value={formik.values?.btnCourse?.href}
                  label="آدرس لینک تلگرامی"
                  classNameInput="!h-[48px] bg-[#f5f6f6]"
                  name="btnCourse.href"
                  className="lg:col-span-2"
                  formik={formik}
                />
              </div>
              <Textarea
                isRequired
                label="توضیحات کوتاه"
                classNameInput=" bg-[#f5f6f6]"
                name="short_des"
                className="lg:col-span-2"
                formik={formik}
              />
              <Select
                label="دسته بندی سوالات"
                options={dataCategoryFaq?.data?.data?.category}
                nameLabel="title"
                nameValue="_id"
                name="faqIdCat"
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
                label="نوع دوره"
                options={[
                  { label: 'حضوری', value: 'inPerson' },
                  { label: 'آنلاین', value: 'virtual' },
                ]}
                nameLabel="label"
                nameValue="value"
                name="type"
                formik={formik}
              />

              <SelectCourseTag
                title="انتخاب تگ"
                onChange={(values) => formik.setFieldValue('tags', values)}
                values={formik.values.tags}
              />
              <Accordion>
                <AccordionItem
                  classNames={{
                    base: 'border-b border-gray-200',
                    title: 'font-medium',
                  }}
                  title="اقساط"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label={'تعداد اقساط'}
                      type="number"
                      formik={formik}
                      name="installmentCount"
                    />
                    <Input label={'مبلغ اقساط'} price formik={formik} name="installmentPrice" />
                    <Checkbox
                      className="col-span-2"
                      label="خرید با اقساط؟"
                      // @ts-expect-error error
                      formik={formik}
                      name="isInstallment"
                    />
                  </div>
                </AccordionItem>
              </Accordion>

              <SeoOptions formik={formik} />
              <Editor
                value={formik.values.description}
                // @ts-expect-error error
                editorRef={editorRef!}
              />
              <div className="!mt-10 border-b">
                <p className="font-bold">لطفا ویژگی ها و اتریبیوت های دوره را انتخاب کنید</p>
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
              <div className="flex min-h-[60vh] flex-col justify-between">
                <div className="flex-1">
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
                    <Tab key={'1'} title={<p>دوره ساده</p>}>
                      <GeneralProduct formik={formik}></GeneralProduct>
                    </Tab>
                    <Tab key={'2'} title={<p>دمو </p>}>
                      <div>
                        {
                          <>
                            <div className="flex items-center justify-between gap-10 border-b pb-4">
                              <Title title="دموی رایگان" />
                              <Button
                                onClick={handleAddVariableProduct}
                                className="w-[120px] border text-black"
                              >
                                افزودن دمو
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
                              <Title title="فصل دوره‌ها" />
                              <Button
                                onClick={handleAddChaptersProduct}
                                className="w-[120px] border text-black"
                              >
                                افزودن فصل جدید
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
                <Button
                  isLoading={isPending}
                  className="col-span-2 !mt-8 bg-main text-white"
                  onClick={() => formik.handleSubmit()}
                >
                  {id === 'new' ? 'ثبت دوره' : 'ویرایش دوره'}
                </Button>
              </div>
            </div>
            <div className="flex !w-[400px] min-w-[400px] flex-col gap-4 rounded-lg border p-3">
              <Media
                title="تصویر دوره"
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
                      انتخاب تصویر دوره <span className="text-red-500">*</span>
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
                title="ویدیو دوره"
                className="w-full"
                withModal
                onSelect={(img) => formik.setFieldValue('video', img)}
              >
                <div className="flex w-full items-center justify-center overflow-hidden rounded-xl border">
                  {typeof formik.values.video === 'object' ? (
                    // @ts-expect-error error G
                    <VideoPlayer url={`${BASEURL}/${formik?.values?.video?.url}`} />
                  ) : (
                    <p className="text-center font-regular text-lg">
                      انتخاب ویدیو دوره <span className="text-red-500">*</span>
                    </p>
                  )}
                </div>
              </Media>

              <SelectCategoryCourse
                title="دسته بندی دوره پیش فرض"
                selected={formik.values.category}
                onSelect={(values) => formik.setFieldValue('category', values)}
              />
              <SelectCategoryCourse
                multiple
                title="دسته بندی دوره"
                selected={formik.values.categories}
                onSelect={(values) => formik.setFieldValue('categories', values)}
              />
            </div>
          </div>
        </div>
      </div>
      {open && <SelectPropertyCourseModal formik={formik} open={open} setOpen={setOpen} />}
      {showDemoProductModal && (
        <DemoCourse open={showDemoProductModal} setOpen={setShowDemoProductModal} />
      )}
    </IsClient>
  );
};

export default Page;
