import React, { ReactNode } from 'react';
type Props = {
  icon: ReactNode;
  title: string;
  subTitle: ReactNode;
};
const CardContact = ({ icon, subTitle, title }: Props) => {
  return (
    <div className="flex h-[202px] w-full flex-col items-center justify-center space-y-4 rounded-lg shadow-contactUs">
      {icon}
      <p className="font-medium text-[#232429]">{title}</p>
      <p className="font-medium text-[12px] text-[#545A66] lg:text-[14px]">{subTitle}</p>
    </div>
  );
};

export default CardContact;
