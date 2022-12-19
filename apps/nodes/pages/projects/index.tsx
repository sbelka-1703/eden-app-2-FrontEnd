import { gql, useMutation, useQuery } from "@apollo/client";
import {
  ProjectsContext,
  ProjectsModal,
  ProjectsProvider,
  UserContext,
} from "@eden/package-context";
import { MATCH_NODES_TO_PROJECT_ROLES } from "@eden/package-graphql";
import {
  MatchSkillsToProjectsOutput,
  Mutation,
} from "@eden/package-graphql/generated";
import {
  AppUserSubmenuLayout,
  Card,
  CardGrid,
  FillUserProfileContainer,
  GridItemNine,
  GridItemSix,
  GridItemThree,
  GridLayout,
  ProjectNodeMatchCard,
  ProjectsModalContainer,
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

const ADD_NODES = gql`
  mutation ($fields: addNodesToMemberInput!) {
    addNodesToMember(fields: $fields) {
      _id
    }
  }
`;

const INITIAL_EXP = {
  title: "",
  skills: [],
  startDate: "",
  endDate: "",
  description: "",
};

const ProjectsPage: NextPageWithLayout = () => {
  const { setOpenModal } = useContext(ProjectsContext);
  const { currentUser, selectedServer } = useContext(UserContext);
  const [nodesID, setNodesID] = useState<string[] | null>(null);
  const [view, setView] = useState<"grants" | "profile">("grants");
  const [startWelcome, setStartWelcome] = useState(false);

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

  const [addNodes] = useMutation(ADD_NODES, {
    onCompleted({ addNodesToMember }: Mutation) {
      if (!addNodesToMember) console.log("addNodesToMember is null");
      // console.log("updateMember", addNodesToMember);
      // setSubmitting(false);
    },
    onError(error) {
      console.log("error", error);
    },
  });

  useEffect(() => {
    if (
      currentUser &&
      getFillProfilePercentage(currentUser) < 50 &&
      !startWelcome
    ) {
      setOpenModal(ProjectsModal.START_WELCOME);
      setStartWelcome(true);
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
    discordName: currentUser?.discordName,
    discordAvatar: currentUser?.discordAvatar,
    discriminator: currentUser?.discriminator,
    memberRole: currentUser?.memberRole,
    bio: currentUser?.bio as string,
    match: 100,
    hoursPerWeek: currentUser?.hoursPerWeek,
    // expectedSalary: 0,
    links: currentUser?.links,
    background: !!currentUser?.previusProjects?.length
      ? currentUser?.previusProjects
      : ([{ ...INITIAL_EXP }, { ...INITIAL_EXP }, { ...INITIAL_EXP }] as
          | any[]
          | undefined),
  });
  const [experienceOpen, setExperienceOpen] = useState<number | null>(null);

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
      //   expectedSalary: 0,
      links: currentUser?.links,
      background:
        currentUser?.previusProjects?.length &&
        currentUser?.previusProjects?.length > 0
          ? currentUser?.previusProjects?.map((proj) => ({
              title: proj?.title,
              description: proj?.description,
              startDate: proj?.startDate,
              endDate: proj?.endDate,
            }))
          : state.background,
    });
  }, [currentUser]);

  const handleAddNodes = (val: string[]) => {
    if (!currentUser || !val) return;
    addNodes({
      variables: {
        fields: {
          memberID: currentUser?._id,
          nodesID: val,
        },
      },
      context: { serviceName: "soilservice" },
    });
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
                {currentUser && getFillProfilePercentage(currentUser) < 50 && (
                  <WarningCard
                    profilePercentage={getFillProfilePercentage(currentUser)}
                    onClickCompleteProfile={() => setView("profile")}
                  />
                )}
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
      <ProjectsModalContainer
        image={welcome.src}
        setArrayOfNodes={(val) => {
          // console.log("array of nodes val", val);
          handleAddNodes(val);
        }}
        // percentage={0}
        percentage={getFillProfilePercentage(currentUser)}
      />
    </>
  );
};

ProjectsPage.getLayout = (page) => (
  <ProjectsProvider>
    <AppUserSubmenuLayout showSubmenu={false}>{page}</AppUserSubmenuLayout>
  </ProjectsProvider>
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
