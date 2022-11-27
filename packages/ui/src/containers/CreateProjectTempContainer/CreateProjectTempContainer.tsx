import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { UPDATE_MEMBER, FIND_PROJECT } from "@eden/package-graphql";
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
  EmojiSelector,
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

export interface ICreateProjectTempContainerProps {
  roles?: Maybe<Array<Maybe<RoleTemplate>>>;
}

export const CreateProjectTempContainer = ({
  roles,
}: ICreateProjectTempContainerProps) => {
  const { currentUser } = useContext(UserContext);
  const [submitting, setSubmitting] = useState(false);

  const [projectID, setProjectID] = useState<string>(
    // "637ad5a6f0f9c427e03a03a8"
    ""
  );

  const { data: dataProject, refetch: refetchProject } = useQuery(
    FIND_PROJECT,
    {
      variables: {
        fields: {
          _id: projectID,
        },
      },
      skip: !projectID,
      context: { serviceName: "soilservice" },
    }
  );

  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [bio, setBio] = useState<string>("");
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(
    currentUser?.hoursPerWeek || 0
  );

  const [titleProject, setTitleProject] = useState<string>("");

  const [serverID, setServerID] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("");

  useEffect(() => {
    if (dataProject) {
      setTitleProject(dataProject.findProject.title);
      setBio(dataProject.findProject.description);
      setEmoji(dataProject.findProject.emoji);

      if (dataProject.findProject?.serverID?.length > 0)
        setServerID(dataProject.findProject.serverID[0]);

      console.log("randonatori = ", dataProject);
      console.log("randonatori = ", dataProject.findProject.title);
    }
  }, [dataProject]);

  const [timezone, setTimezone] = useState(currentUser?.timeZone || "");

  // const [timeZone, setTimeZone] = useState<string>(currentUser?.timeZone || "");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [githubHandle, setGithubHandle] = useState("");
  const [telegramHandle, setTelegramHandle] = useState("");
  const [lensHandle, setLensHandle] = useState("");

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

    const lensLink = currentUser?.links?.find((link) => link?.name === "lens");

    if (lensLink?.url)
      setLensHandle(lensLink?.url?.replace("https://www.lensfrens.xyz/", ""));
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
            {
              name: "lens",
              url: lensHandle ? `https://www.lensfrens.xyz/${lensHandle}` : "",
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
          <TextHeading3>Create New Project:</TextHeading3>
          <Button
            variant="primary"
            className={``}
            disabled={submitting}
            onClick={() => handleSave()}
          >
            Create
          </Button>
        </section>
        <section className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="col-span-1">
            <div className="mb-3">
              <TextBody>Title:</TextBody>
              <div className={`flex justify-center space-x-4`}>
                <TextField
                  name="textfield"
                  type="text"
                  value={titleProject.toString()}
                  onChange={(e) => setTitleProject(e.target.value)}
                />
              </div>
              <br />
              <TextBody>Bio:</TextBody>
              <TextArea
                value={currentUser?.bio!}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <TextBody>serverID:</TextBody>
            <div className={`flex justify-center space-x-4`}>
              <TextField
                name="textfield"
                type="text"
                value={serverID.toString()}
                onChange={(e) => setServerID(e.target.value)}
              />
            </div>
            <br />
          </div>
          <div className="col-span-1">
            <div className="justify-around">
              <TextBody className="mb-1">Select Emoji</TextBody>

              <div className="p-3">
                <EmojiSelector
                  size={80}
                  emoji={emoji}
                  onSelection={(value) => setEmoji(value)}
                />
              </div>
              <br />
              <TextBody>Project ID:</TextBody>
              <div className={`flex justify-center space-x-4`}>
                <TextField
                  name="textfield"
                  type="text"
                  value={projectID.toString()}
                  onChange={(e) => setProjectID(e.target.value)}
                />
              </div>
              <br />

              <Button
                variant="primary"
                className={``}
                disabled={submitting}
                // onClick={() => refetchProject()}
                onClick={() => {
                  console.log("change = -------0-000");
                  refetchProject();
                  console.log("projectID = ", projectID);
                  console.log("dataProject = ", dataProject);
                }}
              >
                Find Project
              </Button>

              {/* <SkillVisualisationComp
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
              /> */}
            </div>
            {/* <div>
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
              <SocialMediaInput
                platform="lens"
                placeholder={`Lens Handle`}
                value={lensHandle}
                onChange={(e) => setLensHandle(e.target.value)}
                shape="rounded"
              />
            </div> */}
          </div>
        </section>
      </Card>
    </>
  );
};
