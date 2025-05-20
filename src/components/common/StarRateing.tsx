'use client';
import React, { useState } from 'react';
import { Star_Icon, StarEmpty_Icon } from './icon';

interface StarRatingProps {
  totalStars?: number; // تعداد کل ستاره‌ها
  readonly?: boolean; // حالت فقط خواندنی
  intialValue?: number; // مقدار اولیه امتیاز
  onRate?: (rate: number) => void;
  setRating?: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
  label?: string;
  isRequired?: boolean;
  classNameLabel?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  totalStars = 5,
  readonly = false,
  intialValue = 0,
  setRating,
  onRate,
  className,
  isRequired,
  label,
  classNameLabel,
}) => {
  const [hoverRating, setHoverRating] = useState<number>(0); // امتیاز در حالت هاور

  // تابع تنظیم امتیاز با کلیک
  const handleClick = (rate: number) => {
    if (!readonly) {
      if (onRate) onRate(rate);
      if (setRating) setRating(rate);
    }
  };

  // تابع برای محاسبه امتیاز در حالت هاور
  const handleMouseOver = (rate: number) => {
    if (!readonly) {
      setHoverRating(rate);
    }
  };

  // تابع برای خروج از حالت هاور
  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  // مشخص کردن نوع ستاره (پر یا خالی)
  const getStarType = (starValue: number): 'full' | 'empty' => {
    return hoverRating >= starValue || intialValue >= starValue ? 'full' : 'empty';
  };

  return (
    <div className={className}>
      {typeof label === 'string' ? (
        <p className={`mb-[6px] pr-1 font-medium text-[12px] lg:text-[14px] ${classNameLabel}`}>
          {label} {isRequired && <span className="text-red-500">*</span>}
        </p>
      ) : (
        label
      )}
      <div className="flex items-center gap-1">
        {[...Array(totalStars)].map((_, index) => {
          const starValue = index + 1;
          const starType = getStarType(starValue);

          return (
            <span
              key={index}
              style={{
                cursor: readonly ? 'default' : 'pointer', // تغییر وضعیت موس در حالت readonly
                fontSize: '2rem',
              }}
              onClick={() => handleClick(starValue)} // انتخاب امتیاز کامل
              onMouseOver={() => handleMouseOver(starValue)} // هاور کردن برای امتیاز کامل
              onMouseLeave={handleMouseLeave} // خروج از حالت هاور
            >
              {starType === 'full' ? <Star_Icon /> : <StarEmpty_Icon />}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default StarRating;
