import { UserContext, UserProvider } from "@eden/package-context";
import { LinkType, Maybe, RoleTemplate } from "@eden/package-graphql/generated";
import {
  AppUserLayout,
  AvailabilityComp,
  Badge,
  BatteryStepper,
  Button,
  Card,
  EmojiSelector,
  EndorsementList,
  GridItemSix,
  GridLayout,
  RoleSelector,
  SalaryRangeChart,
  SEO,
  SocialMediaComp,
  SocialMediaInput,
  TabsSelector,
  TextArea,
  TextField,
  TextHeading3,
  UserExperienceCard,
  UserWithDescription,
} from "@eden/package-ui";
import { ArrowsCollapseIcon } from "@eden/package-ui/src/modals/ProfileExpandedModal/icons/ArrowCollapseIcon";
import { ArrowsExpandIcon } from "@eden/package-ui/src/modals/ProfileExpandedModal/icons/ArrowExpandIcon";
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
                  <>
                    <p className="mb-2">{`Welcome to the experience cards! Come up with unique name for each aspect of your background and share it with us 🚀`}</p>
                    <p className="mb-4 text-slate-400">{` Developer by day, Bartender by night? Or traveller by day, DevRel on the weekends? Come up with titles and tell us more :) Title ex. Scrum Master, Volunteering, Travelling, AI/ML, Law, Art, etc.`}</p>
                    {[0, 1, 2].map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="mb-2 flex items-center justify-start"
                        >
                          <div className="mr-4 w-60">
                            <TextField
                              onChange={(e) => {
                                setState({
                                  ...state,
                                  background: [
                                    ...state?.background.map(
                                      (_item: any, _index: any) => {
                                        return index === _index
                                          ? { ..._item, title: e.target.value }
                                          : _item;
                                      }
                                    ),
                                  ],
                                });
                              }}
                            />
                          </div>
                          <div className="relative h-[40px]">
                            <div className="absolute top-1 left-0">
                              <EmojiSelector
                                onSelection={(val) => {
                                  setState({
                                    ...state,
                                    background: [
                                      ...state?.background.map(
                                        (_item: any, _index: any) => {
                                          return index === _index
                                            ? { ..._item, emoji: val }
                                            : _item;
                                        }
                                      ),
                                    ],
                                  });
                                }}
                                size={40}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
                {step === STEPS.EXP_DETAIL && (
                  <UserExperienceCard
                    roles={
                      FILL_PROFILE_MOCK.roles as Maybe<
                        Array<Maybe<RoleTemplate>>
                      >
                    }
                    fields={state.background.map(
                      (item: any, index: number) => ({
                        _id: index.toString(),
                        title: `${item.emoji} ${item.title}`,
                      })
                    )}
                    handleChange={(val: any) => {
                      const newVal = val.map((item: any) =>
                        Object.keys(item).map((key) => ({
                          title: item[key].role,
                          content: item[key].bio,
                          skills: [],
                          date: {
                            start: "",
                            end: "",
                          },
                        }))
                      );

                      const newState = state.background.map(
                        (item: any, index: number) =>
                          val[index]
                            ? {
                                ...item,
                                content: newVal[index],
                              }
                            : item
                      );

                      setState({
                        ...state,
                        background: newState,
                      });
                    }}
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
                    if (step === STEPS.EXP) setStep(STEPS.EXP_DETAIL);

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
                {USER_MOCK.Result[1].background && (
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
  const endorsements = initialEndorsements?.map((endorsement: any) => ({
    member: {
      discordName: endorsement.name,
      discordAvatar: endorsement.avatar,
    },
    text: endorsement.endorsement,
    level: endorsement.level.name,
  }));

  const [expand, setExpand] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = background.map((item) => `${item.title} ${item.emoji}`);
  const item = background.reduce((prev, curr) => {
    const item = { [`${curr.title} ${curr.emoji}`]: curr };

    return { ...prev, ...item };
  }, {});

  const activeItem = item[tabs[activeTab]];

  const onExpend = (item: string) => {
    const itemIndex = tabs.findIndex((tab) => tab === item);

    setActiveTab(itemIndex);
    setExpand(true);
  };

  return (
    <div>
      <div className="mb-4 flex">
        <TextHeading3
          style={{ fontWeight: 700 }}
          className=" text-sm uppercase text-gray-500"
        >
          🎡 Background
        </TextHeading3>
        {expand && (
          <Button style={{ border: "none" }} onClick={() => setExpand(false)}>
            <ArrowsCollapseIcon />
          </Button>
        )}
      </div>
      {expand ? (
        <UserExpandedBackground
          tabs={tabs}
          activeTab={activeTab}
          activeItem={activeItem}
          setActiveTab={setActiveTab}
        />
      ) : (
        <>
          <UserCardBackground onExpand={onExpend} background={background} />
          {endorsements?.length > 0 && (
            <div className="mt-3">
              <EndorsementList endorsements={endorsements} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

const DEFAULT_COLOR = "#CAE8FF";

const UserCardBackground = ({
  onExpand,
  background,
}: {
  background: any[];
  // eslint-disable-next-line no-unused-vars
  onExpand: (item: string) => void;
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {background.map((item, index) => (
        <Card
          key={index}
          border
          className="hover:shadow-focusShadow hover:border-accentColor cursor-pointer p-2"
        >
          <Button
            className="w-full"
            style={{ border: "none", display: "block" }}
            onClick={() => onExpand(`${item.title} ${item.emoji}`)}
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <TextHeading3 className="text-center text-base">
                  {item.emoji} {item.title}
                </TextHeading3>
                <div className="absolute right-2 top-3.5">
                  <ArrowsExpandIcon />
                </div>

                {item.content.map((content: any) => (
                  <TextHeading3
                    key={content.title}
                    className="font-Inter my-3 overflow-hidden text-ellipsis whitespace-nowrap rounded-2xl px-2 py-1 text-base"
                    style={{ backgroundColor: item?.color || DEFAULT_COLOR }}
                  >
                    {content.title}
                  </TextHeading3>
                ))}
              </div>
              <p className="text-gray-400">Total: 4 years 6 month</p>
            </div>
          </Button>
        </Card>
      ))}
    </div>
  );
};

const UserExpandedBackground = ({
  tabs,
  activeTab,
  activeItem,
  setActiveTab,
}: {
  tabs: string[];
  activeItem: any;
  activeTab: number;
  // eslint-disable-next-line no-unused-vars
  setActiveTab: (activeTab: number) => void;
}) => {
  return (
    <>
      <TabsSelector
        tabs={tabs}
        selectedTab={activeTab}
        onSelect={(val) => {
          setActiveTab(val);
        }}
      />
      <div className="border-accentColor scrollbar-hide relative overflow-y-scroll rounded-b-xl border-b-2 border-r-2 border-l-2 bg-white px-4 pt-6">
        {activeItem?.content.map((item: any, index: number) => (
          <div
            key={item.title}
            className="mb-2 grid grid-cols-2 border-b border-b-gray-300 pb-2"
            style={
              index === activeItem?.content.length - 1
                ? { borderBottom: "none" }
                : {}
            }
          >
            <div>
              <TextHeading3
                className="mb-3 rounded-2xl px-2 py-1"
                style={{ backgroundColor: activeItem?.color || DEFAULT_COLOR }}
              >
                {item.title}
              </TextHeading3>
              <p>{item.content}</p>
            </div>
            <div className="flex flex-col items-center justify-between">
              <div className="flex flex-col items-center">
                <TextHeading3
                  style={{ fontWeight: 700 }}
                  className="mb-2 text-sm uppercase text-gray-500"
                >
                  🚀 Skills
                </TextHeading3>
                <div className="inline-block">
                  {item?.skills?.map((skill: string, index: number) => (
                    <Badge
                      text={skill}
                      key={index}
                      cutText={15}
                      colorRGB="255, 111, 137, 0.49"
                      className={`py-px text-xs`}
                    />
                  ))}
                </div>
              </div>
              <TextHeading3 className="mb-2 text-gray-500">
                {`${item.date.start} - ${item.date.end}`}
              </TextHeading3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
