import React from 'react';
import BaseDialog from './BaseDialog';
import VideoPlayer from '../admin/common/VideoPlayer';
type Props = {
  modal: {
    open: boolean;
    url: string;
    poster: string;
  };
  setModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      url: string;
      poster: string;
    }>
  >;
};
const WatchVideo = ({ modal, setModal }: Props) => {
  const onClose = () => setModal({ open: false, poster: '', url: '' });
  return (
    <BaseDialog onClose={onClose} size="5xl" title="تماشای ویدیو" isOpen={modal.open}>
      <div>
        <VideoPlayer url={modal.url} poster="" />
      </div>
    </BaseDialog>
  );
};

export default WatchVideo;
