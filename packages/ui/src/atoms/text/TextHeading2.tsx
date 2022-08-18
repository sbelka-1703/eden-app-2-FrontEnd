export interface TextHeading2Props {
  children?: React.ReactNode;
  className?: string;
}

export const TextHeading2 = ({ children, className }: TextHeading2Props) => {
  return (
    <h2 className={`text-soilHeading2 font-poppins font-medium ${className}`}>
      {children}
    </h2>
  );
};
