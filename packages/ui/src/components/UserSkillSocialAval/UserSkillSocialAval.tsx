/* eslint-disable camelcase */
import {
  Maybe,
  Members,
  SkillType_Member,
} from "@eden/package-graphql/generated";
import { SkillList, SocialMediaComp } from "@eden/package-ui";

const levels = [
  {
    title: "learning",
    level: "learning",
  },
  {
    title: "mid",
    level: "mid",
  },
  {
    title: "junior",
    level: "junior",
  },
  {
    title: "senior",
    level: "senior",
  },
];

const filterSkills = (
  skills: Maybe<Maybe<SkillType_Member>[]>,
  level: string
) => {
  if (skills) return skills.filter((skill) => skill?.level === level);
};

export interface IUserSkillSocialAvalProps {
  member: Maybe<Members>;
}

export const UserSkillSocialAval = ({ member }: IUserSkillSocialAvalProps) => {
  if (!member) return null;
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-6">
        {levels?.map((skill, index: number) => {
          return (
            <div className="mb-3" key={index}>
              <p className="font-semibold uppercase">{skill?.level}</p>
              <SkillList
                colorRGB={"215,215,255"}
                skills={
                  filterSkills(
                    member?.skills as Maybe<SkillType_Member>[],
                    `${skill?.level}`
                  ) as Maybe<SkillType_Member>[]
                }
              />
            </div>
          );
        })}
      </div>
      <div className="col-span-2">
        <SocialMediaComp links={member?.links} />
      </div>
      <div className="col-span-4">
        <p className="font-semibold">AVAILABILITY</p>

        <p className="text-lg">⏳ {member?.hoursPerWeek} hrs/ week</p>
        <p className="text-lg">💰 1700 $SEED</p>
      </div>
    </div>
  );
};
