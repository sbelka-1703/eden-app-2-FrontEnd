import clsx from "clsx";
import { InputHTMLAttributes } from "react";

export type TextFieldProps = {
  name?: string;
  label?: string;
  value?: string;
  required?: boolean;
  radius?: "default" | "rounded" | "pill" | "pill-shadow";
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  value,
  type = "text",
  required,
  radius = "default",
  autoComplete,
  placeholder,
  onChange,
}) => {
  const inputCls = clsx("py-1 px-4 font-Inter text-soilBody flex", {
    "rounded-md": radius === "default",
    "rounded-lg": radius === "rounded",
    "rounded-full": radius === "pill",
    "drop-shadow-md text-center rounded-full py-2": radius === "pill-shadow"
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
          id={name}
          name={name}
          value={value}
          type={type}
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

export default TextField;
