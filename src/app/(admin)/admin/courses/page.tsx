'use client';
import ReactTable from '@/components/admin/common/ReactTable';
import Input from '@/components/common/form/Input';
import { SearchIcon } from '@/components/common/icon';
import Select from '@/components/common/Select';
import { useGetCoursesAdmin } from '@/hooks/admin/courses/useGetCoursesAdmin';
import { useGetProductsAdmin } from '@/hooks/admin/products/useGetProductsAdmin';
import { initialDataProducts } from '@/lib/table-column';
import useGlobalStore from '@/store/global-store';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';
const options = [
  { label: 'محصولات با فروش تکی', value: 'singleSale=true&' },
  { label: 'محصولات موجود', value: 'available=true&' },
  { label: 'محصولات ناموجود', value: 'available=false&' },
  { label: 'محصولات تخفیف دار', value: 'discounted=true&' },
  { label: 'محصولات منتشر شده', value: 'published=true&' },
  { label: 'محصولات پیش نویس', value: 'published=false&' },
  { label: 'هیچکدام', value: ' ' },
];
const Page = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const [filter, setFilter] = useState({
    page: '1',
    sort: 'createdAt_desc',
    filter: '',
    search: '',
  });
  const { data, isPending, isSuccess, isFetching, isLoading } = useGetCoursesAdmin({
    page: filter.page,
    search: filter.search,
    sort: filter.sort,
    filter: filter.filter,
  });
  const { setVerifyDelete } = useGlobalStore();

  const [debouncedSearch] = useDebounce(searchInput, 700);

  useEffect(() => {
    setFilter((prev) => ({ ...prev, page: '1', search: debouncedSearch }));
  }, [debouncedSearch]);

  const columns = useMemo(
    () =>
      initialDataProducts({
        onEdit: (row) => router.push(`/admin/products/${row._id}/`),
        onDelete: (row) =>
          setVerifyDelete({
            open: true,
            title: 'حذف محصول',
            description: 'محصولات',
            info: row.title,
            updateCache: 'products-admin',
            url: `/admin/products/remove/${row._id}`,
          }),
      }),
    [isSuccess]
  );

  const product = data?.data;

  // const onChangeInput = (search: string) => {
  //   setSearchInput(search);
  //   setFilter({
  //     ...filter,
  //     page: '1',
  //   });
  // };
  const onChangeSort = (sort: string) => {
    setSearchInput('');
    setFilter({
      page: '1',
      sort: sort,
      filter: '',
      search: '',
    });
  };

  const onChangePage = (page: number) => {
    setSearchInput('');
    setFilter({ ...filter, page: page.toString() });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div>
      <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        محصولات
      </p>
      <Input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        startContent={<SearchIcon className="stroke-[#616A76]" />}
        className="!mb-5 !mt-7"
        label="جستجو"
        classNameLabel="text-[#616A76] text-[14px]"
        classNameInput="bg-[#f5f6f6] !h-[48px]"
      />
      <ReactTable
        isFetching={isFetching}
        isSuccess={isSuccess}
        isLoading={isPending || isLoading}
        page={Number(filter.page)}
        total={product?.totalPages}
        mainData={product?.data}
        showData={columns}
        columns={['select', 'count', 'title', 'price', 'discountPrice', 'action']}
        nameAction="ایجاد دوره جدید"
        onAction={() => router.push(`/admin/courses/new/`)}
        onChangeSort={onChangeSort}
        onChangePage={onChangePage}
        sort={filter.sort}
      >
        <Select
          labelClass="!text-[12px]"
          value={filter.filter}
          className="w-full"
          label="فیلتر"
          options={options}
          name="filter"
          // @ts-expect-error error
          onChange={(selectedKeys) => setFilter({ ...filter, filter: selectedKeys.currentKey! })}
        />
      </ReactTable>

      {/* <CreateProduct/> */}
    </div>
  );
};

export default Page;
