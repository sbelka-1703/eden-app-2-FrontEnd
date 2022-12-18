import { useQuery } from "@apollo/client";
import {
  GrantsContext,
  GrantsModal,
  GrantsProvider,
  UserContext,
} from "@eden/package-context";
import { MATCH_NODES_TO_PROJECT_ROLES } from "@eden/package-graphql";
import { MatchSkillsToProjectsOutput } from "@eden/package-graphql/generated";
import {
  AppUserSubmenuLayout,
  Card,
  CardGrid,
  FillUserProfileContainer,
  GrantsModalContainer,
  GridItemNine,
  GridItemSix,
  GridItemThree,
  GridLayout,
  ProjectNodeMatchCard,
  SEO,
  UserProfileCard,
  ViewUserProfileContainer,
  WarningCard,
} from "@eden/package-ui";
import { STEPS } from "@eden/package-ui/utils";
import { getFillProfilePercentage } from "@eden/package-ui/utils/fill-profile-percentage";
import { useContext, useEffect, useState } from "react";

import welcome from "../../public/welcome.png";
import type { NextPageWithLayout } from "../_app";

const INITIAL_EXP = {
  title: "",
  skills: [],
  startDate: "",
  endDate: "",
  bio: "",
};

const ProjectsPage: NextPageWithLayout = () => {
  const { setOpenModal } = useContext(GrantsContext);
  const { currentUser, selectedServer } = useContext(UserContext);
  const [nodesID, setNodesID] = useState<string[] | null>(null);
  const [view, setView] = useState<"grants" | "profile">("grants");

  const { data: dataProjects } = useQuery(MATCH_NODES_TO_PROJECT_ROLES, {
    variables: {
      fields: {
        nodesID: nodesID,
        serverID: selectedServer?._id,
      },
    },
    skip: !nodesID || !selectedServer?._id,
    context: { serviceName: "soilservice" },
  });

  // if (dataProjects) console.log("dataProjects", dataProjects);

  useEffect(() => {
    if (currentUser && !currentUser?.nodes?.length) {
      setOpenModal(GrantsModal.START_INFO);
    }

    if (currentUser) {
      const nodes: string[] = [];

      currentUser?.nodes?.find((item) => {
        // if (item?.nodeData?.node == "sub_typeProject") {
        nodes.push(item?.nodeData?._id as string);
        // }
      });
      setNodesID(nodes);
    }
  }, [currentUser]);

  // ------- PROFILE VIEW -------
  const [step, setStep] = useState(STEPS.ROLE);

  const [state, setState] = useState({
    match: 100,
    background: !!currentUser?.previusProjects?.length
      ? currentUser?.previusProjects
      : ([{ ...INITIAL_EXP }, { ...INITIAL_EXP }, { ...INITIAL_EXP }] as
          | any[]
          | undefined),
  });

  useEffect(() => {
    console.log("state", state);
  }, [state]);

  useEffect(() => {
    if (currentUser) {
      setState({
        ...state,
        ...currentUser,
        background: !!currentUser?.previusProjects?.length
          ? currentUser?.previusProjects
          : ([{ ...INITIAL_EXP }, { ...INITIAL_EXP }, { ...INITIAL_EXP }] as
              | any[]
              | undefined),
      });
    }
  }, [currentUser]);

  // const [state, setState] = useState({
  //   discordName: currentUser?.discordName,
  //   discordAvatar: currentUser?.discordAvatar,
  //   discriminator: currentUser?.discriminator,
  //   memberRole: currentUser?.memberRole,
  //   bio: currentUser?.bio as string,
  //   match: 100,
  //   hoursPerWeek: currentUser?.hoursPerWeek,
  //   // expectedSalary: 0,
  //   links: currentUser?.links,
  //   background: !!currentUser?.previusProjects?.length
  //     ? currentUser?.previusProjects
  //     : ([{ ...INITIAL_EXP }, { ...INITIAL_EXP }, { ...INITIAL_EXP }] as
  //         | any[]
  //         | undefined),
  // });
  const [experienceOpen, setExperienceOpen] = useState<number | null>(null);

  // useEffect(() => {
  //   setState({
  //     ...state,
  //     discordName: currentUser?.discordName,
  //     discordAvatar: currentUser?.discordAvatar,
  //     discriminator: currentUser?.discriminator,
  //     memberRole: currentUser?.memberRole,
  //     bio: currentUser?.bio as string,
  //     match: 100,
  //     hoursPerWeek: currentUser?.hoursPerWeek,
  //     //   expectedSalary: 0,
  //     links: currentUser?.links,
  //     background:
  //       currentUser?.previusProjects?.length &&
  //       currentUser?.previusProjects?.length > 0
  //         ? currentUser?.previusProjects?.map((proj) => ({
  //             title: proj?.title,
  //             bio: proj?.description,
  //             startDate: proj?.startDate,
  //             endDate: proj?.endDate,
  //           }))
  //         : state.background,
  //   });
  // }, [currentUser]);

  const handleAddNodes = (val: string[]) => {
    if (!currentUser || !val) return;
    // addNodes({
    //   variables: {
    //     fields: {
    //       memberID: currentUser?._id,
    //       nodesID: val,
    //     },
    //   },
    //   context: { serviceName: "soilservice" },
    // });
  };

  if (!currentUser) return null;

  return (
    <>
      <SEO />
      <GridLayout>
        {view === "grants" && (
          <>
            <GridItemThree>
              <Card className={`lg:h-85 flex flex-col gap-2`}>
                <UserProfileCard />
                {/* {currentUser &&
                  getFillProfilePercentage({
                    ...state,
                    nodes:
                      currentUser &&
                      currentUser.nodes &&
                      currentUser.nodes?.length > (nodesID || []).length
                        ? currentUser.nodes
                        : nodesID,
                  }) < 50 &&
                  !state.background?.some((bg: any) => !!bg.title) && ( */}
                <WarningCard
                  profilePercentage={getFillProfilePercentage(currentUser)}
                  // profilePercentage={getFillProfilePercentage({
                  //   ...state,
                  //   nodes:
                  //     currentUser &&
                  //     currentUser.nodes &&
                  //     currentUser.nodes?.length > (nodesID || []).length
                  //       ? currentUser.nodes
                  //       : nodesID,
                  // })}
                  onClickCompleteProfile={() => setView("profile")}
                />
                {/* )} */}
              </Card>
            </GridItemThree>
            <GridItemNine>
              <Card
                shadow
                className="scrollbar-hide h-85 overflow-scroll bg-white p-4"
              >
                <CardGrid>
                  {dataProjects?.matchNodesToProjectRoles?.map(
                    (project: MatchSkillsToProjectsOutput, index: number) => (
                      <ProjectNodeMatchCard
                        key={index}
                        matchedProject={project}
                      />
                      // <GrantsCard key={index} grant={grant} />
                    )
                  )}
                </CardGrid>
              </Card>
            </GridItemNine>
          </>
        )}
        {view === "profile" && (
          <>
            <GridItemSix>
              <Card shadow className={"h-85 bg-white"}>
                <FillUserProfileContainer
                  step={step}
                  state={state}
                  setState={setState}
                  setStep={setStep}
                  setExperienceOpen={setExperienceOpen}
                  setView={setView}
                  percentage={getFillProfilePercentage(currentUser)}
                  // percentage={getFillProfilePercentage({
                  //   ...state,
                  //   nodes:
                  //     currentUser &&
                  //     currentUser.nodes &&
                  //     currentUser.nodes?.length > (nodesID || []).length
                  //       ? currentUser.nodes
                  //       : nodesID,
                  // })}
                />
              </Card>
            </GridItemSix>
            <GridItemSix>
              <Card shadow className={"h-85 bg-white"}>
                <ViewUserProfileContainer
                  step={step}
                  user={state}
                  experienceOpen={experienceOpen}
                  setExperienceOpen={setExperienceOpen}
                />
              </Card>
            </GridItemSix>
          </>
        )}
      </GridLayout>
      <GrantsModalContainer
        image={welcome.src}
        setArrayOfNodes={(val) => {
          // console.log("array of nodes val", val);
          // setNodesID(val);
          handleAddNodes(val);
        }}
        percentage={getFillProfilePercentage(currentUser)}
        // percentage={getFillProfilePercentage({
        //   ...state,
        //   nodes:
        //     currentUser &&
        //     currentUser.nodes &&
        //     currentUser.nodes?.length > (nodesID || []).length
        //       ? currentUser.nodes
        //       : nodesID,
        // })}
      />
    </>
  );
};

ProjectsPage.getLayout = (page) => (
  <GrantsProvider>
    <AppUserSubmenuLayout showSubmenu={false}>{page}</AppUserSubmenuLayout>
  </GrantsProvider>
);

export default ProjectsPage;

import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "next-auth/react";

export async function getServerSideProps(ctx: {
  req: IncomingMessage;
  res: ServerResponse;
}) {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
