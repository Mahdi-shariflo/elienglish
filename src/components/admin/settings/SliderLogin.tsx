import Input from '@/components/common/form/Input';
import Textarea from '@/components/common/form/Textarea';
import { useFormik, FormikHelpers } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Media from '../common/Media';
import { BASEURL } from '@/lib/variable';
import Button from '@/components/common/Button';
import { useActionSetting } from '@/hooks/admin/settings/useActionSetting';
import { useGetSetting } from '@/hooks/admin/settings/useGetSetting';
// ✅ تعریف نوع داده‌ی هر اسلاید
interface SlideItem {
  order: string | number;
  title: string;
  description: string;
  btnText: string;
  btnLink: string;
  imageUrl?: undefined | string;
}
const validationSchema = Yup.object({
  order: Yup.string().required('شماره‌گذاری الزامی است'),
  title: Yup.string().required('عنوان الزامی است'),
  description: Yup.string().required('توضیحات الزامی است'),
  btnText: Yup.string().required('متن دکمه الزامی است'),
  btnLink: Yup.string().required('لینک دکمه الزامی است'),
});
const SliderLogin: React.FC = () => {
  const { data, isSuccess } = useGetSetting();
  const { mutate, isPending } = useActionSetting();
  const [loginPageSlider, setLoginPageSlider] = useState<SlideItem[]>([]);

  const formik = useFormik<SlideItem>({
    initialValues: {
      imageUrl: undefined,
      order: '',
      title: '',
      description: '',
      btnText: '',
      btnLink: '',
    },
    validationSchema,
    onSubmit: (values: SlideItem, { resetForm }: FormikHelpers<SlideItem>) => {
      setLoginPageSlider((prev) => [...prev, values]);
      resetForm();
    },
  });

  const handleFinalSubmit = () => {
    const mainData = loginPageSlider.map((item) => {
      return {
        // @ts-expect-error error
        imageUrl: typeof item?.imageUrl === 'object' ? item.imageUrl?.url : item.imageUrl,
        order: Number(item.order),
        title: item.title,
        description: item.description,
        btnText: item.btnText,
        btnLink: item.btnLink,
      };
    });
    mutate({ data: { loginPageSlider: mainData } });
  };

  const handleRemoveSlide = (indexToRemove: number) => {
    setLoginPageSlider((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    if (isSuccess) {
      const loginSlider = data?.data?.data?.loginPageSlider;
      setLoginPageSlider(loginSlider);
    }
  }, [isSuccess]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="mt-4 grid grid-cols-3 gap-3">
        <Media
          title="انتخاب عکس"
          container_class="col-span-3"
          className="!col-span-3 w-full"
          withModal
          onSelect={(img) => formik.setFieldValue('imageUrl', img)}
        >
          <div className="flex h-[250px] w-full items-center justify-center overflow-hidden rounded-xl border">
            {typeof formik.values.imageUrl === 'object' ? (
              <img
                className="h-full w-full object-contain"
                // @ts-expect-error error
                src={`${BASEURL}/${formik.values?.imageUrl?.url}`}
                alt="thumbnail"
              />
            ) : (
              <p className="text-center font-regular text-lg">
                انتخاب پوستر <span className="text-red-500">*</span>
              </p>
            )}
          </div>
        </Media>
        <Input label="شماره گذاری" formik={formik} name="order" />
        <Input label="عنوان" formik={formik} name="title" />
        <Input label="متن دکمه" formik={formik} name="btnText" />
        <Textarea className="col-span-3" label="توضیحات" formik={formik} name="description" />
        <Input label="لینک دکمه" formik={formik} name="btnLink" />
        <button type="submit" className="mt-8 !h-[52px] rounded bg-blue-600 px-4 text-white">
          افزودن به لیست
        </button>
      </form>

      {loginPageSlider.length > 0 && (
        <div className="mt-10 space-y-6">
          <h2 className="font-bold text-xl">لیست اسلایدها:</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loginPageSlider.map((slide, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl border bg-white shadow transition-all hover:shadow-lg"
              >
                {/* حذف */}
                <button
                  onClick={() => handleRemoveSlide(index)}
                  className="absolute right-2 top-2 z-10 rounded-full bg-red-500 px-2 py-1 text-xs text-white transition hover:bg-red-600"
                >
                  حذف
                </button>

                <div className="flex h-48 items-center justify-center overflow-hidden bg-gray-100">
                  {typeof slide.imageUrl === 'object' ? (
                    <img
                      // @ts-expect-error error
                      src={`${BASEURL}/${slide.imageUrl.url}`}
                      alt={slide.title}
                      className="h-full w-full object-cover"
                    />
                  ) : typeof slide.imageUrl === 'string' ? (
                    <img
                      src={`${BASEURL}/${slide.imageUrl}`}
                      alt={slide.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-sm text-gray-400">بدون تصویر</span>
                  )}
                </div>

                <div className="space-y-1 p-4 text-sm">
                  <p>
                    <span className="font-demibold">شماره:</span> {slide.order}
                  </p>
                  <p>
                    <span className="font-demibold">عنوان:</span> {slide.title}
                  </p>
                  <p>
                    <span className="font-demibold">توضیح:</span> {slide.description}
                  </p>
                  <p>
                    <span className="font-demibold">متن دکمه:</span> {slide.btnText}
                  </p>
                  <p>
                    <span className="font-demibold">لینک دکمه:</span>{' '}
                    <a
                      href={slide.btnLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {slide.btnLink}
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              isPending={isPending}
              onClick={handleFinalSubmit}
              className="mt-4 inline-block rounded bg-main px-8 py-2 text-white transition hover:bg-green-700"
            >
              ثبت تغییرات
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SliderLogin;
