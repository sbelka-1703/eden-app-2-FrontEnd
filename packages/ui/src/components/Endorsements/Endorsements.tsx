import { UserWithDescription } from "../UserWithDescription";
import "./styles.css"

export interface IEndorsements {
  title?: string;
  endorsement?: string;
}

export const Endorsements = ({ title, endorsement }: IEndorsements) => {
  return (
    <div className="endorsements-box px-5 m-5">
      <div className="text-center p-3 ">
        <UserWithDescription avatarSrc="h" />
        <p className="end-p">{title}</p>
        <h1>{endorsement}</h1>
        <div className=" mt-2 buttons flex justify-around">
          <button className="border text-white endorsements-button">Remove</button>
          <button className="bg-white border endorsements-button">Claim</button>
        </div>
      </div>
    </div>
  )
}