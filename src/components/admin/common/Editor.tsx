import { Editor as EditorTinymce } from '@tinymce/tinymce-react';

type Props = {
  editorRef: React.RefObject<HTMLInputElement>;
  value: string;
  onBlur?: () => void;
  label?: string;
  isRequired?: boolean;
};
const Editor = ({ value, editorRef, onBlur, label, isRequired }: Props) => {
  return (
    <div className="mt-4 lg:col-span-2">
      {typeof label === 'string' ? (
        <p className={`mb-[6px] pr-1 font-medium text-[12px] dark:!text-[#8E98A8] lg:text-[14px]`}>
          {label} {isRequired && <span className="text-red-500">*</span>}
        </p>
      ) : (
        label
      )}
      <EditorTinymce
        // @ts-ignore
        onInit={(_evt, editor) => (editorRef.current! = editor)}
        apiKey="mcxbw3ofc73fi306etrn075rmmta8nji278xe71ofdix95v1"
        init={{
          height: '550',
          directionality: 'rtl',
          link_default_target: '_blank',
          link_rel_list: [
            { title: 'No Referrer', value: 'noreferrer' },
            { title: 'External Link', value: 'external' },
            { title: 'No Follow', value: 'nofollow' },
          ],
          language: 'fa',
          // plugins: 'anchor  autolink charmap codesample emoticons image link lists media searchreplace  visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions  tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
          plugins: `
            advlist anchor autolink autosave charmap code codesample directionality emoticons image 
            insertdatetime link lists media nonbreaking pagebreak preview quickbars save searchreplace 
            table visualblocks visualchars wordcount
          `,
          toolbar: `
            undo redo | blocks fontfamily fontsize | bold italic underline strikethrough |
            alignleft aligncenter alignright alignjustify | outdent indent |
            link image media | codesample code | bullist numlist | emoticons charmap |
            preview save print | removeformat
          `,
        }}
        initialValue={value}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Editor;
