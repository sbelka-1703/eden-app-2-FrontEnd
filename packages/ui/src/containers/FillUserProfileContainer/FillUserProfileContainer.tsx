import { useMutation, useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { FIND_ROLE_TEMPLATES, UPDATE_MEMBER } from "@eden/package-graphql";
import {
  Endorsements,
  LinkType,
  Maybe,
  PreviusProjectsType,
  RoleTemplate,
  Scalars,
} from "@eden/package-graphql/generated";
import { STEPS } from "@eden/package-ui/utils/enums/fill-profile-steps";
import { getFillProfilePercentage } from "@eden/package-ui/utils/fill-profile-percentage";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { UserExperienceCard2 } from "../../cards";
import { SocialMediaInput } from "../../components";
import { Button, Card, Loading, TextArea } from "../../elements";
import { RoleSelector } from "../../selectors";
import { BatteryStepper } from "../../steppers";

export interface IFillUserProfileContainerProps {
  state: any;
  setState: Dispatch<SetStateAction<any>>;
  step?: string | undefined;
  // eslint-disable-next-line no-unused-vars
  setStep: Dispatch<SetStateAction<STEPS>>;
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

export const FillUserProfileContainer = ({
  step,
  state,
  setState,
  setStep,
  setExperienceOpen,
}: IFillUserProfileContainerProps) => {
  const { currentUser } = useContext(UserContext);
  const [percent, setPercent] = useState(getFillProfilePercentage(state));
  //   const [salaries, setSalaries] = useState<number[]>([]);

  const [updateMember] = useMutation(UPDATE_MEMBER, {});

  const { data: dataRoles } = useQuery(FIND_ROLE_TEMPLATES, {
    variables: {
      fields: {},
    },
    context: { serviceName: "soilservice" },
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
    setPercent(getFillProfilePercentage(state));
  }, [state]);

  useEffect(() => {
    if (currentUser?.links)
      setState({
        ...state,
        links: state?.links?.map((link: LinkType) => {
          let newLink = { ...link };

          if (link.name === "twitter")
            newLink = {
              ...newLink,
              url: link?.url?.replace("https://twitter.com/", ""),
            };
          if (link.name === "github")
            newLink = {
              ...newLink,
              url: link?.url?.replace("https://github.com/", ""),
            };
          if (link.name === "lens")
            newLink = {
              ...newLink,
              url: link?.url?.replace("https://www.lensfrens.xyz/", ""),
            };
          if (link.name === "telegram")
            newLink = {
              ...newLink,
              url: link?.url?.replace("https://t.me/", ""),
            };

          return newLink;
        }),
      });
  }, [currentUser]);

  const handleSubmitForm = () => {
    const fields = {
      _id: currentUser?._id,
      // serverID: [],
      bio: state?.bio,
      hoursPerWeek: state?.hoursPerWeek,
      links: state?.links?.map((item: any) => ({
        url: item?.url,
        name: item?.name,
      })),
      memberRole: state?.memberRole?._id || undefined,
      previusProjects: state?.background?.map((item: any) => ({
        description: item.bio,
        endDate: item.endDate,
        startDate: item.startDate,
        title: item.title,
      })),
    };

    updateMember({
      variables: {
        fields: fields,
      },
    });
  };

  return (
    <Card className="overflow-scroll bg-white p-4">
      <div className="scrollbar-hide h-8/10 ">
        <section className="mb-4 grid grid-cols-4 gap-2">
          <div className="col-span-3">
            <h2 className="mb-2 text-lg font-medium">
              Hello & Welcome! Let’s complete your profile step by step 🚀
            </h2>
            <p>
              {`Your profile is at ${percent}% right now. In order to be visible to
                other members your profile should be at least 50% complete.`}
            </p>
          </div>
          <div className="col-span-1">
            <BatteryStepper showPercentage batteryPercentage={percent} />
          </div>
        </section>
        {!currentUser && (
          <div className="h-80">
            <Loading title="Loading your profile..." />
          </div>
        )}
        {currentUser && (
          <section className="mb-4">
            {step === STEPS.ROLE && (
              <>
                <p>{`Let's start with your role:`}</p>
                <RoleSelector
                  value={state.memberRole?.title || ""}
                  roles={
                    dataRoles?.findRoleTemplates as Maybe<
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
            {/* {step === STEPS.COMPENSATION && (
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
                  )} */}
            {step === STEPS.SOCIALS && (
              <>
                <p>{`Share your socials!`}</p>
                {["twitter", "github", "telegram", "lens"].map((item) => {
                  let placeholder = "";

                  switch (item) {
                    case "twitter":
                      placeholder = `${item} handle`;
                      break;
                    case "github":
                      placeholder = `${item} handle`;
                      break;
                    case "telegram":
                      placeholder = `${item} handle`;
                      break;
                    case "lens":
                      placeholder = `${item} handle`;
                      break;
                    default:
                      placeholder = "";
                  }
                  return (
                    <SocialMediaInput
                      key={item}
                      platform={item}
                      placeholder={placeholder}
                      value={
                        state.links?.find(
                          (link: LinkType) => link?.name === item
                        )?.url || ""
                      }
                      onChange={(e) => {
                        let newLinks = state.links ? [...state.links] : [];
                        const hasLink = state.links?.some(
                          (link: LinkType) => link?.name === item
                        );

                        if (hasLink) {
                          newLinks = newLinks.map((link) => {
                            let newUrl = e.target.value;

                            if (link.name === "twitter")
                              newUrl = "https://twitter.com/" + e.target.value;
                            if (link.name === "github")
                              newUrl = "https://github.com/" + e.target.value;
                            if (link.name === "lens")
                              newUrl =
                                "https://www.lensfrens.xyz/" + e.target.value;
                            if (link.name === "telegram")
                              newUrl = "https://t.me/" + e.target.value;

                            return link?.name === item
                              ? { ...link, url: newUrl }
                              : link;
                          });
                        } else {
                          let newUrl = e.target.value;

                          if (item === "twitter")
                            newUrl = "https://twitter.com/" + e.target.value;
                          if (item === "github")
                            newUrl = "https://github.com/" + e.target.value;
                          if (item === "lens")
                            newUrl =
                              "https://www.lensfrens.xyz/" + e.target.value;
                          if (item === "telegram")
                            newUrl = "https://t.me/" + e.target.value;

                          newLinks.push({
                            __typename: "linkType",
                            name: item,
                            url: newUrl,
                          });
                        }

                        setState({
                          ...state,
                          links: newLinks,
                        });
                      }}
                      shape="rounded"
                    />
                  );
                })}
              </>
            )}
            {step === STEPS.EXP && (
              <UserExperienceCard2
                background={state.background}
                handleChange={(val) => handleSetBackground(val)}
                handleChangeOpenExperience={(val) => {
                  if (setExperienceOpen) setExperienceOpen(val);
                }}
              />
            )}
          </section>
        )}
        {currentUser && (
          <section className="relative flex pb-4">
            {step === STEPS.EXP && percent < 50 && (
              <section className="absolute right-0 -top-6">
                <span className="text-red-400">fill minimum 50%</span>
              </section>
            )}
            {step !== STEPS.ROLE && (
              <Button
                onClick={() => {
                  if (step === STEPS.BIO && setStep) setStep(STEPS.ROLE);
                  if (step === STEPS.SOCIALS && setStep) setStep(STEPS.BIO);
                  if (step === STEPS.EXP && setStep) setStep(STEPS.SOCIALS);

                  setPercent(percent + 5);
                }}
              >
                Prev
              </Button>
            )}
            {step !== STEPS.EXP && (
              <Button
                className="ml-auto"
                onClick={() => {
                  if (step === STEPS.ROLE && setStep) setStep(STEPS.BIO);
                  if (step === STEPS.BIO && setStep) setStep(STEPS.SOCIALS);
                  if (step === STEPS.SOCIALS && setStep) setStep(STEPS.EXP);
                }}
              >
                Next
              </Button>
            )}
            {step === STEPS.EXP && (
              <Button
                variant="primary"
                className={`ml-auto disabled:border-slate-300 disabled:bg-slate-300 disabled:text-slate-200`}
                disabled={percent < 50}
                onClick={() => handleSubmitForm()}
              >
                Submit
              </Button>
            )}
          </section>
        )}
      </div>
    </Card>
  );
};
