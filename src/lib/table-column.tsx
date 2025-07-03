import { MdOutlineSwitchAccessShortcut, MdProductionQuantityLimits } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';
import { FaEye } from 'react-icons/fa';
import { FcPrint } from 'react-icons/fc';
import { CgEye } from 'react-icons/cg';
import Link from 'next/link';
import HeaderCell from '@/components/common/HeaderCell';
import { convertDatePer } from './convert';
import { Checkbox, Tooltip } from '@heroui/react';
import { BASEURL, BASEURL_SITE } from './variable';
import { statusIcon } from './data';
import { Delete_icon, Edit_icon } from '@/components/common/icon';
import Button from '@/components/common/Button';
type Props = {
  onDelete?: (row: any) => void;
  onEye?: (row: any) => void;
  onEdit?: (row: any) => void;
  onView?: (row: any) => void;
  onSelect?: (row: any) => void;
  onAccess?: (row: any) => void;
  selected?: string[];
};

export const initialDataWritten = () => [
  {
    title: <HeaderCell title="ردیف" />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  {
    title: <HeaderCell title="عنوان" />,
    dataIndex: 'title',
    key: 'title',
    width: 50,
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  {
    title: <HeaderCell title="نویسنده" />,
    dataIndex: 'written',
    key: 'written',
    width: 50,
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  {
    title: <HeaderCell title="دسته بندی نشده" />,
    dataIndex: 'category',
    key: 'category',
    width: 50,
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  {
    title: <HeaderCell title="برچسب‌ها" />,
    dataIndex: 'labels',
    key: 'labels',
    width: 50,
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  {
    title: <HeaderCell title="تاریخ" />,
    dataIndex: 'create',
    key: 'create',
    width: 50,
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  {
    title: <HeaderCell title="وضعیت" />,
    dataIndex: 'status',
    key: 'status',
    width: 50,
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  {
    title: <HeaderCell title="جزئیات سئو" />,
    dataIndex: 'seo',
    key: 'seo',
    width: 50,
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  {
    title: <HeaderCell title="عملیات" />,
    dataIndex: 'seo',
    key: 'seo',
    width: 80,
    render: () => (
      <div className="flex items-center justify-center gap-2 text-gray-600">
        <Button className="w-fit !px-0">
          <Delete_icon />
        </Button>
        <Button className="w-fit !px-0">
          <Edit_icon />
        </Button>
      </div>
    ),
  },
];

export const initialDataBlogTags = ({ onDelete, onEdit }: Props) => [
  {
    title: <HeaderCell align="center" title="ردیف" />,
    dataIndex: '_id',
    key: '_id',
    width: 50,
    render: (_: string, __: any, idx: number) => (
      <p className="text-center text-xs text-gray-800">{idx + 1}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عنوان" />,
    dataIndex: 'title',
    key: 'title',
    width: 50,
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  {
    title: <HeaderCell align="center" title="لینک" />,
    dataIndex: 'url',
    key: 'url',
    width: 50,
    render: (value: string) => (
      <a className="block cursor-pointer text-center text-xs text-blue-500 underline [direction:ltr]">
        {value}
      </a>
    ),
  },
  {
    title: <HeaderCell title="توضیحات" />,
    dataIndex: 'description',
    key: 'description',
    width: 100,
    className: 'max-w-[300px]  overflow-hidden',
    render: (value: string) => (
      <p className="line-clamp-none text-center text-xs text-gray-800">{value}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عملیات" />,
    dataIndex: 'action',
    key: 'action',
    width: 80,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-2 text-gray-600">
        {onDelete ? (
          <Button className="w-fit !px-0" onClick={() => onDelete(row)}>
            <Delete_icon />
          </Button>
        ) : null}
        {onEdit ? (
          <TbEdit
            onClick={() => onEdit(row)}
            className="cursor-pointer text-green-600/80"
            size={23}
          />
        ) : null}
      </div>
    ),
  },
];
export const initialDataBlogs = ({ onDelete, onEdit }: Props) => [
  {
    title: <HeaderCell align="center" title="ردیف" />,
    dataIndex: '_id',
    key: '_id',
    render: (_: string, __: any, idx: number) => (
      <p className="text-center text-xs text-gray-800">{idx + 1}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عنوان" />,
    dataIndex: 'title',
    key: 'title',
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  {
    title: <HeaderCell align="center" title="نویسنده" />,
    dataIndex: 'author',
    key: 'author',
    render: (_: string, row: any) => (
      <p className="text-center text-xs text-gray-800">
        {row.author?.firstName} {row.author?.lastName}
      </p>
    ),
  },
  {
    title: <HeaderCell title="تاریخ" />,
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (value: string) => (
      <p className="text-center text-xs text-gray-800">{convertDatePer(value)}</p>
    ),
  },
  {
    title: <HeaderCell title="وضعیت" />,
    dataIndex: 'Published',
    key: 'Published',
    render: (value: string) => (
      <p className="text-center text-xs text-gray-800">{value ? 'انتشار شده' : 'پیش نمایش'}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عملیات" />,
    dataIndex: 'action',
    key: 'action',
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-2 text-gray-600">
        {onDelete ? (
          <Button className="w-fit !px-0" onClick={() => onDelete(row)}>
            <Delete_icon />
          </Button>
        ) : null}
        {onEdit ? (
          <Button className="w-fit !px-0" onClick={() => onEdit(row)}>
            <Edit_icon />
          </Button>
        ) : null}
      </div>
    ),
  },
];

// ******************************************************* product*************************************************
export const initialDataProducts = ({ onDelete, onSelect, selected, onEdit }: Props) => [
  {
    title: <HeaderCell align="center" title="انتخاب" />,
    dataIndex: 'select',
    key: 'select',
    render: (_: string, row: any) => (
      <Checkbox
        isSelected={selected?.includes(row._id)}
        onValueChange={() => (onSelect ? onSelect(row) : {})}
      />
    ),
  },
  {
    title: <HeaderCell align="center" title="عنوان" />,
    dataIndex: 'title',
    key: 'title',
    render: (value: string, row: any) => (
      <div className="flex items-center gap-2">
        <img
          loading="eager"
          key={row?.thumbnailImage?.url}
          className="h-14 w-14 rounded-lg"
          src={`${BASEURL}/${row?.thumbnailImage?.url}`}
        />
        <p className="w-[270px] overflow-hidden text-ellipsis text-justify text-xs text-gray-800">
          {value}
        </p>
      </div>
    ),
  },

  {
    title: <HeaderCell align="center" title="نام انگلیسی" />,
    dataIndex: 'enTitle',
    key: 'enTitle',
    render: (value: string) => (
      <p className="text-center text-xs text-gray-800 [direction:ltr]">{value}</p>
    ),
  },
  {
    title: <HeaderCell title="قیمت" />,
    dataIndex: 'price',
    key: 'price',
    render: (value: string) => <p className={`text-center`}>{Number(value).toLocaleString()}</p>,
  },
  {
    title: <HeaderCell title="قیمت ویژه" />,
    dataIndex: 'discountPrice',
    key: 'discountPrice',
    render: (value: string) => <p className={`text-center`}>{Number(value).toLocaleString()}</p>,
  },
  {
    title: <HeaderCell title="تعداد" />,
    dataIndex: 'count',
    key: 'count',
    render: (value: number) => (
      <p className={`text-center ${Number(value) === 0 ? 'text-red-500' : 'text-green-500'}`}>
        {value}
      </p>
    ),
  },
  {
    title: <HeaderCell align="center" title="زمان بندی" />,
    dataIndex: 'discountTime',
    key: 'discountTime',
    // render: (_: string, row: any) => <div>
    //     <Countdown date={row.discountTime.split(" ")[1]} />
    // </div>
  },
  {
    title: <HeaderCell title="وضعیت" />,
    dataIndex: 'published',
    key: 'published',
    render: (value: number) => <p className={`text-center`}>{value ? 'منتشر شده' : 'پیش نویس'}</p>,
  },
  {
    title: <HeaderCell align="center" title="عملیات" />,
    dataIndex: 'action',
    key: 'action',
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-3 text-gray-600">
        {onDelete ? (
          <Button className="w-fit !px-0" onClick={() => onDelete(row)}>
            <Delete_icon />
          </Button>
        ) : null}
        {onEdit ? (
          <Link target="_blank" href={`/admin/products/${row._id}/`}>
            <Edit_icon />
          </Link>
        ) : null}
        <a target="_blank" href={`${BASEURL_SITE}/product/${row.url}/`}>
          <CgEye size={18} />
        </a>
      </div>
    ),
  },
];
export const initialDataCoruses = ({ onDelete, onSelect, selected, onEdit }: Props) => [
  {
    title: <HeaderCell align="center" title="انتخاب" />,
    dataIndex: 'select',
    key: 'select',
    render: (_: string, row: any) => (
      <Checkbox
        isSelected={selected?.includes(row._id)}
        onValueChange={() => (onSelect ? onSelect(row) : {})}
      />
    ),
  },
  {
    title: <HeaderCell align="center" title="عنوان" />,
    dataIndex: 'title',
    key: 'title',
    render: (value: string, row: any) => (
      <div className="flex items-center gap-2">
        <img
          loading="eager"
          key={row?.thumbnailImage?.url}
          className="h-14 w-14 rounded-lg"
          src={`${BASEURL}/${row?.thumbnailImage?.url}`}
        />
        <p className="w-[270px] overflow-hidden text-ellipsis text-justify text-xs text-gray-800">
          {value}
        </p>
      </div>
    ),
  },

  {
    title: <HeaderCell align="center" title="نام انگلیسی" />,
    dataIndex: 'enTitle',
    key: 'enTitle',
    render: (value: string) => (
      <p className="text-center text-xs text-gray-800 [direction:ltr]">{value}</p>
    ),
  },
  {
    title: <HeaderCell title="قیمت" />,
    dataIndex: 'price',
    key: 'price',
    render: (value: string) => <p className={`text-center`}>{Number(value).toLocaleString()}</p>,
  },
  {
    title: <HeaderCell title="قیمت ویژه" />,
    dataIndex: 'discountPrice',
    key: 'discountPrice',
    render: (value: string) => <p className={`text-center`}>{Number(value).toLocaleString()}</p>,
  },
  {
    title: <HeaderCell title="تعداد" />,
    dataIndex: 'count',
    key: 'count',
    render: (value: number) => (
      <p className={`text-center ${Number(value) === 0 ? 'text-red-500' : 'text-green-500'}`}>
        {value}
      </p>
    ),
  },
  {
    title: <HeaderCell align="center" title="زمان بندی" />,
    dataIndex: 'discountTime',
    key: 'discountTime',
    // render: (_: string, row: any) => <div>
    //     <Countdown date={row.discountTime.split(" ")[1]} />
    // </div>
  },
  {
    title: <HeaderCell title="وضعیت" />,
    dataIndex: 'published',
    key: 'published',
    render: (value: number) => <p className={`text-center`}>{value ? 'منتشر شده' : 'پیش نویس'}</p>,
  },
  {
    title: <HeaderCell align="center" title="عملیات" />,
    dataIndex: 'action',
    key: 'action',
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-3 text-gray-600">
        {onDelete ? (
          <Button className="w-fit !px-0" onClick={() => onDelete(row)}>
            <Delete_icon />
          </Button>
        ) : null}
        {onEdit ? (
          <Link target="_blank" href={`/admin/courses/${row._id}/`}>
            <Edit_icon />
          </Link>
        ) : null}
        <a target="_blank" href={`${BASEURL_SITE}/course/${row.url}/`}>
          <CgEye size={18} />
        </a>
      </div>
    ),
  },
];
export const initialDataProperties = ({ onDelete, onEdit, onView }: Props) => [
  {
    title: <HeaderCell align="center" title="ردیف" />,
    dataIndex: '_id',
    key: '_id',
    render: (_: string, __: any, idx: number) => (
      <p className="text-center text-xs text-gray-800">{idx + 1}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عنوان" />,
    dataIndex: 'title',
    key: 'title',
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  {
    title: <HeaderCell align="center" title="نامک" />,
    dataIndex: 'url',
    key: 'url',
    render: (value: string) => (
      <p className="text-center text-xs text-gray-800 [direction:ltr]">{value}</p>
    ),
  },
  {
    title: <HeaderCell title="آرشیو" />,
    dataIndex: 'archive',
    key: 'archive',
    render: (value: string) => (
      <p className={`text-center ${value ? '!text-green-500' : '!text-red-500'}`}>
        {value ? 'فعال' : 'غیر فعال'}
      </p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عملیات" />,
    dataIndex: 'action',
    key: 'action',
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-2 text-gray-600">
        {onDelete ? (
          <Button className="w-fit !px-0" onClick={() => onDelete(row)}>
            <Delete_icon />
          </Button>
        ) : null}
        {onEdit ? (
          <Button className="w-fit !px-0" onClick={() => onEdit(row)}>
            <Edit_icon />
          </Button>
        ) : null}
        {onView ? (
          <Link
            className="block text-center text-blue-500"
            href={`/admin/products/properties/${row._id}/?displayType=${row.displayType}`}
          >
            پیکربندی مشخصه‌ی ویژگی
          </Link>
        ) : null}
      </div>
    ),
  },
];
export const initialDataPropertyWithId = ({ onDelete, onEdit }: Props) => [
  {
    title: <HeaderCell align="center" title="ردیف" />,
    dataIndex: '_id',
    key: '_id',
    render: (_: string, __: any, idx: number) => (
      <p className="text-center text-xs text-gray-800">{idx + 1}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عنوان" />,
    dataIndex: 'title',
    key: 'title',
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  {
    title: <HeaderCell align="center" title="نامک" />,
    dataIndex: 'url',
    key: 'url',
    render: (value: string) => (
      <p className="text-center text-xs text-gray-800 [direction:ltr]">{value}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عملیات" />,
    dataIndex: 'action',
    key: 'action',
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-2 text-gray-600">
        {onDelete ? (
          <Button className="w-fit !px-0" onClick={() => onDelete(row)}>
            <Delete_icon />
          </Button>
        ) : null}
        {onEdit ? (
          <Button className="w-fit !px-0" onClick={() => onEdit(row)}>
            <Edit_icon />
          </Button>
        ) : null}
      </div>
    ),
  },
];
export const initialDataGroupProperties = ({ onDelete, onEdit }: Props) => [
  {
    title: <HeaderCell align="center" title="ردیف" />,
    dataIndex: '_id',
    key: '_id',
    render: (_: string, __: any, idx: number) => (
      <p className="text-center text-xs text-gray-800">{idx + 1}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عنوان" />,
    dataIndex: 'title',
    key: 'title',
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  // {
  //     title: <HeaderCell title="ویژگی‌ها" />,
  //     dataIndex: 'published',
  //     key: 'published',
  //     render: (_: string, row: any) => <div className="flex items-center justify-center gap-1">
  //         {row.properties.map((property: any, idx: number) => <p className="text-gray-600" key={idx}>{property.title}, </p>)}
  //     </div>,
  // },
  {
    title: <HeaderCell title="وضعیت" />,
    dataIndex: 'published',
    key: 'published',
    render: (value: string) => (
      <p className={`text-center ${value ? 'text-green-500' : 'text-red-500'}`}>
        {value ? 'فعال' : 'غیر فعال'}
      </p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عملیات" />,
    dataIndex: 'action',
    key: 'action',
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-2 text-gray-600">
        {onDelete ? (
          <Button className="w-fit !px-0" onClick={() => onDelete(row)}>
            <Delete_icon />
          </Button>
        ) : null}
        {onEdit ? (
          <TbEdit
            onClick={() => onEdit(row)}
            className="cursor-pointer text-green-600/80"
            size={23}
          />
        ) : null}
      </div>
    ),
  },
];
export const initialDataTagProduct = ({ onDelete, onEdit, onView }: Props) => [
  {
    title: <HeaderCell align="center" title="ردیف" />,
    dataIndex: '_id',
    key: '_id',
    render: (_: string, __: any, idx: number) => (
      <p className="text-center text-xs text-gray-800">{idx + 1}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عنوان" />,
    dataIndex: 'title',
    key: 'title',
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  {
    title: <HeaderCell title="توضیحات" />,
    dataIndex: 'description',
    key: 'description',
    render: (value: string) => (
      <p className="mx-auto line-clamp-2 w-[400px] text-center text-blue-500 underline">{value}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عملیات" />,
    dataIndex: 'action',
    key: 'action',
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-2 text-gray-600">
        {onDelete ? (
          <Button className="w-fit !px-0" onClick={() => onDelete(row)}>
            <Delete_icon />
          </Button>
        ) : null}
        {onEdit ? (
          <Button className="w-fit !px-0" onClick={() => onEdit(row)}>
            <Edit_icon />
          </Button>
        ) : null}
        {onView ? (
          <Link
            className="block text-center text-blue-500 underline"
            href={`/product/tags/${row._id}/`}
          >
            <CgEye size={22} />
          </Link>
        ) : null}
      </div>
    ),
  },
];
export const initialDataFaq = ({ onDelete, onEdit, onView }: Props) => [
  {
    title: <HeaderCell align="center" title="ردیف" />,
    dataIndex: '_id',
    key: '_id',
    render: (_: string, __: any, idx: number) => (
      <p className="text-center text-xs text-gray-800">{idx + 1}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="سوال" />,
    dataIndex: 'question',
    key: 'question',
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  {
    title: <HeaderCell title="جواب" />,
    dataIndex: 'answer',
    key: 'answer',
    render: (value: string) => (
      <p className="mx-auto line-clamp-2 w-[400px] text-center text-blue-500 underline">{value}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عملیات" />,
    dataIndex: 'action',
    key: 'action',
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-2 text-gray-600">
        {onDelete ? (
          <Button className="w-fit !px-0" onClick={() => onDelete(row)}>
            <Delete_icon />
          </Button>
        ) : null}
        {onEdit ? (
          <Button className="w-fit !px-0" onClick={() => onEdit(row)}>
            <Edit_icon />
          </Button>
        ) : null}
        {onView ? (
          <Link
            className="block text-center text-blue-500 underline"
            href={`/product/tags/${row._id}/`}
          >
            <CgEye size={22} />
          </Link>
        ) : null}
      </div>
    ),
  },
];
// ************************************************************** USER************************************************************
export const initialDataUsers = ({ onDelete, onEdit, onAccess }: Props) => [
  {
    title: <HeaderCell align="center" title="ردیف" />,
    dataIndex: '_id',
    key: '_id',
    render: (_: string, __: any, idx: number) => (
      <p className="text-center text-xs text-gray-800">{idx + 1}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="نام‌و‌ناخانوادگی" />,
    dataIndex: 'firstName',
    key: 'firstName',
    render: (_: string, row: any) => (
      <p className="text-center text-xs text-gray-800">
        {row.firstName} {row.lastName}
      </p>
    ),
  },
  {
    title: <HeaderCell align="center" title="شماره تلفن" />,
    dataIndex: 'mobile',
    key: 'mobile',
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  {
    title: <HeaderCell title="نقش" />,
    dataIndex: 'Role',
    key: 'Role',
    render: (value: string) => (
      <p className="text-center text-xs text-gray-800">
        {value === 'SUPERADMIN' ? 'سوپر ادمین' : value === 'ADMIN' ? 'ادمین' : 'کاربر'}
      </p>
    ),
  },
  {
    title: <HeaderCell title="تاریخ" />,
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (value: string) => (
      <p className="text-center text-xs text-gray-800">{convertDatePer(value)}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عملیات" />,
    dataIndex: 'action',
    key: 'action',
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-2 text-gray-600">
        {onDelete ? (
          <Button className="w-fit !px-0" onClick={() => onDelete(row)}>
            <Delete_icon />
          </Button>
        ) : null}
        {onEdit ? (
          <Button className="w-fit !px-0" onClick={() => onEdit(row)}>
            <Edit_icon />
          </Button>
        ) : null}
        {onAccess ? (
          <MdOutlineSwitchAccessShortcut
            onClick={() => onAccess(row)}
            className="cursor-pointer text-green-600/80"
            size={23}
          />
        ) : null}
      </div>
    ),
  },
];

// ************************************* SLIDER **************************************************************
export const initialDataSliders = ({ onDelete, onEdit }: Props) => [
  {
    title: <HeaderCell align="center" title="ردیف" />,
    dataIndex: '_id',
    key: '_id',
    render: (_: string, __: any, idx: number) => (
      <p className="text-center text-xs text-gray-800">{idx + 1}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عنوان" />,
    dataIndex: 'title',
    key: 'title',
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  {
    title: <HeaderCell align="center" title="وضعیت" />,
    dataIndex: 'published',
    key: 'published',
    render: (value: string) => (
      <p className="text-center text-xs text-gray-800">{value ? 'انتشار' : 'پیش نمایش'}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عکس دسکتاپ" />,
    dataIndex: 'desktopPic',
    key: 'desktopPic',
    render: (_: string, row: any) => (
      <div className="flex flex-col items-center justify-center">
        <img className="h-14 w-14 rounded-lg border" src={`${BASEURL}/${row?.desktopPic?.url}`} />
        <a
          href={`${BASEURL}/${row?.desktopPic?.url}`}
          className="pt-[3px] text-xs text-blue-500"
          target="_blank"
        >
          مشاهده
        </a>
      </div>
    ),
  },
  {
    title: <HeaderCell align="center" title="عکس موبایل" />,
    dataIndex: 'mobilePic',
    key: 'mobilePic',
    render: (_: string, row: any) => (
      <div className="flex flex-col items-center justify-center">
        <img className="h-14 w-14 rounded-lg border" src={`${BASEURL}/${row?.mobilePic?.url}`} />
        <a
          href={`${BASEURL}/${row?.mobilePic?.url}`}
          className="pt-[3px] text-xs text-blue-500"
          target="_blank"
        >
          مشاهده
        </a>
      </div>
    ),
  },

  {
    title: <HeaderCell align="center" title="عملیات" />,
    dataIndex: 'action',
    key: 'action',
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-2 text-gray-600">
        {onDelete ? (
          <Button className="w-fit !px-0" onClick={() => onDelete(row)}>
            <Delete_icon />
          </Button>
        ) : null}
        {onEdit ? (
          <Button className="w-fit !px-0" onClick={() => onEdit(row)}>
            <Edit_icon />
          </Button>
        ) : null}
      </div>
    ),
  },
];
export const initialDataCategorySliders = ({ onDelete, onEdit }: Props) => [
  {
    title: <HeaderCell align="center" title="ردیف" />,
    dataIndex: '_id',
    key: '_id',
    render: (_: string, __: any, idx: number) => (
      <p className="text-center text-xs text-gray-800">{idx + 1}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="نام" />,
    dataIndex: 'title',
    key: 'title',
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  {
    title: <HeaderCell align="center" title="توضیحات" />,
    dataIndex: 'description',
    key: 'description',
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },

  {
    title: <HeaderCell align="center" title="عملیات" />,
    dataIndex: 'action',
    key: 'action',
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-2 text-gray-600">
        {onDelete ? (
          <Button className="w-fit !px-0" onClick={() => onDelete(row)}>
            <Delete_icon />
          </Button>
        ) : null}
        {onEdit ? (
          <Button className="w-fit !px-0" onClick={() => onEdit(row)}>
            <Edit_icon />
          </Button>
        ) : null}
      </div>
    ),
  },
];
export const initialDataOrder = () => [
  {
    title: <HeaderCell align="center" title="ردیف" />,
    dataIndex: '_id',
    key: '_id',
    render: (_: string, __: any, idx: number) => (
      <p className="text-center text-xs text-gray-800">{idx + 1}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="گیرنده" />,
    dataIndex: 'title',
    key: 'title',
    render: (_: string, row: any) => (
      <div className="flex flex-col items-center justify-center">
        <p className="text-[12px]">
          {row?.orderAddress?.firstName
            ? `${row?.orderAddress.firstName} ${row?.orderAddress.lastName}`
            : row?.orderAddress?.recipientsName}
        </p>
      </div>
    ),
  },
  {
    title: <HeaderCell align="center" title="سفارش‌ها" />,
    dataIndex: 'author',
    key: 'author',
    render: (_: string, row: any) => (
      <div className="flex flex-col items-center justify-center">
        <Link
          href={`/admin/orders/${row._id}/`}
          className="block text-center text-xs text-blue-500 underline"
        >
          {row?.author?.firstName ? row?.author?.firstName : 'کاربر'}{' '}
          {row?.author?.lastName ? row?.author?.lastName : 'رز'}
        </Link>
        <p className="text-[12px]">{row?.author?.mobile}</p>
      </div>
    ),
  },
  {
    title: <HeaderCell align="center" title="شماره سفارش" />,
    dataIndex: 'orderNumber',
    key: 'orderNumber',
    render: (value: string) => (
      <p className="block text-center text-xs text-blue-500 underline">{value}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="تاریخ" />,
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (_: string, row: any) => (
      <div>
        <p className="text-center text-xs text-gray-800">{convertDatePer(row.createdAt)}</p>
        <p className="text-center text-xs text-gray-800">{convertDatePer(row.createdAt, true)}</p>
      </div>
    ),
  },
  {
    title: <HeaderCell align="center" title="نوع تراکنش" />,
    dataIndex: 'transactionType',
    key: 'transactionType',
    render: (value: string) => (
      <p className="text-center text-xs text-gray-800">
        {value === 'Snapppay' ? 'اسنپ' : 'آنلاین'}
      </p>
    ),
  },
  {
    title: <HeaderCell align="center" title="وضعیت" />,
    dataIndex: 'orderStatus',
    key: 'orderStatus',
    render: (value: string) => {
      const status = statusIcon?.find((order) => order.status === value);
      return (
        <div className="flex items-center justify-center">
          <p
            className={`block !w-[120px] !min-w-[120px] rounded-lg bg-opacity-15 p-2 font-medium text-[12px]`}
          >
            {status?.name}
          </p>
          <span>{status?.icon}</span>
        </div>
      );
    },
  },
  {
    title: <HeaderCell align="center" title="مجموع" />,
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    render: (value: string) => (
      <p className="text-center text-xs text-gray-800">
        {Number(Number(value) / 10).toLocaleString()} تومان
      </p>
    ),
  },
  {
    title: <HeaderCell align="center" title="آدرس" />,
    dataIndex: 'orderAddress',
    key: 'orderAddress',
    render: (_: string, row: any) => (
      <p className="line-clamp-1 w-[140px] overflow-hidden text-ellipsis text-center text-xs text-gray-800">
        {row.orderAddress.provinceLabel} - {row.orderAddress.city} - {row.orderAddress.address}
      </p>
    ),
  },

  {
    title: <HeaderCell align="center" title="عملیات" />,
    dataIndex: 'action',
    key: 'action',
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-2 text-gray-600">
        {/* {
                    onDelete ?
 <Button className="!px-0 w-fit" onClick={() => onDelete(row)}>
                            <Delete_icon  />
                        </Button>                        : null
                }
                {
                    onEdit ?
                        <TbEdit onClick={() => onEdit(row)} className="text-green-600/80 cursor-pointer" size={23} />
                        : null
                } */}
        {/* <Tooltip className="bg-white" content={<span className="text-[10px]">در حال آماده سازی</span>}>
                    <button className="!px-0 w-fit" className="w-7 flex justify-center items-center rounded-lg h-7 border">
                        <CiMenuKebab />
                    </button>
                </Tooltip>
                <Tooltip className="bg-white" content={<span className="text-[10px]">تکمیل</span>}>
                    <button className="!px-0 w-fit" className="w-7 flex justify-center items-center rounded-lg h-7 border">
                        <GiCheckMark />
                    </button>
                </Tooltip> */}
        <Tooltip className="bg-white" content={<span className="text-[10px]">چاپ آدرس</span>}>
          {/* <Link
            href={`/print/${row._id}?type=address`}
            className="w-7 flex justify-center items-center rounded-lg h-7 border"
          >
            <FcPrint />
          </Link> */}
        </Tooltip>
        <Tooltip className="bg-white" content={<span className="text-[10px]">چاپ اقلام</span>}>
          {/* <Link
            href={`/print/${row._id}?type=product`}
            className="w-7 flex justify-center items-center rounded-lg h-7 border"
          >
            <MdProductionQuantityLimits />
          </Link> */}
        </Tooltip>
      </div>
    ),
  },
];
export const initialDataDetailOrder = ({ onEdit, onDelete }: Props) => [
  {
    title: <HeaderCell align="left" title="آیدی محصول" />,
    dataIndex: '_id',
    key: '_id',
    render: (value: string) => <p className="text-center text-[12px] text-black">{value}</p>,
  },
  {
    title: <HeaderCell align="left" title="آیتم" />,
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (_: string, row: any) => (
      <div className="flex items-center gap-3">
        <img className="h-10 w-10 rounded-lg border" src={`${BASEURL}/${row.thumbnailImage}`} />
        <div className="space-y-2">
          <p className="text-[12px] text-black">{row.title}</p>
          <p className="text-[12px] text-black">skuId:{row.skuId}</p>
          <p className="text-[12px] text-gray-600">
            {Number(row.productPrice).toLocaleString()} تومان
          </p>
        </div>
      </div>
    ),
  },

  {
    title: <HeaderCell align="center" title="قیمت" />,
    dataIndex: 'productPrice',
    key: 'productPrice',
    render: (_: string, row: any) => (
      <p className="text-center text-[12px] text-gray-600">
        {row?.productDiscountPrice
          ? Number(row.productDiscountPrice).toLocaleString()
          : Number(row.productPrice).toLocaleString()}{' '}
        تومان
      </p>
    ),
  },
  {
    title: <HeaderCell align="center" title="تعداد" />,
    dataIndex: 'productCount',
    key: 'productCount',
    render: (value: string) => (
      <p className="text-center text-[12px] text-gray-600">{Number(value)}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="مجموع" />,
    dataIndex: 'total',
    key: 'total',
    render: (_: string, row: any) => (
      <p className={`text-center text-[12px] text-gray-600 ${row?.freePlan ? 'text-main' : ''}`}>
        {row?.freePlan
          ? 'رایگان شامل پلن هدیه'
          : row?.productDiscountPrice
            ? Number(Number(row.productCount) * Number(row.productDiscountPrice)).toLocaleString()
            : Number(Number(row.productCount) * Number(row.productPrice)).toLocaleString()}{' '}
        {row?.freePlan ? '' : 'تومان'}{' '}
      </p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عملیات" />,
    dataIndex: 'action',
    key: 'action',
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-2">
        {onEdit ? (
          <FaEye onClick={() => onEdit(row)} size={20} className="cursor-pointer text-gray-600" />
        ) : null}
        {onDelete ? (
          <Button className="w-fit !px-0" onClick={() => onDelete(row)}>
            <Delete_icon />
          </Button>
        ) : null}
      </div>
    ),
  },
];
export const initialDataAllList = ({ onEdit }: Props) => [
  {
    title: <HeaderCell align="center" title="ردیف" />,
    dataIndex: '_id',
    key: '_id',
    render: (_: string, __: any, idx: number) => (
      <p className="text-center text-xs text-gray-800">{idx + 1}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عنوان" />,
    dataIndex: 'title',
    key: 'title',
    render: (title: string) => <p className="text-center text-[12px] text-gray-600">{title}</p>,
  },
  {
    title: <HeaderCell align="center" title="نام انگلیسی" />,
    dataIndex: 'location',
    key: 'location',
    render: (value: string) => <p className="text-center text-[12px] text-gray-600">{value}</p>,
  },
  {
    title: <HeaderCell align="center" title="" />,
    dataIndex: 'action',
    key: 'action',
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-2">
        {onEdit ? (
          <FaEye onClick={() => onEdit(row)} size={20} className="cursor-pointer text-gray-600" />
        ) : null}
      </div>
    ),
  },
];
export const initialDataDetailOrderSnap = ({ onEdit, onDelete }: Props) => [
  {
    title: <HeaderCell align="left" title="آیدی محصول" />,
    dataIndex: 'nid',
    key: 'nid',
    render: (value: string) => <p className="text-[12px] text-black">{value}</p>,
  },
  {
    title: <HeaderCell align="left" title="آیتم" />,
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (_: string, row: any) => (
      <div className="flex items-center gap-3">
        <img
          className="h-10 w-10 rounded-lg border"
          src={`${BASEURL}/${row.thumbnailImage?.url}`}
        />
        <div className="space-y-2">
          <p className="line-clamp-1 w-[200px] overflow-hidden text-ellipsis text-[12px] text-black">
            {row.name}
          </p>
          <p className="line-clamp-1 w-[200px] overflow-hidden text-ellipsis text-[12px] text-black">
            {row?.price?.toLocaleString()}
          </p>
          <p className="text-[12px] text-black">skuId:{row.skuId}</p>
        </div>
      </div>
    ),
  },

  {
    title: <HeaderCell align="center" title="قیمت" />,
    dataIndex: 'amount',
    key: 'amount',
    render: (_: string, row: any) => (
      <p className="text-center text-[12px] text-gray-600">
        {row?.productDiscountPrice
          ? Number(row.productDiscountPrice / 10).toLocaleString()
          : Number(row.amount / 10).toLocaleString()}{' '}
        تومان
      </p>
    ),
  },
  {
    title: <HeaderCell align="center" title="تعداد" />,
    dataIndex: 'count',
    key: 'count',
    render: (value: string) => (
      <p className="text-center text-[12px] text-gray-600">{Number(value)}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="مجموع" />,
    dataIndex: 'total',
    key: 'total',
    render: (_: string, row: any) => (
      <p className={`text-center text-[12px] text-gray-600 ${row?.freePlan ? 'text-main' : ''}`}>
        {row?.freePlan
          ? 'رایگان شامل پلن هدیه'
          : row?.productDiscountPrice
            ? Number(Number(row.count) * Number(row.productDiscountPrice / 10)).toLocaleString()
            : Number(Number(row.count) * Number(row.amount / 10)).toLocaleString()}{' '}
        {row?.freePlan ? '' : 'تومان'}
      </p>
    ),
  },
  {
    title: <HeaderCell align="center" title="" />,
    dataIndex: 'message',
    key: 'action',
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-2">
        {onEdit ? (
          <FaEye onClick={() => onEdit(row)} size={20} className="cursor-pointer text-gray-600" />
        ) : null}
        {onDelete ? (
          <Button className="w-fit !px-0" onClick={() => onDelete(row)}>
            <Delete_icon />
          </Button>
        ) : null}
      </div>
    ),
  },
];

// ***********************************************initialDataContactus****************************************************8888

export const initialDataContactus = ({ onEye, onDelete }: Props) => [
  {
    title: <HeaderCell align="center" title="ردیف" />,
    dataIndex: 'id',
    key: 'id',
    render: (_: string, row: any, idx: number) => (
      <span className={`block text-center ${row ? '' : ''}`}>{idx + 1}</span>
    ),
  },
  {
    title: <HeaderCell align="center" title="نام و خانوادگی" />,
    dataIndex: 'fullName',
    key: 'fullName',
    render: (value: string) => <p className="text-center text-[12px] text-gray-600">{value}</p>,
  },
  {
    title: <HeaderCell align="center" title="موبایل" />,
    dataIndex: 'mobileNumber',
    key: 'mobileNumber',
    render: (value: string) => (
      <p className="text-center text-[12px] text-gray-600">{Number(value)}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="پیام" />,
    dataIndex: 'message',
    key: 'message',
    render: (value: string) => (
      <p className="mx-auto w-[200px] overflow-hidden text-ellipsis text-center text-[12px] text-gray-600">
        {value}
      </p>
    ),
  },
  {
    title: <HeaderCell align="center" title="" />,
    dataIndex: 'action',
    key: 'action',
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-2">
        {onEye ? (
          <FaEye onClick={() => onEye(row)} size={20} className="cursor-pointer text-gray-600" />
        ) : null}
        {onDelete ? (
          <Button className="w-fit !px-0" onClick={() => onDelete(row)}>
            <Delete_icon />
          </Button>
        ) : null}
      </div>
    ),
  },
];

// ***********************************************comments****************************************************8888

export const initialDataComments = ({ onDelete, onEdit }: { onDelete?: any; onEdit?: any }) => [
  {
    title: <HeaderCell align="center" title="ردیف" />,
    dataIndex: '_id',
    key: '_id',
    render: (_: string, row: any, idx: number) => (
      <span className={`block text-center ${row ? '' : ''}`}>{idx + 1}</span>
    ),
  },
  {
    title: <HeaderCell align="center" title="نام و خانوادگی" />,
    dataIndex: 'firstName',
    key: 'firstName',
    render: (_: string, row: any) => (
      <p className="text-center text-[12px] text-gray-600">
        {row?.author?.firstName} {row?.author?.lastName}
      </p>
    ),
  },
  {
    title: <HeaderCell align="center" title="موبایل" />,
    dataIndex: 'mobile',
    key: 'mobile',
    render: (_: string, row: any) => (
      <p className="text-center text-[12px] text-gray-600">{Number(row?.author?.mobile)}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="امتیاز" />,
    dataIndex: 'rating',
    key: 'rating',
    render: (value: string) => (
      <p className="mx-auto w-[200px] overflow-hidden text-ellipsis text-center text-[12px] text-gray-600">
        {value}
      </p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عنوان" />,
    dataIndex: 'title',
    key: 'title',
    render: (value: string) => (
      <p className="mx-auto w-[200px] overflow-hidden text-ellipsis text-center text-[12px] text-gray-600">
        {value}
      </p>
    ),
  },
  {
    title: <HeaderCell align="center" title="پیام" />,
    dataIndex: 'content',
    key: 'content',
    render: (value: string) => (
      <p className="mx-auto w-[200px] overflow-hidden text-ellipsis text-center text-[12px] text-gray-600">
        {value}
      </p>
    ),
  },
  {
    title: <HeaderCell align="center" title="وضعیت" />,
    dataIndex: 'published',
    key: 'published',
    render: (value: string) => (
      <p className="mx-auto text-center text-[12px] text-gray-600">
        {value ? 'منتشر شده' : 'در حال انتظار'}
      </p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عملیات" />,
    dataIndex: 'action',
    key: 'action',
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-2">
        {onEdit ? (
          <Button className="w-fit !px-0" onClick={() => onEdit(row)}>
            <Edit_icon />
          </Button>
        ) : null}
        {onDelete ? (
          <Button className="w-fit !px-0" onClick={() => onDelete(row)}>
            <Delete_icon />
          </Button>
        ) : null}
      </div>
    ),
  },
];

// /////////////////////////////////////////PAYMENT////////////////////////////////////////////////

export const initialDataPayment = ({ onDelete, onEdit }: Props) => [
  {
    title: <HeaderCell align="center" title="ردیف" />,
    dataIndex: '_id',
    key: '_id',
    render: (_: string, __: any, idx: number) => (
      <p className="text-center text-xs text-gray-800">{idx + 1}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="موبایل" />,
    dataIndex: 'mobile',
    key: 'mobile',
    render: (_: string, row: any) => (
      <p className="text-center text-xs text-gray-800">{row?.user?.mobile}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="شماره تراکنش" />,
    dataIndex: 'invoiceNumber',
    key: 'invoiceNumber',
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  {
    title: <HeaderCell title="مجموع تراکنش" />,
    dataIndex: 'amount',
    key: 'amount',
    render: (value: string) => (
      <p className="text-center text-xs text-gray-800">{Number(value).toLocaleString()} تومان</p>
    ),
  },
  {
    title: <HeaderCell title="تاریخ ایجاد" />,
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (value: string) => (
      <p className="text-center text-xs text-gray-800">{convertDatePer(value)}</p>
    ),
  },
  {
    title: <HeaderCell title="وضعیت" />,
    dataIndex: 'verify',
    key: 'verify',
    render: (value: string) => (
      <p className="text-center text-xs text-gray-800">{value ? 'تائید شده' : 'تائید نشده'}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عملیات" />,
    dataIndex: 'action',
    key: 'action',
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-2 text-gray-600">
        {onDelete ? (
          <Button className="w-fit !px-0" onClick={() => onDelete(row)}>
            <Delete_icon />
          </Button>
        ) : null}
        {onEdit ? (
          <TbEdit
            onClick={() => onEdit(row)}
            className="cursor-pointer text-green-600/80"
            size={23}
          />
        ) : null}
      </div>
    ),
  },
];
export const initialDataPaymentDetail = () => [
  {
    title: <HeaderCell align="center" title="ردیف" />,
    dataIndex: '_id',
    key: '_id',
    render: (_: string, __: any, idx: number) => (
      <p className="text-center text-xs text-gray-800">{idx + 1}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عکس محصول" />,
    dataIndex: 'thumbnailImage',
    key: 'thumbnailImage',
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-1">
        <img
          className="h-[30px] w-[30px] rounded-lg"
          src={`${BASEURL}/${row.thumbnailImage?.url}`}
        />
        <p>{row.title}</p>
      </div>
    ),
  },
  {
    title: <HeaderCell align="center" title="مبلغ محصول" />,
    dataIndex: 'productPrice',
    key: 'productPrice',
    render: (value: string) => (
      <div className="flex items-center justify-center gap-1">
        <p className="font-num font-bold text-gray-600">
          {Number(value).toLocaleString()} <span className="text-[12px]">تومان</span>
        </p>
      </div>
    ),
  },
  {
    title: <HeaderCell align="center" title="مبلغ تخفیف" />,
    dataIndex: 'productDiscountPrice',
    key: 'productDiscountPrice',
    render: (value: string) => (
      <div className="flex items-center justify-center gap-1">
        <p className="font-num font-bold text-gray-600">
          {Number(value).toLocaleString()} <span className="text-[12px]">تومان</span>
        </p>
      </div>
    ),
  },
  {
    title: <HeaderCell align="center" title="تعداد محصول" />,
    dataIndex: 'productCount',
    key: 'productCount',
    render: (value: string) => (
      <div className="flex items-center justify-center gap-1">
        <p className="font-num font-bold text-gray-600">{Number(value).toLocaleString()} </p>
      </div>
    ),
  },
];

// //////////////////////////////////////////////////DISCOUNT///////////////////////////////////////////////////////

export const initialDataDiscount = ({ onDelete, onEdit }: Props) => [
  {
    title: <HeaderCell align="center" title="ردیف" />,
    dataIndex: '_id',
    key: '_id',
    render: (_: string, __: any, idx: number) => (
      <p className="text-center text-xs text-gray-800">{idx + 1}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="کد" />,
    dataIndex: 'discountCode',
    key: 'discountCode',
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  {
    title: <HeaderCell align="center" title="نوع کد تخفیف" />,
    dataIndex: 'discountCodeType',
    key: 'discountCodeType',
    render: (value: string) => (
      <p className="text-center text-xs text-gray-800">{value === 'fixed' ? 'ثابت' : 'درصد'}</p>
    ),
  },

  {
    title: <HeaderCell title="میزان" />,
    dataIndex: 'limitForEachUser',
    key: 'limitForEachUser',
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  {
    title: <HeaderCell title="مبلغ" />,
    dataIndex: 'discountCodePrice',
    key: 'discountCodePrice',
    render: (value: string, row: any) => (
      <p className="text-center text-xs text-gray-800">
        {Number(value).toLocaleString()} {row?.discountCodeType === 'fixed' ? 'تومان' : 'درصد'}
      </p>
    ),
  },
  {
    title: <HeaderCell title="توضیحات" />,
    dataIndex: 'descriptionCode',
    key: 'descriptionCode',
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  {
    title: <HeaderCell title="تاریخ ایجاد" />,
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (value: string) => (
      <p className="text-center text-xs text-gray-800">{convertDatePer(value)}</p>
    ),
  },
  {
    title: <HeaderCell title="تاریخ بروزرسانی" />,
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (value: string) => (
      <p className="text-center text-xs text-gray-800">{convertDatePer(value)}</p>
    ),
  },
  {
    title: <HeaderCell title="مصرف/محدودیت" />,
    dataIndex: 'restrictionsOnUse',
    key: 'restrictionsOnUse',
    render: (_: string, row: any) => (
      <p className="text-center text-xs text-gray-800">
        {row.restrictionsOnUse ?? 'نامحدود'} / {row.limitForEachUser ?? 'نامحدود'}
      </p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عملیات" />,
    dataIndex: 'action',
    key: 'action',
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-2 text-gray-600">
        {onDelete ? (
          <Button className="w-fit !px-0" onClick={() => onDelete(row)}>
            <Delete_icon />
          </Button>
        ) : null}
        {onEdit ? (
          <Button className="w-fit !px-0" onClick={() => onEdit(row)}>
            <Edit_icon />
          </Button>
        ) : null}
      </div>
    ),
  },
];
// //////////////////////////////////////////////////SMS///////////////////////////////////////////////////////

export const initialDataSms = ({ onDelete, onEdit }: Props) => [
  {
    title: <HeaderCell align="center" title="ردیف" />,
    dataIndex: '_id',
    key: '_id',
    render: (_: string, __: any, idx: number) => (
      <p className="text-center text-xs text-gray-800">{idx + 1}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عنوان" />,
    dataIndex: 'postTitle',
    key: 'postTitle',
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  {
    title: <HeaderCell align="center" title="توضیحات" />,
    dataIndex: 'postDescription',
    key: 'postDescription',
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  {
    title: <HeaderCell align="center" title="عملیات" />,
    dataIndex: 'action',
    key: 'action',
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-2 text-gray-600">
        {onDelete ? (
          <Button className="w-fit !px-0" onClick={() => onDelete(row)}>
            <Delete_icon />
          </Button>
        ) : null}
        {onEdit ? (
          <Button className="w-fit !px-0" onClick={() => onEdit(row)}>
            <Edit_icon />
          </Button>
        ) : null}
      </div>
    ),
  },
];
// //////////////////////////////////////////////////Errors///////////////////////////////////////////////////////

export const initialDataErrors = ({ onDelete, onView }: Props) => [
  {
    title: <HeaderCell align="center" title="ردیف" />,
    dataIndex: '_id',
    key: '_id',
    render: (_: string, __: any, idx: number) => (
      <p className="text-center text-xs text-gray-800">{idx + 1}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عنوان" />,
    dataIndex: 'errorText',
    key: 'errorText',
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value ?? '-'}</p>,
  },
  {
    title: <HeaderCell align="center" title="عملیات" />,
    dataIndex: 'action',
    key: 'action',
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-2 text-gray-600">
        {onView ? <FaEye size={20} onClick={() => onView(row)} /> : null}
        {onDelete ? (
          <Button className="w-fit !px-0" onClick={() => onDelete(row)}>
            <Delete_icon />
          </Button>
        ) : null}
      </div>
    ),
  },
];
// //////////////////////////////////////////////////Transport///////////////////////////////////////////////////////

export const initialDataTransport = ({ onDelete, onEdit }: Props) => [
  {
    title: <HeaderCell align="center" title="ردیف" />,
    dataIndex: '_id',
    key: '_id',
    render: (_: string, __: any, idx: number) => (
      <p className="text-center text-xs text-gray-800">{idx + 1}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="نام شهر" />,
    dataIndex: 'city',
    key: 'city',
    render: (value: string) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  {
    title: <HeaderCell align="center" title="توضیحات" />,
    dataIndex: 'shippingMethod',
    key: 'shippingMethod',
    render: (_: string, row: any) => (
      <div className="flex flex-wrap items-center justify-center gap-3">
        {row.shippingMethod.map((item: any, idx: number) => (
          <p key={idx} className="text-center text-xs text-gray-800">
            {item.type}
          </p>
        ))}
      </div>
    ),
  },
  {
    title: <HeaderCell align="center" title="عملیات" />,
    dataIndex: 'action',
    key: 'action',
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-2 text-gray-600">
        {onDelete ? (
          <Button className="w-fit !px-0" onClick={() => onDelete(row)}>
            <Delete_icon />
          </Button>
        ) : null}
        {onEdit ? (
          <Button className="w-fit !px-0" onClick={() => onEdit(row)}>
            <Edit_icon />
          </Button>
        ) : null}
      </div>
    ),
  },
];

//*********************************************************************PLANS********************************************************************* */

export const initialDataPlans = ({ onDelete, onEdit }: Props) => [
  {
    title: <HeaderCell align="center" title="ردیف" />,
    dataIndex: '_id',
    key: '_id',
    render: (_: string, __: any, idx: number) => (
      <p className="text-center text-xs text-gray-800">{idx + 1}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عنوان" />,
    dataIndex: 'title',
    key: 'title',
    render: (value: number) => <p className="text-center text-xs text-gray-800">{value}</p>,
  },
  {
    title: <HeaderCell align="center" title="کمترین قیمت" />,
    dataIndex: 'minPrice',
    key: 'minPrice',
    render: (value: number) => (
      <p className="text-center text-xs text-gray-800">{Number(value).toLocaleString()}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="بیشترین قیمت" />,
    dataIndex: 'maxPrice',
    key: 'maxPrice',
    render: (value: number) => (
      <p className="text-center text-xs text-gray-800">{Number(value).toLocaleString()}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="مبلغ هدف" />,
    dataIndex: 'targetPrice',
    key: 'targetPrice',
    render: (value: number) => (
      <p className="text-center text-xs text-gray-800">{Number(value).toLocaleString()}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="ارزش پلن" />,
    dataIndex: 'planPrice',
    key: 'planPrice',
    render: (value: number) => (
      <p className="text-center text-xs text-gray-800">{Number(value).toLocaleString()}</p>
    ),
  },
  {
    title: <HeaderCell align="center" title="عملیات" />,
    dataIndex: 'action',
    key: 'action',
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-3 text-gray-600">
        {onDelete ? (
          <Button className="w-fit !px-0" onClick={() => onDelete(row)}>
            <Delete_icon />
          </Button>
        ) : null}
        {onEdit ? (
          <TbEdit
            onClick={() => onEdit(row)}
            className="cursor-pointer text-green-600/80"
            size={23}
          />
        ) : null}
      </div>
    ),
  },
];

export const ordersStatus = [
  {
    label: 'در انتظار پرداخت',
    value: 'Awaiting',
  },
  {
    label: 'در حال انجام',
    value: 'Doing',
  },
  {
    label: 'در انتظار بررسی',
    value: 'Review',
  },
  {
    label: 'تحویل به پست',
    value: 'Delivery',
  },
  {
    label: 'ارسال شده',
    value: 'Posted',
  },
  {
    label: 'لغو شده',
    value: 'Canceled',
  },
  {
    label: 'برداشتن فیلتر',
    value: '',
  },
];
