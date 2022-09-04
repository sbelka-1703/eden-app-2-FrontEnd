import { PreviusProjectsType } from "@graphql/eden/generated";
import { FiEdit3 } from "react-icons/fi";
import { IoIosExpand } from "react-icons/io";
import { Card } from "ui";

export interface UserInformationCardProps {
  previousProjects?: PreviusProjectsType;
  isEditable?: boolean;
  onEdit?: () => void;
  onExpand?: () => void;
}

export const UserInformationCard = ({
  previousProjects,
  onEdit,
  onExpand,
  isEditable,
}: UserInformationCardProps) => {
  if (!previousProjects) {
    return null;
  }
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
            <div className={`text-xl`}>{previousProjects?.positionName}</div>
            <div className={`text-base text-slate-500`}>
              {previousProjects?.title}
            </div>
            <div className={`mt-1 text-sm text-slate-500`}>
              {previousProjects?.startDate} - {previousProjects?.endDate}
            </div>
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
