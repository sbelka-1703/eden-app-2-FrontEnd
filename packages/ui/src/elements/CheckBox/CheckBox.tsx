import clsx from "clsx";
import { InputHTMLAttributes } from "react";

export type CheckBoxProps = {
  name?: string;
  label?: string;
  checked?: boolean;
  required?: boolean;
  radius?: "default" | "rounded" | "pill" | "boxed";
  colorRGB?: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const CheckBox: React.FC<CheckBoxProps> = ({
  name,
  label,
  checked,
  required,
  radius = "default",
  colorRGB = "",
  onChange,
}) => {
  const inputCls = clsx("font-Inter text-soilBody flex", {
    "py-1 px-4 rounded-md": radius === "default",
    "py-1 px-4 rounded-lg": radius === "rounded",
    "py-1 px-4 rounded-full": radius === "pill",
    "p-1.5 rounded-md": radius === "boxed",
  });
  return (
    <div className={`w-fit`}>
      <div
        className={`mt-1 flex ${inputCls}`}
        style={colorRGB ? { background: `rgba(${colorRGB})` } : {}}
      >
        <input
          id={name}
          name={name}
          type="checkbox"
          required={required}
          onChange={(e) => {
            onChange(e);
          }}
          checked={checked}
          className={`${inputCls} shadow-sm`}
        />
        <label
          htmlFor={name}
          className={"ml-2 text-sm font-semibold tracking-wider text-gray-700"}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default CheckBox;
