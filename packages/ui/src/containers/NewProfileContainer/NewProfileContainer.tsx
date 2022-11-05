// import { Members, SkillRoleType } from "@eden/package-graphql/generated";
import { Members } from "@eden/package-graphql/generated";
import {
  // AvailabilityComp,
  Card,
  // SkillVisualisationComp,
  // SocialMediaComp,
  UserSkillSocialAval,
  UserWithDescription,
} from "@eden/package-ui";

export interface NewProfileContainerProps {
  user: Members;
}

export const NewProfileContainer = ({ user }: NewProfileContainerProps) => {
  if (!user) return null;
  return (
    <Card className="flex flex-col gap-5 p-6">
      <UserWithDescription member={user} />
      <div className="flex items-start justify-between gap-10">
        <div className="w-6/12">
          <p className="text-soilHeading3 font-poppins font-medium">
            Short bio:
          </p>
          <p className="text-soilBody text-[#071B08]">{user?.bio}</p>
        </div>
        {/* <div className="">
          <SocialMediaComp color="#5d5d5d" links={user?.links} />
        </div>
        <div className="w-max">
          <AvailabilityComp timePerWeek={user?.hoursPerWeek!} />
        </div> */}
      </div>
      <UserSkillSocialAval member={user} />
      <div className="flex items-start justify-between gap-10">
        {/* <div>
          <p className="text-soilHeading3 font-poppins font-medium">Skills:</p>
          <SkillVisualisationComp
            skills={
              user?.skills?.map((skill) => {
                return {
                  skillData: {
                    _id: skill?.skillInfo?._id,
                    name: skill?.skillInfo?.name,
                  },
                  level: skill?.level,
                };
              }) as SkillRoleType[]
            }
          />
        </div> */}
        {/* <div>
          <p className="text-soilHeading3 font-poppins font-medium">
            Endrosed for:
          </p>
          <div></div>
        </div> */}
      </div>
    </Card>
  );
};
