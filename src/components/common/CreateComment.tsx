import React, { useEffect, useState } from 'react';
import StarRating from '../common/StarRateing';
import Button from '../common/Button';
import BaseDialog from '../common/BaseDialog';
import Image from 'next/image';
import Textarea from '../common/form/Textarea';
import Input from '../common/form/Input';
import { useFormik } from 'formik';
import { useAddComment } from '@/hooks/comments/useAddComment';
import { Comment, ThumbnailImage } from '@/types';
import { BASEURL } from '@/lib/variable';
import Select from '../common/Select';
import { useUpdateCommentByIdAdmin } from '@/hooks/admin/comments/useUpdateCommentByIdAdmin';
import ModalNeedLoginUser from '../common/ModalNeedLoginUser';
import { useSession } from '@/lib/auth/useSession';
import { useMedia } from 'react-use';
import { addToast } from '@heroui/react';
import { useGetCommentById } from '@/hooks/comments/useGetCommentById';
type Props = {
  product?: {
    thumbnailImage?: ThumbnailImage;
    title?: string;
  };
  showCommentRate?: boolean;
  modal: {
    parent: string;
    admin?: boolean;
    open: boolean;
    info: Comment | null;
  };
  setModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      parent: string;
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
  const { data } = useGetCommentById(modal.info?._id, modal.admin);
  const comments: { rate: string }[] = data?.data?.data?.comments;
  const [rate, setRate] = useState(0);
  const onClose = () => setModal({ open: false, info: null, parent: '' });
  const { mutate, isPending, isSuccess } = useAddComment();
  const formik = useFormik({
    initialValues: {
      rating: 0,
      content: '',
      title: '',
      published: false,
    },
    onSubmit: (values) => {
      if (values.rating === 0)
        return addToast({
          title: 'لطفا امتیاز خود را درباره این محصول انتخاب کنید.',
          color: 'danger',
        });
      const formdata = new FormData();
      const mainData = {
        ...values,
        targetType: 'blog',
        targetId: modal.info?.targetId,
        ...(modal.parent ? { parent: modal.parent } : null),
        // @ts-expect-error error
        published: values.published === 'false' ? false : true,
      };

      if (modal.admin) {
        mutateUpdate({ data: mainData, id: modal?.info?._id! });
      } else {
        mutate({ data: formdata });
      }
    },
  });

  useEffect(() => {
    if (isSuccess || isSuccessUpdate) {
      onClose();
      formik.setValues({
        content: '',
        title: '',
        rating: 0,
        published: false,
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
    setModal({ info: null, open: true, parent: '' });
  };

  useEffect(() => {
    if (modal.admin && modal.info) {
      formik.setValues({
        content: modal.info.content,
        title: modal.info.title,
        rating: Number(modal.info.rating),
        // @ts-expect-error error
        published: modal.info.published ? 'true' : 'false',
      });

      setRate(Number(modal.info.rating));
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
                width={100}
                height={100}
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
              onRate={(rate: number) => formik.setFieldValue('rating', rate)}
              intialValue={Number(formik.values.rating)}
            />
          </div>
          <div className="mt-5 space-y-4">
            {modal.admin && (
              <Select
                formik={formik}
                name="published"
                label="تغیر وضعیت"
                nameLabel="label"
                nameValue="value"
                options={[
                  { value: false, label: 'در حال انتطار' },
                  { value: true, label: 'منتشر شده' },
                ]}
              />
            )}
            <Input
              classNameLabel="text-[#616A76] font-regular"
              label={'عنوان دیدگاه'}
              classNameInput="!h-[48px] !bg-[#F5F6F6] font-regular text-[14px]"
              isRequired
              name="title"
              formik={formik}
            />
            <Textarea
              classNameLabel="text-[#616A76] font-regular"
              label={'دیدگاه شما'}
              isRequired
              classNameInput="bg-[#F5F6F6] font-regular text-[14px]"
              name="content"
              formik={formik}
            />
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
