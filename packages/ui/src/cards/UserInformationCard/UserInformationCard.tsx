import { FiEdit3 } from "react-icons/fi";
import { IoIosExpand } from "react-icons/io";

import { Card } from "../../elements";

export interface UserInformationCardProps {
  title?: string;
  description?: string;
  timeSpent?: string;
  isEditable?: boolean;
  onEdit?: () => void;
  onExpand?: () => void;
}

export const UserInformationCard = ({
  title,
  description,
  timeSpent,
  onEdit,
  onExpand,
  isEditable,
}: UserInformationCardProps) => {
  return (
    <Card shadow>
      <div className={`flex flex-row justify-between justify-items-stretch`}>
        <div>
          <button
            className={`basis-1/8 w-full text-zinc-400`}
            onClick={onExpand}
          >
            <IoIosExpand size="20px" />
          </button>
        </div>
        <div className={`basis-3/4 self-center`}>
          <div
            className={`mb-4 mt-5 flex flex-col content-center items-center justify-center justify-items-center`}
          >
            <div className={`text-2xl`}>{title?.toUpperCase()}</div>
            <div className={`text-lg text-slate-500`}>{description}</div>
            <div className={`mt-1 text-base text-slate-500`}>{timeSpent}</div>
          </div>
        </div>
        <div>
          {isEditable ? (
            <button
              className={` basis-1/8 w-full text-zinc-400`}
              onClick={onEdit}
            >
              <FiEdit3 size="20px" />
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Card>
  );
};
