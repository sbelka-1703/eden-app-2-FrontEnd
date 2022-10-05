import clsx from "clsx";
import { ReactElement } from "react";

export interface MenuItemProps {
  Icon?: ReactElement;
  FunctionName?: string;
  onFunctionCallback?: () => void;
  counterBadge?: number;
  active?: boolean;
}

export const MenuItem = ({
  Icon,
  FunctionName,
  onFunctionCallback,
  counterBadge,
  active,
}: MenuItemProps) => {
  const btnCls = clsx(
    "flex-start flex w-full my-1 flex-row justify-between p-2 hover:rounded-lg hover:bg-slate-100 hover:drop-shadow-xl",
    {
      "bg-slate-100 rounded-lg cursor-default drop-shadow hover:drop-shadow":
        active,
    }
  );

  return (
    <button className={`${btnCls}`} onClick={onFunctionCallback}>
      <div className={`flex`}>
        <div className="px-2">{Icon}</div>
        <div className="text-md px-2 text-left font-medium">{FunctionName}</div>
      </div>
      <div>
        {counterBadge !== undefined && (
          <div className="px-2">
            <span
              className={`bg-accentColor flex h-6 w-6 items-center justify-center rounded-full`}
            >
              {counterBadge}
            </span>
          </div>
        )}
      </div>
    </button>
  );
};
