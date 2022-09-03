import { UserContext } from "@context/eden";
// import { Project, Members, ProjectMemberType } from "@graphql/eden/generated";
import { useRouter } from "next/router";
import { useContext } from "react";
import { MdCreateNewFolder, MdFactCheck, MdPeopleAlt } from "react-icons/md";
import { Avatar, MenuItem } from "ui";

export interface IUserProfileMenuProps {
  title?: string;
}

export const UserProfileMenu = ({ title }: IUserProfileMenuProps) => {
  const router = useRouter();
  const { currentUser } = useContext(UserContext);

  // console.log("currentUser", currentUser);

  const engagedProjects = currentUser?.projects?.filter(
    (project: any) => project.phase === "engaged"
  );

  // console.log("engagedProjects", engagedProjects);

  const committedProjects = currentUser?.projects?.filter(
    (project: any) => project.phase === "committed"
  );

  // console.log("committedProjects", committedProjects);

  const championProjects = currentUser?.projects?.filter(
    (project: any) => project.champion
  );

  // console.log("championProjects", championProjects);

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
            counterBadge={engagedProjects?.length || 0}
            onFunctionCallback={() => router.push(`/applications`)}
          />
          {/* TODO: Don't have a phase status for invite yet */}
          {/* <MenuItem
            Icon={<MdFactCheck size={25} />}
            FunctionName="Invites"
            counterBadge={currentUser?.projects?.length || 0}
            onFunctionCallback={() => router.push(`/invites`)}
          /> */}
          <MenuItem
            Icon={<MdCreateNewFolder size={25} />}
            FunctionName="My Projects"
            counterBadge={committedProjects?.length || 0}
            onFunctionCallback={() => router.push(`/my-projects`)}
          />
          <MenuItem
            Icon={<MdCreateNewFolder size={25} />}
            FunctionName="Champion Projects"
            counterBadge={championProjects?.length || 0}
            onFunctionCallback={() => router.push(`/champion-board`)}
          />
        </div>
      </div>
    </div>
  );
};
