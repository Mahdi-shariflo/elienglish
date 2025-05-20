import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from '@heroui/react';
import { ReactNode } from 'react';
import Button from './Button';
import Loading from './Loading';

type Props = {
  children?: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full' | undefined;
  onClickFooter?: () => void;
  nameBtnFooter?: string;
  classBody?: string;
  className?: string;
  isLoading?: boolean;
  isLoadingFooterBtn?: boolean;
  nameBtnBack?: string;
};
export default function BaseDialog({
  isLoading,
  isLoadingFooterBtn,
  children,
  classBody = 'w-[94%] mx-auto',
  isOpen,
  onClose,
  title,
  nameBtnFooter = 'تائید',
  size = '2xl',
  onClickFooter,
  className,
  nameBtnBack = 'بستن',
}: Props) {
  return (
    <>
      <Modal
        className={`relative !z-50 rounded-lg !shadow-none ${className}`}
        scrollBehavior="inside"
        size={size}
        hideCloseButton
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {() => (
            <>
              {isLoading ? (
                <Loading showShadow={false} />
              ) : (
                <>
                  {title ? (
                    <ModalHeader className="relative z-30 print:hidden">
                      <p className="w-full border-b pb-4 text-center font-bold">{title}</p>

                      <Button onClick={onClose} className="absolute left-3 top-2 w-fit !min-w-fit">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 6L18 18"
                            stroke="#545A66"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18 6L6 18"
                            stroke="#616A76"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Button>
                    </ModalHeader>
                  ) : null}
                  <ModalBody id="body-modal" className={`px-0 pt-0 !shadow-none ${classBody}`}>
                    {children}
                  </ModalBody>
                  {Boolean(onClickFooter) ? (
                    <ModalFooter className="bg-spring flex items-center justify-between rounded-lg">
                      <Button onClick={onClose} className="w-[140px] border !text-black">
                        <span className="!text-black">{nameBtnBack}</span>
                      </Button>
                      <Button
                        isPending={isLoadingFooterBtn}
                        onClick={onClickFooter}
                        className="!h-[48px] w-full bg-main font-light text-white"
                      >
                        {nameBtnFooter}
                      </Button>
                    </ModalFooter>
                  ) : null}
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
