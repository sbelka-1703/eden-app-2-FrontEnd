import { InputHTMLAttributes } from "react";

export type TextFieldProps = {
  name?: string;
  label?: string;
  value?: string;
  required?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  value,
  type = "text",
  required,
  autoComplete,
  placeholder,
  onChange,
}) => {
  return (
    <div>
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
          className={
            "focus:border-accentColor focus:ring-soilGreen-500 block w-full rounded-md border border-zinc-400 py-2 px-3 text-base shadow-sm focus:outline-transparent focus:ring focus:ring-opacity-50"
          }
        />
      </div>
    </div>
  );
};

export default TextField;
