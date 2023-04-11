import { gql, useMutation, useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { Members, Mutation } from "@eden/package-graphql/generated";
import {
  AI_REPLY_SERVICES,
  AppUserSubmenuLayout,
  Button,
  Card,
  EdenAiChat,
  FillSocialLinks,
  GridItemSix,
  GridLayout,
  MemberInfoWithDynamicGraph2,
  SalaryRangeChart,
  UserExperienceCard,
  Wizard,
  WizardStep,
} from "@eden/package-ui";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

const ProfilePage: NextPageWithLayout = () => {
  const { currentUser } = useContext(UserContext);
  // const [view, setView] = useState<"grants" | "profile">("grants");

  const [userState, setUserState] = useState<Members>();
  // const [experienceOpen, setExperienceOpen] = useState<number | null>(null);

  useEffect(() => {
    if (currentUser) {
      setUserState(currentUser);
    }
  }, [currentUser]);

  if (!currentUser) return null;

  return (
    <AppUserSubmenuLayout showSubmenu={false}>
      <GridLayout>
        <GridItemSix>
          <Card className={"h-85 bg-white shadow"}>
            <CreateProrfileContainer
              setUserState={setUserState}
              userState={userState}
            />
          </Card>
        </GridItemSix>
        <GridItemSix>
          <Card
            className={
              "h-85 scrollbar-hide overflow-scroll bg-white p-4 shadow"
            }
          >
            <MemberInfoWithDynamicGraph2
              // step={step}
              member={userState}
            />
          </Card>
        </GridItemSix>
      </GridLayout>
    </AppUserSubmenuLayout>
  );
};

export default ProfilePage;

import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "next-auth/react";

import { NextPageWithLayout } from "../../_app";

export async function getServerSideProps(ctx: {
  req: IncomingMessage;
  res: ServerResponse;
}) {
  const session = await getSession(ctx);

  const url = ctx.req.url?.replace("/", "");

  if (!session) {
    return {
      redirect: {
        destination: `/login?redirect=${url}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

// STUFF TO BRONG INTO ANOTHER FILE

// eslint-disable-next-line no-unused-vars
import { UPDATE_MEMBER } from "@eden/package-graphql";
import { Controller, useForm } from "react-hook-form";

import { locations } from "../../../utils/data/locations";

const rangeNumbers: number[] = [];

for (let i = 0; i < 500; i++) {
  rangeNumbers.push(Math.floor(Math.random() * 80) + 1);
}

export interface ICreateProfileContainerProps {
  setUserState: Dispatch<SetStateAction<Members | undefined>>;
  userState?: Members | undefined;
}

// const FIND_NODES = gql`
//   query ($fields: findNodesInput) {
//     findNodes(fields: $fields) {
//       _id
//       name
//       subNodes {
//         _id
//         name
//       }
//     }
//   }
// `;

export const CreateProrfileContainer = ({
  setUserState,
  userState,
}: ICreateProfileContainerProps) => {
  const { currentUser } = useContext(UserContext);
  // eslint-disable-next-line no-unused-vars
  const [submitting, setSubmitting] = useState(false);

  const { register, watch, control, setValue, getValues } = useForm<Members>({
    defaultValues: { ...currentUser },
  });

  // const [nodes, setNodes] = useState<Array<string>>([]);

  useEffect(() => {
    const subscription = watch((data) => {
      console.log("WATCH ---- data", data);
      if (data) setUserState(data as Members);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const handleSubmit = () => {
    const fields = {
      bio: userState?.bio,
      links: userState?.links?.map((item: any) => ({
        url: item?.url,
        name: item?.name,
      })),
      hoursPerWeek: Number(userState?.hoursPerWeek || 0),

      previousProjects: userState?.previousProjects?.map((item: any) => ({
        description: item.description,
        endDate: item.endDate,
        startDate: item.startDate,
        title: item.title,
      })),
    };

    // if (userState?.location) fields.location = userState?.location;

    updateMember({
      variables: {
        fields: fields,
      },
    });
  };

  // eslint-disable-next-line no-unused-vars
  const [updateMember] = useMutation(UPDATE_MEMBER, {
    onCompleted({ updateMember }: Mutation) {
      if (!updateMember) console.log("updateMember is null");
      console.log("updateMember", updateMember);
    },
    onError: () => {
      setSubmitting(false);
    },
  });

  // updateMember({
  //   variables: {
  //     fields: fields,
  //   },
  // });

  // eslint-disable-next-line no-unused-vars
  // const { data: dataNodes } = useQuery(FIND_NODES, {
  //   variables: {
  //     fields: {
  //       _id: nodes,
  //       node: "expertise",
  //     },
  //   },
  //   skip: nodes.length === 0,
  //   onCompleted: (val) => {
  //     debugger;
  //     setValue("nodes", val);
  //   },
  // });

  return (
    <div className="scrollbar-hide h-full overflow-scroll">
      <Wizard showStepsHeader>
        <WizardStep label="AI chat">
          <div className="h-full px-4">
            <EdenAiChat
              aiReplyService={AI_REPLY_SERVICES.EDEN_GPT_REPLY}
              handleChangeNodes={(_nodeObj: any) => {
                console.log("handleChangeNodes:", _nodeObj);
                // setNodes(Object.keys(_nodeObj));
              }}
              handleChangeChat={(_chat: any) => {
                console.log("handleChangeChat:", _chat);
              }}
            />
          </div>
        </WizardStep>
        <WizardStep label="step 1">
          <div className="px-4">
            <section className="mb-4">
              <p className="mb-2">Please write a short bio!</p>
              <textarea
                id="bio"
                defaultValue={currentUser?.bio || ""}
                className="font-Inter text-soilBody focus:border-accentColor focus:ring-soilGreen-500 block flex w-full resize-none rounded-md border border-zinc-400/50 py-1 py-1 px-2 px-2 text-base focus:outline-transparent focus:ring focus:ring-opacity-50"
                rows={8}
                required
                {...register("bio")}
              />
            </section>
            <section className="mb-4">
              <p className="mb-2">Edit your skills</p>
              {/* <DynamicSearchGraph
                nodesID={Object.keys(nodeObj)}
                activeNodes={Object.values(nodeObj).map(
                  (node: any) => node.active
                )}
                isNewNodes={Object.values(nodeObj).map(
                  (node: any) => node.isNew
                )}
                setActivateNodeEvent={setActivateNodeEvent}
                height={"380"}
                // graphType={"simple"}
                // graphType={"KG_AI_2"}
                graphType={"KG_AI_2_plusIndustry"}
                // zoomGraph={1.1}
                setRelatedNodePopup={handleOpenPopup}
                disableZoom={true}
              /> */}
            </section>
            <section className="mb-4">
              <p className="mb-2">Edit your relevant skills</p>
            </section>
          </div>
        </WizardStep>
        <WizardStep label="Background">
          <div className="px-4">
            <Controller
              name={"previousProjects"}
              control={control}
              render={() => (
                <UserExperienceCard
                  // background={getValues("previousProjects")}
                  handleChange={(val) => setValue("previousProjects", val)}
                  // handleChangeOpenExperience={(val) => {
                  //   // if (setExperienceOpen) setExperienceOpen(val);
                  // }}
                />
              )}
            />
          </div>
        </WizardStep>
        <WizardStep label="Details">
          <div className="h-full overflow-scroll px-4">
            <section className="mb-4">
              {/* TODO plz remove next hardcoded line after testing */}
              <p className="mb-2 bg-lime-50">
                People with your skillset typically charge $75-$95 per hour
              </p>
              <p className="mb-2">What is your desired hourly rate?</p>
              <div className="mx-auto w-2/3">
                <Controller
                  name={"budget.perHour"}
                  control={control}
                  render={() => (
                    <SalaryRangeChart
                      data={rangeNumbers}
                      onChange={(val) => {
                        setValue("budget.perHour", val.values[1]);
                      }}
                    />
                  )}
                />
              </div>
            </section>
            <section className="mb-4 inline-block w-1/2">
              {/* TODO plz remove next hardcoded line after testing */}
              <p className="mb-2">Share your availability</p>
              <div className="flex items-center">
                <input
                  type="number"
                  min={0}
                  max={40}
                  id="hoursPerWeek"
                  className="font-Inter text-soilBody focus:border-accentColor focus:ring-soilGreen-500 mr-2 block flex w-20 resize-none rounded-md border border-zinc-400/50 px-2 py-1 text-base focus:outline-transparent focus:ring focus:ring-opacity-50"
                  required
                  {...register("hoursPerWeek")}
                />
                <span>hours/week</span>
              </div>
            </section>
            <section className="mb-4 inline-block w-1/2">
              {/* TODO plz remove next hardcoded line after testing */}
              <p className="mb-2">What is your location?</p>
              <Controller
                name={"location"}
                control={control}
                render={() => (
                  <select
                    id="location"
                    className="font-Inter text-soilBody focus:border-accentColor focus:ring-soilGreen-500 block flex w-full resize-none rounded-md border border-zinc-400/50 px-2 py-1 text-base focus:outline-transparent focus:ring focus:ring-opacity-50"
                    required
                    onChange={(e) => {
                      const _gmt = e.target.value.split(" ")[0].slice(1, -1);

                      const _location = e.target.value
                        .split(" ")
                        .splice(1)
                        .join(" ");

                      setValue("timeZone", _gmt);
                      setValue("location", _location);
                    }}
                  >
                    <option selected disabled>
                      Select a location...
                    </option>
                    {locations.map((loc, index) => (
                      <option
                        value={`(${loc.gmt}) ${loc.location}`}
                        key={index}
                      >{`(${loc.gmt}) ${loc.location}`}</option>
                    ))}
                  </select>
                )}
              />
            </section>
            <section className="mb-4 inline-block w-1/2">
              {/* TODO plz remove next hardcoded line after testing */}
              <p className="mb-2">
                How many years of experience do you have in total?
              </p>
              <div className="flex items-center">
                <input
                  type="number"
                  // min={0}
                  // max={40}
                  // // id="hoursPerWeek"
                  className="font-Inter text-soilBody focus:border-accentColor focus:ring-soilGreen-500 mr-2 block flex w-20 resize-none rounded-md border border-zinc-400/50 px-2 py-1 text-base focus:outline-transparent focus:ring focus:ring-opacity-50"
                  // required
                  {...register("expirienceLevel.years")}
                />
                <span>years</span>
              </div>
            </section>
            <section className="mb-4 inline-block w-1/2">
              {/* TODO plz remove next hardcoded line after testing */}
              <p className="mb-2">What is you experience level?</p>
              <div className="flex items-center">
                <Controller
                  name={"expirienceLevel"}
                  control={control}
                  render={() => (
                    <select
                      id="expirienceLevel"
                      className="font-Inter text-soilBody focus:border-accentColor focus:ring-soilGreen-500 mr-2 block flex w-20 w-full resize-none rounded-md border border-zinc-400/50 px-2 py-1 text-base focus:outline-transparent focus:ring focus:ring-opacity-50"
                      required
                      onChange={(e) => {
                        const _val = {
                          ...getValues("expirienceLevel"),
                          total: +e.target.value,
                        };

                        setValue("expirienceLevel", _val);
                      }}
                    >
                      <option selected disabled hidden>
                        Select one...
                      </option>
                      <option value={3}>Junior</option>
                      <option value={6}>Mid-level</option>
                      <option value={9}>Senior</option>
                    </select>
                  )}
                />
              </div>
            </section>
          </div>
        </WizardStep>
        <WizardStep label="Socials">
          <section className="mb-4 p-4">
            <p className="mb-2">Socials</p>
            <div className="w-2/3">
              <Controller
                name={"links"}
                control={control}
                render={() => (
                  <FillSocialLinks
                    links={currentUser?.links || []}
                    onChange={(val: any) => {
                      if (val) {
                        setValue("links", val);
                      }
                    }}
                  />
                )}
              />
            </div>
            <Button
              variant="primary"
              className="absolute right-4 bottom-4 z-20"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </section>
        </WizardStep>
      </Wizard>
    </div>
  );
};
