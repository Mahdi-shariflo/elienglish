'use client';
import ReactTable from '@/components/admin/common/ReactTable';
import Input from '@/components/common/form/Input';
import { SearchIcon } from '@/components/common/icon';
import Select from '@/components/common/Select';
import { useGetCoursesOrdersAdmin } from '@/hooks/admin/orders/course/useGetCoursesOrdersAdmin';
import { getPrevDateTime } from '@/lib/DateTime';
import { initialDataOrder, ordersStatus } from '@/lib/table-column';
import { DateRangePicker } from '@heroui/react';
import { parseAbsoluteToLocal } from '@internationalized/date';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

const Page = () => {
  const router = useRouter();
  const [date, setDate] = useState({
    start: parseAbsoluteToLocal(getPrevDateTime(30)), // 7 days ago
    end: parseAbsoluteToLocal(getPrevDateTime(0)), // current date
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
  });

  const columns = useMemo(
    () =>
      initialDataOrder({
        onEdit: (row) => router.push(`/admin/orders/course/${row._id}`),
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
        <DateRangePicker
          label="بازه زمانی"
          // @ts-expect-error error
          value={date}
          onChange={(value) => {
            if (value) {
              setDate({
                start: value.start,
                end: value.end,
              });
            }
          }}
          variant="flat"
          className="mt-2 !w-1/3 !min-w-[220px]"
          classNames={{
            input: '!h-[48px]',
            label: 'text-[#616A76] text-[14px]',
            inputWrapper: '!h-[48px] border border-[#E4E7E9] rounded-lg',
          }}
          granularity="day"
          showMonthAndYearPickers={true}
          labelPlacement="outside"
          maxValue={parseAbsoluteToLocal(getPrevDateTime(0))}
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
              orderStatus: value.currentKey!,
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
