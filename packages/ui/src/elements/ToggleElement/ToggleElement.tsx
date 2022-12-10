import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { ReactNode, useState } from "react";

import { Button } from "../Button";

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
      <Button
        style={{ padding: 0 }}
        onClick={() => setOpen((show) => !show)}
        className={`${className} flex items-center gap-1 border-none`}
      >
        {open ? (
          <ChevronDownIcon className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronRightIcon className="h-4 w-4 text-gray-500" />
        )}
        <p className="text-base font-medium">{title}</p>
        {isOptional && (
          <span className="text-xs text-gray-500">(Optional)</span>
        )}
      </Button>
      {open && children}
    </div>
  );
};
