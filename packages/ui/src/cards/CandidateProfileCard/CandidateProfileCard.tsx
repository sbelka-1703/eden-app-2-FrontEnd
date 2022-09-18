import { Maybe, Members, ProjectMatchType } from "@graphql/eden/generated";
import { useRouter } from "next/router";
import { Avatar, Card } from "ui";

export interface ICandidateProfileCardProps {
  member?: Maybe<Members>;
  percentage?: number;
}

function round(value: number, precision: number) {
  var multiplier = Math.pow(10, precision || 0);

  return Math.round(value * multiplier) / multiplier;
}

export const CandidateProfileCard = ({
  member,
  percentage,
}: ICandidateProfileCardProps) => {
  const router = useRouter();

  // console.log(project);
  return (
    <Card shadow>
      <div className={`flex	items-center justify-between self-center`}>
        <div className={`relative`}>
          <Avatar isProject />
          <span
            className={`text-soilPurple absolute mt-9 -ml-6 rounded-full bg-white px-1.5 text-xl font-semibold shadow-sm`}
          >
            {round(Number(percentage), 1)}%
          </span>
        </div>
        <div>
          <div>
            <span className="text-xl font-medium tracking-wide">
              {member?.discordName}
            </span>
            <span className="ml-1 text-xs font-normal text-neutral-400">
              {`#${member?.discriminator}`}
            </span>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide">3D designer</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
