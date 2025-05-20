'use client';
import { useFormik } from 'formik';
import Input from './Input';
import ReactSelect from './ReactSelect';
import * as Yup from 'yup';
import { ReactNode, useEffect } from 'react';
import Button from '../Button';
import Radio from './Radio';
import Checkbox from './Checkbox';
type Form = {
  isLoading?: boolean;
  isFetching?: boolean;
  page?: number;
  total?: number;
  setPage?: () => void;
  type: string;
  placeholder?: string;
  label?: string;
  name?: string;
  price?: boolean;
  className?: string;
  classNameLabel?: string;
  classNameInput?: string;
  nameLabel?: string;
  nameValue?: string;
  Label?: string;
  options?: { [key: string]: string }[];
  RenderValue?: React.ReactElement;
  selectionMode?: 'single' | 'multiple' | undefined;
  typeForm?: string;
  validationName?: string;
}[];
type Props = {
  nameBtn?: string;
  isLoading?: boolean;
  initailData?: { [key: string]: string | number | boolean };
  className?: string;
  onBack?: ReactNode;
  onSubmit?: (data: { [key: string]: string | number | boolean }) => void;
  optionalFields?: string[]; // پراپسی برای مشخص کردن فیلدهای اختیاری
  form: Form;
  classNameSubmit?: string;
  children?: ReactNode;
};

const CreateForm = ({
  nameBtn = 'ثبت',
  children,
  form,
  classNameSubmit,
  className,
  optionalFields = [],
  onBack,
  onSubmit,
  isLoading,
  initailData,
}: Props) => {
  const initialValues: { [key: string]: string | number | string[] } = form.reduce((acc, field) => {
    // @ts-expect-error error
    acc[field.name!] = field.type === 'select' ? [] : '';
    return acc;
  }, {});

  // تعریف ولیدیشن‌ها
  const validationSchema = Yup.object(
    form.reduce((acc, field) => {
      const isOptional = optionalFields.includes(field.name!); // بررسی اختیاری بودن فیلد
      if (field.type === 'input' && !isOptional) {
        // @ts-expect-error error
        acc[field.name] = Yup.string().required(`${field.validationName} الزامی است`);
      } else if (field.type === 'select' && !isOptional) {
        if (field.selectionMode === 'multiple') {
          // @ts-expect-error error
          acc[field.name] = Yup.mixed()
            .test('is-not-empty', `${field.validationName} الزامی است`, (value) => {
              if (Array.isArray(value)) {
                return value.length > 0; // بررسی حداقل یک انتخاب برای آرایه
              }
              if (value instanceof Set) {
                return value.size > 0; // بررسی حداقل یک انتخاب برای Set
              }
              return false; // اگر نه آرایه است نه Set
            })
            .test('is-set', `${field.validationName} باید از نوع Set باشد`, (value) => {
              return value instanceof Set || Array.isArray(value); // اگر آرایه است یا Set
            });
        }
        // @ts-expect-error error
        acc[field.name] = Yup.string().required(`${field.validationName} الزامی است`);
      } else if (field.type === 'radio' && !isOptional) {
        // @ts-expect-error error
        acc[field.name] = Yup.string().required(`${field.validationName} الزامی است`);
      } else if (field.type === 'checkbox' && !isOptional) {
        // @ts-expect-error error
        acc[field.name] = Yup.bool().oneOf([true], 'Field must be checked');
      }

      return acc;
    }, {})
  );
  const formik = useFormik<{ [key: string]: string | number | boolean }>({
    // @ts-expect-error error
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (onSubmit) onSubmit(values);
    },
  });

  useEffect(() => {
    if (initailData) {
      formik.setValues(initailData);
    }
  }, [initailData]);

  return (
    <form onSubmit={formik.handleSubmit} className={className}>
      <div>
        {form.map((item, idx) => {
          if (item.type === 'input')
            return (
              <Input
                dir="ltr"
                className={item.className}
                classNameInput={item.classNameInput}
                classNameLabel={item.classNameLabel}
                name={item?.name}
                formik={formik}
                key={idx}
                placeholder={item?.placeholder}
                label={item?.label}
                price={item?.price}
                type={item?.typeForm}
              />
            );
          if (item.type === 'select')
            return (
              <ReactSelect
                isFetching={item.isFetching}
                isLoading={item.isLoading}
                setPage={item?.setPage}
                page={item?.page}
                total={item?.total}
                selectionMode={item.selectionMode}
                // @ts-expect-error error
                RenderValue={item.RenderValue}
                nameLabel={item.nameLabel}
                nameValue={item.nameValue}
                options={item.options}
                className={item.className}
                name={item?.name}
                formik={formik}
                key={idx}
                placeholder={item?.placeholder}
                label={item?.label}
              />
            );
          if (item.type === 'radio') {
            return (
              <Radio
                className={item.className}
                key={idx}
                label={item.label}
                options={item.options}
                name={item.name}
                formik={formik}
              />
            );
          }
          if (item.type === 'checkbox') {
            return (
              <Checkbox
                className={item.className}
                key={idx}
                label={item.label}
                name={item.name}
                formik={formik}
              />
            );
          }
          return null;
        })}
      </div>
      <div>
        {children}
        <div>
          {onBack}
          <Button
            disabled={!formik.isValid}
            isLoading={isLoading}
            type="submit"
            className={`!h-[48px] w-[140px] bg-blue-500 font-light text-white lg:!h-[64px] ${classNameSubmit}`}
          >
            {nameBtn}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateForm;
