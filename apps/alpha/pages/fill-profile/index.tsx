import { UserContext, UserProvider } from "@eden/package-context";
import { LinkType, Maybe, RoleTemplate } from "@eden/package-graphql/generated";
import {
  AppUserLayout,
  AvailabilityComp,
  BatteryStepper,
  Button,
  Card,
  EndorsementList,
  GridItemSix,
  GridLayout,
  RoleSelector,
  SalaryRangeChart,
  SEO,
  SocialMediaComp,
  SocialMediaInput,
  TextArea,
  TextHeading3,
  UserExperienceCard2,
  UserWithDescription,
} from "@eden/package-ui";
import { useContext, useEffect, useState } from "react";

import FILL_PROFILE_MOCK from "../../utils/mock/fill-profile-mock";
import USER_MOCK from "../../utils/mock/userMock";
import { NextPageWithLayout } from "../_app";

// eslint-disable-next-line no-unused-vars
enum STEPS {
  // eslint-disable-next-line no-unused-vars
  ROLE = "ROLE",
  // eslint-disable-next-line no-unused-vars
  BIO = "BIO",
  // eslint-disable-next-line no-unused-vars
  COMPENSATION = "COMPENSATION",
  // eslint-disable-next-line no-unused-vars
  SOCIALS = "SOCIALS",
  // eslint-disable-next-line no-unused-vars
  EXP = "EXP",
  // eslint-disable-next-line no-unused-vars
  EXP_DETAIL = "EXP_DETAIL",
}

const FillProfilePage: NextPageWithLayout = () => {
  const { currentUser } = useContext(UserContext);
  const [percent, setPercent] = useState(36);
  const [step, setStep] = useState(STEPS.ROLE);
  const [salaries, setSalaries] = useState<number[]>([]);
  const [state, setState] = useState({
    discordName: currentUser?.discordName,
    discordAvatar: currentUser?.discordAvatar,
    discriminator: currentUser?.discriminator,
    memberRole: currentUser?.memberRole,
    bio: currentUser?.bio as string,
    match: 100,
    hoursPerWeek: currentUser?.hoursPerWeek,
    expectedSalary: 0,
    links: currentUser?.links,
    background: USER_MOCK.Result[1].background as any,
  });

  const handleSetRole = (value: RoleTemplate) => {
    setState({
      ...state,
      memberRole: value,
    });
  };

  const handleSetBio = (value: string) => {
    setState({
      ...state,
      bio: value,
    });
  };

  const handleSetBackground = (value: any[]) => {
    setState({
      ...state,
      background: value,
    });
  };

  useEffect(() => {
    const rangeNumbers = [];

    for (let i = 0; i < 500; i++) {
      rangeNumbers.push(Math.floor(Math.random() * 80) + 1);
    }

    setSalaries(rangeNumbers);
  }, []);

  useEffect(() => {
    setState({
      ...state,
      discordName: currentUser?.discordName,
      discordAvatar: currentUser?.discordAvatar,
      discriminator: currentUser?.discriminator,
      memberRole: currentUser?.memberRole,
      bio: currentUser?.bio as string,
      match: 100,
      hoursPerWeek: currentUser?.hoursPerWeek,
      expectedSalary: 0,
      links: currentUser?.links,
    });
  }, [currentUser]);

  return (
    <>
      <SEO />
      <GridLayout>
        <GridItemSix className="">
          <Card className="overflow-scroll bg-white p-4">
            <div className="scrollbar-hide h-8/10 ">
              <section className="grid grid-cols-4 gap-2 ">
                <div className="col-span-3">
                  <h2 className="mb-2 text-lg font-medium">
                    Hello & Welcome! Let’s complete your profile step by step 🚀
                  </h2>
                  <p>
                    {`Your profile is at ${percent}% right now. In order to be visible to
                other members your profile should be at least 70% complete.`}
                  </p>
                </div>
                <div className="col-span-1">
                  <BatteryStepper batteryPercentage={percent} />
                </div>
              </section>
              <section className="mb-4">
                {step === STEPS.ROLE && (
                  <>
                    <p>{`Let's start with your role:`}</p>
                    <RoleSelector
                      roles={
                        FILL_PROFILE_MOCK.roles as Maybe<
                          Array<Maybe<RoleTemplate>>
                        >
                      }
                      onSelect={(val) => {
                        handleSetRole(val as RoleTemplate);
                      }}
                    />
                  </>
                )}
                {step === STEPS.BIO && (
                  <>
                    <p>{`Please write a short bio!`}</p>
                    <TextArea
                      onChange={(e) => {
                        handleSetBio(e.target.value);
                      }}
                      value={state?.bio as string}
                    />
                  </>
                )}
                {step === STEPS.COMPENSATION && (
                  <>
                    <p>{`What's your expected compensation?`}</p>
                    <SalaryRangeChart
                      data={salaries}
                      onChange={(val) => {
                        setState({
                          ...state,
                          expectedSalary: val.values[1],
                        });
                      }}
                    />
                  </>
                )}
                {step === STEPS.SOCIALS && (
                  <>
                    <p>{`Share your socials!`}</p>
                    <SocialMediaInput
                      platform="twitter"
                      placeholder={`Twitter Handle`}
                      // value={twitterHandle}
                      onChange={(e) => {
                        console.log(e.target.value);
                      }}
                      shape="rounded"
                    />
                    <SocialMediaInput
                      platform="github"
                      placeholder={`Github Handle`}
                      // value={githubHandle}
                      onChange={(e) => {
                        console.log(e.target.value);
                      }}
                      shape="rounded"
                    />
                    <SocialMediaInput
                      platform="telegram"
                      placeholder={`Telegram Handle`}
                      // value={telegramHandle}
                      onChange={(e) => {
                        console.log(e.target.value);
                      }}
                      shape="rounded"
                    />
                  </>
                )}
                {step === STEPS.EXP && (
                  <UserExperienceCard2
                    handleChange={(val) => handleSetBackground(val)}
                  />
                )}
              </section>
              <section className="flex">
                {step !== STEPS.ROLE && <Button>Prev</Button>}
                <Button
                  className="ml-auto"
                  onClick={() => {
                    if (step === STEPS.ROLE) setStep(STEPS.BIO);
                    if (step === STEPS.BIO) setStep(STEPS.COMPENSATION);
                    if (step === STEPS.COMPENSATION) setStep(STEPS.SOCIALS);
                    if (step === STEPS.SOCIALS) setStep(STEPS.EXP);

                    setPercent(percent + 5);
                  }}
                >
                  Next
                </Button>
              </section>
            </div>
          </Card>
        </GridItemSix>

        <GridItemSix className="">
          <Card className="bg-white p-4">
            <p>Preview of your profile:</p>
            <div className={`h-8/10 scrollbar-hide w-full overflow-scroll`}>
              <div
                className={`mb-4 flex w-full justify-center ${
                  step !== STEPS.ROLE ? "blur-sm brightness-50" : ""
                }`}
              >
                <UserWithDescription
                  member={{
                    discordName: currentUser?.discordName,
                    discordAvatar: currentUser?.discordAvatar,
                    discriminator: currentUser?.discriminator,
                    memberRole: {
                      title: state.memberRole?.title as string,
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
                  <p className="text-soilBody font-Inter font-normal">
                    {state?.bio}
                  </p>
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
                  <div
                    className={`${
                      step !== STEPS.COMPENSATION ? "blur-sm brightness-50" : ""
                    }`}
                  >
                    <AvailabilityComp
                      timePerWeek={state.hoursPerWeek as number}
                      seed={
                        state.expectedSalary
                          ? state.expectedSalary.toString()
                          : "0"
                      }
                    />
                  </div>
                  <div
                    className={`${
                      step !== STEPS.SOCIALS ? "blur-sm brightness-50" : ""
                    }`}
                  >
                    {!!state?.links?.length && (
                      <SocialMediaComp
                        title=""
                        links={state.links.map((link: Maybe<LinkType>) => ({
                          name: link?.name?.toLowerCase(),
                          url: link?.url,
                        }))}
                        size="1.8rem"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`${
                  step !== STEPS.EXP && step !== STEPS.EXP_DETAIL
                    ? "blur-sm brightness-50"
                    : ""
                }`}
              >
                {state.background && (
                  <UserBackground
                    background={state.background}
                    initialEndorsements={USER_MOCK.Result[1].endorsements}
                  />
                )}
              </div>
            </div>
          </Card>
        </GridItemSix>
      </GridLayout>
    </>
  );
};

FillProfilePage.getLayout = (page) => (
  <AppUserLayout>
    <UserProvider>{page}</UserProvider>
  </AppUserLayout>
);

export default FillProfilePage;

//TODO put this in another file
const UserBackground = ({
  background,
  initialEndorsements,
}: {
  background: any[];
  initialEndorsements: any[];
}) => {
  const [experienceOpen, setExperienceOpen] = useState<number | null>(null);
  const endorsements = initialEndorsements?.map((endorsement: any) => ({
    member: {
      discordName: endorsement.name,
      discordAvatar: endorsement.avatar,
    },
    text: endorsement.endorsement,
    level: endorsement.level.name,
  }));

  return (
    <div>
      <div className="mb-4">
        <TextHeading3
          style={{ fontWeight: 700 }}
          className=" text-sm uppercase text-gray-500"
        >
          🎡 Background
        </TextHeading3>
        {background.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center">
              <span
                className="mr-3 cursor-pointer"
                onClick={() =>
                  setExperienceOpen(index === experienceOpen ? null : index)
                }
              >
                {index === experienceOpen ? "▼" : "▶"}
              </span>
              <div className="min-w-30 flex h-8 w-1/2 items-center !rounded-full border-0 bg-cyan-200 px-4 outline-0">
                {item.title}
              </div>
              {index < 2 && <span className="ml-3 text-xl">⭐️</span>}
            </div>
            {index === experienceOpen && (
              <div>
                <p>{item.bio}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {endorsements?.length > 0 && (
        <div className="mt-3">
          <EndorsementList endorsements={endorsements} />
        </div>
      )}
    </div>
  );
};
