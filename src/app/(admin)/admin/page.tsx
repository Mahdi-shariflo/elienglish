'use client';

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { PiDownloadSimple, PiUploadSimple } from 'react-icons/pi';
import SimpleBar from 'simplebar-react';
import { CustomTooltip } from '@/components/admin/common/CustomTooltip';
import WidgetCard from '@/components/admin/common/WidgetCard';

const data = [
  {
    month: '1 اردیبهشت',
    totalSales: 5000,
    orderCount: 10,
  },
  {
    month: ' اردیبهشت2 ',
    totalSales: 3000,
    orderCount: 5,
  },
  {
    month: 'اردیبهشت 3',
    totalSales: 7000,
    orderCount: 15,
  },
];

export default function Page() {
  return (
    <div className="h-[480px]">
      <WidgetCard
        title={'فعالیت'}
        titleClassName="text-lg xl:text-xl font-semibold"
        className={`h-full w-full font-regular`}
      >
        <div className="mt-3 flex items-start 2xl:mt-5">
          <div className="me-9 flex items-start">
            <div className="me-3 rounded bg-[#00D1FF] p-2 text-white">
              <PiDownloadSimple className="h-6 w-6" />
            </div>
            <div>
              <p className="text-gray-500">تعداد</p>
              <p className="font-iransans font-semibold text-sm text-gray-900 dark:text-gray-700 2xl:text-base">
                15,556
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="me-3 rounded bg-[#6B46FF] p-2 text-white">
              <PiUploadSimple className="h-6 w-6" />
            </div>
            <div>
              <p className="text-gray-500">مبلغ فروش</p>
              <p className="font-iransans font-semibold text-sm text-gray-900 dark:text-gray-700 2xl:text-base">
                10,065
              </p>
            </div>
          </div>
        </div>
        <SimpleBar>
          <div className="!h-[340px] max-w-full pt-9">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{
                  left: 0,
                }}
                className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
              >
                <defs>
                  <linearGradient id="orderCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6B46FF" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#6B46FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="totalSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D1FF" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#00D1FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} className=" " />
                <YAxis tickMargin={15} tickLine={false} className="" />
                <Tooltip
                  content={
                    <CustomTooltip
                      persianTexts={{
                        orderCount: 'مبلغ فروش',
                        totalSales: 'تعداد فروش',
                      }}
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="orderCount"
                  stroke="#6B46FF"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#orderCount)"
                />
                <Area
                  type="monotone"
                  dataKey="totalSales"
                  stroke="#00D1FF"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#totalSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SimpleBar>
      </WidgetCard>
    </div>
  );
}
