import { ReactElement } from "react";

export interface MenuItemProps {
  Icon?: ReactElement;
  FunctionName?: string;
  onFunctionCallback?: () => void;
  counterBadge?: number;
}

export const MenuItem = ({
  Icon,
  FunctionName,
  onFunctionCallback,
  counterBadge,
}: MenuItemProps) => {
  return (
    <div
      className={
        "flex-start flex w-full cursor-pointer flex-row justify-between p-2 hover:rounded-lg hover:bg-slate-100 hover:drop-shadow-xl"
      }
      onClick={onFunctionCallback}
    >
      <div className={`flex`}>
        <div className="px-2">{Icon}</div>
        <div className="text-md px-2 font-medium">{FunctionName}</div>
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
    </div>
  );
};
