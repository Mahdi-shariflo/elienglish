'use client';
import ReactTable from '@/components/admin/common/ReactTable';
import SendMessageTicket from '@/components/admin/SendMessageTicket';
import BaseDialog from '@/components/common/BaseDialog';
import Input from '@/components/common/form/Input';
import { SearchIcon, User_Icon } from '@/components/common/icon';
import { useCloseTicket } from '@/hooks/admin/tickets/useCloseTicket';
import { useGetTicketAdmin } from '@/hooks/admin/tickets/useGetTicketAdmin';
import { initialDataTickets } from '@/lib/table-column';
import useGlobalStore from '@/store/global-store';
import { Ticket } from '@/store/types/profile';
import React, { useMemo, useState } from 'react';

const Page = () => {
  const { mutate: mutateClose, isPending: isPenadingClose } = useCloseTicket();
  const [modalClose, setModalClose] = useState<{
    open: boolean;
    info: { _id: string } | null;
  }>({
    open: false,
    info: null,
  });
  const [modal, setModal] = useState<{
    open: boolean;
    info: { title: string; content: string } | null;
  }>({
    open: false,
    info: null,
  });
  const [modalSendMessage, setModalSendMessage] = useState<{
    open: boolean;
    info: Ticket | null;
  }>({
    open: false,
    info: null,
  });
  const [filter, setFilter] = useState({
    page: '1',
    sort: 'createdAt_desc',
    search: '',
  });
  const { data, isPending, isSuccess } = useGetTicketAdmin({
    page: filter.page,
    search: filter.search,
    sort: filter.sort,
  });
  const { setVerifyDelete } = useGlobalStore();
  const columns = useMemo(
    () =>
      initialDataTickets({
        onDelete: (row) =>
          setVerifyDelete({
            open: true,
            title: 'حذف پیام تماس با ما',
            description: 'تماس‌ها',
            info: `${row.firstName} ${row.lastName}`,
            updateCache: 'supports-admin',
            url: `/admin/contactus/remove/${row._id}`,
          }),
        onEye: (row) => setModal({ info: row, open: true }),
        onEdit: (row) => setModalSendMessage({ info: row, open: true }),
        onView: (row) => setModalClose({ info: row, open: true }),
      }),
    [isSuccess]
  );

  const comment = data?.data?.data;
  const onChangeInput = (search: string) => {
    setFilter({
      ...filter,
      search: search,
    });
  };
  const onChangeSort = (sort: string) => {
    setFilter({
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
        پشتیبانی
      </p>
      <Input
        value={filter.search}
        onChange={(e) => onChangeInput(e.target.value)}
        startContent={<SearchIcon className="stroke-[#616A76]" />}
        className="!mb-5 !mt-7"
        label="جستجو"
        classNameLabel="text-[#616A76] text-[14px]"
        classNameInput="bg-[#f5f6f6] !h-[48px]"
      />
      <ReactTable
        isSuccess={isSuccess}
        isLoading={isPending}
        total={comment?.totalPages}
        mainData={comment?.tickets}
        showData={columns}
        columns={['_id', 'title', 'ticketNumber', 'section', 'updatedAt', 'status', 'action']}
        page={Number(filter.page)}
        sort={filter.sort}
        onChangeSort={onChangeSort}
        onChangePage={onChangePage}
      />
      {modal.open ? (
        <BaseDialog
          isOpen={modal.open}
          onClose={() => setModal({ info: null, open: false })}
          title="مشاهده"
        >
          <div>
            <div className="flex items-center gap-2 font-regular text-[12px]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed">
                <User_Icon />
              </div>
              <div className="space-y-2">
                <p>{modal.info?.title}</p>
              </div>
            </div>

            <p className="mt-4 border-t border-gray-100 py-6 font-regular">{modal.info?.content}</p>
          </div>
        </BaseDialog>
      ) : null}
      {modalSendMessage.open && (
        <SendMessageTicket modal={modalSendMessage} setModal={setModalSendMessage} />
      )}

      {modal.open ? (
        <BaseDialog
          isOpen={modalClose.open}
          onClickFooter={() => mutateClose({ id: modalClose.info?._id! })}
          onClose={() => setModalClose({ info: null, open: false })}
          title="بستن تیکت"
        >
          <div>
            <p>آیا میخواهید این تیکت را ببندید</p>
          </div>
        </BaseDialog>
      ) : null}
    </div>
  );
};

export default Page;
