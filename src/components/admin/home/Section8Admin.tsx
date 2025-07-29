'use client';

import { Home } from '@/store/types/home';
import { FormikProps } from 'formik';
import React, { useEffect, useRef } from 'react';
import Editor from '../common/Editor'; // فرض بر اینه که این TinyMCE رو رپ کرده
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';

type Props = {
  formik: FormikProps<any>;
  data?: Home;
};

const Section8Admin = ({ formik, data }: Props) => {
  const editRef = useRef<TinyMCEEditor['editor'] | null>(null);

  useEffect(() => {
    if (data) {
      formik.setValues({
        ...formik.values,
        sec: 'section8',
        _id: formik.values._id,
        description: data || '',
      });
    }
  }, [data]);

  // تابع برای ذخیره محتوا از ادیتور
  const handleEditorChange = () => {
    if (editRef.current) {
      const content = editRef.current.getContent();
      formik.setFieldValue('description', content);
    }
  };

  return (
    <div>
      <Editor
        // @ts-expect-error error
        editorRef={editRef}
        label="توضیحات"
        value={formik.values.description}
        onBlur={handleEditorChange}
      />
    </div>
  );
};

export default Section8Admin;
