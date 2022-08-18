export interface TextBodyProps {
  children?: React.ReactNode;
  className?: string;
}

export const TextBody = ({ children, className }: TextBodyProps) => {
  return <p className={`text-soilBody font-Inter ${className}`}>{children}</p>;
};
