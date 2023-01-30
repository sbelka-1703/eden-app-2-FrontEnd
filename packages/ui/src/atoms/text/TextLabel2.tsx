export interface ITextLabelProps2 {
  children?: React.ReactNode;
  className?: string;
}

export const TextLabel2 = ({ children, className }: ITextLabelProps2) => {
  return (
    <span
      className={`text-soilLabel2 font-Inter font-semibold uppercase text-[#AAAAAA] ${className}`}
    >
      {children}
    </span>
  );
};
