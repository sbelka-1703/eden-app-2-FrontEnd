import { Maybe, Members } from "@eden/package-graphql/generated";
import { AvailabilityComp, SkillList, SocialMediaComp } from "@eden/package-ui";

export interface IUserSkillSocialAvalProps {
  member: Maybe<Members>;
}

export const UserSkillSocialAval = ({ member }: IUserSkillSocialAvalProps) => {
  if (!member) return null;
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-7">
        <p className="mb-3 text-sm font-semibold tracking-widest subpixel-antialiased">
          Top skills
        </p>
        <SkillList skills={member.skills!} colorRGB={"155, 103, 255, 0.44"} />
      </div>

      <div className="col-span-2">
        <SocialMediaComp links={member?.links} />
      </div>
      <div className="col-span-3">
        <AvailabilityComp timePerWeek={member?.hoursPerWeek!} />
      </div>
    </div>
  );
};
