'use client';
import { Button as ReactButton } from '@heroui/react';
import Loading from './Loading';
type Props = {
  children?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  isPending?: boolean;
  onClick?: () => void | Promise<boolean | void | undefined>;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
};
const Button = ({ children, className, isLoading, isPending, onClick, disabled, type }: Props) => {
  const onPress = async () => {
    if ((onClick && !disabled) || (onClick && !isLoading)) {
      setTimeout(() => {
        onClick();
      }, 100);
    }
  };
  return (
    <>
      <ReactButton
        type={type}
        isDisabled={disabled}
        isLoading={isPending}
        onPress={onPress}
        className={`h-[48px] w-full !min-w-fit rounded-lg bg-transparent px-0 font-medium ${className}`}
      >
        {children}
      </ReactButton>
      {isLoading && <Loading />}
    </>
  );
};

export default Button;
