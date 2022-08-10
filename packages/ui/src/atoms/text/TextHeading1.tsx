export interface TextHeading1Props {
  children?: React.ReactNode;
  className?: string;
}

export const TextHeading1 = ({ children, className }: TextHeading1Props) => {
  return (
    <h1 className={`text-soilHeading1 font-poppins font-medium ${className}`}>
      {children}
    </h1>
  );
};
