import "./styles.css";

import { UserWithDescription } from "@eden/package-ui";

export interface IEndorsements {
  endorsement?: string;
  remove?(): any;
  claim?(): any;
}

export const Endorsements = ({ endorsement, remove, claim }: IEndorsements) => {
  return (
    <div className="endorsements-box m-3 ">
      <div className="p-3 text-center ">
        <UserWithDescription avatarSrc="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1003.jpg" />
        <p className="end-p">endorsed you for</p>
        <h1>{endorsement}</h1>
        <div className=" buttons mt-2 flex justify-around">
          <button
            onClick={remove}
            className="endorsements-button border text-white"
          >
            Remove
          </button>
          <button
            onClick={claim}
            className="endorsements-button border bg-white"
          >
            Claim
          </button>
        </div>
      </div>
    </div>
  );
};
