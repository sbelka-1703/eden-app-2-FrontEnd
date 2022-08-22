import { ReactElement } from "react";
import { Badge } from "../../elements/Badge/Badge";
export interface MenuItemProps {
  Icon?: ReactElement;
  FunctionName?: string;
  FunctionCallback?: () => void;
  counterBadge?: number;
}

export const MenuItem = ({
  Icon,
  FunctionName,
  FunctionCallback,
  counterBadge,
}: MenuItemProps) => {
  return (
    <div
      className={
        "flex-start m-1 flex w-max cursor-pointer flex-row p-2 hover:rounded-lg hover:bg-slate-100 hover:drop-shadow-xl"
      }
      onClick={FunctionCallback}
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
