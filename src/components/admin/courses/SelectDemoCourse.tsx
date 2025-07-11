import { ResultAttribute } from '@/lib/product';
import { FormikProps } from 'formik';
import React, { useState } from 'react';
import FormVariableCourse from './FormCourseDemo';
import { Course } from '@/types/home';
import useGlobalStore from '@/store/global-store';
import { Accordion, AccordionItem } from '@heroui/react';
import Button from '@/components/common/Button';
import { Delete_icon, Edit_icon } from '@/components/common/icon';

type Props = {
  formik: FormikProps<{ [key: string]: ResultAttribute[] }>;
  idx: number;
  product?: Course;
};
const SelectDemoCourse = ({ formik, idx, product }: Props) => {
  const [showVariableForm, setShowVariableForm] = useState(false);
  const { setVerifyDelete } = useGlobalStore();

  const onRemove = () => {
    if (product?._id) {
      setVerifyDelete({
        open: true,
        title: 'حذف محصول متغیر',
        updateCache: 'single-product-admin',
        url: `/admin/products/remove/${product?._id}`,
      });
    }
    const updatedChildren = formik.values.demo.filter((_, i) => i !== idx);
    formik.setFieldValue('demo', updatedChildren);
  };
  return (
    <>
      <div className="mt-3">
        <Accordion>
          <AccordionItem
            startContent={
              <div>
                <Button onClick={() => setShowVariableForm(true)} className="!h-fit !w-fit">
                  <Edit_icon />
                </Button>
                <Button onClick={onRemove} className="!h-fit !w-fit">
                  <Delete_icon />
                </Button>
              </div>
            }
            indicator={({ isOpen }) => (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${isOpen ? '!-rotate-90' : '!rotate-0'}`}
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="#6E3DFF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
            classNames={{ heading: 'drop_shadow_faq border border-gray-100 !rounded-lg !px-2' }}
            title={
              product?.title ? (
                <p className="font-medium text-[18px]">
                  <span className="text-[18px] text-main">{product?.order}. </span>
                  {product?.title}
                </p>
              ) : (
                <Button
                  onClick={() => setShowVariableForm(true)}
                  className="h-[36px] w-fit min-w-fit !rounded-lg bg-[#EDE8FC] !px-2 text-main"
                >
                  ویرایش اطلاعات دمو
                </Button>
              )
            }
          >
            <div className="mt-2 space-y-6">
              {product?.episodes?.map((item, idx) => {
                return (
                  <div className="flex items-center justify-between" key={idx}>
                    <div className="flex items-center gap-2">
                      <span>
                        {item.type === 'video' ? (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_9_30619)">
                              <path
                                d="M23 7L16 12L23 17V7Z"
                                stroke="#6E3DFF"
                                stroke-width="2.4"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M14 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H14C15.1046 19 16 18.1046 16 17V7C16 5.89543 15.1046 5 14 5Z"
                                stroke="#6E3DFF"
                                stroke-width="2.4"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_9_30619">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        ) : item.type === 'document' ? (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 8C7.73478 8 7.48043 8.10536 7.29289 8.29289C7.10536 8.48043 7 8.73478 7 9C7 9.26522 7.10536 9.51957 7.29289 9.70711C7.48043 9.89464 7.73478 10 8 10H9C9.26522 10 9.51957 9.89464 9.70711 9.70711C9.89464 9.51957 10 9.26522 10 9C10 8.73478 9.89464 8.48043 9.70711 8.29289C9.51957 8.10536 9.26522 8 9 8H8ZM13 20H6C5.73478 20 5.48043 19.8946 5.29289 19.7071C5.10536 19.5196 5 19.2652 5 19V5C5 4.73478 5.10536 4.48043 5.29289 4.29289C5.48043 4.10536 5.73478 4 6 4H11V7C11 7.79565 11.3161 8.55871 11.8787 9.12132C12.4413 9.68393 13.2044 10 14 10H17V12C17 12.2652 17.1054 12.5196 17.2929 12.7071C17.4804 12.8946 17.7348 13 18 13C18.2652 13 18.5196 12.8946 18.7071 12.7071C18.8946 12.5196 19 12.2652 19 12V9C19 9 19 9 19 8.94C18.9896 8.84813 18.9695 8.75763 18.94 8.67V8.58C18.8919 8.47718 18.8278 8.38267 18.75 8.3L12.75 2.3C12.6673 2.22222 12.5728 2.15808 12.47 2.11C12.4369 2.10421 12.4031 2.10421 12.37 2.11C12.2728 2.058 12.1683 2.02092 12.06 2H6C5.20435 2 4.44129 2.31607 3.87868 2.87868C3.31607 3.44129 3 4.20435 3 5V19C3 19.7956 3.31607 20.5587 3.87868 21.1213C4.44129 21.6839 5.20435 22 6 22H13C13.2652 22 13.5196 21.8946 13.7071 21.7071C13.8946 21.5196 14 21.2652 14 21C14 20.7348 13.8946 20.4804 13.7071 20.2929C13.5196 20.1054 13.2652 20 13 20ZM13 5.41L15.59 8H14C13.7348 8 13.4804 7.89464 13.2929 7.70711C13.1054 7.51957 13 7.26522 13 7V5.41ZM14 12H8C7.73478 12 7.48043 12.1054 7.29289 12.2929C7.10536 12.4804 7 12.7348 7 13C7 13.2652 7.10536 13.5196 7.29289 13.7071C7.48043 13.8946 7.73478 14 8 14H14C14.2652 14 14.5196 13.8946 14.7071 13.7071C14.8946 13.5196 15 13.2652 15 13C15 12.7348 14.8946 12.4804 14.7071 12.2929C14.5196 12.1054 14.2652 12 14 12ZM20.71 18.29C20.617 18.1963 20.5064 18.1219 20.3846 18.0711C20.2627 18.0203 20.132 17.9942 20 17.9942C19.868 17.9942 19.7373 18.0203 19.6154 18.0711C19.4936 18.1219 19.383 18.1963 19.29 18.29L19 18.59V16C19 15.7348 18.8946 15.4804 18.7071 15.2929C18.5196 15.1054 18.2652 15 18 15C17.7348 15 17.4804 15.1054 17.2929 15.2929C17.1054 15.4804 17 15.7348 17 16V18.59L16.71 18.29C16.5217 18.1017 16.2663 17.9959 16 17.9959C15.7337 17.9959 15.4783 18.1017 15.29 18.29C15.1017 18.4783 14.9959 18.7337 14.9959 19C14.9959 19.2663 15.1017 19.5217 15.29 19.71L17.29 21.71C17.3851 21.801 17.4972 21.8724 17.62 21.92C17.7397 21.9729 17.8691 22.0002 18 22.0002C18.1309 22.0002 18.2603 21.9729 18.38 21.92C18.5028 21.8724 18.6149 21.801 18.71 21.71L20.71 19.71C20.8037 19.617 20.8781 19.5064 20.9289 19.3846C20.9797 19.2627 21.0058 19.132 21.0058 19C21.0058 18.868 20.9797 18.7373 20.9289 18.6154C20.8781 18.4936 20.8037 18.383 20.71 18.29ZM12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17C13 16.7348 12.8946 16.4804 12.7071 16.2929C12.5196 16.1054 12.2652 16 12 16H8C7.73478 16 7.48043 16.1054 7.29289 16.2929C7.10536 16.4804 7 16.7348 7 17C7 17.2652 7.10536 17.5196 7.29289 17.7071C7.48043 17.8946 7.73478 18 8 18H12Z"
                              fill="#6E3DFF"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 21C7.65685 21 9 19.6569 9 18C9 16.3431 7.65685 15 6 15C4.34315 15 3 16.3431 3 18C3 19.6569 4.34315 21 6 21Z"
                              stroke="#6E3DFF"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M9 18V5L21 3V16"
                              stroke="#6E3DFF"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M18 19C19.6569 19 21 17.6569 21 16C21 14.3431 19.6569 13 18 13C16.3431 13 15 14.3431 15 16C15 17.6569 16.3431 19 18 19Z"
                              stroke="#6E3DFF"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                      <span className="font-medium text-main">{item.title}</span>
                    </div>
                    {item.type === 'video' ? (
                      <Button className="h-[36px] w-fit min-w-fit !rounded-lg bg-[#EDE8FC] !px-2 text-main">
                        مشاهده ویدئو
                      </Button>
                    ) : (
                      <a className="flex h-[36px] w-fit items-center justify-center rounded-lg bg-[#EDE8FC] px-2 font-medium text-main">
                        دانلود فایل
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </AccordionItem>
        </Accordion>
      </div>

      {showVariableForm && (
        <FormVariableCourse
          idx={idx}
          formik={formik}
          open={showVariableForm}
          setOpen={setShowVariableForm}
        />
      )}
    </>
  );
};

export default SelectDemoCourse;
