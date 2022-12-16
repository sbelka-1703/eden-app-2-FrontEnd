import {
  Endorsements,
  LinkType,
  Maybe,
  PreviusProjectsType,
  RoleTemplate,
  Scalars,
} from "@eden/package-graphql/generated";
import {
  Card,
  SocialMediaComp,
  TextHeading3,
  UserBackground,
  UserWithDescription,
} from "@eden/package-ui";
import { STEPS } from "@eden/package-ui/utils/enums/fill-profile-steps";

export interface IViewUserProfileContainerProps {
  step?: string | null;
  user?: {
    bio?: Maybe<Scalars["String"]>;

    discordAvatar?: Maybe<Scalars["String"]>;
    discordName?: Maybe<Scalars["String"]>;
    discriminator?: Maybe<Scalars["String"]>;
    endorsements?: Maybe<Array<Maybe<Endorsements>>>;

    hoursPerWeek?: Maybe<Scalars["Float"]>;
    links?: Maybe<Array<Maybe<LinkType>>>;
    memberRole?: Maybe<RoleTemplate>;
    background?: Maybe<Array<Maybe<PreviusProjectsType>>>;
  };
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
  return (
    <Card className="bg-white p-4">
      <p>Preview of your profile:</p>
      <div className={`h-8/10 scrollbar-hide w-full overflow-scroll p-2`}>
        <div
          className={`mb-4 flex w-full justify-center ${
            step !== STEPS.ROLE ? "blur-sm brightness-50" : ""
          }`}
        >
          <UserWithDescription
            member={{
              discordName: user?.discordName,
              discordAvatar: user?.discordAvatar,
              discriminator: user?.discriminator,
              memberRole: {
                title: user?.memberRole?.title as string,
              },
            }}
          />
        </div>
        <div className="mb-4 grid grid-cols-12 gap-2">
          <div
            className={`col-span-5 ${
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
          <div
            className={`col-span-3 flex justify-center ${
              step ? "blur-sm brightness-50" : ""
            }`}
          >
            <div>
              <h1 className="text-soilHeading3 font-poppins text-soilGray -ml-2 font-medium">
                ⚡️Match
              </h1>
              <p className="text-soilPurple font-poppins text-4xl font-semibold">
                100%
              </p>
            </div>
          </div>
          <div className="col-span-4">
            {/* <div
              className={`${
                step !== STEPS.COMPENSATION ? "blur-sm brightness-50" : ""
              }`}
            >
              <AvailabilityComp
                timePerWeek={user?.hoursPerWeek as number}
                // seed={
                //   user?.expectedSalary ? user?.expectedSalary.toString() : "0"
                // }
              />
            </div> */}
            <div
              className={`mt-8 pl-14 ${
                step !== STEPS.SOCIALS ? "blur-sm brightness-50" : ""
              }`}
            >
              {!!user?.links?.length && (
                <SocialMediaComp
                  title=""
                  links={user.links?.map((link: Maybe<LinkType>) => ({
                    name: link?.name?.toLowerCase(),
                    url: link?.url,
                  }))}
                  size="sm"
                />
              )}
            </div>
          </div>
        </div>

        <div
          className={`${
            step !== STEPS.EXP && step !== STEPS.EXP_DETAIL ? "blur-sm" : ""
          }`}
        >
          {user?.background && (
            <UserBackground
              background={user.background}
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
