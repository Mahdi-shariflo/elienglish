'use client';
import ReactTable from '@/components/admin/common/ReactTable';
import SelectCourse from '@/components/admin/courses/SelectCourse';
import UsersSelect from '@/components/admin/UsersSelect';
import Button from '@/components/common/Button';
import Input from '@/components/common/form/Input';
import { SearchIcon } from '@/components/common/icon';
import Select from '@/components/common/Select';
import { useGetInstallmentAdmin } from '@/hooks/admin/installment/useGetInstallmentAdmin';
import { initialDataInstallment, ordersStatus } from '@/lib/table-column';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { BiFilter } from 'react-icons/bi';

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
    userId: filter.userId?._id,
    // @ts-expect-error error
    courseId: filter.courseId?._id,
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

  const onChangeInput = (search: string) => {
    setFilter({
      ...filter,
      page: '1',
      search: search,
    });
  };

  console.log(filter);

  return (
    <div>
      <div className="flex items-center justify-between border-b border-[#E4E7E9] pb-3">
        <p className="hidden font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
          اقساط
        </p>
        <Button
          onClick={() => {
            setFilter({
              courseId: [],
              userId: [],
              orderStatus: '',
              page: '1',
              search: '',
              sort: '',
            });
          }}
          className="w-fit"
        >
          <span>حذف فیلتر</span>
          <BiFilter />
        </Button>
      </div>
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
        <Input
          value={filter.search}
          onChange={(e) => onChangeInput(e.target.value)}
          startContent={<SearchIcon className="stroke-[#616A76]" />}
          className="!mb-5 !mt-7"
          label="جستجو"
          classNameLabel="text-[#616A76] text-[14px]"
          classNameInput="bg-[#f5f6f6] !h-[48px]"
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
