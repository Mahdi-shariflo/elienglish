'use client';
import React, { ReactNode } from 'react';
import { InView as InViewReact } from 'react-intersection-observer';
type Props = {
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  threshold?: number;
};
const InView = ({ children, setIsLoading, threshold }: Props) => {
  const onChange = (inView: boolean) => {
    if (inView && setIsLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  };
  return (
    <>
      <InViewReact threshold={threshold} triggerOnce onChange={onChange}>
        {({ ref, inView }) => (
          <div className="h-full overflow-hidden" ref={ref}>
            {inView && children}
          </div>
        )}
      </InViewReact>
    </>
  );
};

export default InView;
