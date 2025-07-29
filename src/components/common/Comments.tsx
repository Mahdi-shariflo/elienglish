'use client';
import React, { forwardRef, useEffect, useState } from 'react';
import Input from '../common/form/Input';
import Textarea from '../common/form/Textarea';
import Button from '../common/Button';
import { useSession } from '@/lib/auth/useSession';
import { useAddComment } from '@/hooks/comments/useAddComment';
import { Comment, CommentInfo } from '@/store/types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import StarRating from '../common/StarRateing';
import ModalNeedLoginUser from '../common/ModalNeedLoginUser';
import Title from '../common/Title';
import { useGetCommentById } from '@/hooks/comments/useGetCommentById';
import CardComment from './CardComment';
import { addToast } from '@heroui/react';

const Comments = forwardRef<HTMLDivElement, { commentInfo: CommentInfo }>(
  ({ commentInfo }, ref) => {
    const [open, setOpen] = useState(false);
    const user = useSession();
    const { data } = useGetCommentById(commentInfo._id!);
    const { isSuccess, mutate, isPending } = useAddComment();
    const [star, setStar] = useState(0);
    const formik = useFormik({
      initialValues: {
        title: '',
        content: '',
      },
      validationSchema: yup.object({
        title: yup.string().required('فیلد اجباری است'),
        content: yup.string().required('فیلد اجباری است'),
      }),
      onSubmit: (values) => {
        if (!user?.accessToken) return setOpen(!open);
        if (star === 0)
          return addToast({
            title: 'لطفا امتیاز خود را برای ثبت مقاله انتخاب کنید',
            color: 'danger',
          });
        const data = {
          ...values,
          rating: star,
          targetType: 'blog',
          targetId: commentInfo._id,
        };
        mutate({ data });
      },
    });

    useEffect(() => {
      if (isSuccess) {
        formik.resetForm();
        setStar(0);
      }
    }, [isSuccess]);
    return (
      <>
        <div ref={ref} className="mt-[24px]">
          <Title title="ارسال دیدگاه" />
          <form
            onSubmit={formik.handleSubmit}
            className="mt-5 grid w-full gap-4 rounded-[16px] border border-[#E5EAEF] p-4 dark:border-[#263248] dark:bg-[#172334] lg:grid-cols-2 lg:p-[24px]"
          >
            <Input
              isRequired
              placeholder="عنوان"
              label={'عنوان'}
              classNameInput={'bg-[#f5f6f6] dark:!bg-[#0B1524]'}
              name="title"
              formik={formik}
            />

            <StarRating
              onRate={(star) => setStar(star)}
              isRequired
              className="lg:col-span-2"
              label="امتیاز شما"
              setRating={setStar}
              intialValue={star}
            />
            <Textarea
              name="content"
              classNameInput="dark:!bg-[#0B1524]"
              formik={formik}
              className="lg:col-span-2"
              isRequired
              placeholder="متن دیدگاه خود را یادداشت کنید"
              label={'متن دیدگاه'}
            />
            <div className="mt-5 flex justify-end lg:col-span-2">
              <Button
                isLoading={isPending}
                type="submit"
                className="w-full bg-main px-10 text-white lg:h-[56px] lg:w-[149px]"
              >
                ثبت دیدگاه
              </Button>
            </div>
          </form>
          {Number(data?.data?.data?.comments?.length) >= 1 && (
            <div className="mt-10">
              <Title title="دیدگاه‌ها" />
              <div className="mt-10 space-y-5">
                {/* data?.data?.data?.comments */}
                {data?.data?.data?.comments?.map((comment: Comment, idx: number) => (
                  <CardComment commentInfo={commentInfo} comment={comment} key={idx} />
                ))}
              </div>
            </div>
          )}
          <ModalNeedLoginUser open={open} setOpen={setOpen} />
        </div>
      </>
    );
  }
);

export default Comments;
