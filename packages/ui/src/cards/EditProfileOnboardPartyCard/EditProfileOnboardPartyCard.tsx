/* eslint-disable camelcase */
import { Maybe, Members, SkillType_Member } from "@graphql/eden/generated";
import {
  Avatar,
  Badge,
  Card,
  // Dropdown,
  SearchSkill,
  // SocialMediaInput,
  TextArea,
  TextHeading3,
  TextLabel,
} from "ui";

import { NumberCircle } from "../../elements/NumberCircle";

export interface EditProfileOnboardPartyCardProps {
  currentUser: Members;
  // eslint-disable-next-line no-unused-vars
  handleSetSkills: (val: any) => void;
  // eslint-disable-next-line no-unused-vars
  handleDeleteSkill: (val: Maybe<SkillType_Member>) => void;
  // eslint-disable-next-line no-unused-vars
  handleUpdateUser: (val: any) => void;
}

export const EditProfileOnboardPartyCard = ({
  currentUser,
  handleSetSkills,
  handleDeleteSkill,
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
        closeButton
        onClose={() => handleDeleteSkill(skill)}
      />
    ));
  const skilledBadges = currentUser?.skills
    ?.filter((skill: Maybe<SkillType_Member>) => skill?.level !== "learning")
    .map((skill, index) => (
      <Badge
        key={index}
        text={skill?.skillInfo?.name || ""}
        className={`bg-soilPurple/20 font-Inter text-sm`}
        closeButton
        onClose={() => handleDeleteSkill(skill)}
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
      {/* <TextLabel>💼 SELECT YOUR ROLE</TextLabel>
      <Dropdown items={[]} placeholder={`Select Your Role`} /> */}
      <TextLabel>🛠 ADD YOUR SKILLS</TextLabel>
      <SearchSkill
        levels={levels}
        skills={currentUser.skills}
        setSkills={handleSetSkills}
      />
      <div className="flex items-center space-x-2">
        <TextLabel>LEARNING</TextLabel>
        {learningBadges && <NumberCircle value={learningBadges?.length} />}
      </div>
      <div>{learningBadges}</div>
      <div className="flex items-center space-x-2">
        <TextLabel>SKILLED</TextLabel>
        {skilledBadges && <NumberCircle value={skilledBadges?.length} />}
      </div>
      <TextLabel>ABOUT ME</TextLabel>
      <TextArea
        name="bio"
        placeholder={`Write a short description about yourself...`}
        rows={5}
        // value={`${currentUser.bio ? currentUser.bio : ""}`}
        className="text-xs"
        onChange={handleUpdateUser}
        debounceTime={2000}
        maxLength={280}
      />
      {/* <TextLabel>SOCIAL MEDIA</TextLabel>
      <SocialMediaInput platform="twitter" onChange={handleUpdateUser} />
      <SocialMediaInput platform="linkedin" onChange={handleUpdateUser} /> */}
    </Card>
  );
};
