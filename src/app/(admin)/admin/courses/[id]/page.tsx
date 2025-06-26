'use client';
import Editor from '@/components/admin/common/Editor';
import Media from '@/components/admin/common/Media';
import SeoOptions from '@/components/admin/common/SeoOptions';
import SelectCategoryCourse from '@/components/admin/courses/SelectCategoryCourse';
import GeneralProduct from '@/components/admin/product/GeneralProduct';
import SelectAttVariableProduct from '@/components/admin/product/SelectAttVariableProduct';
import SelectProductTag from '@/components/admin/product/SelectProductTag';
import SelectPropertyModal from '@/components/admin/product/SelectPropertModal';
import VariableProductModal from '@/components/admin/product/VariableProductModal';
import Button from '@/components/common/Button';
import Input from '@/components/common/form/Input';
import IsClient from '@/components/common/IsClient';
import Select from '@/components/common/Select';
import { useActionProductAdmin } from '@/hooks/admin/products/useActionProductAdmin';
import { useActionVariable } from '@/hooks/admin/products/useActionVariable';
import { useGetProductById } from '@/hooks/admin/products/useGetProductById';
import { converDateGre, converDatePer, removeNumNumeric } from '@/lib/convert';
import { StatusOptionsAdmin } from '@/lib/data';
import { createURL, generateRandomString, removeEmptyFields } from '@/lib/fun';
import { BASEURL } from '@/lib/variable';
import { Chip, Tab, Tabs } from '@heroui/react';
import { useFormik } from 'formik';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CgClose } from 'react-icons/cg';
const initialValues = {
  title: '',
  type: '',
  canonicalurl: '',
  url: '',
  enTitle: '',
  description: '',
  thumbnailImage: undefined,
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
  children: [],
};
const mapProductToFormValues = (product: any) => ({
  title: product.title || '',
  type: product.type || '',
  canonicalurl: product.canonicalurl || '',
  url: product.url || '',
  enTitle: product.enTitle || '',
  description: product.description || '',
  thumbnailImage: product.thumbnailImage || undefined,
  galleryImage: product.galleryImage || [],
  tags: product.tags || [],
  properties: product?.properties,
  variables: product.variables || [],
  category: product?.category?._id ? [product.category._id] : [],
  categories: product.categories || [],
  price: product.price?.toString() || '',
  discountPrice: product.discountPrice?.toString() || '',
  discountTime: converDatePer(product.discountTime) || '',
  count: product.count || 1,
  published: product.published ? 'true' : 'false',
  metaTitle: product.metaTitle || '',
  metaDescription: product.metaDescription || '',
  keyWords: product.keyWords || '',
  variablesAttribiutes: product.variablesAttribiutes || [],
  robots: product.robots || '',
  redirecturltype: product.redirecturltype || '',
  redirecturl: product.redirecturl || '',
  children: product?.children,
});

const Page = () => {
  const [showVariableProductModal, setShowVariableProductModal] = useState(false);
  const [selected, setSelected] = useState('1');
  const { mutate: mutateVariable, isPending: isPendingVariable } = useActionVariable();
  const { id }: { id: string } = useParams();
  const { data: singleProduct, isSuccess, isFetching } = useGetProductById();
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useActionProductAdmin();
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
        galleryImage: values?.galleryImage?.map((item) => item._id),
        // @ts-expect-error error
        tags: values?.tags.map((item) => item._id),
        category: values?.category,
        categories: values?.categories,
        price: +removeNumNumeric(values.price),
        discountPrice: +removeNumNumeric(values.discountPrice),
        count: Number(values.count),
        // @ts-expect-error error
        description: editorRef?.current?.getContent(),
        properties: values?.properties,
      };
      // add and update product
      mutate({ data: removeEmptyFields(data), id: id! });
      // add and update cariable product
      if (values.children.length >= 1) {
        values?.children?.map((varible: any) =>
          mutateVariable({
            data: {
              ...varible,
              parent: id!,
              thumbnailImage: varible?.thumbnailImage?._id,
              title: `${formik.values.title} (${varible.title})`,
              url: generateRandomString(),
              urlVar: `${formik.values?.url}`,
              price: +removeNumNumeric(varible.price),
              suggestedDiscount: +removeNumNumeric(varible.suggestedDiscount),
              minCart: +removeNumNumeric(varible.minCart),
              count: Number(varible.count),
              published: varible.published === 'false' ? false : true,
            },
            id: varible._id!,
          })
        );
      }
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

  const onSelectionChange = (key: string) => {
    if (key === '2' && id === 'new') {
      setShowVariableProductModal(true);
      return;
    }
    setSelected(key);
  };
  const handleAddVariableProduct = () => {
    const newProductId = generateRandomString();
    // اضافه کردن مقدار جدید به فرمیک
    formik.setFieldValue('children', [
      {
        productId: newProductId,
        mainVariableProperty: false,
      },
      ...(formik.values.children || []),
    ]);
  };
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

              <Input
                isRequired
                label="عنوان انگلیسی"
                classNameInput="!h-[48px] bg-[#f5f6f6]"
                name="enTitle"
                className="lg:col-span-2"
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
                  { label: 'فیزیکی', value: 'physical' },
                  { label: 'دیجیتال', value: 'digital' },
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
                selectedKey={selected}
                // @ts-expect-error error
                onSelectionChange={onSelectionChange}
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
                <Tab key={'2'} title={<p>محصول متغیر</p>}>
                  <div>
                    {
                      <>
                        <div className="flex items-center justify-between border-b pb-4">
                          <Button
                            onClick={handleAddVariableProduct}
                            className="w-[120px] bg-orange-400 text-white"
                          >
                            افزودن محصول
                          </Button>
                        </div>

                        {formik.values?.children?.map((product, idx) => {
                          if (!product) return null;
                          return (
                            <SelectAttVariableProduct
                              product={product}
                              idx={idx}
                              key={idx}
                              // @ts-expect-error error
                              formik={formik}
                            />
                          );
                        })}
                        <Button
                          onClick={formik.handleSubmit}
                          isLoading={isPending || isPendingVariable}
                          className="col-span-2 !mt-8 bg-main text-white"
                        >
                          ثبت محصول متغیر
                        </Button>
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
              {/* <Media
                title="ویدیو محصول"
                className="w-full"
                withModal
                onSelect={(img) => formik.setFieldValue('video', img)}
              >
                <div className="flex h-[250px] w-full items-center justify-center overflow-hidden rounded-xl border">
                  {typeof formik.values.video === 'object' ? (
                    <Video autoPlay src={`${BASEURL}/${formik?.values?.video?.url}`} />
                  ) : (
                    <p className="text-center font-regular text-lg">
                      انتخاب ویدیو محصول <span className="text-red-500">*</span>
                    </p>
                  )}
                </div>
              </Media> */}
              <Media
                title="گالری محصول"
                className="w-full"
                withModal
                multiple
                onSelect={(img) =>
                  formik.setFieldValue('galleryImage', [
                    ...formik.values.galleryImage,
                    // @ts-expect-error array
                    ...img,
                  ])
                }
              >
                <div className="flex flex-wrap gap-3 overflow-hidden">
                  <p className="flex h-[90px] w-[90px] items-center justify-center rounded-xl border text-center font-regular text-[12px]">
                    انتخاب عکس
                  </p>
                  {formik.values.galleryImage.length >= 1 &&
                    formik.values.galleryImage.map((item, idx) => (
                      <span className="relative">
                        <img
                          key={idx}
                          className="h-[90px] w-[90px] rounded-xl border object-contain"
                          // @ts-expect-error error
                          src={`${BASEURL}/${item?.url}`}
                          alt="thumbnail"
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            const newImages = formik.values.galleryImage.filter(
                              (_, i) => i !== idx
                            );
                            formik.setFieldValue('galleryImage', newImages);
                          }}
                          className="absolute left-0 top-0 !h-fit !w-fit min-w-fit rounded-br-full rounded-tr-full border !p-1"
                        >
                          <CgClose />
                        </Button>{' '}
                      </span>
                    ))}
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
      {showVariableProductModal && (
        <VariableProductModal
          open={showVariableProductModal}
          setOpen={setShowVariableProductModal}
        />
      )}
    </IsClient>
  );
};

export default Page;
