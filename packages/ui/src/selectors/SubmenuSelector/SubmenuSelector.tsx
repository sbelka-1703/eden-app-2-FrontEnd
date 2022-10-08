import { UserContext } from "@eden/package-context";
import { Avatar, MenuItem } from "@eden/package-ui";
import { useContext } from "react";

export interface ISubmenuSelectorProps {
  title?: string;
  submenu?: any;
}

export const SubmenuSelector = ({ title, submenu }: ISubmenuSelectorProps) => {
  const { currentUser } = useContext(UserContext);

  // console.log(submenu);

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
          {submenu?.map((item: any, index: number) => (
            <MenuItem
              key={index}
              Icon={item.Icon}
              FunctionName={item.FunctionName}
              onFunctionCallback={item.onFunctionCallback}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
