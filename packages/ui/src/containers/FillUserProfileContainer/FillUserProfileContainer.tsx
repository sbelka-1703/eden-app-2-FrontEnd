import { gql, useMutation, useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { FIND_ROLE_TEMPLATES, UPDATE_MEMBER } from "@eden/package-graphql";
import {
  Maybe,
  Members,
  Mutation,
  Node,
  NodesType,
  PreferencesType,
  PreferencesTypeFind,
  RoleTemplate,
} from "@eden/package-graphql/generated";
import {
  BatteryStepper,
  Button,
  Card,
  IPREFERENCES_TITLE,
  Loading,
  PREFERENCES_TITLE,
  RoleSelector,
  SelectNodes,
  SocialMediaInput,
  TextArea,
  UserExperienceCard,
} from "@eden/package-ui";
import { STEPS } from "@eden/package-ui/utils/enums/fill-profile-steps";
import { CheckIcon } from "@heroicons/react/outline";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

export interface IFillUserProfileContainerProps {
  state?: Members;
  setState: Dispatch<SetStateAction<any>>;
  step?: string | undefined;
  setStep: Dispatch<SetStateAction<STEPS>>;
  setView?: Dispatch<SetStateAction<"grants" | "profile">>;
  experienceOpen?: number | null;
  percentage?: number;
  // eslint-disable-next-line no-unused-vars
  setExperienceOpen?: (val: number | null) => void;
}

const UPDATE_NODES_MEMBER = gql`
  mutation ($fields: updateNodesToMemberInput!) {
    updateNodesToMember(fields: $fields) {
      _id
    }
  }
`;
const ADD_PREFERENCES_TO_MEMBER = gql`
  mutation ($fields: addPreferencesToMemberInput!) {
    addPreferencesToMember(fields: $fields) {
      _id
    }
  }
`;

export const FillUserProfileContainer = ({
  step,
  state,
  setState,
  setStep,
  setView,
  setExperienceOpen,
  percentage = 0,
}: IFillUserProfileContainerProps) => {
  const { currentUser } = useContext(UserContext);
  //   const [salaries, setSalaries] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const [updateNodes, {}] = useMutation(UPDATE_NODES_MEMBER, {
    onCompleted({ updateNodesToMember }: Mutation) {
      if (!updateNodesToMember) console.log("updateNodesToMember is null");
      console.log("updateNodesToMember", updateNodesToMember);
    },
    onError(error) {
      console.log(error);
    },
  });

  const [addPreferences, {}] = useMutation(ADD_PREFERENCES_TO_MEMBER, {
    onCompleted({ addPreferencesToMember }: Mutation) {
      if (!addPreferencesToMember)
        console.log("addPreferencesToMember is null");
      console.log("addPreferencesToMember", addPreferencesToMember);
    },
    onError(error) {
      console.log(error);
    },
  });

  const [updateMember] = useMutation(UPDATE_MEMBER, {
    onError: () => {
      setSubmitting(false);
    },
    onCompleted({ updateMember }: Mutation) {
      if (!updateMember) console.log("updateMember is null");
      console.log("updateMember", updateMember);
      // router.push(`/${router.query.from}?project=${updateMember?._id}`);
      updateNodes({
        variables: {
          fields: {
            nodeType: "sub_expertise",
            nodesID: state?.nodes?.map((node) => node?.nodeData?._id),
            memberID: currentUser?._id,
          },
        },
      });
    },
  });

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
      previusProjects: value,
    });
  };

  const handleSetNodes = (value: Maybe<Node | undefined>[]) => {
    setState({
      ...state,
      nodes: value.map((item: Maybe<Node | undefined>) => ({
        nodeData: item,
      })) as NodesType,
    });
  };

  const handleSetPreferences = () => {
    setState({
      ...state,
      preferences: preferences,
    });
  };

  useEffect(() => {
    if (currentUser?.links)
      setState({
        ...state,
        links: state?.links?.map((link) => {
          let newLink = { ...link };

          if (link?.name === "twitter")
            newLink = {
              ...newLink,
              url: link?.url?.replace("https://twitter.com/", ""),
            };
          if (link?.name === "github")
            newLink = {
              ...newLink,
              url: link?.url?.replace("https://github.com/", ""),
            };
          if (link?.name === "lens")
            newLink = {
              ...newLink,
              url: link?.url?.replace("https://www.lensfrens.xyz/", ""),
            };
          if (link?.name === "telegram")
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
      previusProjects: state?.previusProjects?.map((item: any) => ({
        description: item.description,
        endDate: item.endDate,
        startDate: item.startDate,
        title: item.title,
      })),
      onbording: {
        signup: true,
        percentage: percentage,
      },
      // nodes: state?.nodes?.map((node) => node?.nodeData?._id),
    };

    updateMember({
      variables: {
        fields: fields,
      },
      context: { serviceName: "soilservice" },
    });
  };

  const handleSubmitPreferences = () => {
    const fields = {
      memberID: currentUser?._id,
      preferences: Object.keys(preferences).map((key) => ({
        preference: key,
        interestedMatch: (
          preferences[key as keyof PreferencesType] as PreferencesTypeFind
        )?.interestedMatch,
      })),
    };

    addPreferences({
      variables: {
        fields: fields,
      },
      context: { serviceName: "soilservice" },
    });
  };

  const [preferences, setPreferences] = useState<PreferencesType>({
    findCoFounder: {
      interestedMatch:
        currentUser?.preferences?.findCoFounder?.interestedMatch || null,
    } as PreferencesTypeFind,
    findMentee: {
      interestedMatch:
        currentUser?.preferences?.findMentee?.interestedMatch || null,
    } as PreferencesTypeFind,
    findMentor: {
      interestedMatch:
        currentUser?.preferences?.findMentor?.interestedMatch || null,
    } as PreferencesTypeFind,
    findProject: {
      interestedMatch:
        currentUser?.preferences?.findProject?.interestedMatch || null,
    } as PreferencesTypeFind,
    findUser: {
      interestedMatch:
        currentUser?.preferences?.findUser?.interestedMatch || null,
    } as PreferencesTypeFind,
  });

  useEffect(() => {
    handleSetPreferences();
  }, [preferences]);

  return (
    <Card className="bg-white p-4">
      <div className="scrollbar-hide h-8/10 overflow-scroll">
        <section className="mb-4 grid grid-cols-4 gap-2">
          <div className="col-span-3">
            <h2 className="mb-2 text-lg font-medium">
              {`Hello & Welcome! Let’s complete your profile step by step 🚀`}
            </h2>
            <p>
              {`Your profile is at ${percentage}% right now. In order to be visible to
                other members your profile should be at least 50% complete.`}
            </p>
          </div>
          <div className="col-span-1">
            <BatteryStepper showPercentage batteryPercentage={percentage} />
          </div>
        </section>
        {!currentUser && (
          <div className="h-80">
            <Loading title="Loading your profile..." />
          </div>
        )}
        {submitting && (
          <div className="h-80">
            <Loading title="Submitting..." />
          </div>
        )}
        {currentUser && !submitting && (
          <section className="mb-4">
            {step === STEPS.ROLE && (
              <>
                <p className="mb-4">{`Let's start with your role:`}</p>
                <RoleSelector
                  value={state?.memberRole?.title || ""}
                  roles={
                    dataRoles?.findRoleTemplates as Maybe<
                      Array<Maybe<RoleTemplate>>
                    >
                  }
                  onSelect={(val) => {
                    handleSetRole(val as RoleTemplate);
                  }}
                />

                <p className="mb-4 mt-6">{`Choose what you use Eden Network for:`}</p>
                {/* {JSON.stringify(Preferences)} */}
                {/* {JSON.stringify(state?.preferences)} */}
                <div className="flex w-full flex-wrap">
                  {Object.keys(preferences).map((key: string, index) => (
                    <div key={index} className="relative mr-4 mb-4">
                      <input
                        type="checkbox"
                        checked={
                          (
                            preferences[
                              key as keyof PreferencesType
                            ] as PreferencesTypeFind
                          )?.interestedMatch || false
                        }
                        id={key}
                        className="peer hidden"
                        onChange={(e) => {
                          console.log(e.target.checked);

                          setPreferences({
                            ...preferences,
                            [key]: {
                              interestedMatch: e.target.checked || null,
                            },
                          });
                        }}
                      />
                      <label
                        htmlFor={key}
                        className="peer-checked:text-accentColor peer-checked:border-accentColor border-soilGray block select-none rounded-full border px-4 py-2 peer-checked:border-2 peer-checked:pr-10 peer-checked:font-bold"
                      >
                        {PREFERENCES_TITLE[key as keyof IPREFERENCES_TITLE]}
                      </label>
                      <label
                        htmlFor={key}
                        className="absolute top-2 right-2 hidden peer-checked:block"
                      >
                        <CheckIcon className="text-accentColor" width={30} />
                      </label>
                    </div>
                  ))}
                </div>
              </>
            )}
            {step === STEPS.BIO && (
              <>
                <p>{`Add your expertise:`}</p>
                {/* {JSON.stringify(state?.nodes)} */}
                {/* {JSON.stringify(currentUser.nodes)} */}
                <SelectNodes
                  nodeType={"expertise"}
                  selectedNodes={state?.nodes}
                  onChangeNodes={(val) => {
                    // console.log("on change", val);
                    handleSetNodes(val);
                  }}
                />
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
                        state?.links?.find((link) => link?.name === item)
                          ?.url || ""
                      }
                      onChange={(e) => {
                        let newLinks = state?.links ? [...state.links] : [];
                        const hasLink = state?.links?.some(
                          (link) => link?.name === item
                        );

                        if (hasLink) {
                          newLinks = newLinks.map((link) => {
                            let newUrl = e.target.value;

                            if (link?.name === "twitter")
                              newUrl = "https://twitter.com/" + e.target.value;
                            if (link?.name === "github")
                              newUrl = "https://github.com/" + e.target.value;
                            if (link?.name === "lens")
                              newUrl =
                                "https://www.lensfrens.xyz/" + e.target.value;
                            if (link?.name === "telegram")
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
              <UserExperienceCard
                background={state?.previusProjects}
                handleChange={(val) => handleSetBackground(val)}
                handleChangeOpenExperience={(val) => {
                  if (setExperienceOpen) setExperienceOpen(val);
                }}
              />
            )}
          </section>
        )}
        {currentUser && !submitting && (
          <section className="relative flex pb-4">
            {step === STEPS.EXP &&
              percentage < 50 &&
              !state?.previusProjects?.some((bg: any) => !!bg.title) && (
                <section className="absolute right-0 -top-6">
                  <span className="text-red-400">{`fill minimum 50% and 1 background`}</span>
                </section>
              )}
            {step !== STEPS.ROLE && (
              <Button
                onClick={() => {
                  if (step === STEPS.BIO && setStep) setStep(STEPS.ROLE);
                  if (step === STEPS.SOCIALS && setStep) setStep(STEPS.BIO);
                  if (step === STEPS.EXP && setStep) setStep(STEPS.SOCIALS);
                }}
              >
                Prev
              </Button>
            )}
            {step !== STEPS.EXP && (
              <Button
                className="ml-auto"
                onClick={() => {
                  if (step === STEPS.ROLE && setStep) {
                    const hasPreferences = state?.preferences
                      ? (
                          Object.keys(state?.preferences) as [
                            keyof IPREFERENCES_TITLE
                          ]
                        ).filter(
                          (key) =>
                            state.preferences![key]?.interestedMatch &&
                            key.includes("find")
                        ).length > 0
                      : false;

                    if (!state?.memberRole?._id) {
                      toast.error("Please Choose Role");
                      return;
                    }
                    if (!hasPreferences) {
                      toast.error("Please Choose Preferences");
                      return;
                    }
                    setStep(STEPS.BIO);
                    handleSubmitForm();
                    handleSubmitPreferences();
                  }
                  if (step === STEPS.BIO && setStep) {
                    if (!state?.bio || state?.bio?.length < 50) {
                      toast.error("Bio should be at least 50 characters");
                      return;
                    }
                    if (state?.nodes?.length === 0) {
                      toast.error("Please Choose Your Expertise");
                      return;
                    }
                    setStep(STEPS.SOCIALS);
                    handleSubmitForm();
                  }
                  if (step === STEPS.SOCIALS && setStep) {
                    setStep(STEPS.EXP);
                    handleSubmitForm();
                  }
                }}
              >
                Next
              </Button>
            )}
            {step === STEPS.EXP && (
              <Button
                variant="primary"
                className={`ml-auto disabled:border-slate-300 disabled:bg-slate-300 disabled:text-slate-200`}
                disabled={
                  percentage < 50 &&
                  !state?.previusProjects?.some((bg: any) => !!bg.title)
                }
                onClick={() => {
                  handleSubmitForm();
                  setStep(STEPS.ROLE);
                  setView && setView("grants");
                }}
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
