import { Avatar } from "../../elements"
import "./style.css"

export interface IProjectChampion {
  avatarSrc?: string;

}

export const ProjectChampion = ({ avatarSrc}: IProjectChampion) => {

  return (
    <div>
      <p className="pc-text-head ">
        🏆 Champion
      </p>
      {/* <UserWithDescription avatarSrc="src" /> */}

      <div className="flex items-center mt-4">
        <Avatar src={avatarSrc} />
        <p className="pc-text ml-4">
          Mutantape.eth
        </p>

      </div>

    </div>
  )
}