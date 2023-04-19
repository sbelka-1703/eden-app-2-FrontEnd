import clsx from "clsx";
import { InputHTMLAttributes } from "react";

export type TextFieldProps = {
  name?: string;
  label?: string;
  value?: string | number;
  defaultValue?: string | number;
  required?: boolean;
  radius?: "default" | "rounded" | "pill" | "pill-shadow";
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  [rest: string]: any;
} & InputHTMLAttributes<HTMLInputElement>;

export const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  value,
  defaultValue,
  type = "text",
  required,
  radius = "default",
  autoComplete,
  placeholder,
  onChange,
  disabled = false,
  className,
  ...rest
}) => {
  const inputCls = clsx("py-1 px-4 font-Inter text-soilBody flex", {
    "rounded-md": radius === "default",
    "rounded-lg": radius === "rounded",
    "rounded-full": radius === "pill",
    "drop-shadow-md text-center rounded-full py-2": radius === "pill-shadow",
  });

  return (
    <div className={`w-full`}>
      <label
        htmlFor={name}
        className={"block text-sm font-medium text-gray-700"}
      >
        {label}
      </label>
      <div className={"mt-1"}>
        <input
          {...rest}
          id={name}
          name={name}
          value={value}
          defaultValue={defaultValue}
          type={type}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e);
          }}
          className={`${inputCls} ${className} focus:border-accentColor focus:ring-soilGreen-500 block w-full border border-zinc-400/50 py-1 px-2 text-base shadow-sm focus:outline-transparent focus:ring focus:ring-opacity-50 disabled:text-slate-300`}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default TextField;
