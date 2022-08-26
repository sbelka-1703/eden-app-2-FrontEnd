import { useEffect, useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { IRole } from "ui";

export interface IRoleCandidateSelectorProps {
  roles?: IRole[];
  // eslint-disable-next-line no-unused-vars
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
  };

  const isRightBtnDisabled = currentRoleIndex === roles.length - 1;
  const handleRightBtnClick = () => {
    if (isRightBtnDisabled) return;
    setCurrentRoleIndex(currentRoleIndex + 1);
  };

  useEffect(() => {
    if (onSelect) onSelect(currentRole);
  }, [currentRoleIndex]);

  return (
    <div className="relative w-full">
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
        <div
          className={`font-poppins text-center text-xl font-medium uppercase lg:text-2xl xl:text-3xl`}
        >
          {currentRole?.title}
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
