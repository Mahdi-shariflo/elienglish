import { ReactNode, useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Pagination,
  Select,
  SelectItem,
  Button,
} from '@heroui/react';
import { useInfiniteScroll } from '@heroui/use-infinite-scroll';
import EmptyTable from './EmptyTable';

type Props = {
  showData: any[];
  mainData: any[];
  isLoading?: boolean;
  onChangePage?: ((page: number) => void) | undefined;
  onChangeSort?: (e: any) => void | undefined;
  sort?: string;
  page?: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  total?: number;
  children?: ReactNode;
  isFetching?: boolean;
  isSuccess?: boolean;
  haveAccess?: boolean;
  isSearch?: boolean;
  columns: string[];
  setSelectedKeys?: React.Dispatch<React.SetStateAction<Set<never>>>;
  selectedKeys?: Set<never>;
  nameAction?: string;
  onAction?: () => void | null | undefined;
};

export default function ReactTable({
  page,
  isFetching,
  setPage,
  onChangeSort,
  sort,
  children,
  total,
  onChangePage,
  isLoading,
  showData,
  mainData = [],
  columns = [],
  selectedKeys,
  setSelectedKeys,
  nameAction,
  haveAccess = true,
  isSuccess = false,
  onAction,
}: Props) {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(columns || []);
  const [data, setData] = useState<any>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  // const [hasMore, setHasMore] = useState<boolean>(Number(page) <= Number(total) ? true : false);

  const onSelectionChange = (selectedKeys: any) => {
    setVisibleColumns(Array.from(selectedKeys));
  };

  const onLoadMore = () => {
    if (isFetching) return;
    if (Number(page) >= Number(total)) {
      setHasMore(false);
      return;
    }
    if (setPage) setPage(Number(page) + 1);
  };
  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: onLoadMore,
  });

  useEffect(() => {
    if (isSuccess && Array.isArray(mainData)) {
      setData([...mainData]);
    }
  }, [isSuccess, mainData]);

  if (data.length === 0 || !haveAccess)
    return (
      <EmptyTable
        columns={columns}
        mainData={mainData}
        showData={showData}
        isFetching={isFetching}
        isLoading={isLoading}
        haveAccess={haveAccess}
        nameAction={nameAction}
        onAction={onAction}
        onChangeSort={onChangeSort}
      >
        {children}
      </EmptyTable>
    );
  return (
    <div>
      <div className="mb-5 flex items-center justify-start gap-4">
        <Select
          aria-label="test"
          dir="rtl"
          label="ستون"
          labelPlacement="outside"
          selectionMode="multiple"
          selectedKeys={visibleColumns}
          classNames={{
            value: 'text-[12px] font-medium ',
            label: '!text-gray-700 font-medium text-[12px]',
            trigger: 'border !h-[48px]',
            listboxWrapper: 'font-medium ',
          }}
          onSelectionChange={onSelectionChange}
          renderValue={(selectedKeys) => {
            const selectedItems = selectedKeys.map((key) => {
              const column = showData.find((col) => col.key === key.key);
              return column?.title?.props?.title;
            });
            return <p className="font-regular text-[12px]">{selectedItems.join(', ')}</p>;
          }}
        >
          {showData.map((animal) => (
            <SelectItem key={animal.key} textValue={animal.key}>
              <span className="!font-regular">{animal.title}</span>
            </SelectItem>
          ))}
        </Select>
        {children}
        {onChangeSort && (
          <Select
            labelPlacement="outside"
            selectedKeys={[sort!]}
            onChange={(e) => onChangeSort(e.target.value)}
            dir="rtl"
            classNames={{
              value: 'text-[12px] font-medium ',
              label: '!text-gray-700 font-medium  text-[12px]',
              trigger: 'border font-medium !h-[48px]',
              listboxWrapper: 'font-medium ',
            }}
            label="مرتب کردن"
          >
            <SelectItem key={'createdAt_desc'}>جدید ترین</SelectItem>
            <SelectItem key={'createdAt_asc'}>قدیمی ترین</SelectItem>
          </Select>
        )}
        {onAction ? (
          <Button
            onPress={() => onAction()}
            className="!mt-6 h-[48px] min-w-[130px] !rounded-lg bg-main bg-opacity-10 font-medium text-main"
          >
            {nameAction}
          </Button>
        ) : null}
      </div>

      <Table
        className="p-1"
        selectedKeys={selectedKeys}
        // @ts-ignore
        onSelectionChange={setSelectedKeys}
        color="secondary"
        isHeaderSticky
        aria-label="Example table with infinite pagination"
        baseRef={scrollerRef}
        bottomContent={
          hasMore ? (
            <div className="flex w-full justify-center">
              <Spinner
                classNames={{ label: 'text-[12px] text-center' }}
                label="در حال بارگیری اطلاعات ..."
                ref={loaderRef}
              />
            </div>
          ) : null
        }
        classNames={{
          th: '!h-[48px]',
          base: `${Number(total) > 4 ? 'max-h-fit' : 'h-fit'}`,
          table: `${Number(total) > 4 ? 'min-h-[520px]' : 'h-fit'}`,
          tr: 'even:bg-[#f5f6f6]',
        }}
      >
        <TableHeader columns={showData.filter((item) => visibleColumns.includes(item?.key))}>
          {(column) => {
            return (
              <TableColumn accessKey={column.key} key={column.key}>
                <span className="!font-medium">{column.title}</span>
              </TableColumn>
            );
          }}
        </TableHeader>

        <TableBody
          isLoading={isLoading || isFetching}
          loadingContent={
            <Spinner
              className="absolute top-20 z-[9999] w-full bg-white"
              classNames={{ label: 'text-[12px] text-center' }}
              label="در حال بارگیری اطلاعات ..."
            />
          }
          emptyContent={<span className="font-medium text-[13px]">دیتای ثبت نشده است</span>}
        >
          {data.length > 0
            ? data.map((row: any, rowIndex: number) => (
                <TableRow key={rowIndex}>
                  {showData
                    .filter((header) => visibleColumns.includes(header.key))
                    .map((header, cellIndex) => (
                      <TableCell key={cellIndex}>
                        {header.render ? (
                          <span className="font-regular">
                            {header.render(row[header.key], row, rowIndex)}
                          </span>
                        ) : (
                          <span className="font-regular">{row[header.key]}</span>
                        )}
                      </TableCell>
                    ))}
                </TableRow>
              ))
            : []}
        </TableBody>
      </Table>

      {Number(total) > 1 && !isLoading && (
        <Pagination
          page={page}
          dir="ltr"
          total={total!}
          onChange={onChangePage}
          classNames={{ base: 'flex justify-center mt-10 font-medium', cursor: 'bg-main' }}
        />
      )}
    </div>
  );
}
