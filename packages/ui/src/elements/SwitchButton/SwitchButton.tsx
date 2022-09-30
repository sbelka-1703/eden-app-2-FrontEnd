import "./styles.css";
export interface SwitchButtonProps {
  name?: string;
  label?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SwitchButton = ({ name, label, onChange }: SwitchButtonProps) => {
  return (
    <div className="flex flex-row content-center items-center">
      <div className="text-start text-lg tracking-wide">{label}</div>
      <label className="switch ml-3">
        <input name={name} type="checkbox" onChange={onChange} />
        <span className="slider"></span>
      </label>
    </div>
  );
};
