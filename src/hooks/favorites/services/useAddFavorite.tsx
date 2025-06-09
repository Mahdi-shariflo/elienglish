import React from 'react';
import { apiFavorite } from '@/actions/apis/favorites';
import { useMutation } from '@tanstack/react-query';
import { addToast, Button } from '@heroui/react';
import { FaAngleLeft } from 'react-icons/fa';
import Link from 'next/link';

export function useAddFavorite() {
  const { mutate, isPending } = useMutation({
    mutationFn: apiFavorite.add,
    onSuccess: ({ data }) => {
      const { message } = data?.data || {};
      addToast({
        title: message,
        classNames: {
          base: 'flex flex-col items-start rounded-lg',
          icon: 'w-6 h-6 fill-current',
        },

        endContent: (
          <Button
            className="mb-2 mt-3 flex items-center justify-between gap-x-1 underline-offset-2"
            color={'success'}
            size="md"
            variant="light"
            as={Link}
            href="/profile/favorite/"
          >
            <label>مشاهده</label>
            <FaAngleLeft />
          </Button>
        ),
        color: 'success',
      });
    },
  });
  return { mutate, isPending };
}
