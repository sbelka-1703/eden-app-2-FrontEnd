import { UserContext } from "@eden/package-context";
import { Avatar, MenuItem } from "@eden/package-ui";
import { useContext } from "react";
import { MdPeopleAlt } from "react-icons/md";

export interface ISubmenuSelectorProps {
  title?: string;
}

export const SubmenuSelector = ({ title }: ISubmenuSelectorProps) => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className={`desc flex-col`}>
      <div className="">
        <div>
          <Avatar size="lg" src={currentUser?.discordAvatar || ""} />
          <div className={`pt-2 text-base text-neutral-500`}>{title}</div>
          <div className={`mb-3 pb-2 font-semibold text-neutral-700`}>
            {currentUser?.discordName}
          </div>
        </div>
        <hr className="mb-2 text-slate-300" />
        <div>
          <MenuItem
            Icon={<MdPeopleAlt size={25} />}
            FunctionName="Submenu Item"
            onFunctionCallback={() => console.log(`change view`)}
            // active={router?.route === "/projects"}
          />
        </div>
      </div>
    </div>
  );
};
