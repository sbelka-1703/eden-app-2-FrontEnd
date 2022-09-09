import clsx from "clsx";
import { debounce } from "lodash";
import { InputHTMLAttributes } from "react";

export type TextAreaProps = {
  name?: string;
  value?: string;
  required?: boolean;
  rows?: number;
  maxLength?: number;
  debounceTime?: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
} & InputHTMLAttributes<HTMLTextAreaElement>;

export const TextArea: React.FC<TextAreaProps> = ({
  name,
  value,
  required,
  autoComplete,
  placeholder,
  rows = 3,
  maxLength,
  debounceTime = 0,
  onChange,
}) => {
  const debouncedOnChange = debounce((e: any) => {
    onChange(e);
  }, 2000);
  const handleInputChange = (e: any) => {
    if (debounceTime) {
      debouncedOnChange(e);
    } else {
      onChange(e);
    }
  };

  const inputCls = clsx("py-1 px-2 font-Inter text-soilBody flex rounded-md");

  return (
    <div className={`w-full`}>
      <div className={"mt-1"}>
        <textarea
          id={name}
          name={name}
          defaultValue={value}
          rows={rows}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          onChange={(e) => {
            handleInputChange(e);
          }}
          maxLength={maxLength}
          className={`${inputCls} focus:border-accentColor focus:ring-soilGreen-500 block w-full resize-none border border-zinc-400/50 py-1 px-2 text-base shadow-sm focus:outline-transparent focus:ring focus:ring-opacity-50`}
        />
      </div>
    </div>
  );
};

export default TextArea;
