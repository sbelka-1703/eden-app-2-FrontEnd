import { UserWithDescription } from "../UserWithDescription";
import "./styles.css";

export interface IEndorsements {
  title?: string;
  endorsement?: string;
}

export const Endorsements = ({ title, endorsement }: IEndorsements) => {
  return (
    <div className="endorsements-box m-3 ">
      <div className="p-3 text-center ">
        <UserWithDescription avatarSrc="h" />
        <p className="end-p">endorsed you for</p>
        <h1>{endorsement}</h1>
        <div className=" buttons mt-2 flex justify-around">
          <button className="endorsements-button border text-white">
            Remove
          </button>
          <button className="endorsements-button border bg-white">Claim</button>
        </div>
      </div>
    </div>
  );
};
