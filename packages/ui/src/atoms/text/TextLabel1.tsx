export interface ITextLabelProps1 {
  children?: React.ReactNode;
  className?: string;
}

export const TextLabel1 = ({ children, className }: ITextLabelProps1) => {
  return (
    <span
      className={`text-soilLabel1 font-Inter text-[#AAAAAA] font-semibold uppercase ${className}`}
    >
      {children}
    </span>
  );
};
