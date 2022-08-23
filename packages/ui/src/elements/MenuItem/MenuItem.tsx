import { ReactElement } from "react";
import { Badge, Button } from "../../elements";
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
        "flex-start flex w-full cursor-pointer flex-row p-2 hover:rounded-lg hover:bg-slate-100 hover:drop-shadow-xl"
      }
      onClick={onFunctionCallback}
    >
      <div className="px-2">{Icon}</div>
      <div className="px-2 text-lg font-medium">{FunctionName}</div>
      {counterBadge !== undefined && (
        <div className="px-2">
          <Badge colorRGB={"38, 138, 2"} text={`${counterBadge}`} />
        </div>
      )}
    </div>
  );
};
