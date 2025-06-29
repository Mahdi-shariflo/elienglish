'use client';
import BaseDialog from '@/components/common/BaseDialog';
import React, { useState } from 'react';
import MediaComponent from './MediaComponent';
import { Media as MediaType } from '@/types';
type Props = {
  withModal?: boolean;
  multiple?: boolean;
  className?: string;
  children?: React.ReactNode;
  onSelect?: (media: MediaType[] | MediaType) => void;
  title?: string;
};
const Media = ({ withModal, children, className, onSelect, multiple, title }: Props) => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  return (
    <div className="col-span-2">
      {withModal ? (
        <>
          <div className="w-full">
            {title ? <p className="pb-2 font-medium text-[14px]">{title}</p> : null}

            <button
              className={`!block min-w-fit !overflow-hidden ${className}`}
              onClick={() => setOpen(true)}
            >
              {children}
            </button>
          </div>
          <BaseDialog
            isOpen={open}
            size="full"
            onClose={onClose}
            classBody="overflow-x-hidden px-3"
            className="px-3"
            title="نمایش رسانه"
          >
            <MediaComponent
              multiple={multiple}
              onCloseMedia={onClose}
              withModal={withModal}
              onSelect={onSelect}
            />
          </BaseDialog>
        </>
      ) : (
        <MediaComponent />
      )}
    </div>
  );
};

export default Media;
