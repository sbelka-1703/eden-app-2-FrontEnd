import { useMutation } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { UPDATE_MEMBER } from "@eden/package-graphql";
import {
  Maybe,
  Mutation,
  RoleTemplate,
  SkillRoleType,
} from "@eden/package-graphql/generated";
import {
  Button,
  Card,
  Dropdown,
  Loading,
  RoleSelector,
  SearchSkill,
  SkillVisualisationComp,
  SocialMediaInput,
  TextArea,
  TextBody,
  TextField,
  TextHeading3,
  TextLabel,
} from "@eden/package-ui";
import { useContext, useEffect, useState } from "react";

import { timezones } from "../../../constants";

export interface IEditProfileContainerProps {
  roles?: Maybe<Array<Maybe<RoleTemplate>>>;
}

export const EditProfileContainer = ({ roles }: IEditProfileContainerProps) => {
  const { currentUser } = useContext(UserContext);
  const [submitting, setSubmitting] = useState(false);

  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [bio, setBio] = useState<string>("");
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(
    currentUser?.hoursPerWeek || 0
  );
  const [timezone, setTimezone] = useState(currentUser?.timeZone || "");

  // const [timeZone, setTimeZone] = useState<string>(currentUser?.timeZone || "");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [githubHandle, setGithubHandle] = useState("");
  const [telegramHandle, setTelegramHandle] = useState("");

  const [updateMember] = useMutation(UPDATE_MEMBER, {
    onCompleted({ updateMember }: Mutation) {
      if (!updateMember) console.log("updateMember is null");
      console.log("updateMember", updateMember);
      setSubmitting(false);
    },
  });

  useEffect(() => {
    // filter currentUser links for twitter, github, telegram
    const twitterLink = currentUser?.links?.find(
      (link) => link?.name === "twitter"
    );

    // remove https://twitter.com/ from the link
    if (twitterLink?.url)
      setTwitterHandle(twitterLink?.url?.replace("https://twitter.com/", ""));

    const githubLink = currentUser?.links?.find(
      (link) => link?.name === "github"
    );

    // remove https://github.com/ from the link
    if (githubLink?.url)
      setGithubHandle(githubLink?.url?.replace("https://github.com/", ""));

    const telegramLink = currentUser?.links?.find(
      (link) => link?.name === "telegram"
    );

    setTelegramHandle(telegramLink?.url || "");
  }, [currentUser]);

  const handleSave = () => {
    if (!currentUser) return;
    setSubmitting(true);
    updateMember({
      variables: {
        fields: {
          _id: currentUser?._id,
          memberRole: selectedRoleId,
          bio: bio,
          hoursPerWeek: hoursPerWeek,
          timeZone: timezone,
          serverID: [],
          links: [
            {
              name: "twitter",
              url: twitterHandle ? `https://twitter.com/${twitterHandle}` : "",
            },
            {
              name: "github",
              url: githubHandle ? `https://github.com/${githubHandle}` : "",
            },
            {
              name: "telegram",
              url: telegramHandle,
            },
          ],
        },
      },
    });
  };

  if (submitting) return <Loading title="Saving..." />;

  return (
    <>
      <Card className="mb-8 bg-white p-6">
        <section className="mb-6 flex justify-between">
          <TextHeading3>Edit Your Profile: </TextHeading3>
          <Button
            variant="primary"
            className={``}
            disabled={submitting}
            onClick={() => handleSave()}
          >
            Save
          </Button>
        </section>
        <section className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="col-span-1">
            <div className="mb-3">
              <TextBody>Personal</TextBody>
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

              <TextBody>Short Bio:</TextBody>
              <TextArea
                value={currentUser?.bio!}
                onChange={(e) => setBio(e.target.value)}
              />

              <div>
                <div className={`mt-4 text-center`}>
                  <TextHeading3>What’s your availability?</TextHeading3>
                </div>
                <div className={`mx-auto w-40`}>
                  <Dropdown
                    value={timezone}
                    items={timezones}
                    placeholder={`Timezone`}
                    onSelect={(val) => setTimezone(val.name)}
                  />
                </div>

                <div className={`flex justify-center space-x-4`}>
                  <div className={`w-24`}>
                    <TextField
                      placeholder={`Hours`}
                      radius="pill"
                      type={`number`}
                      value={hoursPerWeek.toString()}
                      onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                    />
                  </div>
                  <div className={`my-auto font-medium text-zinc-600`}>
                    hrs. / week
                  </div>
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

              <SkillVisualisationComp
                skills={
                  currentUser?.skills?.map((skill) => {
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
            <div>
              <TextBody>Social Links</TextBody>
              <TextLabel>Please make sure all links are up to date</TextLabel>
              <SocialMediaInput
                platform="twitter"
                placeholder={`Twitter Handle`}
                value={twitterHandle}
                onChange={(e) => setTwitterHandle(e.target.value)}
                shape="rounded"
              />
              <SocialMediaInput
                platform="github"
                placeholder={`Github Handle`}
                value={githubHandle}
                onChange={(e) => setGithubHandle(e.target.value)}
                shape="rounded"
              />
              <SocialMediaInput
                platform="telegram"
                placeholder={`Telegram Handle`}
                value={telegramHandle}
                onChange={(e) => setTelegramHandle(e.target.value)}
                shape="rounded"
              />
            </div>
          </div>
        </section>
      </Card>
    </>
  );
};
