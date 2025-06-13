import React from 'react';

const CardNotfication = () => {
  return (
    <div className="flex items-center">
      <div className="flex flex-1 items-start justify-between gap-3">
        <span>
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="36" height="36" rx="18" fill="#EDE8FC" />
            <g filter="url(#filter0_i_85_21211)">
              <path
                d="M24 14C24 12.4087 23.3679 10.8826 22.2426 9.75736C21.1174 8.63214 19.5913 8 18 8C16.4087 8 14.8826 8.63214 13.7574 9.75736C12.6321 10.8826 12 12.4087 12 14C12 21 9 23 9 23H27C27 23 24 21 24 14Z"
                fill="#8A62FF"
                stroke="#8A62FF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19.7295 27C19.5537 27.3031 19.3014 27.5547 18.9978 27.7295C18.6941 27.9044 18.3499 27.9965 17.9995 27.9965C17.6492 27.9965 17.3049 27.9044 17.0013 27.7295C16.6977 27.5547 16.4453 27.3031 16.2695 27"
                stroke="#8A62FF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <filter
                id="filter0_i_85_21211"
                x="6"
                y="6"
                width="24"
                height="27.4286"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="3.42857" />
                <feGaussianBlur stdDeviation="1.71429" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_85_21211" />
              </filter>
            </defs>
          </svg>
        </span>
        <div>
          <p className="font-medium text-[#0B1524] dark:text-white">
            ثبت نام ترم دوم کلاس های حضوری شروع شد.
          </p>
          <p className="line-clamp-1 font-light text-[#8E98A8]">
            با سلام و احترام، باتوجه به استقبال و همراهی ارزشمند شما برای ثبت نام در کلاس های حضوری
            تهران در ترم یک، زودتر از موعد قبت نام، پیش ثبت نام ترم دوم آغاز شد. برای اطلاعات بیشتر،
            تعیین سطح و ثبت نام در ترم دوم روی گزینه “ارتباط در واتساپ” کلیک کنید.
          </p>
        </div>
      </div>
      <p className="relative flex-1 text-left font-medium text-[#8E98A8] after:absolute after:-left-3 after:top-1/2 after:h-2 after:w-2 after:-translate-y-1/2 after:rounded-full after:bg-main">
        سه شنبه ۳۰ بهمن ۱۴۰۳
      </p>
    </div>
  );
};

export default CardNotfication;
