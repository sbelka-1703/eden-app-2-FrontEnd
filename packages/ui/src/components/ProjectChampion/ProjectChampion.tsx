import "./style.css";

import { Members } from "@eden/package-graphql/generated";
import { Avatar } from "@eden/package-ui";

export interface IProjectChampion {
  member: Members;
}

export const ProjectChampion = ({ member }: IProjectChampion) => {
  return (
    <div>
      <p className="pc-text-head ">🏆 Champion</p>

      <div className="mt-2 flex items-center">
        <div>
          <Avatar size={`sm`} src={member?.discordAvatar || ""} />
        </div>
        <p className="pc-text ml-4">@{member?.discordName}</p>
      </div>
    </div>
  );
};
