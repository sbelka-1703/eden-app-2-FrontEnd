import "./style.css";

import { Avatar } from "ui";

export interface IProjectChampion {
  avatarSrc?: string;
}

export const ProjectChampion = ({ avatarSrc }: IProjectChampion) => {
  return (
    <div>
      <p className="pc-text-head ">🏆 Champion</p>
      {/* <UserWithDescription avatarSrc="src" /> */}

      <div className="mt-4 flex items-center">
        <Avatar src={avatarSrc} />
        <p className="pc-text ml-4">Mutantape.eth</p>
      </div>
    </div>
  );
};
