import React, { useEffect, useState } from 'react';
import { Accordion, AccordionItem } from '@heroui/react';
import { Product } from '@/types/home';
import { groupAttributesByProperty } from '@/lib/product';
import Link from 'next/link';
import { useGetCommentsProductById } from '@/hooks/product/useGetCommentsProductById';
import CardComment from './CardComment';
import CreateComment from './CreateComment';
import { Comment } from '@/types';
import useProductStore from '@/store/product-store';
import { useMedia } from 'react-use';
type Props = {
  handleTabChange?: (value: string) => void;
  product: Product;
  userInteracted?: boolean;
};
const AccordinMoreInformation = ({ handleTabChange, product }: Props) => {
  const isMobile = useMedia('(max-width: 480px)', false);

  const { selected } = useProductStore();
  const [modal, setModal] = useState<{ open: boolean; info: Comment | null }>({
    open: false,
    info: null,
  });
  const { data } = useGetCommentsProductById(product._id);
  // @ts-expect-error error
  const property: {
    url: string;
    archive: boolean;
    title: string;
    displayName: string;
    mainProperty: boolean;
    attribiuts: {
      displayName: string;
      title: string;
      label: string;
      url: string;
    }[];
  }[] = groupAttributesByProperty({
    main: false,
    attribiutsLookup: product?.attributeLookup,
    children: [],
    propertiesLookup: product?.propertyLookup,
    // @ts-expect-error error
    mainProperty: product?.properties,
  });
  const comments: Comment[] = data?.data?.data?.comments;
  const onAnswer = (comment: Comment) => {
    setModal({
      open: true,
      info: comment,
    });
  };

  const cleanDescription =
    typeof product?.description === 'string'
      ? product?.description
          ?.replace(/\[caption.*?](.*?)\[\/caption\]/g, '$1') // حذف فقط تگ‌های [caption] و نگه داشتن محتوای داخل آن
          ?.replace(/id="attachment_\d+"/g, '') // حذف idهای attachment
          ?.replace(/align=".*?"/g, '') // حذف ویژگی align
          ?.replace(/width=".*?"/g, '') // حذف ویژگی width
          ?.replace(/height=".*?"/g, '')
      : ''; // حذف ویژگی height

  return (
    <div className="container_accordin_single_product">
      <Accordion
        selectedKeys={
          isMobile && !selected.userInteracted
            ? 'all'
            : selected.userInteracted
              ? [selected.tab]
              : 'all'
        }
        // @ts-expect-error errror
        onSelectionChange={(v) => handleTabChange(v.anchorKey)}
      >
        {product.description ? (
          <AccordionItem
            className={`border-b border-[#CBCBCB] font-medium text-[14px] text-[#0C0C0C] lg:text-[18px]`}
            key="interdauce"
            aria-label="Accordion 1"
            classNames={{
              title: selected.tab === 'interdauce' ? 'text-[#83184B]' : 'text-[#0C0C0C]',
            }}
            title={<p id="interdauce">معرفی محصول</p>}
          >
            <div className="mb-4">
              <p
                dangerouslySetInnerHTML={{ __html: cleanDescription }}
                className="container_des_category text-justify font-regular text-[12px] leading-9 text-[#616A76] lg:text-[16px]"
              ></p>
            </div>
          </AccordionItem>
        ) : null}
        <AccordionItem
          classNames={{
            title: selected.tab === 'information' ? 'text-[#83184B]' : 'text-[#0C0C0C]',
          }}
          className={`border-b border-[#CBCBCB] font-medium text-[14px] text-[#0C0C0C] lg:text-[18px]`}
          key="information"
          aria-label="Accordion 3"
          title={<p id="information">مشخصات محصول</p>}
        >
          <div className="mb-4">
            <ul className="space-y-5 lg:mt-[14px]">
              {product?.gtin ? (
                <li className="flex items-start">
                  <span
                    style={{
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                    }}
                    className="lg:min-[155px] flex !w-fit min-w-[80px] items-start gap-1 font-medium text-[14px] text-[#7D8793] lg:min-w-[252px] lg:pb-3"
                  >
                    gtin
                  </span>
                  <span
                    style={{
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                    }}
                    className="block w-full pr-2 font-medium text-[14px] text-[#0C0C0C] lg:border-b lg:pb-3"
                  >
                    {product?.gtin}
                  </span>
                </li>
              ) : null}
              {property?.map((attribute, idx) => (
                <li key={idx} className="flex items-start">
                  <span
                    style={{
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                    }}
                    className="lg:min-[155px] flex !w-fit min-w-[80px] items-start gap-1 font-medium text-[14px] text-[#7D8793] lg:min-w-[252px] lg:pb-3"
                  >
                    {attribute?.displayName
                      ? attribute?.displayName === 'GTIN'
                        ? 'بارکد محصول'
                        : attribute?.displayName
                      : attribute?.title === 'GTIN'
                        ? 'بارکد محصول'
                        : attribute?.title}
                  </span>
                  <span
                    style={{
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                    }}
                    className="block w-full pr-2 font-medium text-[14px] text-[#0C0C0C] lg:border-b lg:pb-3"
                  >
                    {attribute.attribiuts.map((item, idx) => (
                      <React.Fragment key={idx}>
                        <Link
                          href={attribute.archive ? `/${attribute.url}/${item.url}/` : '#'}
                          className={`${attribute.archive ? 'text-main underline' : ''}`}
                        >
                          {' '}
                          {item.title}
                        </Link>
                        {idx < attribute.attribiuts.length - 1 && <span>،</span>}
                      </React.Fragment>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </AccordionItem>
        <AccordionItem
          classNames={{
            title: selected.tab === 'comments' ? 'text-[#83184B]' : 'text-[#0C0C0C]',
          }}
          className={`border-b border-[#CBCBCB] font-medium text-[14px] text-[#0C0C0C] lg:text-[18px]`}
          key="comments"
          aria-label="Accordion 4"
          title={<p id="comments">دیدگاه کاربران</p>}
        >
          <div>
            <CreateComment showCommentRate setModal={setModal} modal={modal} product={product} />
            {comments?.length >= 1 ? (
              <div className="mt-5 space-y-3">
                {comments.map((comment, idx) => {
                  return (
                    <CardComment
                      productId={product._id}
                      key={idx}
                      onAnswer={() => onAnswer(comment)}
                      comment={comment}
                    />
                  );
                })}
              </div>
            ) : null}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AccordinMoreInformation;
