import { Ticket } from '@/types/profile';
import React, { useEffect } from 'react';
import BaseDialog from '../common/BaseDialog';
import { useSendMessageTicket } from '@/hooks/admin/tickets/useSendMessageTicket';
import Textarea from '../common/form/Textarea';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BASEURL } from '@/lib/variable';
type Props = {
  modal: {
    open: boolean;
    info: null | Ticket;
  };
  setModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      info: null | Ticket;
    }>
  >;
};
const SendMessageTicket = ({ modal, setModal }: Props) => {
  const { isPending, mutate, isSuccess } = useSendMessageTicket();
  const onClose = () => setModal({ open: false, info: null });
  const formik = useFormik<any>({
    initialValues: {
      content: '',
      files: undefined,
    },
    validationSchema: Yup.object({
      content: Yup.string().required('فیلد اجباری است'),
    }),
    onSubmit: (values) => {
      const formdata = new FormData();
      formdata.append('content', values.content);
      formdata.append('ticketId', modal.info?._id!);
      if (values.files) {
        formdata.append('files', values.files);
      }

      mutate({ data: formdata });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      formik.setValues({
        title: '',
        description: '',
        files: undefined,
      });
      formik.resetForm();
      onClose();
    }
  }, [isSuccess]);
  return (
    <BaseDialog
      isOpen={modal.open}
      title="ارسال پیام"
      nameBtnFooter="اعمال"
      isLoadingFooterBtn={isPending}
      onClickFooter={formik.handleSubmit}
      onClose={onClose}
    >
      <div className="gap-4">
        <div className="mt-5">
          {modal?.info?.messages.map((item, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between">
                <p className="font-medium text-[16px] text-main">{item.fullName}</p>
                <p className="font-medium text-[14px] text-[#6A7890]">
                  {new Date(item.submitDate).toLocaleDateString('fa-IR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <p className="mt-8 font-regular text-[18px] text-[#6A7890]">متن پیام</p>
              <p className="pt-6 font-regular text-[16px] text-[#0B1524]">{item.content}</p>
              {item.attachmentUrl ? (
                <div className="mt-5">
                  <p className="font-regular text-[18px] text-[#6A7890]">فایل پیوست</p>
                  <div className="mt-4 flex h-[67px] items-center justify-between rounded-lg bg-[#F4F6FA] px-3">
                    <div className="flex items-center gap-3">
                      <span>
                        <svg
                          width="43"
                          height="43"
                          viewBox="0 0 43 43"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.5013 25.084C21.0261 25.084 20.5704 25.2727 20.2344 25.6087C19.8984 25.9447 19.7096 26.4005 19.7096 26.8756V30.459C19.7096 30.9342 19.8984 31.3899 20.2344 31.7259C20.5704 32.0619 21.0261 32.2506 21.5013 32.2506C21.9765 32.2506 22.4322 32.0619 22.7682 31.7259C23.1042 31.3899 23.293 30.9342 23.293 30.459V26.8756C23.293 26.4005 23.1042 25.9447 22.7682 25.6087C22.4322 25.2727 21.9765 25.084 21.5013 25.084ZM22.1821 19.8523C21.8578 19.7019 21.4959 19.652 21.143 19.709L20.8205 19.8165L20.498 19.9777L20.2292 20.1927C20.0588 20.3644 19.9249 20.5688 19.8356 20.7935C19.7463 21.0183 19.7035 21.2589 19.7096 21.5006C19.7083 21.7364 19.7535 21.9702 19.8426 22.1885C19.9318 22.4068 20.0632 22.6053 20.2292 22.7727C20.3996 22.9358 20.6005 23.0637 20.8205 23.149C21.0331 23.2493 21.2663 23.2984 21.5013 23.2923C21.7371 23.2937 21.9708 23.2485 22.1891 23.1593C22.4074 23.0702 22.606 22.9388 22.7734 22.7727C22.9394 22.6053 23.0708 22.4068 23.16 22.1885C23.2491 21.9702 23.2943 21.7364 23.293 21.5006C23.2943 21.2649 23.2491 21.0311 23.16 20.8128C23.0708 20.5945 22.9394 20.396 22.7734 20.2286C22.5992 20.0703 22.3993 19.943 22.1821 19.8523ZM35.8346 16.0181C35.816 15.8536 35.7799 15.6914 35.7271 15.5344V15.3731C35.641 15.1889 35.5261 15.0196 35.3867 14.8715L24.6367 4.12148C24.4886 3.98212 24.3193 3.86721 24.1351 3.78107H23.9559C23.7817 3.68791 23.5944 3.62147 23.4005 3.58398H12.543C11.1174 3.58398 9.75028 4.15028 8.74227 5.15829C7.73426 6.16629 7.16797 7.53344 7.16797 8.95898V34.0423C7.16797 35.4679 7.73426 36.835 8.74227 37.843C9.75028 38.851 11.1174 39.4173 12.543 39.4173H30.4596C31.8852 39.4173 33.2523 38.851 34.2603 37.843C35.2683 36.835 35.8346 35.4679 35.8346 34.0423V16.1256C35.8346 16.1256 35.8346 16.1256 35.8346 16.0181ZM25.0846 9.69357L29.725 14.334H26.8763C26.4011 14.334 25.9454 14.1452 25.6094 13.8092C25.2734 13.4732 25.0846 13.0175 25.0846 12.5423V9.69357ZM32.2513 34.0423C32.2513 34.5175 32.0625 34.9732 31.7265 35.3092C31.3905 35.6452 30.9348 35.834 30.4596 35.834H12.543C12.0678 35.834 11.6121 35.6452 11.2761 35.3092C10.9401 34.9732 10.7513 34.5175 10.7513 34.0423V8.95898C10.7513 8.4838 10.9401 8.02809 11.2761 7.69208C11.6121 7.35608 12.0678 7.16732 12.543 7.16732H21.5013V12.5423C21.5013 13.9679 22.0676 15.335 23.0756 16.343C24.0836 17.351 25.4508 17.9173 26.8763 17.9173H32.2513V34.0423Z"
                            fill="#6E3DFF"
                          />
                        </svg>
                      </span>
                      <span className="font-regular text-[16px] text-[#0B1524]">
                        فایل پیوسته شده
                      </span>
                    </div>
                    <a
                      download
                      className="flex h-[32px] w-[119px] items-center justify-center gap-3 rounded-lg bg-main font-medium text-white"
                      href={`${BASEURL}/${item.attachmentUrl}`}
                    >
                      دانلود فایل
                      <span>
                        <svg
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 14.5C20.7348 14.5 20.4804 14.6054 20.2929 14.7929C20.1054 14.9804 20 15.2348 20 15.5V19.5C20 19.7652 19.8946 20.0196 19.7071 20.2071C19.5196 20.3946 19.2652 20.5 19 20.5H5C4.73478 20.5 4.48043 20.3946 4.29289 20.2071C4.10536 20.0196 4 19.7652 4 19.5V15.5C4 15.2348 3.89464 14.9804 3.70711 14.7929C3.51957 14.6054 3.26522 14.5 3 14.5C2.73478 14.5 2.48043 14.6054 2.29289 14.7929C2.10536 14.9804 2 15.2348 2 15.5V19.5C2 20.2956 2.31607 21.0587 2.87868 21.6213C3.44129 22.1839 4.20435 22.5 5 22.5H19C19.7956 22.5 20.5587 22.1839 21.1213 21.6213C21.6839 21.0587 22 20.2956 22 19.5V15.5C22 15.2348 21.8946 14.9804 21.7071 14.7929C21.5196 14.6054 21.2652 14.5 21 14.5ZM11.29 16.21C11.3851 16.301 11.4972 16.3724 11.62 16.42C11.7397 16.4729 11.8691 16.5002 12 16.5002C12.1309 16.5002 12.2603 16.4729 12.38 16.42C12.5028 16.3724 12.6149 16.301 12.71 16.21L16.71 12.21C16.8983 12.0217 17.0041 11.7663 17.0041 11.5C17.0041 11.2337 16.8983 10.9783 16.71 10.79C16.5217 10.6017 16.2663 10.4959 16 10.4959C15.7337 10.4959 15.4783 10.6017 15.29 10.79L13 13.09V3.5C13 3.23478 12.8946 2.98043 12.7071 2.79289C12.5196 2.60536 12.2652 2.5 12 2.5C11.7348 2.5 11.4804 2.60536 11.2929 2.79289C11.1054 2.98043 11 3.23478 11 3.5V13.09L8.71 10.79C8.61676 10.6968 8.50607 10.6228 8.38425 10.5723C8.26243 10.5219 8.13186 10.4959 8 10.4959C7.86814 10.4959 7.73757 10.5219 7.61575 10.5723C7.49393 10.6228 7.38324 10.6968 7.29 10.79C7.19676 10.8832 7.1228 10.9939 7.07234 11.1158C7.02188 11.2376 6.99591 11.3681 6.99591 11.5C6.99591 11.6319 7.02188 11.7624 7.07234 11.8842C7.1228 12.0061 7.19676 12.1168 7.29 12.21L11.29 16.21Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <div className="mt-10 space-y-3">
          <Textarea formik={formik} name="content" label={'جواب تیکت'} />
          <div>
            <p
              className={`mb-[6px] pr-1 font-medium text-[12px] dark:!text-[#8E98A8] lg:text-[14px]`}
            >
              {'ارسال فایل'} {<span className="text-red-500">*</span>}
            </p>
            <div className="relative h-[200px] w-full rounded-lg border-2 border-dashed">
              <label className="block h-full w-full cursor-pointer" htmlFor="upload">
                {formik.values.files instanceof File ? (
                  <img
                    src={URL.createObjectURL(formik.values.files)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3">
                    <span>
                      <svg
                        width="72"
                        height="72"
                        viewBox="0 0 72 72"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M54 24C54 27.3137 51.3137 30 48 30C44.6863 30 42 27.3137 42 24C42 20.6863 44.6863 18 48 18C51.3137 18 54 20.6863 54 24Z"
                          fill="#6A7890"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M35.8279 3.75H36.1721C43.0973 3.74996 48.5244 3.74993 52.7589 4.31924C57.0931 4.90196 60.5132 6.11798 63.1976 8.80241C65.882 11.4868 67.098 14.9069 67.6808 19.2411C68.2501 23.4756 68.25 28.9027 68.25 35.8279V36.0927C68.25 41.8191 68.25 46.5068 67.939 50.3236C67.6265 54.1592 66.9861 57.3643 65.5527 60.0262C64.9204 61.2003 64.1435 62.2517 63.1976 63.1976C60.5132 65.882 57.0931 67.098 52.7589 67.6808C48.5244 68.2501 43.0973 68.25 36.1721 68.25H35.8279C28.9027 68.25 23.4756 68.2501 19.2411 67.6808C14.9069 67.098 11.4868 65.882 8.80241 63.1976C6.42257 60.8178 5.1936 57.8557 4.54005 54.1813C3.89805 50.5718 3.78061 46.0809 3.75621 40.5044C3.75 39.086 3.75 37.5857 3.75 36.003V35.8279C3.74996 28.9027 3.74993 23.4756 4.31924 19.2411C4.90196 14.9069 6.11798 11.4868 8.80241 8.80241C11.4868 6.11798 14.9069 4.90196 19.2411 4.31924C23.4756 3.74993 28.9027 3.74996 35.8279 3.75ZM19.8407 8.77911C16.0055 9.29474 13.6934 10.2754 11.9844 11.9844C10.2754 13.6934 9.29474 16.0055 8.77911 19.8407C8.25478 23.7407 8.25 28.8653 8.25 36C8.25 36.8715 8.25 37.7144 8.25103 38.5305L11.2544 35.9025C13.9882 33.5105 18.1085 33.6477 20.6771 36.2163L33.5463 49.0855C35.608 51.1472 38.8534 51.4283 41.2389 49.7518L42.1335 49.1231C45.5662 46.7106 50.2105 46.9901 53.3291 49.7969L61.8204 57.439C62.6752 55.644 63.1828 53.2854 63.4539 49.9582C63.7483 46.3448 63.75 41.8376 63.75 36C63.75 28.8653 63.7452 23.7407 63.2209 19.8407C62.7053 16.0055 61.7246 13.6934 60.0156 11.9844C58.3066 10.2754 55.9945 9.29474 52.1593 8.77911C48.2593 8.25478 43.1347 8.25 36 8.25C28.8653 8.25 23.7407 8.25478 19.8407 8.77911Z"
                          fill="#6A7890"
                        />
                      </svg>
                    </span>
                    <p className="text-center font-medium text-[#6A7890]">
                      برای آپلود روی فایل کلیک کنید یا به این قسمت بکشید
                    </p>
                    <span className="font-medium text-[12px] text-[#8E98A8]">
                      حجم فایل حداکثر10MBمجاز است.
                    </span>
                  </div>
                )}
              </label>
              <input
                onChange={(e) => {
                  if (e.target.files) formik.setFieldValue('files', e.target.files[0]);
                }}
                id="upload"
                type="file"
                className="absolute z-0 w-0"
              />
            </div>
          </div>
        </div>
      </div>
    </BaseDialog>
  );
};

export default SendMessageTicket;
