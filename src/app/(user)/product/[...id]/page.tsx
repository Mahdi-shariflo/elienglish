import AddCartSingleProduct from '@/components/product/AddCartSingleProduct';
import ProductPage from '@/components/product/ProductPage';
import { getVariableProductDetails, Result } from '@/lib/product';
import { safeRequest } from '@/lib/safeClient';
import { generate_metadata_product, getProduct, jsonLdProduct } from '@/seo/product';
import { Comment } from '@/types';
import { Metadata } from 'next';
import Script from 'next/script';
type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ text: string; color: string }>;
};

const findProductWithBothAttributes = (variables: Result[], textId?: string, colorId?: string) => {
  // اگر هیچ پارامتری نباشد یا هر دو undefined باشند
  if (!textId && !colorId) {
    const firstAvailableIds = variables
      .map((variable) => ({
        displayType: variable.displayType,
        _id: variable.attributes.find((attr) => attr.product.count > 0)?._id,
        product: variable.attributes.find((attr) => attr.product.count > 0)?.product,
      }))
      .filter((item) => item._id);
    return firstAvailableIds;
  }

  const textVariable = variables.find((v) => v.displayType === 'text');
  const colorVariable = variables.find((v) => v.displayType === 'color');

  // اگر فقط textId وجود دارد
  if (textId && !colorId) {
    const textAttribute = textVariable?.attributes.find((attr) => attr._id === textId);
    if (textAttribute) {
      return [
        {
          displayType: 'text',
          _id: textAttribute._id,
          product: textAttribute.product,
        },
      ];
    }
  }

  // اگر فقط colorId وجود دارد
  if (colorId && !textId) {
    const colorAttribute = colorVariable?.attributes.find((attr) => attr._id === colorId);
    if (colorAttribute) {
      return [
        {
          displayType: 'color',
          _id: colorAttribute._id,
          product: colorAttribute.product,
        },
      ];
    }
  }

  // اگر هر دو پارامتر وجود دارند
  if (textId && colorId) {
    const textAttribute = textVariable?.attributes.find((attr) => attr._id === textId);
    const colorAttribute = colorVariable?.attributes.find((attr) => attr._id === colorId);

    if (textAttribute && colorAttribute) {
      // چک کردن موجودی برای ترکیب انتخاب شده
      const isAvailable = textAttribute.product.count > 0 && colorAttribute.product.count > 0;
      return [
        {
          text: textAttribute,
          color: colorAttribute,
          product: isAvailable ? colorAttribute.product : { ...textAttribute.product, count: 0 },
        },
      ];
    }
  }

  // اگر هیچ حالتی پیدا نشد، اولین محصول موجود را برمی‌گردانیم
  return variables
    .map((variable) => ({
      displayType: variable.displayType,
      _id: variable.attributes.find((attr) => attr.product.count > 0)?._id,
      product: variable.attributes.find((attr) => attr.product.count > 0)?.product,
    }))
    .filter((item) => item._id);
};

// export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
//   const { id } = await params;
//   const searchParamsFilter = await searchParams;
//   const hasQueryParams: boolean = Object.keys(searchParamsFilter).length > 0;
//   return generate_metadata_product({ id, hasQueryParams });
// }

const Page = async ({ params, searchParams }: Props) => {
  const { id } = await params;
  const { text: textId, color: colorId } = await searchParams;
  const productData = await getProduct(id[0]);
  // const data = await safeRequest({
  //   url: `/user/comment/location/${productData?.product?._id}`,
  // });
  // const comments: Comment[] = data?.data?.data?.comments;
  const selectedProduct = productData.product;
  return (
    <div className="mt-14">
      {/* <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdProduct({
              comments,
              product: selectedProduct,
              breadcrumb: [
                ...productData.breadcrumb,
                {
                  title: selectedProduct?.title,
                  url: `product/${id}`,
                  customUrl: true,
                },
              ],
            })
          ),
        }}
      /> */}
      <ProductPage
        breadcrumb={productData.breadcrumb}
        product={{
          ...selectedProduct,
        }}
        id={id}
      >
        <AddCartSingleProduct className="hidden lg:block" product={selectedProduct} />
      </ProductPage>
    </div>
  );
};

export default Page;
