export interface TextHeading3Props {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const TextHeading3 = ({
  children,
  className,
  style,
}: TextHeading3Props) => {
  return (
    <h3
      className={`text-soilHeading3 font-poppins font-medium ${className}`}
      style={style}
    >
      {children}
    </h3>
  );
};
