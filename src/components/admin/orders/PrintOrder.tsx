'use client';
import BaseDialog from '@/components/common/BaseDialog';
import Button from '@/components/common/Button';
import { Order } from '@/types/home';
import { Tooltip } from '@heroui/react';
import React, { useState } from 'react';
import { FcPrint } from 'react-icons/fc';
import { MdProductionQuantityLimits } from 'react-icons/md';

const TypeTransaction = ({ order }: { order: Order }) => {
  const [open, setOpen] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const onClose = () => setOpen(false);
  const totalPrice = order.amount
    ? Array.isArray(order.orderItems)
      ? order.orderItems?.reduce((sum, item) => {
          const price = item?.productDiscountPrice
            ? item?.count * item?.productDiscountPrice
            : item?.count * item?.amount;
          return sum + price;
        }, 0)
      : 0
    : Array.isArray(order.orderItems)
      ? order.orderItems?.reduce((sum, item) => {
          const price = item?.productDiscountPrice
            ? item?.productCount * item?.productDiscountPrice
            : item?.productCount * item?.productPrice;
          return sum + price;
        }, 0)
      : 0;

  const address = order.orderAddress;
  return (
    <div className="mt-3 rounded-xl border border-[#E4E7E9] p-4">
      <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        {' '}
        چاپ آدرس
      </p>
      <div className="mt-3 flex items-center gap-2">
        <Tooltip className="bg-white" content={<span className="text-[10px]">چاپ آدرس</span>}>
          <Button
            onClick={() => setOpenAddress(true)}
            className="flex items-center justify-center rounded-lg border text-[12px]"
          >
            <FcPrint className="h-6 w-6" />
            <span>چاپ آدرس</span>
          </Button>
        </Tooltip>
        <Tooltip className="bg-white" content={<span className="text-[10px]">چاپ اقلام</span>}>
          <Button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center rounded-lg border"
          >
            <MdProductionQuantityLimits />
            <span>چاپ اقلام</span>
          </Button>
        </Tooltip>
      </div>

      <BaseDialog onClose={() => setOpenAddress(false)} title="چاپ آدرس" isOpen={openAddress}>
        <div className="rotate !font-reqular">
          <main>
            {/* @ts-ignore */}
            <table className="rose-invoice-table" cellPadding="10" cellSpacing="0">
              <tbody>
                <tr>
                  <td>
                    <p className="text-center">
                      <strong>شکستنی</strong>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="pb-0">
                    <p>
                      <strong>فرستنده: </strong>قم، بلوار امین، نبش 21
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="pt-0">
                    <p>
                      {/* @ts-ignore */}
                      <strong>گیرنده: نام: </strong>
                      {address.firstName
                        ? `${address.firstName} ${address.lastName}`
                        : address.recipientsName}
                    </p>
                    <p>
                      <strong>تلفن همراه: </strong>
                      {address.mobileNumber}
                    </p>
                    <p>
                      <strong>استان: </strong>
                      {address.provinceLabel} <strong> شهر: </strong>
                      {address.city}
                    </p>
                    <p>
                      <strong>آدرس: </strong>
                      {address.address}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="no-page-break"></div>
          </main>

          <footer>
            <table className="rose-invoice-table-footer">
              <tbody>
                <tr>
                  <td className="print-link">
                    <button
                      className="mx-auto block rounded-full bg-green-500 px-5 text-white"
                      onClick={() => window.print()}
                    >
                      چاپ
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </footer>
        </div>
      </BaseDialog>

      <BaseDialog onClose={onClose} title="چاپ سفارش" isOpen={open}>
        <div className="font-regular">
          <header className="header">
            <table className="rose-invoice-table-header">
              <tbody>
                <tr>
                  <td>
                    <img
                      className="mx-auto max-w-[200px]"
                      src="https://rozesefid.com/wp-content/uploads/2022/06/rozesefid-logo-desktop.png"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </header>

          <main>
            <div className="mb-[10px]">
              <p>
                <strong>مجموع سفارش: </strong>
                <span className="woocommerce-Price-amount amount">
                  <bdi>
                    {totalPrice.toLocaleString()}
                    <span className="woocommerce-Price-currencySymbol">تومان</span>
                  </bdi>
                </span>
              </p>
              <p>
                <strong>نام: </strong>
                {order?.orderAddress?.firstName} {order?.orderAddress?.lastName}
              </p>
              <p>
                <strong>شماره سفارش: </strong>#{order.orderNumber}
              </p>
            </div>
            {/* @ts-ignore */}
            <table className="rose-invoice-table">
              <tbody className="border border-dashed border-black">
                <tr className="border border-black">
                  <th>نام آیتم</th>
                  <th>تعداد</th>
                  <th>قیمت</th>
                </tr>
                {order.orderItems.map((item, idx) => (
                  <tr key={idx} className="border border-black">
                    <td>{item.title}</td>
                    <td>{item.productCount ?? item.count}</td>
                    <td>
                      <span className="woocommerce-Price-amount amount">
                        <bdi>
                          {item.amount
                            ? item.productDiscountPrice
                              ? (item.productDiscountPrice * item.count).toLocaleString()
                              : (item.amount * item.count).toLocaleString()
                            : item.productDiscountPrice
                              ? (item.productDiscountPrice * item.productCount).toLocaleString()
                              : (item.productPrice * item.productPrice).toLocaleString()}
                          <span className="woocommerce-Price-currencySymbol">تومان</span>
                        </bdi>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot></tfoot>
            </table>
            <div className="no-page-break"></div>
          </main>

          <footer>
            <table className="rose-invoice-table-footer">
              <tbody>
                <tr>
                  <td className="bar-code">*{order.orderNumber}*</td>
                </tr>
                <tr>
                  <td className="print-link">
                    <a className="print" href="#" onClick={() => window.print()}>
                      چاپ
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </footer>
        </div>
      </BaseDialog>
    </div>
  );
};

export default TypeTransaction;
