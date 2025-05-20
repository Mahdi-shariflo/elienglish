import React, { ReactNode, useState } from 'react';
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
type Props = {
  showData: any[];
  mainData: any[];
  isLoading?: boolean;
  onChangeSort?: (e: any) => void | undefined;
  sort?: string;
  children?: ReactNode;
  isFetching?: boolean;
  haveAccess?: boolean;
  columns: string[];
  setSelectedKeys?: React.Dispatch<React.SetStateAction<Set<never>>>;
  selectedKeys?: Set<never>;
  nameAction?: string;
  onAction?: () => void | null | undefined;
};
const EmptyTable = ({
  isFetching,
  onChangeSort,
  sort,
  children,
  isLoading,
  showData,
  columns = [],
  selectedKeys,
  setSelectedKeys,
  nameAction,
  haveAccess,
  onAction,
}: Props) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(columns || []);
  const onSelectionChange = (selectedKeys: any) => {
    setVisibleColumns(Array.from(selectedKeys));
  };
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
              {animal.title}
            </SelectItem>
          ))}
        </Select>
        {children}
        {onChangeSort && (
          <Select
            labelPlacement="outside"
            selectedKeys={[sort!]}
            onChange={onChangeSort}
            dir="rtl"
            classNames={{
              value: 'text-[12px] font-medium ',
              label: '!text-gray-700 font-medium text-[12px]',
              trigger: 'border !h-[48px]',
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
      >
        <TableHeader columns={showData.filter((item) => visibleColumns.includes(item.key))}>
          {(column) => {
            return (
              <TableColumn key={column.key}>
                <span className="!font-medium">{column.title}</span>
              </TableColumn>
            );
          }}
        </TableHeader>
        {/* @ts-ignore */}
        <TableBody
          isLoading={isLoading || isFetching}
          loadingContent={
            <Spinner
              classNames={{ label: 'text-[12px] text-center' }}
              label="در حال بارگیری اطلاعات ..."
            />
          }
          emptyContent={
            <span className="font-medium text-[13px]">
              {!haveAccess
                ? 'شما دسترسی لازم برای دیدن این محتوا را ندارید'
                : 'دیتایی ثبت نشده است'}
            </span>
          }
          items={[]}
        ></TableBody>
      </Table>
    </div>
  );
};

export default EmptyTable;
