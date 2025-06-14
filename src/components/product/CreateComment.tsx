import React, { useEffect, useState } from 'react';
import StarRating from '../common/StarRateing';
import Button from '../common/Button';
import BaseDialog from '../common/BaseDialog';
import Image from 'next/image';
import Textarea from '../common/form/Textarea';
import Input from '../common/form/Input';
import { useFormik } from 'formik';
import { useAddComment } from '@/hooks/comments/useAddComment';
import { Product } from '@/types/home';
import { Comment } from '@/types';
import { BASEURL } from '@/lib/variable';
import Select from '../common/Select';
import { useUpdateCommentByIdAdmin } from '@/hooks/admin/comments/useUpdateCommentByIdAdmin';
import ModalNeedLoginUser from '../common/ModalNeedLoginUser';
import { useSession } from '@/lib/auth/useSession';
import { useMedia } from 'react-use';
import { addToast } from '@heroui/react';
import { useGetCommentById } from '@/hooks/comments/useGetCommentById';
type Props = {
  product?: Product;
  showCommentRate?: boolean;
  modal: {
    admin?: boolean;
    open: boolean;
    info: Comment | null;
  };
  setModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      admin?: boolean;
      info: Comment | null;
    }>
  >;
};
const CreateComment = ({ product, modal, setModal, showCommentRate }: Props) => {
  const isMobile = useMedia('(max-width: 480px)', false);

  const [oepnNeedLogin, setNeedOpenLogin] = useState(false);
  const {
    mutate: mutateUpdate,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
  } = useUpdateCommentByIdAdmin();
  const user = useSession();
  const { data } = useGetCommentById(product?._id);
  const comments: { rate: string }[] = data?.data?.data?.comments;

  const [rate, setRate] = useState(0);

  const onClose = () => setModal({ open: false, info: null });
  const { mutate, isPending, isSuccess } = useAddComment();
  const formik = useFormik({
    initialValues: {
      rate: 0,
      comment: '',
      commentTitle: '',
      picture: [],
      published: '',
    },
    onSubmit: (values) => {
      if (values.rate === 0)
        return addToast({
          title: 'لطفا امتیاز خود را درباره این محصول انتخاب کنید.',
          color: 'danger',
        });
      const formdata = new FormData();
      if (values?.picture?.length >= 1) {
        for (const image of values.picture) {
          formdata.append('picture', image);
        }
      }
      formdata.append('commentTitle', values.commentTitle);
      formdata.append('comment', values.comment);
      formdata.append('rate', values.rate.toString());

      formdata.append('type', 'review');
      if (modal.info && !modal.admin) {
        formdata.append('parent', modal.info._id);
      } else {
        formdata.append('location', product?._id!);
      }

      if (modal.admin) {
        formdata.append('published', values.published);
        mutateUpdate({ data: formdata, id: modal?.info?._id! });
      } else {
        mutate({ data: formdata });
      }
    },
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFile = formik.values.picture;
      formik.setFieldValue('picture', [...newFile, e.target.files[0]]);
    }
  };

  const onDelete = (idx: number) => {
    const newFile = [...formik.values.picture];
    newFile.splice(idx, 1);
    formik.setFieldValue('picture', newFile);
  };
  useEffect(() => {
    if (isSuccess || isSuccessUpdate) {
      onClose();
      formik.setValues({
        comment: '',
        commentTitle: '',
        rate: 0,
        picture: [],
        published: '',
      });
    }
  }, [isSuccess, isSuccessUpdate]);

  useEffect(() => {
    if (comments) {
      const totalRate = comments?.reduce((acc, comment) => acc + Number(comment.rate), 0);
      // Divide by the length of the array to get the average
      const averageRate = totalRate / comments?.length;
      setRate(averageRate);
    }
  }, [comments]);
  const onOpenComment = () => {
    if (!user?.accessToken) {
      return setNeedOpenLogin(true);
    }
    setModal({ info: null, open: true });
  };

  useEffect(() => {
    if (modal.admin && modal.info) {
      formik.setValues({
        comment: modal.info.comment,
        commentTitle: modal.info.commentTitle,
        rate: Number(modal.info.rate),
        // @ts-expect-error error
        picture: modal.info.picture! ? modal.info.picture : [],
        published: modal.info.published!,
      });

      setRate(Number(modal.info.rate));
    }
  }, [modal]);

  useEffect(() => {
    if (isSuccessUpdate) {
      onClose();
    }
  }, [isSuccessUpdate]);
  return (
    <div>
      {showCommentRate && (
        <div className="shadow-comment flex flex-col items-center justify-between rounded-xl p-4 lg:flex-row">
          <div className="w-full">
            <p className="flex items-center gap-1 font-regular text-[16px] text-[#7D8793]">
              <span className="font-bold text-[24px] text-[#393B40]">
                {rate ? rate.toFixed(1) : 0}
              </span>
              از
              <span>5</span>
            </p>
            <div className="flex items-center gap-2 py-3">
              <StarRating readonly setRating={setRate} intialValue={rate} />
              <p className="whitespace-nowrap font-regular text-[12px] text-[#7D8793]">
                از مجموع {comments?.length ?? 0}
              </p>
            </div>

            <p className="font-regular text-[14px] text-[#7D8793]">
              شما هم درباره این محصول دیدگاه ثبت کنید
            </p>
          </div>
          <Button
            onClick={onOpenComment}
            className="mt-3 border border-[#E4E7E9] text-main lg:w-[192px]"
          >
            ثبت دیدگاه
          </Button>
        </div>
      )}
      <BaseDialog
        onClose={onClose}
        size={isMobile ? 'full' : 'lg'}
        title={modal.admin ? 'ویرایش دیدگاه' : 'افزودن دیدگاه'}
        isOpen={modal.open}
        isLoadingFooterBtn={isPending || isPendingUpdate}
      >
        <div>
          {product && (
            <div className="shadow-comment flex items-center gap-2 rounded-lg border border-gray-100 p-3">
              <Image
                className="rounded-lg border border-[#E4E7E9]"
                width={64}
                height={64}
                src={`${BASEURL}/${product?.thumbnailImage?.url}`}
                alt=""
              />
              <p className="font-regular text-[14px] text-[#616A76]">{product.title}</p>
            </div>
          )}
          <div className="mt-4 h-px w-full bg-[#E4E7E9]" />
          <div className="mt-6 flex items-center justify-between">
            <StarRating
              label="امتیاز شما"
              isRequired
              onRate={(rate: number) => formik.setFieldValue('rate', rate)}
              intialValue={Number(formik.values.rate)}
            />
          </div>
          <div className="mt-5 space-y-4">
            {modal.admin && (
              <Select
                formik={formik}
                name="published"
                label="تغیر وضعیت"
                options={[
                  { value: 'Awaiting', label: 'در حال انتطار' },
                  { value: 'Published', label: 'منتشر شده' },
                ]}
              />
            )}
            <Input
              classNameLabel="text-[#616A76] font-regular"
              label={'عنوان دیدگاه'}
              classNameInput="!h-[48px] !bg-[#F5F6F6] font-regular text-[14px]"
              isRequired
              name="commentTitle"
              formik={formik}
            />
            <Textarea
              classNameLabel="text-[#616A76] font-regular"
              label={'دیدگاه شما'}
              isRequired
              classNameInput="bg-[#F5F6F6] font-regular text-[14px]"
              name="comment"
              formik={formik}
            />
            <div>
              <p className="font-regular text-[14px] text-[#616A76]">تصاویر</p>
              <span className="font-regular text-[12px] text-[#7D8793]">
                حداکثر 1 فایل تا 5 مگابایت
              </span>
              <div className="mt-5 flex items-center gap-3">
                <div>
                  <label
                    className="flex h-[48px] w-[48px] items-center justify-center rounded-xl bg-main"
                    htmlFor="upload"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 12H18"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 18V6"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </label>
                  <input
                    disabled={formik?.values?.picture?.length === 5 || modal.admin}
                    onChange={onChange}
                    accept="image/png, image/jpeg"
                    id="upload"
                    type="file"
                    className="absolute z-0 opacity-0"
                  />
                </div>
                <div className="flex items-center gap-3">
                  {Array.isArray(formik?.values?.picture)
                    ? formik?.values?.picture?.map((item, idx) => (
                        <span key={idx} className="relative">
                          {
                            // @ts-expect-error error
                            item instanceof File ? (
                              <img
                                className="h-[48px] w-[48px] rounded-lg"
                                src={URL.createObjectURL(item)}
                                key={idx}
                              />
                            ) : (
                              <img
                                className="h-[48px] w-[48px] rounded-lg"
                                src={`${BASEURL}/${item}`}
                                key={idx}
                              />
                            )
                          }
                          <button
                            disabled={modal.admin}
                            onClick={() => onDelete(idx)}
                            className="absolute left-0 top-0 z-50 rounded-b bg-main"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 6L18 18"
                                stroke="#fff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M18 6L6 18"
                                stroke="#fff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </span>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-spring mt-10 flex items-center justify-between gap-3 rounded-lg">
            <Button onClick={onClose} className="w-[140px] border">
              <span>برگشت</span>
            </Button>
            <Button
              isPending={isPending}
              onClick={() => formik.handleSubmit()}
              className="!h-[48px] w-full bg-main font-light text-white"
            >
              ثبت دیدگاه
            </Button>
          </div>
        </div>
      </BaseDialog>

      <ModalNeedLoginUser open={oepnNeedLogin} setOpen={setNeedOpenLogin} />
    </div>
  );
};

export default CreateComment;
