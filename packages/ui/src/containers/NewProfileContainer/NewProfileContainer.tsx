import { Members } from "@eden/package-graphql/generated";
import {
  Card,
  EndorsementList,
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
        <div className="w-8/12">
          <p className="text-soilHeading3 font-poppins font-medium">
            Short bio:
          </p>
          <p className="text-soilBody text-[#071B08]">{user?.bio}</p>
        </div>
      </div>
      <UserSkillSocialAval member={user} />
      {user && user?.endorsements && user?.endorsements?.length > 0 && (
        <div className="col-span-4">
          <EndorsementList endorsements={user?.endorsements} />
        </div>
      )}
      <div className="flex items-start justify-between gap-10"></div>
    </Card>
  );
};
