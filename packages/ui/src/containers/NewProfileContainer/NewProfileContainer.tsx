import { Members, SkillRoleType } from "@eden/package-graphql/generated";
import {
  AvailabilityComp,
  Avatar,
  Card,
  SkillVisualisationComp,
  SocialMediaComp,
} from "@eden/package-ui";

export interface NewProfileContainerProps {
  user: Members;
}

export const NewProfileContainer = ({ user }: NewProfileContainerProps) => {
  if (!user) return null;
  return (
    <Card className="flex flex-col gap-5 p-6">
      <div className="flex flex-col items-center justify-center">
        <Avatar size="lg" src={user?.discordAvatar!} />
        <h1 className="text-soilHeading1 font-poppins font-medium">
          @{user?.discordName}
          <span className="text-soilGray text-soilBody">
            #{user?.discriminator}
          </span>
        </h1>
        <p className="text-soilHeading3 font-poppins font-medium">
          {user?.memberRole?.title}
        </p>
      </div>
      <div className="flex items-start justify-between gap-10">
        <div className="w-6/12">
          <p className="text-soilHeading3 font-poppins font-medium">
            Short bio:
          </p>
          <p className="text-soilBody text-[#071B08]">{user?.bio}</p>
        </div>
        <div className="">
          <SocialMediaComp color="#5d5d5d" links={user?.links} />
        </div>
        <div className="w-max">
          <AvailabilityComp timePerWeek={user?.hoursPerWeek!} />
        </div>
      </div>
      <div className="flex items-start justify-between gap-10">
        <div>
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
        </div>
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
