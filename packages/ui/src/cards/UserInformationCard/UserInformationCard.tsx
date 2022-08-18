import { FiEdit3 } from "react-icons/fi";
import { IoIosExpand } from "react-icons/io";

export interface UserInformationCardProps {
  title?: string;
  description?: string;
  timeSpent?: string;
  onEdit?: () => void;
  onExpand?: () => void;
}

export const UserInformationCard = ({
  title,
  description,
  timeSpent,
  onEdit,
  onExpand,
}: UserInformationCardProps) => {
  return (
    <div
      className={`ml-2 w-96 rounded-3xl border-2 bg-white p-1 drop-shadow-2xl`}
    >
      <div className={`mx-1 mt-2 flex flex-row items-stretch justify-around`}>
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
            className={`mb-4 mt-2 flex flex-col content-center items-center justify-center justify-items-center`}
          >
            <div className={`text-2xl`}>{title?.toUpperCase()}</div>
            <div className={`text-lg text-slate-500`}>{description}</div>
            <div className={`text-base text-slate-500`}>{timeSpent}</div>
          </div>
        </div>
        <div>
          <button
            className={` basis-1/8 w-full text-zinc-400`}
            onClick={onEdit}
          >
            <FiEdit3 size="20px" />
          </button>
        </div>
      </div>
    </div>
  );
};
