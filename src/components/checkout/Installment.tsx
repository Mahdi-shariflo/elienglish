import useBasket from '@/hooks/basket/useBasket';
import React from 'react';

const Installment = () => {
  const { baskets } = useBasket();

  const installmentCourses = baskets?.filter(
    (item) => item.type === 'COURSE' && item.course?.isInstallment
  );

  const getPersianDate = (baseDate: Date, monthOffset: number) => {
    const newDate = new Date(baseDate);
    newDate.setMonth(newDate.getMonth() + monthOffset);

    // اگر روز از دست رفت (مثلاً 31 → 1)، برش گردون به آخر ماه
    if (newDate.getDate() !== baseDate.getDate()) {
      newDate.setDate(0);
    }

    return newDate.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="mt-3 space-y-4">
      {installmentCourses?.map((item) => {
        const course = item.course;
        const installmentCount = course.installmentCount || 0;
        const installmentPrice = course.installmentPrice || 0;
        const today = new Date();

        const perInstallment =
          installmentCount > 0 ? Math.floor(installmentPrice / installmentCount) : 0;

        return (
          <div key={item._id}>
            {Array.from({ length: installmentCount }).map((_, index) => {
              const installmentDate = getPersianDate(today, index); // تاریخ هر قسط

              return (
                <div key={index} className="flex items-center justify-between pb-4 pt-4">
                  <div className="flex items-center gap-6">
                    <span>
                      {/* آیکون */}
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 11C5.80222 11 5.60888 11.0586 5.44443 11.1685C..."
                          fill="#6E3DFF"
                        />
                      </svg>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#33435A]">قسط {index + 1}</span>-
                      <span className="font-medium text-[#33435A]">{installmentDate}</span>
                    </div>
                  </div>
                  <p className="font-medium text-[#33435A]">
                    {perInstallment.toLocaleString()} تومان
                  </p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Installment;
