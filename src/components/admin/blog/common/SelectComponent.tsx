import React from 'react';
import Select from 'react-select';

const SelectComponent = () => {
  return (
    <div>
      {/* <Select
                components={{
                    IndicatorsContainer: () => <span>
                        <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="1em" data-slot="selectorIcon" className="w-4 h-4 transition-none ml-3"><path d="m6 9 6 6 6-6"></path></svg>
                    </span>,
                    MultiValueLabel: ({ data }) => <div>
                        <div className=''>
                            <img loading='eager' className='w-8 h-8 jpeg-layer border border-gray-100 object-contain rounded-full' src={`${BASEURL}/${data?.thumbnailImage?.url}`} />

                        </div>
                    </div>,
                }}
                placeholder="انتخاب محصولات"
                options={options}
                // @ts-expect-error
                onChange={(value) => onChange(value)}
                values={values}
                // @ts-expect-error
                getOptionLabel={getOptionLabel}
                getOptionValue={(option) => option.title}
                isMulti
                onMenuScrollToBottom={onMenuScrollToBottom}
                isSearchable
                hideSelectedOptions
                loadingMessage={() => <Spinner classNames={{ circle1: "border-b-main", circle2: "border-b-main" }} />}
                isLoading={true}
                noOptionsMessage={() => <span className='font-regular text-[#0c0c0c] text-[14px]'>لیست خالی است</span>}
                isClearable={false}
                classNames={{
                    input: () => "!h-[40px]",
                    control: () => " !bg-[#f5f6f6] !outline-none !border-gray-200 !rounded-lg",
                    indicatorSeparator: () => "hidden",
                    placeholder: () => "font-regular !text-[14px]",
                    container: () => "!outline-none",
                    menuList: () => "container_select",
                    menu: () => "!z-[9999] rounded-xl overflow-hidden",


                }}
            /> */}
    </div>
  );
};

export default SelectComponent;
