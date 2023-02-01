/* eslint-disable camelcase */
import { useQuery } from "@apollo/client";
import { FIND_ROLE_TEMPLATES } from "@eden/package-graphql";
import {
  Maybe,
  Members,
  SkillType_Member,
} from "@eden/package-graphql/generated";
import {
  Avatar,
  Card,
  Dropdown,
  NumberCircle,
  ProgressBarGeneric,
  // SocialMediaInput,
  TextArea,
  TextHeading3,
  TextLabel1,
} from "@eden/package-ui";
import { getFillProfilePercentage } from "@eden/package-ui/utils/fill-profile-percentage";

import { SearchSkill } from "../../components/SearchSkill/SearchSkill";
import { SkillList } from "../../lists/SkillList/SkillList";

export interface EditProfileOnboardPartyCardProps {
  currentUser: Members;
  // eslint-disable-next-line no-unused-vars
  handleSetSkills: (val: any) => void;
  // eslint-disable-next-line no-unused-vars
  handleDeleteSkill: (val: Maybe<SkillType_Member> | undefined) => void;
  // eslint-disable-next-line no-unused-vars
  handleUpdateUser: (val: any, name: string) => void;
}

export const EditProfileOnboardPartyCard = ({
  currentUser,
  handleSetSkills,
  handleDeleteSkill,
  handleUpdateUser,
}: EditProfileOnboardPartyCardProps) => {
  const learningSkills: Maybe<SkillType_Member>[] | undefined =
    currentUser?.skills?.filter(
      (skill: Maybe<SkillType_Member>) => skill?.level === "learning"
    );
  const skilledSkills: Maybe<SkillType_Member>[] | undefined =
    currentUser?.skills?.filter(
      (skill: Maybe<SkillType_Member>) => skill?.level !== "learning"
    );

  const { data: dataRoles } = useQuery(FIND_ROLE_TEMPLATES, {
    variables: {
      fields: {},
    },
    context: { serviceName: "soilservice" },
  });

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

  const progress = getFillProfilePercentage(currentUser);

  const _handleUpdateUser = (e: any) => {
    handleUpdateUser(e.target.value, e.target.name);
  };
  const _handleUpdateUserRole = (val: any) => {
    handleUpdateUser(val, "role");
  };

  return (
    <Card shadow className="h-85 scrollbar-hide overflow-scroll bg-white p-3">
      <TextHeading3 className="mb-2">Edit Your Profile</TextHeading3>
      <div className="mb-4 flex items-center">
        {currentUser.discordAvatar && (
          <Avatar src={currentUser.discordAvatar} size="sm" />
        )}
        {currentUser.discordName && (
          <span className="ml-2">{currentUser?.discordName}</span>
        )}
      </div>
      <div className="mb-2">
        <div className="mb-1 flex items-baseline">
          <TextLabel1>PROFILE PROGRESS</TextLabel1>
          <span className="ml-auto">{progress}%</span>
        </div>
        <ProgressBarGeneric progress={progress} />
      </div>
      <TextLabel1>💼 SELECT YOUR ROLE</TextLabel1>
      <Dropdown
        items={dataRoles?.findRoleTemplates}
        placeholder={`Select Your Role`}
        onSelect={_handleUpdateUserRole}
        radius="rounded"
        key={currentUser.memberRole?.title || ""}
        value={currentUser.memberRole?.title || ""}
      />
      <TextLabel1>🛠 ADD YOUR SKILLS</TextLabel1>
      <SearchSkill
        levels={levels}
        skills={currentUser.skills}
        setSkills={handleSetSkills}
      />
      <div className="flex items-center space-x-2">
        <TextLabel1>LEARNING</TextLabel1>
        {learningSkills && <NumberCircle value={learningSkills?.length} />}
      </div>
      {learningSkills && (
        <SkillList
          skills={learningSkills}
          handleDeleteSkill={handleDeleteSkill}
          colorRGB="209,247,196"
          closeButton
        />
      )}
      <div className="flex items-center space-x-2">
        <TextLabel1>SKILLED</TextLabel1>
        {skilledSkills && <NumberCircle value={skilledSkills?.length} />}
      </div>
      {skilledSkills && (
        <SkillList
          skills={skilledSkills}
          handleDeleteSkill={handleDeleteSkill}
          colorRGB="235,225,255"
          closeButton
        />
      )}
      <TextLabel1>ABOUT ME</TextLabel1>
      <TextArea
        name="bio"
        placeholder={`Write a short description about yourself...`}
        rows={5}
        value={`${currentUser.bio ? currentUser.bio : ""}`}
        className="border-0 text-xs"
        onChange={_handleUpdateUser}
        debounceTime={2000}
        maxLength={280}
      />
      {/* <TextLabel>SOCIAL MEDIA</TextLabel>
      <SocialMediaInput platform="twitter" onChange={handleUpdateUser} />
      <SocialMediaInput platform="linkedin" onChange={handleUpdateUser} /> */}
    </Card>
  );
};
