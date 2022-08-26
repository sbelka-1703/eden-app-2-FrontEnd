import { Members } from "@graphql/eden/generated";
import { useRouter } from "next/router";
import { MdCreateNewFolder, MdFactCheck, MdPeopleAlt } from "react-icons/md";

import { Avatar, MenuItem } from "../../elements";
export interface IUserProfileMenuProps {
  currentUser?: Members | undefined;
  avatarSrc?: string;
  title?: string;
  name?: string;
  onClickFindProject?: () => void;
  onClickActiveApplication?: () => void;
  onClickMyProject?: () => void;
}

export const UserProfileMenu = ({
  currentUser,
  // avatarSrc,
  title,
}: // name,
// onClickFindProject,
// onClickActiveApplication,
// onClickMyProject,
IUserProfileMenuProps) => {
  const router = useRouter();

  return (
    <div className={`desc mt-6 flex-col`}>
      <div className="p-2">
        <Avatar size="lg" src={currentUser?.discordAvatar || ""} />
        <div className={`pt-2 text-base text-neutral-500`}>{title}</div>
        <div
          className={`mb-3 border-b pb-5 text-xl font-semibold text-neutral-700`}
        >
          {currentUser?.discordName}
        </div>
        <div>
          <MenuItem
            Icon={<MdPeopleAlt size={25} />}
            FunctionName="Find Projects"
            onFunctionCallback={() => router.push(`/projects`)}
          />
          <MenuItem
            Icon={<MdFactCheck size={25} />}
            FunctionName="Active Applications"
            onFunctionCallback={() => router.push(`/applications`)}
          />
          <MenuItem
            Icon={<MdFactCheck size={25} />}
            FunctionName="Invites"
            onFunctionCallback={() => router.push(`/invites`)}
          />
          <MenuItem
            Icon={<MdCreateNewFolder size={25} />}
            FunctionName="My Projects"
            counterBadge={currentUser?.projects?.length || 0}
            onFunctionCallback={() => router.push(`/my-projects`)}
          />
        </div>
      </div>
    </div>
  );
};
