import "./styles.css";

import { Members } from "@eden/package-graphql/generated";
import { Card, UserWithDescription } from "@eden/package-ui";

export interface IEndorsements {
  member?: Members;
  endorsement?: string;
  remove?(): any;
  claim?(): any;
}

export const Endorsements = ({
  member,
  endorsement,
  remove,
  claim,
}: IEndorsements) => {
  if (!member) return null;
  return (
    <Card border>
      <div className="p-3 text-center ">
        <UserWithDescription member={member} />
        <p className="end-p">endorsed you for</p>
        <div className={`text-soilPurple text-xl font-medium`}>
          {endorsement}
        </div>
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
    </Card>
  );
};
