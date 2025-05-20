import BaseDialog from '@/components/common/BaseDialog';
import React, { Dispatch } from 'react';
import Media from '../common/Media';
import GeneralProduct from './GeneralProduct';
type Props = {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
};
const FormVariableProduct = ({ open, setOpen }: Props) => {
  const onClose = () => setOpen(!open);
  return (
    <BaseDialog
      classBody="!overflow-hidden px-4"
      onClickFooter={() => {}}
      onClose={onClose}
      isOpen={open}
      title="محصول متغیر"
    >
      <div>
        <div>
          <Media className="mt-5 flex w-full items-center justify-center" withModal>
            <div className="mx-auto flex h-[200px] w-[200px] items-center justify-center rounded-lg border font-medium">
              آپلود عکس محصول
            </div>
          </Media>
          <GeneralProduct />
        </div>
      </div>
    </BaseDialog>
  );
};

export default FormVariableProduct;
