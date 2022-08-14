import { useState, useEffect } from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { AiOutlineDoubleLeft } from "react-icons/ai";

interface IRole {
  _id: number;
  name: string;
}

export interface IRoleCandidateSelectorProps {
  roles?: IRole[];
  onSelect?: (role: IRole) => void;
}

export const RoleCandidateSelector = ({
  roles = [],
  onSelect,
}: IRoleCandidateSelectorProps) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const currentRole = roles[currentRoleIndex];

  useEffect(() => {
    if (currentRoleIndex >= 1) {
      setCurrentRoleIndex(0);
    }
  }, [roles]);

  const isLeftBtnDisabled = currentRoleIndex === 0;
  const handleLeftBtnClick = () => {
    if (isLeftBtnDisabled) return;
    setCurrentRoleIndex(currentRoleIndex - 1);
    onSelect && onSelect(currentRole);
  };

  const isRightBtnDisabled = currentRoleIndex === roles.length - 1;
  const handleRightBtnClick = () => {
    if (isRightBtnDisabled) return;
    setCurrentRoleIndex(currentRoleIndex + 1);
    onSelect && onSelect(currentRole);
  };

  return (
    <div className="relative max-w-md">
      <div className={`font-poppins text-center text-gray-500`}>
        Match candidates for:
      </div>
      <div className={`flex items-center justify-center`}>
        <button
          disabled={isLeftBtnDisabled}
          onClick={handleLeftBtnClick}
          className={`absolute left-0 mr-4 disabled:cursor-not-allowed disabled:text-gray-300`}
        >
          <div className="flex">
            <AiOutlineDoubleLeft className={`text-xl`} />
          </div>
        </button>
        <div className={`font-poppins text-3xl font-medium uppercase`}>
          {currentRole?.name}
        </div>
        <button
          disabled={isRightBtnDisabled}
          onClick={handleRightBtnClick}
          className={`absolute right-0 ml-4 disabled:cursor-not-allowed disabled:text-gray-300`}
        >
          <AiOutlineDoubleRight className={`text-xl`} />
        </button>
      </div>
    </div>
  );
};
