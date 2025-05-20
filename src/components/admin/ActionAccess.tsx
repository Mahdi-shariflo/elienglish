import { Accordion, AccordionItem, Checkbox } from '@heroui/react';
import BaseDialog from '../common/BaseDialog';
import { useState, useEffect } from 'react';
import { permissions } from '@/lib/data';
import { useAssignAccessUserAdmin } from '@/hooks/admin/users/useAssignAccessUserAdmin';
import { User } from '@/types';
type Props = {
  modal: { open: boolean; info: null | User };
  setModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      info: null | User;
    }>
  >;
};
const ActionAccessUser = ({ modal, setModal }: Props) => {
  const { mutate, isPending, isSuccess } = useAssignAccessUserAdmin();
  const onClose = () => setModal({ open: false, info: null });
  const [selectAccess, setSelectAccess] = useState<string[]>([]);
  const onValueChange = (child: { label: string; value: string }) => {
    const findItem = selectAccess.find((access) => access === child.value);
    if (findItem) {
      const newArray = selectAccess.filter((access) => access !== child.value);
      setSelectAccess(newArray);
    } else {
      setSelectAccess([...selectAccess, child.value]);
    }
  };

  const onClickFooter = () => {
    if (modal.info?._id) {
      mutate({ data: { permissions: selectAccess }, id: modal?.info._id! });
    }
  };

  const onValueChangeSelectAll = (value: boolean, child: { label: string; value: string }[]) => {
    if (value) {
      const childValues = child.map((item) => item.value);

      setSelectAccess([...selectAccess, ...childValues]);
    } else {
      const childValues = child.map((item) => item.value);
      const newArray = selectAccess.filter((access) => !childValues.includes(access));
      setSelectAccess([...newArray]);
    }
  };

  useEffect(() => {
    if (Array.isArray(modal?.info?.permissions)) {
      setSelectAccess(modal.info.permissions);
    }
  }, [modal]);

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <BaseDialog
      isOpen={modal.open}
      title="سطح   دسترسی کاربر"
      nameBtnFooter="اعمال"
      isLoadingFooterBtn={isPending}
      onClickFooter={onClickFooter}
      onClose={onClose}
    >
      {/* <p className='text-center pt-2 border-b pb-3 border-gray-200 text-gray-500 font-light'>لطفا سطح دسترسی‌ها که میخواهید به کاربر داده شود را انتخاب کنید</p> */}

      <div className="flex flex-wrap gap-2">
        <Accordion className="container_accordion">
          {permissions.map((permission, idx) => {
            const filterItems = permission.children.filter((child) =>
              selectAccess.includes(child.value)
            );
            return (
              <AccordionItem
                classNames={{ title: 'text-[13px] font-regular', base: 'border-b' }}
                key={idx}
                aria-label={`Accordion ${idx}`}
                startContent={
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-50 font-regular text-[12px] text-purple-500">
                    {filterItems.length}
                  </div>
                }
                title={permission.label}
              >
                <Checkbox
                  isSelected={permission.children.every((child) =>
                    selectAccess.includes(child.value)
                  )}
                  onValueChange={(value) => onValueChangeSelectAll(value, permission.children)}
                  classNames={{ label: 'pr-2 text-[13px] !font-regular', base: 'm-px' }}
                  key={`selectAll-${idx}`}
                >
                  {permission.children.every((child) => selectAccess.includes(child.value))
                    ? 'حذف همه'
                    : 'انتخاب همه'}
                </Checkbox>

                {permission.children.map((child, idx) => (
                  <Checkbox
                    isSelected={selectAccess.some((select) => select === child.value)}
                    onValueChange={() => onValueChange(child)}
                    classNames={{ label: 'pr-2 text-[13px] font-regular', base: 'm-px' }}
                    key={idx}
                  >
                    {child.label}
                  </Checkbox>
                ))}
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </BaseDialog>
  );
};

export default ActionAccessUser;
