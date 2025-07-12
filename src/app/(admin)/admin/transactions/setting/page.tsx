'use client';

import Media from '@/components/admin/common/Media';
import ReactTable from '@/components/admin/common/ReactTable';
import BaseDialog from '@/components/common/BaseDialog';
import Input from '@/components/common/form/Input';
import Textarea from '@/components/common/form/Textarea';
import { SearchIcon } from '@/components/common/icon';
import { useActionSetting } from '@/hooks/admin/settings/useActionSetting';
import { useGetSetting } from '@/hooks/admin/settings/useGetSetting';
import { initialDataPaymentList } from '@/lib/table-column';
import { BASEURL } from '@/lib/variable';
import { useFormik, FormikHelpers } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';

interface PaymentItem {
  _id: string;
  title: string;
  enTitle: string;
  logo: string | { url: string };
  description: string;
}

interface FilterType {
  page: string;
  sort: string;
  search: string;
}

interface DeleteModalState {
  open: boolean;
  info: PaymentItem | null;
}

const Page = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editInfo, setEditInfo] = useState<PaymentItem | null>(null);
  const [showModalDelete, setShowModalDelete] = useState<DeleteModalState>({
    open: false,
    info: null,
  });
  const [showInstallmentDialog, setShowInstallmentDialog] = useState<{
    open: boolean;
    newValue: boolean;
  }>({ open: false, newValue: false });

  const { data, isSuccess } = useGetSetting();
  const { mutate, isPending, isSuccess: isSuccessSetting } = useActionSetting();

  const setting = data?.data?.data;

  const [filter, setFilter] = useState<FilterType>({
    page: '1',
    sort: 'createdAt_desc',
    search: '',
  });

  const columns = useMemo(
    () =>
      initialDataPaymentList({
        onDelete: (row: PaymentItem) => setShowModalDelete({ open: true, info: row }),
        onEdit: (row: PaymentItem) => {
          setEditInfo(row);
          formik.setValues({
            title: row.title,
            enTitle: row.enTitle,
            logo: row.logo,
            description: row.description,
          });
          setShowModal(true);
        },
      }),
    [setting]
  );

  const formik = useFormik({
    initialValues: {
      title: '',
      enTitle: '',
      logo: '' as string | { url: string },
      description: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('فیلد اجباری است'),
      enTitle: Yup.string().required('فیلد اجباری است'),
      logo: Yup.object().required('فیلد اجباری است'),
      description: Yup.string().required('فیلد اجباری است'),
    }),
    onSubmit: (values) => {
      const isEditing = !!editInfo;

      const paymentList: PaymentItem[] = Array.isArray(setting?.checkoutPage?.paymentList)
        ? setting.checkoutPage.paymentList
        : [];

      const updatedList: PaymentItem[] = isEditing
        ? paymentList.map((item) =>
            item._id === editInfo?._id
              ? {
                  ...item,
                  ...values,
                  logo: (values.logo as { url: string }).url,
                }
              : item
          )
        : [
            ...paymentList,
            {
              _id: crypto.randomUUID(), // در صورت نیاز می‌تونی ID واقعی از بک‌اند بگیری
              ...values,
              logo: (values.logo as { url: string }).url,
            },
          ];

      const mainData = {
        ...setting,
        checkoutPage: {
          isInstallmentGatewayActive: setting?.checkoutPage?.isInstallmentGatewayActive ?? false,
          paymentList: updatedList,
        },
      };

      mutate({ data: mainData });
    },
  });

  useEffect(() => {
    if (isSuccessSetting) {
      setShowModal(false);
      setEditInfo(null);
      setShowModalDelete({ open: false, info: null });
      formik.resetForm();
    }
  }, [isSuccessSetting]);

  return (
    <div>
      <div className="flex items-center justify-between border-b border-[#E4E7E9] pb-3">
        <p className="hidden font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
          لیست درگاه‌های پرداخت
        </p>
        <button
          onClick={() =>
            setShowInstallmentDialog({
              open: true,
              newValue: !setting?.checkoutPage?.isInstallmentGatewayActive,
            })
          }
          className={`mb-5 rounded-lg px-4 py-2 font-medium text-white ${
            setting?.checkoutPage?.isInstallmentGatewayActive ? 'bg-green-600' : 'bg-gray-500'
          }`}
        >
          پرداخت قسطی: {setting?.checkoutPage?.isInstallmentGatewayActive ? 'فعال' : 'غیرفعال'}
        </button>
      </div>

      <ReactTable
        isSuccess={isSuccess}
        isLoading={false}
        total={1}
        mainData={setting?.checkoutPage?.paymentList ?? []}
        showData={columns}
        columns={['_id', 'title', 'enTitle', 'description', 'action']}
        page={Number(filter.page)}
        sort={filter.sort}
        onAction={() => {
          setEditInfo(null);
          formik.resetForm();
          setShowModal(true);
        }}
        nameAction="ایجاد درگاه جدید"
      />

      {showModal && (
        <BaseDialog
          isLoadingFooterBtn={isPending}
          onClickFooter={formik.handleSubmit}
          title={editInfo ? 'ویرایش درگاه' : 'ایجاد درگاه'}
          isOpen
        >
          <div className="space-y-2">
            <Media
              className="w-full"
              withModal
              onSelect={(img) => formik.setFieldValue('logo', img)}
            >
              <div className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full border">
                {typeof formik.values.logo === 'object' ? (
                  <img
                    className="h-full w-full object-contain"
                    src={`${BASEURL}/${(formik.values.logo as { url: string }).url}`}
                    alt="thumbnail"
                  />
                ) : (
                  <p className="text-center font-regular text-[9px]">
                    انتخاب لوگو بانک <span className="text-red-500">*</span>
                  </p>
                )}
              </div>
            </Media>
            <div className="flex items-center gap-4">
              <Input formik={formik} label="عنوان" name="title" />
              <Input formik={formik} label="عنوان انگلیسی" name="enTitle" />
            </div>
            <Textarea formik={formik} label="توضیحات" name="description" />
          </div>
        </BaseDialog>
      )}

      {showModalDelete.open && (
        <BaseDialog
          isLoadingFooterBtn={isPending}
          size="lg"
          onClose={() => setShowModalDelete({ open: false, info: null })}
          title="حذف درگاه"
          isOpen={showModalDelete.open}
          onClickFooter={() => {
            if (!showModalDelete.info) return;

            const newList =
              setting?.checkoutPage?.paymentList?.filter(
                (item: PaymentItem) => item._id !== showModalDelete.info?._id
              ) ?? [];

            const mainData = {
              ...setting,
              checkoutPage: {
                isInstallmentGatewayActive:
                  setting?.checkoutPage?.isInstallmentGatewayActive ?? false,
                paymentList: newList,
              },
            };

            mutate({ data: mainData });
          }}
        >
          <p className="px-10 py-5 text-center font-regular text-lg leading-9">
            آیا مطمئن هستید که می‌خواهید{' '}
            <span className="text-main">{showModalDelete.info?.title}</span> را حذف کنید؟
          </p>
        </BaseDialog>
      )}

      {showInstallmentDialog.open && (
        <BaseDialog
          size="lg"
          isLoadingFooterBtn={isPending}
          isOpen
          title="تغییر وضعیت پرداخت قسطی"
          onClose={() => setShowInstallmentDialog({ open: false, newValue: false })}
          onClickFooter={() => {
            const paymentList = Array.isArray(setting?.checkoutPage?.paymentList)
              ? setting.checkoutPage.paymentList
              : [];

            const updatedData = {
              ...setting,
              checkoutPage: {
                ...setting?.checkoutPage,
                paymentList,
                isInstallmentGatewayActive: showInstallmentDialog.newValue,
              },
            };

            mutate({ data: updatedData });
          }}
        >
          <p className="px-10 py-5 text-center font-regular text-lg leading-9">
            آیا مطمئن هستید که می‌خواهید پرداخت قسطی را{' '}
            <span className="font-bold text-main">
              {showInstallmentDialog.newValue ? 'فعال' : 'غیرفعال'}
            </span>{' '}
            کنید؟
          </p>
        </BaseDialog>
      )}
    </div>
  );
};

export default Page;
