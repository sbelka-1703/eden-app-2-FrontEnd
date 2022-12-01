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
import { Dispatch, SetStateAction, useContext, useState } from "react";

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
  const [percent, setPercent] = useState(36);
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
                other members your profile should be at least 70% complete.`}
            </p>
          </div>
          <div className="col-span-1">
            <BatteryStepper batteryPercentage={percent} />
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
                {["twitter", "github", "telegram"].map((item) => (
                  <SocialMediaInput
                    key={item}
                    platform={item}
                    placeholder={`Handle`}
                    value={
                      state.links?.find((link: LinkType) => link?.name === item)
                        ?.url || ""
                    }
                    onChange={(e) => {
                      let newLinks = state.links ? [...state.links] : [];
                      const hasLink = state.links?.some(
                        (link: LinkType) => link?.name === item
                      );

                      if (hasLink) {
                        newLinks = newLinks.map((link) => {
                          return link?.name === item
                            ? { ...link, url: e.target.value }
                            : link;
                        });
                      } else {
                        newLinks.push({
                          __typename: "linkType",
                          name: item,
                          url: e.target.value,
                        });
                      }

                      setState({
                        ...state,
                        links: newLinks,
                      });
                    }}
                    shape="rounded"
                  />
                ))}
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
          <section className="flex pb-4">
            {step !== STEPS.ROLE && (
              <Button
                onClick={() => {
                  if (step === STEPS.BIO && setStep) setStep(STEPS.ROLE);
                  if (step === STEPS.COMPENSATION && setStep)
                    setStep(STEPS.BIO);
                  if (step === STEPS.SOCIALS && setStep)
                    setStep(STEPS.COMPENSATION);
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

                  setPercent(percent + 5);
                }}
              >
                Next
              </Button>
            )}
            {step === STEPS.EXP && (
              <Button
                variant="primary"
                className="ml-auto"
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
