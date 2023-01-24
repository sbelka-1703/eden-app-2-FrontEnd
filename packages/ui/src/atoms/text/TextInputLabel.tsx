export interface ITextInputLabelProps {
  children?: React.ReactNode;
  htmlFor?: string;
  className?: string;
}

export const TextInputLabel = ({
  children,
  htmlFor,
  className,
}: ITextInputLabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 ${className}`}
    >
      {children}
    </label>
  );
};
