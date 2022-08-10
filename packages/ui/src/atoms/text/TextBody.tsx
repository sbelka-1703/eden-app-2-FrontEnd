export interface TextBodyProps {
  children?: React.ReactNode;
  className?: string;
}

export const TextBody = ({ children, className }: TextBodyProps) => {
  return (
    <h1 className={`text-soilBody font-Inter ${className}`}>{children}</h1>
  );
};
