//This is just UI functionalities are remaning
// import { Members } from "@eden/package-graphql/generated";
import { useMutation } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { UPDATE_MEMBER } from "@eden/package-graphql";
import { Maybe, Mutation, RoleTemplate } from "@eden/package-graphql/generated";
import {
  Button,
  Card,
  CheckBox,
  Dropdown,
  RoleSelector,
  SearchSkill,
  SkillList,
  SocialMediaInput,
  SwitchButton,
  TextArea,
  TextBody,
  TextField,
  TextHeading3,
  TextLabel,
} from "@eden/package-ui";
import { useContext, useState } from "react";

export interface IEditProfileContainerProps {
  roles?: Maybe<Array<Maybe<RoleTemplate>>>;
  // eslint-disable-next-line no-unused-vars
  // onSave: (member: Members) => void;
}

export const EditProfileContainer = ({ roles }: IEditProfileContainerProps) => {
  const { currentUser } = useContext(UserContext);
  const newMember = currentUser!;
  const [showSeniorSkills, setShowSeniorSkills] = useState(true);
  const [showMidLevelSkills, setShowMidLevelSkills] = useState(true);
  const [showJuniorSkills, setShowJuniorSkills] = useState(true);
  const [showLearningSkills, setShowLearningSkills] = useState(true);

  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);

  const [updateMember] = useMutation(UPDATE_MEMBER, {
    onCompleted({ updateMember }: Mutation) {
      if (!updateMember) console.log("updateMember is null");
      console.log("updateMember", updateMember);
    },
  });

  const handleSave = () => {
    if (!currentUser) return;
    console.log("save");
    updateMember({
      variables: {
        fields: {
          _id: currentUser?._id,
          memberRole: selectedRoleId,
        },
      },
    });
  };

  return (
    <>
      <Card className="mb-8 bg-white p-6">
        <section className="mb-6">
          <TextHeading3>Edit Your Profile: </TextHeading3>
        </section>
        <section className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="col-span-1">
            <div className="mb-3">
              <TextBody>Personal</TextBody>
              {/*<TextField name="title" placeholder="Start typing here" /> */}
            </div>
            <div className="mb-3">
              <TextBody>Your Role:</TextBody>
              {/* Add Roles */}
              <RoleSelector
                roles={roles as Maybe<Maybe<RoleTemplate>[]>}
                onSelect={(role) => {
                  setSelectedRoleId(role?._id as string);
                }}
              />

              <TextBody>
                Short Bio:
                <TextArea
                  value={currentUser?.bio!}
                  onChange={(e) => (newMember.bio = e.target.value)}
                />
              </TextBody>
              <div>
                <TextBody>
                  Finances & availability
                  <TextBody>How much time can you devote?</TextBody>
                </TextBody>
                <div className="flex flex-row justify-around">
                  <Dropdown
                    value="35hr"
                    items={[{ name: "35hr" }, { name: "20hr" }]}
                    onSelect={(val) => (newMember.hoursPerWeek = val)}
                  />
                  <Dropdown value="Week" items={[{ name: "Week" }]} />
                </div>
                <div className="flex justify-around">
                  <Dropdown
                    value="UTC+1"
                    items={[{ name: "UTC+2" }, { name: "UTC+1" }]}
                    onSelect={(val) => (newMember.timeZone = val)}
                  />
                </div>
                <div>
                  <TextBody>What is your expected remuneraion?</TextBody>
                  <TextBody>Please enter your hourly rate</TextBody>
                  <div className="flex flex-row justify-evenly p-1">
                    <TextField
                      value={"3520"}
                      type={"number"}
                      onChange={() => console.log("TextField Edited")}
                    />
                    <TextField
                      value={"3520"}
                      type={"number"}
                      onChange={() => console.log("TextField Edited")}
                    />
                    <TextBody className="p-3">Token: </TextBody>
                    <Dropdown
                      value="CODE"
                      items={[{ name: "USDT" }, { name: "CODE" }]}
                    />
                  </div>
                </div>
                <div>
                  <SwitchButton
                    name="isAlternateTokenOK"
                    label="Accept equivalent in alternative tokens"
                    onChange={undefined}
                  />
                  <SwitchButton
                    name="isUnpaidOK"
                    label="Unpaid contributions"
                    onChange={undefined}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="justify-around">
              <TextBody className="mb-1">Your Skills</TextBody>
              <TextLabel>Add your Skill</TextLabel>
              <SearchSkill
                skills={currentUser?.skills}
                setSkills={undefined}
                levels={[
                  {
                    title: "learning",
                    level: "learning",
                  },
                  {
                    title: "Mid Level",
                    level: "mid",
                  },
                  {
                    title: "Senior",
                    level: "senior",
                  },
                  {
                    title: "Junior",
                    level: "junior",
                  },
                ]}
              />
              <div className="flex flex-row justify-around">
                <CheckBox
                  radius="rounded"
                  label="Senior"
                  checked={showSeniorSkills}
                  bgColorRGB="191, 255, 140"
                  onChange={() => setShowSeniorSkills(!showSeniorSkills)}
                />
                <CheckBox
                  label="Mid Level"
                  radius="rounded"
                  bgColorRGB="255, 169, 241"
                  checked={showMidLevelSkills}
                  onChange={() => setShowMidLevelSkills(!showMidLevelSkills)}
                />
                <CheckBox
                  label="Junior"
                  radius="rounded"
                  bgColorRGB="186, 230, 255"
                  checked={showJuniorSkills}
                  onChange={() => setShowJuniorSkills(!showJuniorSkills)}
                />
                <CheckBox
                  label="Learning"
                  radius="rounded"
                  bgColorRGB="255, 208, 43"
                  checked={showLearningSkills}
                  onChange={() => setShowLearningSkills(!showLearningSkills)}
                />
              </div>
              {showSeniorSkills && (
                <SkillList
                  colorRGB="191, 255, 140"
                  skills={currentUser?.skills!.filter(
                    (skill: any) => skill.level == "senior"
                  )}
                />
              )}
              {showMidLevelSkills && (
                <SkillList
                  colorRGB="255, 169, 241"
                  skills={currentUser?.skills!.filter(
                    (skill: any) => skill.level == "mid"
                  )}
                />
              )}
              {showJuniorSkills && (
                <SkillList
                  colorRGB="186, 230, 255"
                  skills={currentUser?.skills!.filter(
                    (skill: any) => skill.level == "mid"
                  )}
                />
              )}
              {showLearningSkills && (
                <SkillList
                  colorRGB="255, 208, 43"
                  skills={currentUser?.skills!.filter(
                    (skill: any) => skill.level == "mid"
                  )}
                />
              )}
            </div>
            <div>
              <TextBody>Social Links</TextBody>
              <TextLabel>Please make sure all links are up to date</TextLabel>
              <SocialMediaInput
                platform={"twitter"}
                // placeholder={currentUser?.links[0].url}
                onChange={() => console.log("Twitter changed")}
              />
              <SocialMediaInput
                platform={"discord"}
                onChange={() => console.log("Twitter changed")}
              />
              <SocialMediaInput
                platform={"github"}
                onChange={() => console.log("Twitter changed")}
              />
              <SocialMediaInput
                platform={"notion"}
                onChange={() => console.log("Twitter changed")}
              />
              <SocialMediaInput
                platform={"linkedin"}
                onChange={() => console.log("Twitter changed")}
              />
              <SocialMediaInput
                platform={"telegram"}
                onChange={() => console.log("Twitter changed")}
              />
            </div>
          </div>
        </section>
      </Card>
      <Button
        variant="primary"
        className="mx-auto"
        onClick={() => handleSave()}
        // onClick={() => onSave(newMember)}
      >
        Save
      </Button>
    </>
  );
};
