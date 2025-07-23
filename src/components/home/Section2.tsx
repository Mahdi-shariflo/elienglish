import React from 'react';
import { Slider as SliderType } from '@/types/home';
import Slider from '../common/Slider';

const Section2 = ({ section }: { section: SliderType[] }) => {
  if (!section) return;
  return (
    <>
      <Slider sliders={section} />
    </>
  );
};

export default Section2;
