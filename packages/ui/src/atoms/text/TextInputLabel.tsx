export interface ITextInputLabelProps {
  children?: React.ReactNode;
  className?: string;
}

export const TextInputLabel = ({
  children,
  className,
}: ITextInputLabelProps) => {
  return (
    <span className={`block text-sm font-medium text-gray-700 ${className}`}>
      {children}
    </span>
  );
};
