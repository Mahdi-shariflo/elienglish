'use client';
import React, { useEffect, useState } from 'react';
import Input from '../common/form/Input';
import Textarea from '../common/form/Textarea';
import Button from '../common/Button';
import CardComment from './CardComment';
import { useSession } from '@/lib/auth/useSession';
import { useAddComment } from '@/hooks/comments/useAddComment';
import { Blog } from '@/types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import StarRating from '../common/StarRateing';
import ModalNeedLoginUser from '../common/ModalNeedLoginUser';
import Title from '../common/Title';
import { useGetCommentById } from '@/hooks/comments/useGetCommentById';
const Comments = ({ blog }: { blog: Blog }) => {
  const [open, setOpen] = useState(false);
  const user = useSession();
  const { data } = useGetCommentById(blog._id!);
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
      star: yup.mixed().test('is-not-zero', 'امتیاز نباید صفر باشد', () => star > 0),
    }),
    onSubmit: (values) => {
      if (!user?.accessToken) return setOpen(!open);
      const data = {
        ...values,
        rating: star,
        targetType: 'blog',
        targetId: blog._id,
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
      <div className="mt-[24px] rounded-[16px] border border-[#E5EAEF] p-4 dark:border-[#263248] dark:bg-[#172334] lg:p-[24px]">
        <Title title="ارسال دیدگاه" />
        <form onSubmit={formik.handleSubmit} className="mt-5 grid gap-4 lg:grid-cols-2">
          <Input
            isRequired
            placeholder="نام و نام خانوادگی خود را وارد کنید"
            label={'نام و نام خانوادگی'}
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
              className="w-full bg-main px-10 text-white lg:w-fit"
            >
              ثبت دیدگاه
            </Button>
          </div>
        </form>
        <div className="mt-10">
          {/* data?.data?.data?.comments */}
          {data?.data?.data?.comments?.map((comment: Comment, idx: number) => (
            <CardComment blog={blog} />
          ))}
        </div>
        <ModalNeedLoginUser open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default Comments;
