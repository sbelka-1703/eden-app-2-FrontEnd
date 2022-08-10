export interface TextLabelProps {
  children?: React.ReactNode;
  className?: string;
}

export const TextLabel = ({ children, className }: TextLabelProps) => {
  return (
    <h1
      className={`text-soilLabel font-Inter text-soilGray font-semibold uppercase ${className}`}
    >
      {children}
    </h1>
  );
};
