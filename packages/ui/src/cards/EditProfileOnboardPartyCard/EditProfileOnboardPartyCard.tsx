import { Members } from "@graphql/eden/generated";
import { Avatar, Card, SearchSkill, TextArea, TextHeading3 } from "ui";

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
      <SearchSkill skills={currentUser.skills} setSkills={handleSetSkills} />
      <TextArea
        placeholder={`Start typing here`}
        rows={8}
        // value={`${currentUser.bio ? currentUser.bio : ""}`}
        onChange={handleUpdateUser}
      />
    </Card>
  );
};
