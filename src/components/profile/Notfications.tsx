import React from 'react';
import CardNotfication from './CardNotfication';

const Notfications = () => {
  return (
    <div className="mr-auto mt-5 w-[95%] rounded-2xl border-[#E4E7E9] dark:border-[#505B74] dark:bg-[#263248] lg:mr-0 lg:!w-full lg:border lg:bg-white lg:p-[16px]">
      <div className="flex items-center gap-4">
        <span>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_i_85_21202)">
              <path
                d="M24 10.668C24 8.54624 23.1571 6.51141 21.6569 5.01111C20.1566 3.51082 18.1217 2.66797 16 2.66797C13.8783 2.66797 11.8434 3.51082 10.3431 5.01111C8.84286 6.51141 8 8.54624 8 10.668C8 20.0013 4 22.668 4 22.668H28C28 22.668 24 20.0013 24 10.668Z"
                stroke="#6E3DFF"
                stroke-width="2.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.3067 28C18.0723 28.4041 17.7358 28.7395 17.331 28.9727C16.9262 29.2059 16.4672 29.3286 16 29.3286C15.5329 29.3286 15.0739 29.2059 14.6691 28.9727C14.2642 28.7395 13.9278 28.4041 13.6934 28"
                stroke="#6E3DFF"
                stroke-width="2.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <filter
                id="filter0_i_85_21202"
                x="0"
                y="0"
                width="32"
                height="36.5714"
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
                <feOffset dy="4.57143" />
                <feGaussianBlur stdDeviation="2.28571" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_85_21202" />
              </filter>
            </defs>
          </svg>
        </span>
        <p className="font-medium text-[18px] text-[#0C0C0C] dark:text-white">تاریخچه اعلانات</p>
      </div>
      <div className="mt-5">
        <CardNotfication />
      </div>
    </div>
  );
};

export default Notfications;
