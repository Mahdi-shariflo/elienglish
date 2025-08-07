'use client';
import ReactTable from '@/components/admin/common/ReactTable';
import SelectCourse from '@/components/admin/courses/SelectCourse';
import UsersSelect from '@/components/admin/UsersSelect';
import Select from '@/components/common/Select';
import { useGetInstallmentAdmin } from '@/hooks/admin/installment/useGetInstallmentAdmin';
import { initialDataInstallment, ordersStatus } from '@/lib/table-column';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

const Page = () => {
  const router = useRouter();

  const [filter, setFilter] = useState({
    page: '1',
    sort: 'createdAt_desc',
    search: '',
    orderStatus: '',
    userId: [],
    courseId: [],
  });
  const { data, isLoading, isSuccess } = useGetInstallmentAdmin({
    page: filter.page,
    search: filter.search,
    sort: filter.sort,
    orderStatus: filter.orderStatus,
    nameStatus: 'courseOrderStatus',
    // @ts-expect-error error
    userId: Array.isArray(filter.userId) ? filter.userId[0]?._id : '',
    // @ts-expect-error error
    courseId: Array.isArray(filter.courseId) ? filter.courseId[0]?._id : '',
  });

  const columns = useMemo(
    () =>
      initialDataInstallment({
        onEdit: (row) => router.push(`/admin/orders/course/${row._id}`),
        name: 'courseItems',
      }),
    []
  );

  const order = data?.data?.data;

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
        اقساط
      </p>
       
      <div className="flex w-full items-center justify-start gap-x-4">
        <SelectCourse
          isMulti={false}
          title="انتخاب دوره"
          className="w-full"
          onChange={(values: any) => setFilter({ ...filter, courseId: values })}
          values={filter.courseId}
        />
        <UsersSelect
          isMulti={false}
          className="w-full"
          onChange={(values: any) => setFilter({ ...filter, userId: values })}
          values={filter.userId}
        />
      </div>
      <ReactTable
        isSuccess={isSuccess}
        isLoading={isLoading}
        total={order?.totalPages}
        mainData={order?.installment}
        showData={columns}
        columns={['title', 'amount', 'createdAt', 'userId', 'dueDate']}
        page={Number(filter.page)}
        sort={filter.sort}
        onChangeSort={onChangeSort}
        onChangePage={onChangePage}
      >
        <Select
          className="!w-full"
          onChange={(value) =>
            // @ts-expect-error error
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
          options={[
            {
              label: 'در حال انتظار',
              value: 'AWAITING',
            },
            {
              label: 'پرداخت شده',
              value: 'PAID',
            },
            {
              label: 'سررسید',
              value: 'OVERDUE',
            },
            {
              label: 'کنسل شده',
              value: 'CANCELED',
            },
          ]}
        />
      </ReactTable>
    </div>
  );
};

export default Page;
