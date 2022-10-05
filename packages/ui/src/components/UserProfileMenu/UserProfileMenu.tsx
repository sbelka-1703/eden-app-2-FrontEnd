import { UserContext } from "@eden/package-context";
import { Avatar, MenuItem } from "@eden/package-ui";
import { useRouter } from "next/router";
import { useContext } from "react";
import { MdCreateNewFolder, MdFactCheck, MdPeopleAlt } from "react-icons/md";

export interface IUserProfileMenuProps {
  title?: string;
}

export const UserProfileMenu = ({ title }: IUserProfileMenuProps) => {
  const router = useRouter();
  const { currentUser } = useContext(UserContext);

  console.log(router.route);

  // console.log("currentUser", currentUser);

  const engagedProjects = currentUser?.projects?.filter(
    (project: any) => project.phase === "engaged"
  );

  // console.log("engagedProjects", engagedProjects);

  const committedProjects = currentUser?.projects?.filter(
    (project: any) => project.phase === "committed"
  );

  // console.log("committedProjects", committedProjects);

  const invitedProjects = currentUser?.projects?.filter(
    (project: any) => project.phase === "invited"
  );

  // console.log("invitedProjects", invitedProjects);

  const championProjects = currentUser?.projects?.filter(
    (project: any) => project.champion
  );

  // console.log("championProjects", championProjects);

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
            FunctionName="Find Projects"
            onFunctionCallback={() => router.push(`/projects`)}
            active={router.route === "/projects"}
          />
          <MenuItem
            Icon={<MdFactCheck size={25} />}
            FunctionName="Active Applications"
            counterBadge={engagedProjects?.length || 0}
            onFunctionCallback={() => router.push(`/applications`)}
            active={router.route === "/applications"}
          />
          <MenuItem
            Icon={<MdFactCheck size={25} />}
            FunctionName="Invites"
            counterBadge={invitedProjects?.length || 0}
            onFunctionCallback={() => router.push(`/invites`)}
            active={router.route === "/invites"}
          />
          <MenuItem
            Icon={<MdCreateNewFolder size={25} />}
            FunctionName="My Projects"
            counterBadge={committedProjects?.length || 0}
            onFunctionCallback={() => router.push(`/my-projects`)}
            active={router.route === "/my-projects"}
          />
          <MenuItem
            Icon={<MdCreateNewFolder size={25} />}
            FunctionName="Champion Projects"
            counterBadge={championProjects?.length || 0}
            onFunctionCallback={() => router.push(`/champion-board`)}
            active={router.route === "/champion-board"}
          />
          <MenuItem
            Icon={<MdCreateNewFolder size={25} />}
            FunctionName="Launch A Project"
            onFunctionCallback={() => router.push(`/launch`)}
            active={router.route === "/launch"}
          />
        </div>
      </div>
    </div>
  );
};
