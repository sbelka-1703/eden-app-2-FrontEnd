
import { ReactElement } from "react";
import { Badge } from '../../elements/Badge/Badge'
export interface MenuItemProps {
  Icon?: ReactElement;
  FunctionName?: string;
  FunctionCallback?: ()=>void;
  counterBadge?: number;
}

export const MenuItem = ({
  Icon,
  FunctionName,
  FunctionCallback,
  counterBadge
}: MenuItemProps) => {
  return (
    <div className={"flex flex-row w-max flex-start p-2 cursor-pointer m-1 hover:drop-shadow-xl hover:bg-slate-100 hover:rounded-lg"} onClick={FunctionCallback}>
      <div className="px-2">{Icon}</div>
      <div className="px-2 font-medium text-lg">{FunctionName}</div>
      {
        counterBadge !== undefined &&
        <div className="px-2">
          <Badge colorRGB={'38, 138, 2'} text={`${counterBadge}`}/>  
        </div>
      }
    </div>
  );
};
