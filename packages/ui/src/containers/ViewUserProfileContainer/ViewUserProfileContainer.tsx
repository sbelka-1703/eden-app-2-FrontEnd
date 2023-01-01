import { Members } from "@eden/package-graphql/generated";
import {
  Card,
  NodeList,
  SocialMediaComp,
  TextHeading3,
  UserBackground,
  UserWithDescription,
} from "@eden/package-ui";
import { STEPS } from "@eden/package-ui/utils/enums/fill-profile-steps";

export interface IViewUserProfileContainerProps {
  step?: STEPS;
  user?: Members;
  experienceOpen?: number | null;
  // eslint-disable-next-line no-unused-vars
  setExperienceOpen?: (val: number | null) => void;
}

export const ViewUserProfileContainer = ({
  step,
  user,
  experienceOpen,
  setExperienceOpen,
}: IViewUserProfileContainerProps) => {
  const subExpertise = user?.nodes?.filter(
    (node) => node?.nodeData?.node === "sub_expertise"
  );

  const projectType = user?.nodes?.filter(
    (node) => node?.nodeData?.node === "sub_typeProject"
  );

  return (
    <Card className="bg-white p-4">
      <p>Preview of your profile:</p>
      <div className={`h-75 scrollbar-hide w-full overflow-scroll p-2`}>
        <div
          className={`mb-4 flex w-full justify-center ${
            step !== STEPS.ROLE ? "blur-sm brightness-50" : ""
          }`}
        >
          <UserWithDescription member={user} />
        </div>
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-5">
          <div
            className={`my-4 flex flex-col items-start justify-center sm:col-span-3 sm:my-0 ${
              step !== STEPS.BIO ? "blur-sm brightness-50" : ""
            }`}
          >
            <TextHeading3
              style={{ fontWeight: 700 }}
              className="mb-2 text-sm uppercase text-gray-500"
            >
              🪪 Short bio
            </TextHeading3>
            <p className="text-soilBody font-Inter font-normal">{user?.bio}</p>
          </div>
          <div></div>
          <div
            className={`pl-14 ${
              step !== STEPS.SOCIALS ? "blur-sm brightness-50" : ""
            }`}
          >
            <SocialMediaComp links={user?.links} />
          </div>
        </div>
        <div className={`grid grid-cols-1 gap-4 md:grid-cols-2`}>
          <div
            className={`flex flex-col ${
              step !== STEPS.EXPERTISE ? "blur-sm" : ""
            }`}
          >
            <NodeList
              label={`EXPERTISE`}
              nodes={subExpertise}
              colorRGB={`235,225,255`}
            />
          </div>
          <div
            className={`flex flex-col ${
              step !== STEPS.PREFERRED_PROJECTS ? "blur-sm" : ""
            }`}
          >
            <NodeList
              label={`PREFERRED PROJECTS`}
              nodes={projectType}
              colorRGB={`209,247,196`}
            />
          </div>
        </div>
        <div
          className={`my-4 ${
            step !== STEPS.EXP && step !== STEPS.EXP_DETAIL ? "blur-sm" : ""
          }`}
        >
          {user?.previusProjects && (
            <UserBackground
              background={user.previusProjects}
              initialEndorsements={[
                {
                  endorser: {
                    discordAvatar:
                      "https://cdn.discordapp.com/embed/avatars/4.png",
                    discordName: "BluePanda",
                    discriminator: "0001",
                  },
                  endorsementMessage:
                    "One of the finest people I’ve ever known in business or any field. Simply the most brilliant opportunity creator I've ever worked with.",
                  arweaveTransactionID: "123",
                  // level: {
                  //   name: 2000,
                  //   smallName: "L2",
                  //   meaning: "Community Favourite",
                  //   SuccessfulEndorsementsGive: "23",
                  //   SuccessfulEndorsementsReceive: "12",
                  // },
                },
              ]}
              setExperienceOpen={setExperienceOpen!}
              experienceOpen={experienceOpen!}
            />
          )}
        </div>
      </div>
    </Card>
  );
};
