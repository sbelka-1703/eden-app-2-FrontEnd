import { TextInputLabel } from "@eden/package-ui";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { ReactNode, useState } from "react";

export interface ToggleElementProps {
  title: string;
  children: ReactNode;
  className?: string;
  isOptional?: boolean;
}
export const ToggleElement = ({
  title,
  children,
  className,
  isOptional,
}: ToggleElementProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type={`button`}
        onClick={() => setOpen((show) => !show)}
        className={`${className} flex cursor-pointer items-center gap-1 border-none`}
      >
        {open ? (
          <ChevronDownIcon className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronRightIcon className="h-4 w-4 text-gray-500" />
        )}
        <TextInputLabel>{title}</TextInputLabel>
        {isOptional && (
          <span className="pl-4 text-xs text-gray-500">(Optional)</span>
        )}
      </button>
      {open && children}
    </div>
  );
};
