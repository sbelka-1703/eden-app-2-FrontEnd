import { Maybe, Members } from "@eden/package-graphql/generated";
import { Card, MatchAvatar } from "@eden/package-ui";
import { XIcon } from "@heroicons/react/outline";

export interface ICandidateProfileCardProps {
  member?: Maybe<Members>;
  percentage?: number;
  selected?: boolean;
  closeButton?: boolean;
  handleDelete?: any;
}

function round(value: number, precision: number) {
  var multiplier = Math.pow(10, precision || 0);

  return Math.round(value * multiplier) / multiplier;
}

export const CandidateProfileCard = ({
  member,
  percentage,
  selected = false,
  closeButton,
  handleDelete,
}: ICandidateProfileCardProps) => {
  return (
    <Card
      className="scrollbar-hide relative overflow-scroll bg-white p-3"
      focused={selected}
    >
      <div className={`flex	items-center gap-8`}>
        <MatchAvatar
          src={member?.discordAvatar!}
          size="md"
          percentage={percentage ? round(Number(percentage), 1) : undefined}
        />
        <div>
          <div>
            <span className="text-xl font-medium tracking-wide">
              {member?.discordName}
            </span>
            {member?.discriminator && (
              <span className="ml-1 text-xs font-normal text-neutral-400">
                {`#${member?.discriminator}`}
              </span>
            )}
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide">
              {member?.memberRole?.title}
            </span>
          </div>
          {closeButton && handleDelete && (
            <XIcon
              className="absolute top-4 right-4 cursor-pointer text-slate-600 hover:text-slate-400"
              width={20}
              aria-hidden="true"
              onClick={() => handleDelete(member)}
            />
          )}
        </div>
      </div>
    </Card>
  );
};
