import BaseDialog from '@/components/common/BaseDialog';
import React, { Dispatch } from 'react';
import SelectProductProperties from './SelectProductProperties';
import SelectGroupProperties from './SelectGroupProperties';
import { Accordion, AccordionItem } from '@heroui/react';
import Button from '@/components/common/Button';
import { RiCloseCircleFill } from 'react-icons/ri';
import { BiCheckCircle } from 'react-icons/bi';
import SelectAtrributeBuyPropertyId from './SelectAtrributeBuyPropertyId';
import Checkbox from '@/components/common/form/Checkbox';
import { FormikProps } from 'formik';
type Props = {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  formik: FormikProps<any>;
};
const SelectPropertyModal = ({ open, setOpen, formik }: Props) => {
  return (
    <>
      <BaseDialog
        classBody="!min-h-[500px] !px-3"
        nameBtnFooter="ادامه فرایند"
        onClickFooter={() => setOpen(false)}
        size="3xl"
        nameBtnBack="بستن"
        isOpen={open}
        onClose={() => {
          setOpen(!open);
        }}
        title="انتخاب ویژگی برای محصول"
      >
        <div className="container_category">
          <div className="flex items-center gap-3">
            <SelectProductProperties
              title="انتخاب ویژگی"
              onChange={(values) => formik.setFieldValue('properties', values)}
              values={formik?.values?.properties}
            />
            <SelectGroupProperties
              title="انتخاب از گروه ویژگی‌ها"
              onChange={(values) => formik.setFieldValue('group', values)}
              values={undefined}
              onProperties={(values) =>
                formik.setFieldValue('properties', [...formik?.values?.properties, ...values])
              }
            />
          </div>
          <Accordion>
            {/* @ts-expect-error formik */}
            {formik?.values?.properties?.map((item, idx) => {
              return (
                <AccordionItem
                  startContent={
                    <Button
                      onClick={() => {
                        const newProperties = [...formik?.values?.properties];
                        newProperties.splice(idx, 1);
                        formik.setFieldValue('properties', newProperties);
                      }}
                    >
                      <RiCloseCircleFill />
                    </Button>
                  }
                  key={idx}
                  aria-label="Accordion 1"
                  title={
                    <div className="flex items-center gap-2">
                      <span>{item.title}</span>
                      {item?.attribiute?.length >= 1 && (
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-main text-[12px] text-white">
                          {item?.attribiute?.length}
                        </span>
                      )}

                      {item.mainProperty ? (
                        <span className="flex items-center gap-1 rounded-lg border p-px text-[12px] text-gray-400">
                          جز ویژگی اصلی <BiCheckCircle />
                        </span>
                      ) : null}
                      {item.isVariable ? (
                        <span className="flex items-center gap-1 rounded-lg border p-px text-[12px] text-gray-400">
                          جز متغیر ها <BiCheckCircle />
                        </span>
                      ) : null}
                    </div>
                  }
                  classNames={{
                    base: 'border-b border-[#E4E7E9] !px-0',
                    title: 'font-medium !text-[14px] text-[#232429]',
                    subtitle: 'text-[10px] text-[#7D8793] font-regular line-clamp-1',
                    trigger: 'items-center !py-1',
                    content: '!pt-0 !pb-3',
                  }}
                >
                  <div className="space-y-3">
                    <SelectAtrributeBuyPropertyId
                      idx={idx}
                      values={item?.attribiute}
                      onChange={(values) => {
                        const newProperties = [...formik?.values?.properties];
                        newProperties[idx].attribiute = values;
                        formik.setFieldValue('properties', newProperties);
                      }}
                      propertyId={item._id}
                    />

                    <Checkbox
                      isSelected={item?.mainProperty}
                      onValueChange={(value) => {
                        const newProperties = [...formik?.values?.properties];
                        newProperties[idx].mainProperty = value;
                        formik.setFieldValue('properties', newProperties);
                      }}
                      label="ویژگی اصلی"
                    />
                    <Checkbox
                      isSelected={item?.isVariable}
                      onValueChange={(value) => {
                        const newProperties = [...formik?.values?.properties];
                        newProperties[idx].isVariable = value;
                        formik.setFieldValue('properties', newProperties);
                      }}
                      label="نمایش در متغیر ها"
                    />
                  </div>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </BaseDialog>
    </>
  );
};

export default SelectPropertyModal;
