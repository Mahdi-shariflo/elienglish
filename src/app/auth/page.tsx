'use client';
import Button from '@/components/common/Button';
import Input from '@/components/common/form/Input';
import { useGetCode } from '@/hooks/auth/useGetCode';
import { toEnglishDigits } from '@/lib/fun';
import { useFormik } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import Select from '@/components/common/Select';
import { countriesList } from '@/lib/countries_list';
import BtnGoogle from './BtnGoogle';
const Page = () => {
  const { mutate, isPending } = useGetCode();
  const formik = useFormik({
    initialValues: {
      mobile: '',
    },

    validationSchema: Yup.object({
      mobile: Yup.string().required('فیلد اجبار ی است'),
    }),
    onSubmit: (data) => {
      mutate({ mobile: toEnglishDigits(data.mobile) });
    },
  });
  return (
    <div className="mx-auto flex h-[95vh] flex-col justify-between lg:mt-14 lg:h-fit lg:w-[524px]">
      <div>
        <h1 className="font-extrabold text-2xl text-primary">ورود / ثبت نام</h1>
        <div className="mt-10">
          <p className={`mb-[6px] pr-1 font-medium text-[14px] text-black`}>
            شماره موبایل {<span className="text-red-500">*</span>}
          </p>
          <div className="mt-1 flex flex-row-reverse items-center gap-4">
            {/* <Select
              DropdownIndicator={() => ' '}
              CustomSingleValue={CustomSingleValue}
              CustomOption={CustomOption}
              nameLabel="name_fa"
              nameValue="dial_code"
              formik={formik}
              name=""
              options={countriesList}
            /> */}
            <Input
              placeholder="09123456789"
              formik={formik}
              classNameLabel="text-[14px]"
              name="mobile"
              type="tel"
              className=""
              classNameInput={'text-center'}
            />
          </div>
        </div>
      </div>
      <div className="pb-10 lg:pb-0">
        <Button className="disabled !h-[48px] w-full bg-main font-medium text-white shadow-button lg:mt-8 lg:!h-[48px]">
          دریافت کد
        </Button>

        <span className="inline-block pt-5 font-medium text-[14px]">
          با ورود و ثبت‌نام،
          <Link href={'/common-questions/'} className="text-main">
            شرایط استفاده را
          </Link>{' '}
          می‌پذیرم.
        </span>
        <div className="mt-14 flex items-center justify-center gap-10">
          <span className="block h-px w-[100px] bg-[#8E98A8] bg-opacity-20"></span>
          <p className="font-medium text-gray-200">یا</p>
          <span className="block h-px w-[100px] bg-[#8E98A8] bg-opacity-20"></span>
        </div>
        <BtnGoogle />
      </div>
    </div>
  );
};

const CustomOption = (props: any) => {
  const { data, isSelected, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={`flex cursor-pointer items-center gap-1 px-4 py-2 hover:bg-gray-100 ${
        isSelected ? '!bg-blue-100 font-bold' : ''
      }`}
    >
      <img className="h-5 w-6 object-contain" src={data?.flag_svg} />
      <span>{data.label}</span>
    </div>
  );
};

const CustomSingleValue = (props: any) => {
  return (
    <span {...props} className="custom-style !mx-auto flex items-center gap-2 !pl-0">
      <span>{props.data.dial_code.split('').reverse().join('')}</span>
      {props.data.flag_svg && <img className="h-5 w-6 object-contain" src={props.data.flag_svg} />}
    </span>
  );
};
export default Page;
