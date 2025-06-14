'use client';
import React from 'react';
import Button from '../common/Button';
import { Comment } from '@/types';
import { useAcrionLikeComment } from '@/hooks/comments/useAcrionLikeComment';
type Props = {
  comment: Comment;
  productId?: string;
  onAnswer?: () => void;
  showAction?: boolean;
};
const CardComment = ({ comment, productId, showAction = true }: Props) => {
  const { mutate, variables } = useAcrionLikeComment();

  return (
    <div className="w-full">
      <div className="shadow-comment w-full overflow-hidden rounded-xl p-4">
        <div className="flex items-center justify-between">
          {/* name & rate */}
          <div className="flex items-center gap-2">
            <span>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M28.1075 11.4399V20.5598C28.1075 22.0532 27.3075 23.4399 26.0142 24.1999L18.0942 28.7732C16.8009 29.5199 15.2009 29.5199 13.8942 28.7732L5.97419 24.1999C4.68086 23.4532 3.88086 22.0665 3.88086 20.5598V11.4399C3.88086 9.94655 4.68086 8.55983 5.97419 7.79983L13.8942 3.2265C15.1875 2.47984 16.7875 2.47984 18.0942 3.2265L26.0142 7.79983C27.3075 8.55983 28.1075 9.93322 28.1075 11.4399Z"
                  fill="#DD338B"
                />
                <path
                  d="M16.0012 15.9999C17.717 15.9999 19.1079 14.609 19.1079 12.8932C19.1079 11.1775 17.717 9.78662 16.0012 9.78662C14.2854 9.78662 12.8945 11.1775 12.8945 12.8932C12.8945 14.609 14.2854 15.9999 16.0012 15.9999Z"
                  fill="#EC48A5"
                />
                <path
                  d="M19.5742 22.2133C20.6542 22.2133 21.2809 21.0134 20.6809 20.12C19.7742 18.7734 18.0142 17.8667 16.0009 17.8667C13.9875 17.8667 12.2275 18.7734 11.3209 20.12C10.7209 21.0134 11.3475 22.2133 12.4275 22.2133H19.5742Z"
                  fill="#EC48A5"
                />
              </svg>
            </span>

            <p className="text-[14px] text-[#616A76]">
              {comment?.author?.firstName} {comment?.author?.lastName}
            </p>
          </div>
          <div className="flex h-[28px] w-[61px] items-center justify-center gap-px rounded-lg bg-[#FFA216]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.4421 2.92471L12.9087 5.85804C13.1087 6.26637 13.6421 6.65804 14.0921 6.73304L16.7504 7.17471C18.4504 7.45804 18.8504 8.69137 17.6254 9.90804L15.5587 11.9747C15.2087 12.3247 15.0171 12.9997 15.1254 13.483L15.7171 16.0414C16.1837 18.0664 15.1087 18.8497 13.3171 17.7914L10.8254 16.3164C10.3754 16.0497 9.63375 16.0497 9.17541 16.3164L6.68375 17.7914C4.90041 18.8497 3.81708 18.058 4.28375 16.0414L4.87541 13.483C4.98375 12.9997 4.79208 12.3247 4.44208 11.9747L2.37541 9.90804C1.15875 8.69137 1.55041 7.45804 3.25041 7.17471L5.90875 6.73304C6.35041 6.65804 6.88375 6.26637 7.08375 5.85804L8.55041 2.92471C9.35041 1.33304 10.6504 1.33304 11.4421 2.92471Z"
                fill="white"
                stroke="white"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="pt-1 font-regular text-[14px] text-white">{comment.rate}</span>
          </div>
        </div>
        {/* date */}
        <div className="mt-3 flex items-center gap-1">
          <span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.33398 1.3335V3.3335"
                stroke="#7D8793"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.666 1.3335V3.3335"
                stroke="#7D8793"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.33398 6.06006H13.6673"
                stroke="#7D8793"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 5.66683V11.3335C14 13.3335 13 14.6668 10.6667 14.6668H5.33333C3 14.6668 2 13.3335 2 11.3335V5.66683C2 3.66683 3 2.3335 5.33333 2.3335H10.6667C13 2.3335 14 3.66683 14 5.66683Z"
                stroke="#7D8793"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.99764 9.13314H8.00363"
                stroke="#7D8793"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.52889 9.13314H5.53488"
                stroke="#7D8793"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.52889 11.1331H5.53488"
                stroke="#7D8793"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-[12px] text-[#7D8793]">
            {new Date(comment.createdAt).toLocaleDateString('fa-IR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>

        <p className="w-full text-wrap py-2 font-bold text-[14px] text-[#616A76]">
          {comment.commentTitle}
        </p>
        <p className="w-full text-wrap py-2 font-regular text-[14px] text-[#616A76]">
          {comment.comment}
        </p>
        {showAction && (
          <div className="flex items-center justify-end gap-3">
            <div className="flex items-center justify-end gap-3">
              <Button
                onClick={() =>
                  mutate({
                    data: {
                      commentId: comment._id,
                      operation: 'disLike',
                      loading: '1',
                      productId,
                    },
                  })
                }
                isPending={variables?.data.loading === '1'}
                className="flex w-fit items-center px-0"
              >
                <span className="font-regular text-[14px] text-[#7D8793]">{comment.disLike}</span>
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5197 5.6499L13.4197 3.2499C13.0197 2.8499 12.1197 2.6499 11.5197 2.6499H7.71973C6.51973 2.6499 5.21973 3.5499 4.91973 4.7499L2.51973 12.0499C2.01973 13.4499 2.91973 14.6499 4.41973 14.6499H8.41973C9.01973 14.6499 9.51973 15.1499 9.41973 15.8499L8.91973 19.0499C8.71973 19.9499 9.31973 20.9499 10.2197 21.2499C11.0197 21.5499 12.0197 21.1499 12.4197 20.5499L16.5197 14.4499"
                      stroke="#DD338B"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M21.6191 5.65V15.45C21.6191 16.85 21.0191 17.35 19.6191 17.35H18.6191C17.2191 17.35 16.6191 16.85 16.6191 15.45V5.65C16.6191 4.25 17.2191 3.75 18.6191 3.75H19.6191C21.0191 3.75 21.6191 4.25 21.6191 5.65Z"
                      stroke="#DD338B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Button>

              <Button
                onClick={() =>
                  mutate({
                    data: {
                      commentId: comment._id,
                      operation: 'like',
                      loading: '2',
                      productId,
                    },
                  })
                }
                isPending={variables?.data.loading === '2'}
                className="flex w-fit items-center px-0"
              >
                <span className="font-regular text-[14px] text-[#7D8793]">{comment.like}</span>
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.48047 18.35L10.5805 20.75C10.9805 21.15 11.8805 21.35 12.4805 21.35H16.2805C17.4805 21.35 18.7805 20.45 19.0805 19.25L21.4805 11.95C21.9805 10.55 21.0805 9.34997 19.5805 9.34997H15.5805C14.9805 9.34997 14.4805 8.84997 14.5805 8.14997L15.0805 4.94997C15.2805 4.04997 14.6805 3.04997 13.7805 2.74997C12.9805 2.44997 11.9805 2.84997 11.5805 3.44997L7.48047 9.54997"
                      stroke="#DD338B"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M2.38086 18.3499V8.5499C2.38086 7.1499 2.98086 6.6499 4.38086 6.6499H5.38086C6.78086 6.6499 7.38086 7.1499 7.38086 8.5499V18.3499C7.38086 19.7499 6.78086 20.2499 5.38086 20.2499H4.38086C2.98086 20.2499 2.38086 19.7499 2.38086 18.3499Z"
                      stroke="#DD338B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Button>
            </div>

            {/* <Button onClick={onAnswer} className='w-fit text-main'>
                        <span>پاسخ جدید</span>
                        <span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.99925 13.2802L5.65258 8.93355C5.13924 8.42021 5.13924 7.58021 5.65258 7.06688L9.99925 2.72021" stroke="#DD338B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                        </span>
                    </Button> */}
          </div>
        )}
      </div>
      <div className="mt-5 space-y-3 pr-3 lg:pr-10">
        {comment.children.map((child) => (
          <div key={child._id} className="shadow-comment rounded-xl p-4">
            <div className="flex items-center justify-between">
              {/* name & rate */}
              <div className="flex items-center gap-2">
                <span>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.4"
                      d="M28.1075 11.4399V20.5598C28.1075 22.0532 27.3075 23.4399 26.0142 24.1999L18.0942 28.7732C16.8009 29.5199 15.2009 29.5199 13.8942 28.7732L5.97419 24.1999C4.68086 23.4532 3.88086 22.0665 3.88086 20.5598V11.4399C3.88086 9.94655 4.68086 8.55983 5.97419 7.79983L13.8942 3.2265C15.1875 2.47984 16.7875 2.47984 18.0942 3.2265L26.0142 7.79983C27.3075 8.55983 28.1075 9.93322 28.1075 11.4399Z"
                      fill="#DD338B"
                    />
                    <path
                      d="M16.0012 15.9999C17.717 15.9999 19.1079 14.609 19.1079 12.8932C19.1079 11.1775 17.717 9.78662 16.0012 9.78662C14.2854 9.78662 12.8945 11.1775 12.8945 12.8932C12.8945 14.609 14.2854 15.9999 16.0012 15.9999Z"
                      fill="#EC48A5"
                    />
                    <path
                      d="M19.5742 22.2133C20.6542 22.2133 21.2809 21.0134 20.6809 20.12C19.7742 18.7734 18.0142 17.8667 16.0009 17.8667C13.9875 17.8667 12.2275 18.7734 11.3209 20.12C10.7209 21.0134 11.3475 22.2133 12.4275 22.2133H19.5742Z"
                      fill="#EC48A5"
                    />
                  </svg>
                </span>

                <p className="text-[14px] text-[#616A76]">
                  {comment?.author?.firstName} {comment?.author?.lastName}
                </p>
              </div>
              <div className="flex h-[28px] w-[61px] items-center justify-center gap-px rounded-lg bg-[#FFA216]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.4421 2.92471L12.9087 5.85804C13.1087 6.26637 13.6421 6.65804 14.0921 6.73304L16.7504 7.17471C18.4504 7.45804 18.8504 8.69137 17.6254 9.90804L15.5587 11.9747C15.2087 12.3247 15.0171 12.9997 15.1254 13.483L15.7171 16.0414C16.1837 18.0664 15.1087 18.8497 13.3171 17.7914L10.8254 16.3164C10.3754 16.0497 9.63375 16.0497 9.17541 16.3164L6.68375 17.7914C4.90041 18.8497 3.81708 18.058 4.28375 16.0414L4.87541 13.483C4.98375 12.9997 4.79208 12.3247 4.44208 11.9747L2.37541 9.90804C1.15875 8.69137 1.55041 7.45804 3.25041 7.17471L5.90875 6.73304C6.35041 6.65804 6.88375 6.26637 7.08375 5.85804L8.55041 2.92471C9.35041 1.33304 10.6504 1.33304 11.4421 2.92471Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="pt-1 font-regular text-[14px] text-white">{child.rate}</span>
              </div>
            </div>
            {/* date */}
            <div className="mt-3 flex items-center gap-1">
              <span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.33398 1.3335V3.3335"
                    stroke="#7D8793"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.666 1.3335V3.3335"
                    stroke="#7D8793"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.33398 6.06006H13.6673"
                    stroke="#7D8793"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 5.66683V11.3335C14 13.3335 13 14.6668 10.6667 14.6668H5.33333C3 14.6668 2 13.3335 2 11.3335V5.66683C2 3.66683 3 2.3335 5.33333 2.3335H10.6667C13 2.3335 14 3.66683 14 5.66683Z"
                    stroke="#7D8793"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.99764 9.13314H8.00363"
                    stroke="#7D8793"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.52889 9.13314H5.53488"
                    stroke="#7D8793"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.52889 11.1331H5.53488"
                    stroke="#7D8793"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-[12px] text-[#7D8793]">
                {new Date(child.createdAt).toLocaleDateString('fa-IR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            <p className="py-2 font-regular text-[14px] text-[#616A76]">{child.comment}</p>

            <div className="flex items-center justify-end gap-3">
              <div className="flex items-center justify-end gap-3">
                <Button
                  onClick={() =>
                    mutate({
                      data: {
                        commentId: child._id,
                        operation: 'disLlike',
                        loading: '3',
                        productId,
                      },
                    })
                  }
                  isPending={variables?.data.loading === '3'}
                  className="flex w-fit items-center px-0"
                >
                  <span className="font-regular text-[14px] text-[#7D8793]">{child.disLike}</span>
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5197 5.6499L13.4197 3.2499C13.0197 2.8499 12.1197 2.6499 11.5197 2.6499H7.71973C6.51973 2.6499 5.21973 3.5499 4.91973 4.7499L2.51973 12.0499C2.01973 13.4499 2.91973 14.6499 4.41973 14.6499H8.41973C9.01973 14.6499 9.51973 15.1499 9.41973 15.8499L8.91973 19.0499C8.71973 19.9499 9.31973 20.9499 10.2197 21.2499C11.0197 21.5499 12.0197 21.1499 12.4197 20.5499L16.5197 14.4499"
                        stroke="#DD338B"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                      />
                      <path
                        d="M21.6191 5.65V15.45C21.6191 16.85 21.0191 17.35 19.6191 17.35H18.6191C17.2191 17.35 16.6191 16.85 16.6191 15.45V5.65C16.6191 4.25 17.2191 3.75 18.6191 3.75H19.6191C21.0191 3.75 21.6191 4.25 21.6191 5.65Z"
                        stroke="#DD338B"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Button>

                <Button
                  onClick={() =>
                    mutate({
                      data: {
                        commentId: child._id,
                        operation: 'like',
                        loading: '4',
                        productId,
                      },
                    })
                  }
                  isPending={variables?.data.loading === '4'}
                  className="flex w-fit items-center px-0"
                >
                  <span className="font-regular text-[14px] text-[#7D8793]">{child.like}</span>
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.48047 18.35L10.5805 20.75C10.9805 21.15 11.8805 21.35 12.4805 21.35H16.2805C17.4805 21.35 18.7805 20.45 19.0805 19.25L21.4805 11.95C21.9805 10.55 21.0805 9.34997 19.5805 9.34997H15.5805C14.9805 9.34997 14.4805 8.84997 14.5805 8.14997L15.0805 4.94997C15.2805 4.04997 14.6805 3.04997 13.7805 2.74997C12.9805 2.44997 11.9805 2.84997 11.5805 3.44997L7.48047 9.54997"
                        stroke="#DD338B"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                      />
                      <path
                        d="M2.38086 18.3499V8.5499C2.38086 7.1499 2.98086 6.6499 4.38086 6.6499H5.38086C6.78086 6.6499 7.38086 7.1499 7.38086 8.5499V18.3499C7.38086 19.7499 6.78086 20.2499 5.38086 20.2499H4.38086C2.98086 20.2499 2.38086 19.7499 2.38086 18.3499Z"
                        stroke="#DD338B"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Button>
              </div>
              {/* <Button onClick={onAnswer} className='w-fit text-main'>
                                    <span>پاسخ جدید</span>
                                    <span>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.99925 13.2802L5.65258 8.93355C5.13924 8.42021 5.13924 7.58021 5.65258 7.06688L9.99925 2.72021" stroke="#DD338B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                    </span>
                                </Button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardComment;
