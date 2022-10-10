export interface NumberCircleProps {
  value: number;
  color?: string;
  className?: string;
}
export const NumberCircle = ({
  value,
  className,
  color = "#eaf2fa",
}: NumberCircleProps) => {
  return (
    <div
      className={`${className} flex h-5 w-5 items-center justify-center rounded-full`}
      style={{ backgroundColor: color }}
    >
      <span className="text-xs">{value}</span>
    </div>
  );
};
