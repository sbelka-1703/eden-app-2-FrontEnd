import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import ReactTooltip from "react-tooltip";
import { v4 as uuidv4 } from "uuid";

export interface TooltipProps {
  tipId?: string;
  className?: string;
  children: React.ReactNode;
}
export const Tooltip = ({ tipId, children, className }: TooltipProps) => {
  const id = tipId || uuidv4();

  return (
    <>
      <QuestionMarkCircleIcon
        data-tip
        data-for={id}
        className={`${className} h-5 w-5 cursor-pointer text-gray-500`}
      />
      <ReactTooltip
        border
        id={id}
        place="top"
        effect="solid"
        textColor="#AAAAAA"
        className="max-w-xs"
        borderColor="#AAAAAA"
        backgroundColor="#FFF"
      >
        {children}
      </ReactTooltip>
    </>
  );
};
