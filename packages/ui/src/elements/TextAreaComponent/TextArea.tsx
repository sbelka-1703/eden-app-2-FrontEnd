import clsx from "clsx";
import { InputHTMLAttributes } from "react";

export type TextAreaProps = {
  name?: string;
  value?: string;
  required?: boolean;
  row?: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
} & InputHTMLAttributes<HTMLTextAreaElement>;

export const TextArea: React.FC<TextAreaProps> = ({
  name,
  value,
  required,
  autoComplete,
  placeholder,
  row,
  onChange,
}) => {
  const inputCls = clsx("py-1 px-4 font-Inter text-soilBody flex rounded-md");

  return (
    <div className={`w-full`}>
      <div className={"mt-1"}>
        <textarea
          id={name}
          name={name}
          value={value}
          rows={row}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e);
          }}
          className={`${inputCls} focus:border-accentColor focus:ring-soilGreen-500 block w-full border border-zinc-400/50 py-1 px-2 text-base shadow-sm focus:outline-transparent focus:ring focus:ring-opacity-50`}
        />
      </div>
    </div>
  );
};

export default TextArea;
