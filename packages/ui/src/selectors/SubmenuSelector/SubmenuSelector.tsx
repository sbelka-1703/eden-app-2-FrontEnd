import { UserContext } from "@eden/package-context";
import { Avatar, MenuItem, ServerFilter } from "@eden/package-ui";
import { useContext } from "react";

export interface ISubmenuSelectorProps {
  title?: string;
  submenu?: any;
  activeIndex?: number;
}

export const SubmenuSelector = ({
  title,
  submenu,
  activeIndex,
}: ISubmenuSelectorProps) => {
  const { currentUser } = useContext(UserContext);

  // console.log(submenu);

  return (
    <div className={`desc flex-col`}>
      <div className={`flex`}>
        <div>
          <Avatar size="md" src={currentUser?.discordAvatar || ""} />
        </div>
        <div className={`ml-4`}>
          <div className={`pt-2 text-base text-neutral-500`}>{title}</div>
          <div className={`mb-3 pb-2 font-semibold text-neutral-700`}>
            {currentUser?.discordName}
          </div>
        </div>
      </div>
      <hr className="my-2 text-slate-300" />
      <ServerFilter />
      <hr className="my-2 text-slate-300" />
      <div>
        {submenu?.map((item: any, index: number) => (
          <MenuItem
            key={index}
            Icon={item.Icon}
            FunctionName={item.FunctionName}
            counterBadge={item?.Counter}
            onFunctionCallback={item.onFunctionCallback}
            active={activeIndex === index}
          />
        ))}
      </div>
    </div>
  );
};
