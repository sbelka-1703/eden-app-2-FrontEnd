import clsx from "clsx";
import { InputHTMLAttributes } from "react";

export type CheckBoxProps = {
  name?: string;
  label?: string;
  value?: string;
  required?: boolean;
  radius?: "default" | "rounded" | "pill";
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const CheckBox: React.FC<CheckBoxProps> = ({
  name,
  label,
  value,
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
  });

  return (
    <div className={`w-full`}>
      <div className={"mt-1 flex"}>
        <input
          id={name}
          name={name}
          value={value}
          type="checkbox"
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e);
          }}
          className={`${inputCls} shadow-sm`}
        />
        <label
          htmlFor={name}
          className={"ml-2 text-sm font-medium text-gray-700"}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default CheckBox;
