import { Members } from "@graphql/eden/generated";
import {
  Avatar,
  Card,
  SearchSkill,
  SocialMediaInput,
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
  return (
    <Card shadow className="bg-white p-3">
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
      <SearchSkill skills={currentUser.skills} setSkills={handleSetSkills} />
      <TextLabel>ABOUT ME</TextLabel>
      <TextArea
        placeholder={`Write a short description about yourself...`}
        rows={5}
        // value={`${currentUser.bio ? currentUser.bio : ""}`}
        onChange={handleUpdateUser}
      />
      <TextLabel>SOCIAL MEDIA</TextLabel>
      <SocialMediaInput platform="twitter" onChange={handleUpdateUser} />
      <SocialMediaInput platform="linkedin" onChange={handleUpdateUser} />
    </Card>
  );
};
