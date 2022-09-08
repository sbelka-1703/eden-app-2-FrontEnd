/* eslint-disable camelcase */
import { Maybe, Members, SkillType_Member } from "@graphql/eden/generated";
import {
  Avatar,
  Badge,
  Card,
  SearchSkill,
  // SocialMediaInput,
  TextArea,
  TextHeading3,
  TextLabel,
} from "ui";

export interface EditProfileOnboardPartyCardProps {
  currentUser: Members;
  // eslint-disable-next-line no-unused-vars
  handleSetSkills: (val: any) => void;
  // eslint-disable-next-line no-unused-vars
  handleUpdateUser: (val: any) => void;
}

export const EditProfileOnboardPartyCard = ({
  currentUser,
  handleSetSkills,
  handleUpdateUser,
}: EditProfileOnboardPartyCardProps) => {
  const learningBadges = currentUser?.skills
    ?.filter((skill: Maybe<SkillType_Member>) => skill?.level === "learning")
    .map((skill, index) => (
      <Badge
        key={index}
        text={skill?.skillInfo?.name || ""}
        colorRGB="209,247,196"
        className={`font-Inter bg-white text-sm`}
      />
    ));
  const skilledBadges = currentUser?.skills
    ?.filter((skill: Maybe<SkillType_Member>) => skill?.level !== "learning")
    .map((skill, index) => (
      <Badge
        key={index}
        text={skill?.skillInfo?.name || ""}
        className={`bg-soilPurple/20 font-Inter text-sm`}
      />
    ));
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
    <Card shadow className="h-8/10 scrollbar-hide overflow-scroll p-3">
      <TextHeading3 className="mb-2">Edit Your Profile</TextHeading3>
      <div className="mb-4 flex items-center">
        {currentUser.discordAvatar && (
          <Avatar src={currentUser.discordAvatar} size="sm" />
        )}
        {currentUser.discordName && (
          <span className="ml-2">{currentUser?.discordName}</span>
        )}
      </div>
      <TextLabel>🛠 SKILLS</TextLabel>
      <SearchSkill
        levels={levels}
        skills={currentUser.skills}
        setSkills={handleSetSkills}
      />
      <TextLabel>LEARNING</TextLabel>
      <div>{learningBadges}</div>
      <TextLabel>SKILLED</TextLabel>
      <div>{skilledBadges}</div>
      <TextLabel>ABOUT ME</TextLabel>
      <TextArea
        name="bio"
        placeholder={`Write a short description about yourself...`}
        rows={5}
        // value={`${currentUser.bio ? currentUser.bio : ""}`}
        className="text-xs"
        onChange={handleUpdateUser}
        debounceTime={2000}
      />
      {/* <TextLabel>SOCIAL MEDIA</TextLabel>
      <SocialMediaInput platform="twitter" onChange={handleUpdateUser} />
      <SocialMediaInput platform="linkedin" onChange={handleUpdateUser} /> */}
    </Card>
  );
};
