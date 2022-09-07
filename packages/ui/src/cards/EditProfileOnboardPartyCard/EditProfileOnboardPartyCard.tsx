import { Members } from "@graphql/eden/generated";
import { Avatar, Card, SearchSkill, TextHeading3 } from "ui";

export interface EditProfileOnboardPartyCardProps {
  currentUser: Members;
  // skills: Skills[];
  // eslint-disable-next-line no-unused-vars
  handleSetSkills: (val: any) => void;
}

export const EditProfileOnboardPartyCard = ({
  currentUser,
  // skills,
  handleSetSkills,
}: EditProfileOnboardPartyCardProps) => {
  const levels = [
    {
      title: "learning",
      level: "learning",
    },
    {
      title: "Skilled",
      level: "mid",
    },
  ];

  return (
    <Card shadow className="bg-white p-3">
      <TextHeading3 className="mb-2">Edit Your Profile Card</TextHeading3>
      <div className="mb-4 flex items-center">
        {currentUser.discordAvatar && (
          <Avatar src={currentUser.discordAvatar} size="sm" />
        )}
        {currentUser.discordName && (
          <span className="ml-2">{currentUser?.discordName}</span>
        )}
      </div>
      {/* <SkillSelector
        showSelected
        options={
          // filter from options the skills user already has
          skills.filter(
            (skill: Skills) =>
              !currentUser.skills?.some(
                (currentUserSkill: any) =>
                  currentUserSkill?.skillInfo?._id === skill._id
              )
          ) || []
        }
        value={
          currentUser.skills
            ?.filter((skill: any) => skill !== undefined)
            .map((skill: any) => skill?.skillInfo) || []
        }
        onSetSkills={handleSetSkills}
      /> */}
      <SearchSkill
        levels={levels}
        skills={currentUser.skills}
        setSkills={handleSetSkills}
      />
    </Card>
  );
};
