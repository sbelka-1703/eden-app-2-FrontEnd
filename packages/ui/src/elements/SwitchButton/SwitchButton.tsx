import "./styles.css";

import clsx from "clsx";

export interface SwitchButtonProps {
  name?: string;
  label?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: boolean;
  labelOnTop?: boolean;
}

export const SwitchButton = ({
  name,
  label,
  onChange,
  value,
  labelOnTop,
}: SwitchButtonProps) => {
  // console.log(value, "value in switch");
  const switchButtonCls = clsx(
    `flex ${
      labelOnTop ? "flex-col space-y-2" : "flex-row"
    }  content-center items-center `
  );

  return (
    <div className={switchButtonCls}>
      <div className="text-start text-sm tracking-wide">{label}</div>
      <label className="switch ml-3">
        <input
          name={name}
          type="checkbox"
          onChange={onChange}
          checked={value ? value : false}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};
