import React from 'react';
import Title from '../common/Title';
import CardBasket from '../common/CardBasket';
import useBasket from '@/hooks/basket/useBasket';
import { BasketItem } from '@/store/types';
function groupByParent(items: BasketItem[]) {
  const map = new Map();
  const result: any[] = [];
  const parentIdsWithChildren = new Set<string>();

  for (const item of items) {
    const parentId = item.product?.parent;

    if (parentId) {
      // parent هنوز اضافه نشده؟
      if (!map.has(parentId)) {
        const parentItem = items.find(
          (i) =>
            i.product?._id === parentId || i.course?._id === parentId || i.lpas?._id === parentId
        );

        if (parentItem) {
          const mainItem = { ...parentItem, children: [] };
          result.push(mainItem);
          map.set(parentId, mainItem);
          parentIdsWithChildren.add(parentId); // علامت‌گذاری اینکه این parent بچه دارد
        } else {
          // اگر parent داخل لیست نبود
          const mainItem = { _id: parentId, children: [] };
          result.push(mainItem);
          map.set(parentId, mainItem);
          parentIdsWithChildren.add(parentId);
        }
      }

      map.get(parentId).children.push(item);
    }
  }

  // حالا آیتم‌هایی که نه parent هستند و نه زیرمجموعه، به نتیجه اضافه شوند
  for (const item of items) {
    const itemId = item.product?._id || item.course?._id || item.lpas?._id;

    // اگر این آیتم parent یک زیرمجموعه است، اضافه نکن
    if (parentIdsWithChildren.has(itemId)) continue;

    const parentId = item.product?.parent;
    // اگر خود آیتم زیرمجموعه است، اضافه نکن
    if (parentId) continue;

    // آیتم مستقل است، اضافه کن
    const mainItem = { ...item, children: [] };
    result.push(mainItem);
  }

  return result;
}

const BacketItems = () => {
  const { baskets } = useBasket();

  const groupedItems = groupByParent(baskets ? baskets : []);
  console.log(groupedItems, 'groupedItemsgroupedItemsgroupedItems');
  return (
    <div className="rounded-lg border-[#E5EAEF] dark:border-[#263248] lg:border lg:p-[25px]">
      <Title title="سبد خرید" />
      <div className="mt-5 flex flex-col gap-10 lg:mt-10 lg:gap-5">
        {groupedItems?.map((product, idx) => (
          <div className="drop_shadow_cart_backet rounded-lg border border-gray-100 bg-white dark:border-[#263248] dark:bg-[#172334]">
            <CardBasket
              showDeleteIcon={true}
              showAddBasketDialog={false}
              showOtherItem={false}
              key={idx}
              product={
                product.type === 'PRODUCT_DIGITAL' || product.type === 'PRODUCT_PHYSICAL'
                  ? { ...product.product, count: product.count }
                  : product.type === 'COURSE'
                    ? product.course
                    : product.lpas
              }
            />
            {product?.children && product?.children?.length >= 1 ? (
              <div className="border-t border-[#eef0f1] px-3 dark:border-[#505B74]">
                {product?.children?.map((item: any, idx: number) => {
                  if (!item.product.title) return null;
                  return (
                    <CardBasket
                      classImage="!w-[60px] !min-h-[40px] !min-w-[60px] !h-[40px]"
                      showTotal={false}
                      showAddBasketDialog={false}
                      showOtherItem={false}
                      key={idx}
                      product={item?.product}
                      showDeleteIcon={false}
                    />
                  );
                })}
              </div>
            ) : null}
          </div>
        ))}
        {/* <CardBasket product={null} /> */}
      </div>
    </div>
  );
};

export default BacketItems;
