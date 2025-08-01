import AddCartSingleProduct from '@/components/product/AddCartSingleProduct';
import ProductPage from '@/components/product/ProductPage';
import { safeRequest } from '@/lib/safeClient';
import {
  generate_metadata_product,
  getProduct,
  jsonLdProduct,
  jsonLdProductBreadcrub,
} from '@/seo/product';
import { Product } from '@/store/types/home';
import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ text: string; color: string }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { id } = await params;
  const searchParamsFilter = await searchParams;
  const hasQueryParams: boolean = Object.keys(searchParamsFilter).length > 0;
  return generate_metadata_product({ id, hasQueryParams });
}

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const productData = await getProduct(id[0]);
  const data = await safeRequest({
    url: `/comment/comment-page?pageLocation=${productData?.product?._id}`,
  });

  const comments: Comment[] = data?.data?.data;
  const selectedProduct: Product = productData.product;
  return (
    <div className="mb-14 lg:mb-0">
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdProductBreadcrub({
              product: selectedProduct,
            })
          ),
        }}
      />
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdProduct({
              product: selectedProduct,
              // @ts-expect-error error
              comments: comments,
            })
          ),
        }}
      />
      <ProductPage
        breadcrumb={[]}
        product={{
          ...selectedProduct,
        }}
        id={id}
      >
        <div className="mt-8 space-y-5 px-4 lg:w-[288px] lg:min-w-[288px] lg:px-0">
          <AddCartSingleProduct className="hidden lg:block" product={selectedProduct} />

          {/* tags */}
          {selectedProduct?.tags.length >= 1 && (
            <div
              className={`drop_shadow_cart w-full rounded-lg border border-gray-100 p-3 dark:border-[#263248] dark:bg-[#172334] lg:border-gray-50`}
            >
              <div className="flex items-center gap-3">
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.50002 6.00002C7.20334 6.00002 6.91333 6.08799 6.66666 6.25281C6.41999 6.41763 6.22773 6.6519 6.1142 6.92599C6.00067 7.20008 5.97096 7.50168 6.02884 7.79265C6.08672 8.08362 6.22958 8.3509 6.43936 8.56068C6.64914 8.77046 6.91641 8.91332 7.20738 8.97119C7.49835 9.02907 7.79995 8.99937 8.07404 8.88584C8.34813 8.7723 8.5824 8.58005 8.74722 8.33337C8.91204 8.0867 9.00002 7.79669 9.00002 7.50002C9.00002 7.10219 8.84198 6.72066 8.56068 6.43936C8.27937 6.15805 7.89784 6.00002 7.50002 6.00002ZM21.12 10.71L12.71 2.29002C12.6166 2.19734 12.5058 2.12401 12.3839 2.07425C12.2621 2.02448 12.1316 1.99926 12 2.00002H3.00002C2.7348 2.00002 2.48045 2.10537 2.29291 2.29291C2.10537 2.48045 2.00002 2.7348 2.00002 3.00002V12C1.99926 12.1316 2.02448 12.2621 2.07425 12.3839C2.12401 12.5058 2.19734 12.6166 2.29002 12.71L10.71 21.12C11.2725 21.6818 12.035 21.9974 12.83 21.9974C13.625 21.9974 14.3875 21.6818 14.95 21.12L21.12 15C21.6818 14.4375 21.9974 13.675 21.9974 12.88C21.9974 12.085 21.6818 11.3225 21.12 10.76V10.71ZM19.71 13.53L13.53 19.7C13.3427 19.8863 13.0892 19.9908 12.825 19.9908C12.5608 19.9908 12.3074 19.8863 12.12 19.7L4.00002 11.59V4.00002H11.59L19.71 12.12C19.8027 12.2135 19.876 12.3243 19.9258 12.4461C19.9756 12.5679 20.0008 12.6984 20 12.83C19.9989 13.0924 19.8948 13.3438 19.71 13.53Z"
                      fill="#6E3DFF"
                    />
                  </svg>
                </span>
                <p className="font-medium dark:text-[#8E98A8]">برچسب‌ها</p>
              </div>
              <div className="mt-2 flex flex-wrap gap-3">
                {selectedProduct?.tags?.map((item, idx: number) => (
                  <Link
                    key={idx}
                    className="flex !h-[36px] w-fit items-center justify-center rounded-lg bg-[#F4F6FA] px-4 font-medium text-main dark:bg-[#172334] dark:text-[#8E98A8]"
                    href={item?.url}
                  >
                    {item?.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div
            className={`drop_shadow_cart flex w-full flex-col items-center justify-center gap-3 rounded-lg border border-gray-100 p-3 dark:border-[#263248] dark:bg-[#172334] lg:border-gray-50`}
          >
            <span className="mx-auto flex w-full items-center justify-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect width="48" height="48" rx="24" fill="url(#pattern0_9_23323)" />
                <defs>
                  <pattern
                    id="pattern0_9_23323"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use xlinkHref="#image0_9_23323" transform="scale(0.01)" />
                  </pattern>
                  <image
                    id="image0_9_23323"
                    width="100"
                    height="100"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA8Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gMTAwCv/bAEMAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/bAEMBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAGQAZAMBEQACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APnT4B6aZvEnir5fkVGHv/qm/X6/mc1/rj9HynfgTiVtWvmDitP+nTT217K3p6HwfBEebKMb25rPo/hd9dd21d+uiZ2P7PukInxV8UHZxLd3AGR6Nweh444B/wDr1+4cFx9hwLmbVk5ZrUvdbpu/T1t59Ln1fC9L/hMxy0/3io+3VtX+6/y66Hzt/wAFAbMw6hdkgf8AHk/AwMjBHPfr26cDtX8EeOkbcSQXeV7LbVp/lv8AM/M86jy5xWVvtxurX0e+yvrt9z8z6B+Celpa/sh+GJQMmfTYnIxnlmJyePpwD0xX9SY6pzeG3CtG1vZ5NgkvR01rbXyaXddOn2nEcVHhvCedCnf7uzt/wFvqewfBDSzceGtQl27d9yFPuQnPGfU+vBHr06fB2aw2CzWbT97Htp+SVt+3fX5GHh3TvhcQ7PWu0tN7Ky2Wum3/AA561pOk+S+qgpuJspSdwxnCnvg/pzxX61xViViMkrQ6SpVFbfeEul036+Xqj9IzinfKsQnr7kvPaOlkvN7X9ddD81vjJYMdK8SgrgtfT8DvjPp69/8A69f5dcXw5MwzNdHiWkr/AN973T79tN7n8wbYuorfDVqLa1tX1a9L/wBX9L/Y7i/4kGp2YXbiFHwcnpkHp2/U+lf0F9F6r/tWbUG9E6NS3mtLtfKz9UfofBMr4rEQv0jJXtp7zXqv+Dttf034/WqweCYEPAk1KPGMAkAgZ/Qj6+xOf3fxomp5fRj15X6/C73XrZ/cerx37uDprZpu1+mi1vZ7eWr+evjP7P8ApOdYvZCDtk1GQAnHzEIoIA9ffp9eK+h+j6vY+HGaSdlz5piPRpqy9O71/W/p+HkW+Har11rzWnkm/udtfv66fP3/AAUTTamiRbSNl1ARnp/rE9v/ANfev4q+kq78S0XbVqXzt/XTT8j4rPr/ANt10/8An35J7tO3z81ql0PZ/AMAf4D+GnwMDTiD+WP0yMf4Zr7zL4t+EuTNvbC1Ene32nfbVb/c7aLUzzOK/sKi+yl00eu+tvL0ts2fD2vQIda1TaBj7ZJ1znotfgWYL9+vdv8Au4d99ezPkqbahHV7dH/kfq1+zdpiyap4ucxhj5jL0z/yxbj/APUMd6/sTwCkqfBGex258zaV3q7Qa7fd5dT9P4AhzZPjr/zp9b6Jvy30ta+523wM0jyvip4h3RlM3VyRwRn5j+uMY9wO3X9syaXsOBsbFNWeaVH3W977v/hldef2PC9NrA5grbV6lrrza09Pv8j5E/4KJQeRql6H5zYHqcAHr3/n/I1/BXjprxHQdr3SfnrLp2+7rrc/Kc/jy53W0t78X36vp8lpvofTvwd08P8AsdeCDtChtGtmzx3I6+o/HjGc1/TGJkv9Q+H4NtuOUYDTql7KOm39a6H23EkL8NYR/wDTinbe22uuu27+/a6PZ/gpZ2tl4I1C9u5YbW1t5p7i4uppEhgggt4t80000jJHHFEis8kkjKiIGZmVRurg4T4kyjhPhzMc2zrG0cDgaWMqTnUrSUea3wwpxvzVKkm0owinKT0V3oY8BVKWFyytXrTjCPt5Xb6tbJdW3skk9T448ef8FOf2bPAXia58NeFX8T/FvU5JGsLmbwBpVrd6LHIX2SC11nVdR0q31T5TmKfR01CxmcrGl8B5jx/iPGv0yMipqrgMjyKvj6EJOCxeJxEaCqJqzlCjGM2o6+7zST7xWqPta+MxWYUJ4bDYPkp1FJe1xMnTdn1jCMZy17Sae2ljwvxd8evg741tLxb+2+KHw7bVJZZ0ufGnguwOnwNMzKn2mTw14l8QaiiK+1ZtulvIgDkxMUKH+Vcx8V8lzvF162Ip1MDPEVnUfPGUqcJSeq548/uqUtG0kr30e35jiPDnNlOriKMqdbmcpuEJpP3ndWU+V7aWs7v1SPqb9lTw21lDPfadqOmeIfDup2Un9neI9Bu0vtJvDHIwaPzUCyWt1GADNYX0dtqFuGX7TaxEgV/WX0Xc3wlfOsy+rYmlXhVwkakHTqRkppT3jyu7tez7PR2sdHCGXYvLs5r4fF0Z0p+zWkouLbTiuut12ffax3/7SOnrF4V0iLkl9RU5GR2J598+o9MAmv6H8V6zr4SkvKel9bKO2l728vPXVnZ4gxSoU46LVu3Z9bfLTTtr3PPP2fNPCTysynP9o3Bz64AHA9vXpivsPBPmoeGuJW3tMxxEtNFvfX08vzPb8PKb/wBWpNrerP8ATZ2ei0fkfKP/AAUig8u50FdvytcwYAz2kXP1559/Tiv4q+km78SUFfeLb8rtvv5X17nwnEUWs8r3f/Lparpq9fLc9o8ARj/hnvw9KAQBZuoOOOF4H0yO/oc+33uUe94RZRfW1GqvRc9vX/h/uzx65uH6Tequ7Py52rX66dv0Pg7WonbWdVOB/wAf0voOy8/jX4VmKbxCsm/3UNUn5nx0Pgj5q+99/wCuup+x/wCzBYRPeeLZuN32oqBgnP7rOPTv6k8k4r+sPBGrKHB2ZwWzzWab9IW633XS1tNT9Y8O4L+xcc+rqXtrty/lb8d3Y9I+F+mmD4n6syqFL3k5yB1BJ68e/PpnPSv3LDtUuD8XB9cbOXa2v+Xy2XU+54bglhcfp/y+k3p8332tbtv3Pgn/AIKUiNdYvEfORp/05zxk8fh9a/g7xwTef4R/zU4ffdeX9eZ+PcSR5c+rf4oL7tP0t8j61+EFpEv7GfgN3UpGNCtHZzgDbjJYkkDaOTk8fQZFf0ZiMRGnwVk8qk1GnSybAylK+0Y0U3e/VW/DtY+44jpOXDOCSWro0knu22lp3tf0+Z+Mn/BQH9qDXLiztf2afAl/d2XhnTrfTtc+LF/Z3LWo1zUdWiTUNF8FNdIyPLp1pp8tjqeq2gcR6hqtzHazRTW2hrNe/wCavi94i5hxBjpZNhsTUhlWCrVpU6EG4RlKf/L2cVo5yi03KSbjTlyK16l+ng7JFRwlOriffSnJ0oSs4qpe06iTteV706fVWbS96JyPwO/ZP8afF/4Q6z4l+GnhC80jxLpMNxcJHYxi/n1Ty7Z4kkgmYF4n+WWRrYTSQ+dK0ggSVBs/nWtm1GlXdKtUjK+usnpq1zWfVKy183ZvRfqmHyTFYil7WjRkldWap6O9ny3Stvt1voyp8DpvF2rQeI/Dnj7UZ5hoN3NpXiCLVb5tO1DRrxGMEfnedD5sCb4mEMtw0NrKwFvE8rtwp4ilKcEmrTTlGzumuuqb8nZJ2VumpP1HEUlVU1L927O6Sa1stJK2sl9pxTeibdz0P4aftAat+yx8VrTUbSbUtV8E6pf21v458LCeNLfWtKNwUnnjRGW0XXrGD7QdC1drQTQSpJbyL9lu721uPuvDzj/PPD3iPL87ybF1aH1evCVaipSlSr0ZNKrGpC/LOMo35otXlGPKnzcjj5mPy6OMgqlNRpY6gm8PX5eVqS/5cVdNaFVtRafuwlaaUXFN/sZ+0FdaZrvg3wRrmh3keo6H4gt9N13Rb+EOkWoaTq1lDqGm3sSSqkqR3NncwTosqJIokAdVYED/AFfx/GOC464RyTiLAuLpZhg5VZ01JS9jXjHkr0m1a7p1YyjdJKSV1dNM/HeOK/1nDUKji4TanGpTfxQqwvGpB6tXjOLi+is/I574Ead5H2ZiABLe3TEkckhwP065/lX7Z4Uv2XhurKzli68tNrOf6tfqr2PrfD6NuGabt8VSo/x3/wAvQ+Mf+Clm1NR8OxkDAuITxj/noOuSeD16dK/ib6RzvxHh7u94b231fRa39Oz12v8AnnEmmeYj/r1Z/ffy7Hs/w3jSX9m/RSBkiCQLjoOBjpjkDp0znj3+/wAifN4P5a7bRqp/+DO2rWujXy7E4xL/AFap/wCKS9VzO39dbnwXq8IOramSGJ+2y5/JfSvxfMabWISf/PuHW3WX9177/mrnxME1CCf8q77a99vTQ/Zz9le3VpfFuRlxfkD2BiBGSD6/y/Cv6e8GpuHCWP1snmsumuy09Gnv5n7B4bRvk2N6P23Lfz5eXtr+l/mvWvh9ZmH4mX4cZL3Mp9OGI4Hv2JxjIyema/dcS3DhOvZ2vXcvPu/ltb17M++4dptUcemr3nL7tb+T1ta+/kj85/8AgpzbpDrd0RjLacAQRx9fXI5/Gv4Q8bG3nmXyvdOjD5tSXTvsvzaPxbiqPLxBWX96Hr/V7nvaeK7Hwd+wd8NRPIqXfiOy0Hw7pkGJDLdXWqSLFIsKwq8ztFafablvJjkkVIHMccjgI36f4hZzTynwspzlU9nXxOS4LB4ZJrnnVr0lH3Vv7lPmm2rtRi3Z7P8ARM0gp5FlvNsqVKTXflV7dtbO/TSzZ/L3faVr/wAff2tr3wdp2rwmPxJ8Yb61u3d3SQQHXXjvtRuowZgzxWFqy2sMs8rs0SRxuyJJOP8ALPivFRwv9q42Sk7Ks4taqU0nGK1etpWu3sr6M+n4SwU8wr5TgouMY+0o+0S1apuSlUk9LXcXLlvo97bn+kD+w58LvB3w6+FfhvwVonhq1stCttMs7eNjbxCS82wJE8146KpnmkGSxcfKxKhVAAr8IwlapisU511ObqSbk3fd6/8AgK10XVrRJaf0BmdCnhaMIYbkh7KFoRja8YxvtdbtWbd7t3d3cf8AtC/8EpP2PP2h473W9f8Ahx/winjO6Sdl8d/DqZfCfimOW4Lu0k95p8S2+oo7yuZodTtr23mB2yRsuQ30U41aNFSpyqRUbSUYu6bTTu4yTjtqna6tve9/nqGOvUcMRSw2IjNcslXh73LbXlqRcaqbt0lZ3ejuuX+KX/gpj+w98QP2HPiTeaBqGrah4s+Gmqyu/gDxpqCQQahc2lyzM2ia7BbhLWPVLKW2Tyrq2jhs9QtpS0UNtNp00b+hk2aQx86lKXuYqiuapC1lUipJKrB6P4bc0bPlcZPm95JednOSQwcIY7C+9gsRLkinLnnQqOHvUJtq7jz6wm7OcZwTScHKX1f+y/4qv/Hn7D3wnurs+bN4C8d+Nvh1dNGq4S3s76PxNoqO/wBtuZZCmn+IzZWzPBYIllp9tDDbNHEt1df6E/R44hq4rhLHZFXm5LB1Z4rCxbbtTqL2dSMVqlFKnSkkuW0pylazufzH4hU1Rx2IjG7hKftratxnUpR9otVd3qRk73d7tt6tL7Z+DNg62+iSHIEst246ZJMjdvr7/wCNf6M+HMo0vDuhBLVynJ6d5u35bd3vuz7XgOly8MYZLr7R/e7O2vZdb+mlj4O/4KcQFNY8MIMZkliIHp+8Xk8cDg5zj6cV/Ef0i3zcRYVqy/dpu90776dLvXTbb1PzTilOOfYjeypLy6y09fk/u0PZPhawX9mvSSw5SOYA444UZ/Ppj+QxX6Bw2ufwewT1sp1ktdVabuvu3/W9zLEK/Cybv8c0n5J3t6eXr5nwxqah9U1JhtOb2X+S+x69fxr8ezGK+sL3kv3cdO2stN1sfFdI6W91fO2lz9pf2T7cN/wlxIzu1NlB6cCEHr+ef0r+jvCNuPCmL13zSemnZaXu/JJdux+y+GUXLJcd/wBf391rfhb7up7b4RsPK+Is0oGS1y6k8cg5/wAce/Sv3bMKluGZwvo/eXTs+t1r5/ctj9FyGnajjm7353ff+l1S22PzC/4KlbotenG0n/iWKc44wW5xjHI9OK/hfxp1zfLZd6MX8+f8m9n272Pw/i6FuIaq6+69vO1lb/hr36HFfE++1K7+CX7Gun7JpNC0/UNF/tCKJbh0e/8AEdpqOjadvS1SS4kckyxxwp5ZlEsqGeEfv4vG8b82nPBcGZPCo1ToZLhsbWgm7SnXgsPRdvtOMY1klfTmV7KzX2Oa4jmwuUYXX3cCqrt3fuxvfS9lJq9tGnrsfmx8Hf2f/Evh79q74065oGga/rt34c8Yxa1pFl4Zt01HWmsb61s9d1G802O3gmgmlskv5oVkitZrWSQ5t0kiKK/8GeIlbD4FujXmoUqtWcm56QftIc0YyfVObafRW+Z+oeF+Fr4yc69JP2kIUaKkmlOFpyVSScm0moJLu+bfov3Z+EX7aP7e/hrWLPUPg38Cv2gpPhZ4Q022m8W2Pxe8NafrdtqWmzu+NZ8M+I4pNN1qK6gAZp9FtItak061QX+o21nYI89fnc3gcPl88Usfgq04qLUMNKcZRU20kpOHs5OD+OEbOEU3J2tf9coUcTiM0jgauX43D0ZykpVsaqcqcnFRt8OIlWpqroqcpOUa0qihCPtND9mf2q/26Pjj+z78Ffh38XvCvw31TxZa+MNDsNS1nT4fCninxJf+H47i3a7muLnSvDNs9xhIIpmMN7dacxaD7KGFzNFHXn4bMvbVqGGclbE4Z1qbqShSpxhGTu6lSeiUrJJLXZp7s7sRkuBpwzGUIylPL8S6LjSjVrVqicVb2NGMVOfs1JSnK/IleV72Pxg/4Ki/HPRP27f2AvEPxK8Oza/P4t+FF9oHirxDpHin4VeJfhlrmhGZ4LW/GnwazJdRa7oMlpdz6hBe2F3crH9gkjmukmkaG268MqOE4jy6m5U4Vq7nTqU6dSnUUqc4Nxm+SXwt2XvKN7vli3zJ+HjadeXDmZVIUq88NKCqYepWp1aSVWhVXMo88ItTSfwRc9WvfjdSPg3/AIJaaxqHjD9jD456TcWN3/ZnhD4w+GPEOm6i8Ng9kJde8PwWV9psM0UUepxTxPELt47qS40/yrmIWK2tx9s+1f2z4B4yeGzWWFd7VKOPw71tGTcKVdO1lt7O63spvonf+UuP6anVlW0/eYehUS3tZyg9b6322s7adD9T/hbYCK28MnBGYp3xju0rdQOpx1P4Gv8AVngh+z4Cw0LJXp3b8m3/AEu97vsfdcF0lDhrB6b027Wtu9dPT8NfT86v+CnCMviLwuuzJZo8D0/eL6n6f55r+IvpDu/EOE0velFvrffXTyf4H5PxWks+xF9uRP5a+Wun9X0PVPhlHn9mnT8j7vnDGOnyjv2H4V+hcJtPwdwz7Vq9t7fH5Wez273uZ1Y/8Ys+3tZrvs1fTS/3fdqfDd+qrqGoYJ5vJT0/3R6+1fkuYxSxCulf2cN15yPiOTSNmrKKWvzfbzP2u/ZKG7T/ABTKRgjVmUHPP+qA+pPX/wDVX9EeFDa4ZxSslfMar222f9dj9o8L43yTG66uvL7uW/8Al10v6HvvhmHy/HfmFSA11yeuck9+uf55FfuOaSUuHpRTTtTutbWstreXfyP0fI6bVPGq2nO73a79LvTTr1Pyj/4KrMRr0uTj/iXKB1weT29/ev4e8af+RplVt3Qj1686t+h+HcYxtxBUS7JLRf1vpa9um56roPgFvH37C9p5Nusmq+HdF8L69oTyxfN9u8PwWOsRrBLCRMEcRTRO+5WXfLkCJC7fmniniHic+wdNtNUOHcnoQ6Wth3WW7/nqt6W9L3Z62Pm5VMJK91DBYaK30i4SbXz53fRLu+3zx+yr8Z/Dnw6/bf8AE/iPW5U03T7/AMNeDLe6uZlYxQ3N7HrEbqFucvHCH0m2swkw3xRxQRS4IIH8j+KmXrGLDScJTjFRk42tdw5k5NLdR5lZJO1lo7K37d4KYin7bHYapKMfaJKDk0k3Nr3Ve1m/ZvXd6rR2P6Df2iv21vhd4T/Z31PWfBfhnV/Ez6tcW+k+INV8AaK+u6npcE1tc30lzJpmlW73U4aS0t7OR/LkW2kvY7m5gdYmUfiSwmFnD6lh8PTouUo+2quappqLVoXdr62bcm1fo27n9IUcunhccswxWKlVo0YTeEw6hKr70Vy3T5pJKzlyqCTbStKKbv6h8G/23/hX43+HnhXWfAOg+OfEnh/QPDNhd+L31vwNr1hp2m6Gl3BY3cser6hpaaRHrOi3UsN1eaVNPJeG0tr6RLIrGlxFdZU8JOhKNJVpYeHLiIydOcfZOSu6bi58ri3Gd5pxlaS5esankEsfLEfWMTRwzxz9rl86U6lGo67pc0I4mnJ06koVYxqU/wB04uEp026tuaL80/4Kr+IPCPxN/Ya+KXhr4Urpd3rvxXsPD3gzwhDbrbyfate8deIdH8OWctzNA7JBplpDqc93rGoKJE0vRrW/1OaMwWkiH3MkyrD4/iDLp5bSlzzrKbTd7R3nKUk5WUYxd9PdSWiSdvzbiH6zkeRZnLNq1nSoVMOpe/aUpJ06fLGdnJuTi0rK7btd3v8AmZ4N+BXhT9k/9kqH4P8AhVp72Cz1HQrbWtdlzBP4k8Z6jGNX17WJbNr27lsBNY2ejltGlzFpbyJBasNtxJP/AHf4QZVGjn9GlT1jhcDi69WdvjqSjClKT35XKVVW10iuXU/jfiTGzxsMRXnpzKEKcN+SnD4YJ6X5Yq7bV25Sejdj1T4e2m2y8IkDBNhvIAx94ltx79D7cAHp0/094XfsuDMPTtf9xTd2+92l5dvX1ufr/CdLl4bwUdr0LpX201vtfe72u+h+ZP8AwU6OzxT4WBzncnHHIygyR1H+c1/EX0hZX4iwltP3Efzaa7en/A0/HOLU1nuI7+yS8t01+fX7j0n4Yy7f2bLbqSksw9f4B2PHTnpx/L9C4MfN4P03/Liq601+0vR799uxlPXhefdVZeq1u/Ltrqj4bvzm/vj63Up/lX5ZmMHLEXSb/dx/OX91/mfFtJKKX8q/r5n7Y/shYfRvE754/tmTr/1zAOfb/PFf0P4XLl4ZxFt/7Rref8v6a+vkftHhbG+R4p/9REvv5V991otOiPpLRFRfGUbDobkE9uuc/TkV+xY9uWRyX/Tqy80ra/K7ufpmTQ9zGabttLTuuno9v+GPx9/4Kt3Sp4jmQnkaap655zxx+WOORx64/ivxq93NMoWr/wBni7af8/F0u9dv6tf8H41TXENWy1Si/wBFZPz163bPuX9jG0t/F/7P9h4Lm+zR3DeB/Dup20ckgzPa6lps1gJJYJFlhcfabCePMsMkLqgSROd6/mPihh5UM9yyq07Yvh3J68XpZpUp0nbTSzpbXejT6s9PMaTh9TdrKpgMPKL21SlBtP8A7dV9NLv0Pxx/aO8My/s2ftI+GfFPiywkPg7xFMug32ozwO2madf2uoC+8M319JOv+kafFqCXWnaxLOEieHV55WeGGLzW/nrjvKqmPy2c8PdVKcZtWs24uKjOK1TvvJWs09tmj7Hw4z2nk+dUniHH2NWcYScn7sZxmpU5uLVnHmbjJbcsm/Jfr/qHwm8U/EfT/C3xd/Yr+Jfjr4YWOvLpF/42+FGiXHhfWvCE2qSQRjVLrR9P8WaPrCaLfC+juYLmwtby20u4eMlbeBmD1/PGWVqGDxEsJm2CeIhSc6fPFzhXU03yu/OlKLVmlPWz+JPQ/vTw/wA34SeeYPH8XYbG5hklSFWNSll1PBznFyUvY1HRrwSnyS92tGjWoTcVzx5pwTl+ifwe+Gn7T/icGP4m/Gnxj4R+H9poUkeu+H4/ht8HfDus67eurCRh9i8Lazpen2E4IfUb0PJeX5aZIYNPjdHg3zvGZT7GNLBYSrTq7yq1OaHLFp6KPtZqdla2yvraS9w+043zzwgo5JTw3CXDNatxJUx/PHNJZhnH1DD4OKVqdSGLzCriK+JlNSjSo0qVDD4ZRVRV681KM/BvFXhXwNBrfh3wN8OJmvdP0bxTceJZ7FJnvrT7RaRX1rLZS70Fnb6O9xfXD6/Na/ZPs4aHT9OtLy8uPsT/AKF4R8O4qCrZ9jYShSnCVDL41FaUlOSdavFWVoRsqUGrc7c0leKb/iDxv4vhja1HIaE4yq0nTrY9QacYOMLUKM7OXvTT9rOMnKUOWm27zaXEftR2mpXPhfwro2iW1xqtnpGo3uoeI9Rtw10H1O9VZ3mnf5pVE0817clcm3gS5hgiESIkSf214QvAYfF5rVxGKpU8VXoU8NhaNSTjOUVNyqSjdcrUpOCSUnO8W3FJxv8AzDmXNOlGnH3m23NK79Ha1nre/mO8I2sdvH4Rj27WXS4cjoclBkEduvbHPc1/oXknNHhenHdKjR6vS8V/m/TyP6A4egoZBg1qmsOl98L/AOfXSy+f5N/8FN1ZvGfhtSSVwvHoNy5/M/56V/En0gv+Shwf/YPF901+jWv3301Pw3i1/wDC9iO3IvT4vz/Sz6nofwskz+zgiEkYuJVBIyeYx1/Ijr6V9/wNJS8IZRs244ytFq/dp/LvqZ78MVf7taf3NLZ/NXXT8/jG/hBv70gZH2mXnbnv3NfnWYX+saJv93H7TXfz/E+Ll0/wo/Yv9jq+EnhzxKT21yUHnr+7GOv9O3Wv6I8LaV+Gqz6fX634W19d9/wSR+2eFf8AyI8T/wBhMv8A0n+u3p1PqfSXVfE8UoPPnrkHseef1z6e4FfreMUnlM4O1nTlZ/1/w5+n5TFKOKT3s01be7Wu6vro7bfcfi7/AMFW7vf4su0yABp0WMHoCckde/8AhX8V+OMeTN8nXfCr7+dXXX8LL8n+Dcbpf6w1VbTlj53tf79lqv0R7X+yL8aYPBHxA+C3hS9a3W01r4A+Gp7eGctDNe3UOt640yWdwcW7T28CeaIpGjmAy0E9vGbqaP4bxhlGWI4RVlGX+q+E9/rNOpPlV9Pg5ZdL++exm65sHlE0m7YGCbVtbt79mtbfmrq/6MftifCj4bfFf9nX4qax4h8DWPi2+tvh74w1XRIY7SKTUzrWnaBd3mm2drNHG8kdzc30cNvF5gESuHifCtG6fiWJhz0a0JR506c0oNaSfK7JLZXfX536njUZONanNS5LVIe+m0lFSV21ezSV/J7+Z/OZ/wAE/v2rf2nP2eV0rS/DWi3/AI10m+gtLb/hF9Xa8hLiGRDHDFeBHls7yzmQwK0kMjQput7hJI1SOP8AnLNqWCnVqVKzVOpSnKLkn7yabXJONrytayTtZ9baH9V8KZvmOCo0YUIRxWHqwi/ZVG3G7ilenNXcdGk37yaeqvFM/cr4y/tg/th+KPAfwysPGeg6J8E/CfxG+IHg3wbrFv4e1C81zxrfaN4h1qysdTkj1i4ttMstDX7DPcpALSynu/tEkci3IjjaKbxclpYDNuIMtwNSnUr4eriqNObqe6nGVSKmlGKTbabUXJtJO/Ltb3uJc2xODyLNMww8aWExWHwdarGMJ+3lGpGnN03zSgkrSUZSXK22l78dWfSnw3+Fnh/wbc+KpbTdZ/8ACSanDdRXGq6jcajqSaRYaRp2madZIbiZZbeJTb3N48bC0Q3uo3V5cJLqH+ky/wBV0KVOhCNKhTjTpwjCFOnBJU6cIRUIwj05Yximoxstdup/G+Ir1sRVqVsRUlVrVZTnUqVHzVKlSpJznObbvKUpSbk3bz0St2viPVI9I0K4utH8Oah4rYohistEfw+t9cxyBQ81sut6tpNgzbfMke1S9EzA7FSSZlRu2jiKuHkqlNyUotSXJK0k1r7rurNPVO++3nzOkpStzKOqabTte27aXdbJdOiWnyn8Lvi14c+Mer6rqPhPTtRsYfC3ibWfCeo6ff2Rs72y1HRrg2t7BdWiGRLSWG5WSJoBIxi2jeELbF/vzwG8Qp8V8E5jl2bVorMMlq0sO69aSpzxWFkmsPUfPZSqR5J06jje7gpu3Okfs3DGIq1sqdCraUsMoxjONmp05QvB6aJpJxbt7zWmh+ZH/BTCGSTxxoCeVIAFXIKNgfODnJHuPpX4X9ICcJ8Q4NxnGS+rx1Uk1o9tL/1c/GuLYv8At3Euz+GK2fdvfz/TyOq+FVxt/Z5njfrHdkKDwQDGMZHqefzzX3fh5Pm8JsUv5cwqW8rpP8l+O5zRv/q1iU7q1aXfTTb8NL6XZ8kXsn+m3ZBABuJDjjuR6/5HSviMc37f4vsR3aXTtZ/mfHS+z/hR+rP7GN9v8J+I5Mj5tdm79cR4/n9f5mv6U8J6XNwxWf8A1Ma60S0ba622t2X52P2/wtVsirWVn9Yl23t/n37/AHfVcPijw54b1G413xbrVhoHh3S997q2r6ldQ2lnZWVuDLPPNcTOkcaRxqWJZgABz61+icVY6jkvDGOzOvUp0qeEwdWq6lSUYwXLG95Sk0ktNb206WR+s5BHCvFNY2tDD4Z1F7erUmoRhTVueUnKySUU76/frb8Hf+Cj/wC3X8BPiZr2paZ8C/hnceN/sdutjcfErxVLqFjol5coSrvoWhhrG4v7MjmDUprmGGbAeC3urd45n/zh488WMHnteEqWXU8wxGFjKnTxlbnp4eKvzJU6cHB1Ut+dtJtKylFo+Z4wxvAdbH1FkmSxzCsk4zzLGVqsaEnG6vRw8eWdSN7+/OdJaXipRaZ+Vfws/aM+Jo8U2HjrxBrt1qQ+HepaHo+n2ZSFbHw7oUjXU9lp8NjbJaEabd3ttMjmW4ZzdW9qv2q2nkF2PzDM+K814jjDE5riXWq5cqWFwtOMYRp4fB2fLSpwjFPlU4q7lJy01ldykfn+NqfWXSpzUYxVOUKUIR5YQjF35ILV6XTV29G9XZo/p4+EH/BRX4T6I/gbw58Wft/hjw1460q0g0TxXqc6ah4D12PUdOhS40ptehRrW2v43vntLnSdQSDUYpDbpPbAefWH1mlJR5moc6XLNr3G7XtzX0e94uzV2fPPD1E58qU+RvnhHSaV5auD6dU1pZWva59s+E/gf8BrHWpviF8PNI07VIdSv/7cDaLJaTR/a78+ZPcCK3BigS6lDy3HkxhZbjzJzF9oknd/g+JvDzBZ7XnjcPi6mXYusv37hD22GrSs/wB5Oi5wcZy055wqJSu5ODneUvvOGvELHcP4eOBr4enmGDh7tJSnKjiaME78kayjUUoLXljUptpWjGagkl6b4k0O88QeIYNb8QWtrremWs8N1oGjXtm01t4f8i3NhC+iyPBvg1KFZWuZL+1+zTTTS3Tx3EVtNCbf3eHuE8qyHBYPDww+HxONwzlWnmNShS+szxM041KkKklOpShb93CEZ+5SjFNuTbfh57xVmmdYzGV5YnE4fB4lRpRy+nian1eNCm706U6cHGnVlzL2lSUoe9UlKSSjaMfSbFtASMyzWc0kwmMixO8DmAOzNlX+zpuAbzC7O2JAVIEjGWNPp22uy11ffS7fTfbZ66XWh80rPZ3tqr62b128unzWh5J8WvizovhvTNU8L+DbhJPF93o3iH7HJb+Q9rol3YeG9S1yS81CR/8AWyWi25ni03c0k8hjJEVpPJeQzPmcJtPaMnrq4uKk1p52V/XXRiTXMo23kk7WS3V/wet7XSdtT+Yz4A/tbfFr9mvxI2v+CPFMl2t5eK2seH/FVu3iTRdcIkE9yLxb+4aeJ/3rGa7025tZw8kriba7q/z8cZjqNOpTwuZZhgXPRzwmLrUXdXabUJqM+W+0k7X0erkfY5VneY5RV58JUg6ba9pRqxjKjUit4uLScW9bcsk7Xu7aH9HX7K37XH7EX7eC2PhH4v8Awv8AB/hX41G0YWOj61BbzaP4kuYYwZX8L6s8cPnyru82TSrlINRiUSPDFdW0LXR+G4gxnGFKX1uvnePzKhBWhWq1qlSpSin7qkpOTjbum4vbmvt+rZJmfCnE9SFHHZZhKGYytzQq04ONb+Z0aunP35JJT3fLZNnyJ+1J8MbH4O6p8QfCem22nWGntqK39jYaZGYbO0tLpSbeCOPnBSMAMOmenev7r+j9mmKzTwTzCpi5upWo5rVp87d20krXv2XbqfmviplGW5Nisww2VUVQwtSFCqqaSUYznTXPyq2iunbsna9lr+RF3IftVz8w/wBc+M49fetcZ/Gf+GP4o/CJ7r0/zP0y/Yr1QDwT4iZn2qNcmZmJxgeWCSc9APX9BX9R+DlFT4VryumlmWI1toknd3d9Utbt9OvQ/b/DFpZJXvp++lZvb4Uv+HPzK/b+/anf4hfEu0+DfhK9lbwr4f13ToNfube5K2euarLPeJd2zCNttxb6QtlOhEytCt8HcRma1hmh/lH6TPiw+IM5hwNkeKn/AGNkdVRzapRqWpZhmaafsJOLtOjgeVxlGTcXiG7rmoRkdud4+VWdTC0ptUYOTq2bXtJxtaLS3jFvXVptq+2vwN4k0WO9RYYbctDJuUgBpCs0kTMCAGZy/mBI1ByQX+XPzCv5Lm252bvG+tltfVW63T07+p85F2Sto977Xs/PR6fLe9tz5TsvFGu/BrxnqGoy6JbaxoGs240/xLoWpW5ubTUtHeYO7qmUK3MGJGgk7b54SNsrEcqq1MLVc4q8Jq04u0oyhvs3q1rb5p26bOEK69nflavKElo4ysn62eq007Nbn6ffCDxj8BL/AMItoD+PZLTwFrdvHPeeBdQ1fXPEfh+GWUStLPpOk+J/hrqUlpcC4kgkMlh4l+zRIZTJGFtPNr2sNUw8oOKn+7nr7Nyk4r056Ta21tOz1sefXp11JScLzi/jUYxk9Oso1EmraaxV9up9G/DLxNH8Mzdt+zR8cvjFpbTJDNp+l6g9pd/D6JIrhLiK3tNN1a2udVS0dGSIDT9S0O2MMt3bSNLZSXHm9cLx/gVK1m01CVnTXykm0mmtItJao5p80rOtTp3V7yjdVHp1cXZvveLtsfZHhT9rX/goZd6dKlzafBbVdHsXhe+8U+JNG1zwbpWnQSs0aXWpat/wkjaRpVtgqkk9ytnbJLKGwG3xSbKeIWrjRslbmfNBK97N++7K+n+LpsjNww7aSdW/SK5Z79/dW+u7Vrdz7n8OX/7Z+r+IBovjjSfgtoXhtdL0vUz4l0XUfEepXU5u1me+sdM8N3drapI0KW8bQ3N7rEBSC5gmMcrL5EXRFVeZuXJbbmXO23reKTS02t72zvZvR4t0krxdS+yjJRWmnXXfrb10bRwf7eXxQ0L4E/CrV30KCJ/GXirwzN8NtE1K4VYbgzeMbTVLrxt4htFMEa3c9r4f0XRIfOgYw2eo3+irAsbpfWcnLjqvsqMkviqXpx06ON5NP+ru3Z30w1P2lSOqtD32lom01a9tPv6J36o/mltbiNp2klBPlpKIXZiAC7fvGZxAEcqMqwAQsASGDYQeDGDlZ20vrfs+7atZLW6+Wu3rt9L/AJbJK2zfVa6+a3afpGi6rd6Bc6ZrWizXGjarp09rqOmajY3ps7uw1WznjltL6zbzHeK6tZoxNFgoVcxlZkyDVSpKcZUpRUoyi4zjLWLT0aad97vo76XaQU6tSjUhVpTlCpSnGcJxupRlF80XFq1mmlqr67o/Ri5/aw1/45aVfp8UL21PjqXS9Ot4r2KPyLbXYdPtFia5QZMSX7gGS4to3IOTLENokig/pbwQ4jyLKeDs64MlUeFzCvip47BU6r/d4mnJe/ClPb2tK13SdpOFpRulPlz4szfF51h8RicY4yxCo0qbcI8qapRUeZ6tXb1dtN7JI+VbtpPtVx8v/LV8E55GevAPXr9a+mxn8Z/4Y/kfl87R5VeXwp6NeZ1g/aQHwS/Zw8XTafeeR4l8U65PoeiSK2GsjdRKl1qecNsFnAzvHIyMn2lrdGRhIFP6FmXiRHw98Fsyq4Ooo59nma4vK8oSa5qM6kG6+Nad9MLQUpxbTi6zo03b2iP1jg/GPBcOVlB2rVa84U+6fLrNLrypX7bLdn5I6PKl98W9L23U09vaR6hqN/LO0l3JPLHbaoqtNJJ+9kZL6+iHmSnzCZVMjmU7q/z7qVZVq8qlSc6k6kp1Ks6jcp1KkuaUpzk225SnLmcm223713c0bfs5Nr3pS310u029tbpPbW60R9MXrRHToPLlSCcXixQSBY4/KYIxhkkVwQxQKpCkhtm4Mud5F3036pdnZLfr2X3J7mCu36xe6b36q21+vm3bseP6/oOkeM9Ga7dY3mjklglOEeWRoZHR0dyseAzK5YOu7P710UHaqqKMoRaSs76bbflu013u/S4OUJNeSaeu2nT7ttraM800P4b+K/BGrafqvgHxrq/he21C58mWCFhNaLLcRSFJHtJg8EkTSbVnVV2SAgOCQCcIRlSkpUqs6XM7OK1WqdnZ30u7Nd/Q1nOFRctSmpu2j0T0ffdPbXvvuz6k8O6P+0n4m8C+PPFj/tBeHvCFp4G03T7uXRrSe08O+KfFD3xkg+z6Stppcs0920VpMbeKCYJNcRxWiGIRzSQOvj8XSq0qDnUbqO16cIxSSfxSly6tauyd0ld+ecaWGfvKkmrO/PJvzS5eZd7dm2u59t/srfArxx4g0i48b/GXxv48+J+qeJvGXiLTPhtB468VeKPE1t4V8JeBbTUNW1XxPo+latdxR2N/4g8bWdhow1XT5Y3WOy86xuLS9kuJE9nAUZzbrV6k6jcpRh7SUpqMYXcmlJ2XNOKTaadlvffzsXWgnGlShCmlFSn7OKjzTlok3HWyjd20Tvrokj+mKS7tXutftJpNzRWMVoWMZBaKysLWON2mndxPC8cZjVmYW8b73ZnMjeZ7l0uV6dGtbX1b7b7f0zzGnd2XZL0enn97ei7aJfzq/wDBVSa9m/aI8MNc6xqH9k6j8K/COq2FhPeXclnpUaan4h0bVl021llS3szfXOlRXV09vb273bwwPdEuvmV4mYXeISu+Vwi1dt2u5J6Xsr2Temr8rHoYSN6SfL76qNN+T5Wrvd2d1bR+W5+Z2s+ILDSrO4iiDACAMkEUfn3FzMqsysZC3nPJI6B41QRoj5DbV3OvFKajHXRJeTb1vv8Adouu+x3Ri5Nddr6tJJvd7pL1123PnS88WfELX9VF1pJOnxRN5FqmqT3K6fGkgEayPAiD7XNLk/vGwiqqCMcFzye0qVHeNknp7zdlfa+l311/yOlQpRVpave8UnK67draep694W8Y+PtHudN0rxpbW8U5vpWW5srrzmCId1nqWmMpbypIiNvlSqhdQ6tmKaQ1th8TicLWhVp1PZ1KU4zpzg3zQnFrllB20aaW+3W6ZjUpUqsZKylCcbNSW6e8XbTvtazV1qfami+JLTUtOgu7i7t/PbfHM29UDyQuYnkVGbKq7IWUZPBGCRzX9CZLxngcxy3DV8fiKdLGQh7DERlOML1KWjmk7+7UTU1Zve17pnwOY5VVp4qcaVOcqdk4WV7RbbUW7PVddvRHwp8bPFEF54dNjuu7+GGB1sGtZYRa2t/e3Rlna6cSkeS1tYxOq74bgzKmLaS23TN+V8e8VVs9xVDL4VHLLconio4SMZXhOtiZxliKrtpr7GnGNraQbi2mfZ5Lh6mHwlGlU0fNKo421XOlZbK8mrXbuls7O5538K7iOfxh4i1Npow/2SPT4A0g84s8y3M529llEVusJz95WC/6tjXxFJKU53enyTvvf5q266O1rHpVW4xhZa313eysl079uq9D3fVL9B9itkny63MFy26SFSUgikj2KrkMw3SFlRWYSB1O41TT0Vtmm9lt6777Lcz00e/TTXf09DlNJvY7HUrzTnkjjt7qa5uBBI+4h7mdnYmMj7heXcDhiu/gFc1pFqLs7W1su1+npZrVaO6v1vMk2lJXb0u9r2VvvXbdWOj1qBrTT5LYFvtVm6XcaMxUM0EvnJAvmoMbtjQsrpuPzbiASEHGycmlpqlvqndNafLo/S9wTTaWuu7tbS1nez16vyv5WPQZr6Oe3sraW3j05njtVt7mLVluE+eGJFmls5vtcELjY3mAWqHbnzQHAdm/e02vZ/Feyflr33aSX5pJpaO71W1r6vro9Oybeh+8Xwa8NjQvDPw6kuo1gGmeBNJ0O1SWIQuEvda8IvqF/dxz2UEUN3rNxe6veXMd1plvJdEtPcwLPcXpX3aFoU6cf5IWd7LVpN3Vk7vVvS93fS+nj1LzlOb2lJttPRWbSSs9EkktN1Zaux96zeIwmp6xNCUYTRRPGyM6pMPsyls+UIzMFmU4Eclw6fu4/MhQDbtzqyT0afR37a76eevS6Su0Ryq+j02tfbT7kla7tffc/Dz/AIKdXNhL46+F2sXsNmDL4B1KwEh1JrIzx6Vr1/fNFE0KmGQxvqhVylu6y/aUIuHKJI3mZhNKcJO2sLXbtdpy0te29le3Zndg4txlZuykr3Sau0vxt310turn5SarLpVnpFxqMVtY3GtwXSWVmlxrhntQGiF+9zJbqLWTe1uk0ayi7UW7bUWJppia8qc7puyfK1bVdr82vLuk/Lolc7oRalZt8trt21XRLqt3fZ+tjzLwx8U4fEenz6B4qs7WTVbSC3vPDmr28YjmlsABGbbUC8z7rzTrmOazupBKo8+284xLHOFSIVFUi4z0ainCWqfL567xas9Xrq7bLWdJxalFvlfMpK+ifdabNXa7rRs9Olaz8Sf2RcpJFbS2E6K11Kw+zKHZWVLiYbQkrOQtuE81pRG4SHzHq5K/K27JPfS3T7t136+hCduZdLXt96du/Xa2+9mdRpNzoH2eRNQvrzT7mK5njaGKVl3jIbznWG3vY1LuzBEDxFIEhRo5WU3d1cbpdVrf4lHfy/XTT73Mr30Sl58r08v663PjDxhLJLfWlnIxa3udS0y3mjPAeGW/t0kTAwAGBOcAYPIwea5Gur1u1v6rT0Z1R0jftFyXk+Vv8zmvh54i1vTPFfiGwsNTurS1mimmlihlKo8kDARO0fMW5QcBggYAAKwXippSkqlVJtWV/wAbfr+C6aBKMXBXSdp2V/7zu/zdj6K0rX9ZklsEm1K8n/0lwXmuZnkIlWVGHmbwy4AyvllCCT24rp5pc7XM2n3bfS/9dDJwjZuyvp0VtVHy8ze8Y6hex2N7uuriZJF0vzI555nSRZNRt1dHG8FkYRrwTxgEEYGHWk03bvD53f8AwERTSdr/AN75b7XOZuNVvBY3D+Zkma6X5tzYV5Z5iFJYso3OwAUgbTyCfmp3dkr6N/5v8/60RSinJeaTv/27/X492fTf7MvgjQfEvxs+GXhrWopr/RdSkbxJf2E8iSQ3l9pls1/b29wkkTrLp0lxbxG6s3UpdRBrednt5JIm3owTqQT2a52tNWl6baa90Y1pNUpSW91C+2jbXTqktH0P3213UbnTrPUdRhKtNb6RoqxKwaMIG1y8umAntmt77az2dsCn2vYfJWXb9pzOfWguvpputl39Ty3+q/F2/U9Lg1m/S7lTzEZXivrYh41b93ZW5miJzw5Ykq6yiSNVyYUikLOau+W/lf8AX/gd7dbjSTeqWzey7X2tboj8k/8Agplqt/cWfwQk+0yQPfaZ42kmaF23bZ18GTmIGZpi6pIgKyTGW5cZWaeUYA8/H/FBduZX2enK7+vpb879WF2b7um+ml+dWXlZH5OtdXf2SSI3c7LdXaNKSUVi7wzxFg0aIwIjdkHJG0kEEEg+W1aKd3q7v1ad/M71q18l8v8Ag7vzPPNF0nTbfxZbW5tI54bmXUL5o5y5WOebTp9QujF5bxFUu7yyimuEYspZ5vKEQkOJS5XG3XmeqTs/ebt2u4pv1drXNHKThe+tradbOy+5aLyPRPDN5dajPqcM00kcSuBGlqxtlhNrcWzQtCsO0RFXkkbagVAztsRRgDRe9Z7XT20Ss1ay6f1YmUUtvLfXe+9/T/PUZ9lhtVVI1YhwZGLyykl2dgTw4AyFHAA9e9PlTUW9W43/ABe1rJIjmbb237LsvI//2Q=="
                  />
                </defs>
              </svg>
            </span>
            <div className="flex items-center gap-2 font-medium">
              <p className="dark:text-white">الهام لواسانی</p>
              <span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.16049 1.2971C9.55457 0.688226 10.4454 0.688227 10.8395 1.2971L12.151 3.32351C12.3766 3.67202 12.794 3.84493 13.2 3.75799L15.5603 3.2525C16.2694 3.10061 16.8994 3.73055 16.7475 4.43974L16.242 6.80003C16.1551 7.20596 16.328 7.62339 16.6765 7.84895L18.7029 9.16049C19.3118 9.55457 19.3118 10.4454 18.7029 10.8395L16.6765 12.151C16.328 12.3766 16.1551 12.794 16.242 13.2L16.7475 15.5603C16.8994 16.2694 16.2694 16.8994 15.5603 16.7475L13.2 16.242C12.794 16.1551 12.3766 16.328 12.151 16.6765L10.8395 18.7029C10.4454 19.3118 9.55457 19.3118 9.16049 18.7029L7.84895 16.6765C7.62339 16.328 7.20596 16.1551 6.80003 16.242L4.43974 16.7475C3.73055 16.8994 3.10061 16.2694 3.2525 15.5603L3.75799 13.2C3.84493 12.794 3.67202 12.3766 3.32351 12.151L1.2971 10.8395C0.688226 10.4454 0.688227 9.55457 1.2971 9.16049L3.32351 7.84895C3.67202 7.62339 3.84493 7.20596 3.75799 6.80003L3.2525 4.43974C3.10061 3.73055 3.73055 3.10061 4.43974 3.2525L6.80003 3.75799C7.20596 3.84493 7.62339 3.67202 7.84895 3.32351L9.16049 1.2971Z"
                    fill="#6E3DFF"
                  />
                  <path
                    d="M13 8L8.875 12.125L7 10.25"
                    stroke="#EDE8FC"
                    stroke-width="1.05"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>

            <p className="text-justify font-medium text-[12px] text-[#8E98A8]">
              الهام هستم. آبان ماه ۶۳ تهران بدنیا اومدم.. دبیرستان رشته ریاضی خوندم، عاشق رشته تجربی
              بودم اما نهایتش آخرهای دوره پیش دانشگاهی تو دو هفته آخر تغییر رشته دادم ...
            </p>
          </div>
        </div>
        <AddCartSingleProduct
          product={selectedProduct}
          showDetail
          className={'sticky mt-10 lg:hidden lg:w-[288px]'}
        />
      </ProductPage>
    </div>
  );
};

export default Page;
