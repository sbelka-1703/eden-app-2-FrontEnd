import "./styles.css";
export interface SwitchButtonProps {
  name?: string;
  label?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: boolean;
}

export const SwitchButton = ({
  name,
  label,
  onChange,
  value,
}: SwitchButtonProps) => {
  console.log(value, "value in switch");
  return (
    <div className="flex flex-row content-center items-center">
      <div className="text-start text-lg tracking-wide">{label}</div>
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
