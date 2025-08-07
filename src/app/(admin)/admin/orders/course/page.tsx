'use client';
import ReactTable from '@/components/admin/common/ReactTable';
import MutiRangeDatePicker from '@/components/admin/MutiRangeDatePicker';
import Input from '@/components/common/form/Input';
import { SearchIcon } from '@/components/common/icon';
import Select from '@/components/common/Select';
import { useGetCoursesOrdersAdmin } from '@/hooks/admin/orders/course/useGetCoursesOrdersAdmin';
import { converDateGre } from '@/lib/convert';
import { initialDataOrder, ordersStatus } from '@/lib/table-column';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

const Page = () => {
  const router = useRouter();
  const [date, setDate] = useState({
    start: '', // 7 days ago
    end: '', // current date
  });

  const formik = useFormik({
    initialValues: {
      date: '',
    },
    onSubmit: () => {},
  });

  const [filter, setFilter] = useState({
    page: '1',
    sort: 'createdAt_desc',
    search: '',
    orderStatus: '',
  });
  const { data, isLoading, isSuccess } = useGetCoursesOrdersAdmin({
    page: filter.page,
    search: filter.search,
    sort: filter.sort,
    orderStatus: filter.orderStatus,
    startDate: date.start.toString(),
    endDate: date.end.toString(),
    nameStatus: 'courseOrderStatus',
  });

  const columns = useMemo(
    () =>
      initialDataOrder({
        onEdit: (row) => router.push(`/admin/orders/course/${row._id}`),
        name: 'courseItems',
      }),
    []
  );

  const order = data?.data?.data;

  const onChangeInput = (search: string) => {
    setFilter({
      ...filter,
      search: search,
    });
  };
  const onChangeSort = (sort: string) => {
    setFilter({
      ...filter,
      search: '',
      page: '1',
      sort: sort,
    });
  };

  const onChangePage = (page: number) => {
    setFilter({ ...filter, page: page.toString(), search: '' });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        سفارشات دوره
      </p>
       
      <div className="flex w-full items-center justify-start gap-x-4">
        <Input
          value={filter.search}
          onChange={(e) => onChangeInput(e.target.value)}
          startContent={<SearchIcon className="stroke-[#616A76]" />}
          className="!mb-5 !mt-7 w-full"
          label="جستجو"
          classNameLabel="text-[#616A76] text-[14px]"
          classNameInput="bg-[#f5f6f6] !h-[48px]"
          onClear={() => setFilter({ ...filter, page: '1', search: '' })}
        />
        <MutiRangeDatePicker
          onChange={(date) => {
            const startDate = date.split('-')[0];
            const endtDate = date.split('-')[1];
            console.log(startDate, endtDate);
            if (startDate && endtDate) {
              setDate({
                start: new Date(`${converDateGre(startDate)}`).toISOString(),
                end: new Date(`${converDateGre(endtDate)}`).toISOString(),
              });
            }
          }}
        />
      </div>
      <ReactTable
        isSuccess={isSuccess}
        isLoading={isLoading}
        total={order?.totalPages}
        mainData={order?.order}
        showData={columns}
        columns={[
          'title',
          'author',
          'createdAt',
          'orderNumber',
          'transactionType',
          'orderStatus',
          'orderAddress',
          'action',
          'totalAmount',
          'verify',
        ]}
        page={Number(filter.page)}
        sort={filter.sort}
        onChangeSort={onChangeSort}
        onChangePage={onChangePage}
      >
        <Select
          className="!w-full"
          onChange={(value) =>
            setFilter({
              page: '1',
              search: '',
              sort: 'createdAt_desc',
              // @ts-expect-error error
              orderStatus: value.value!,
            })
          }
          value={filter.orderStatus}
          label="فیلتر وضعیت"
          options={ordersStatus}
        />
      </ReactTable>
    </div>
  );
};

export default Page;
