/* eslint-disable no-unused-vars */
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  GrantsContext,
  GrantsModal,
  GrantsProvider,
  UserContext,
} from "@eden/package-context";
import { FIND_GRANTS } from "@eden/package-graphql";
import {
  GrantTemplate,
  LinkType,
  Mutation,
} from "@eden/package-graphql/generated";
import {
  AppPublicLayout,
  AppUserSubmenuLayout,
  Card,
  CardGrid,
  FillUserProfileContainer,
  GrantsCard,
  GrantsModalContainer,
  GridItemNine,
  GridItemSix,
  GridItemThree,
  GridLayout,
  SEO,
  UserProfileCard,
  ViewUserProfileContainer,
  WarningCard,
} from "@eden/package-ui";
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
  bio: "",
};

const GrantsPage: NextPageWithLayout = () => {
  const { setOpenModal } = useContext(GrantsContext);
  const { currentUser } = useContext(UserContext);
  const { memberServers } = useContext(UserContext);
  const [nodesID, setNodesID] = useState<string[] | null>(null);
  const [serverID, setServerID] = useState<string | null>(null);
  const [view, setView] = useState<"grants" | "profile">("grants");

  const { data: dataGrants } = useQuery(FIND_GRANTS, {
    variables: {
      fields: {
        _id: null,
        // nodesID: nodesID,
        // TODO: change to selectedServer
        // serverID: serverID,
      },
    },
    // skip: !nodesID || !serverID,
    context: { serviceName: "soilservice" },
  });

  // if (dataGrants) console.log("dataGrants", dataGrants);

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
    if (currentUser && !currentUser?.nodes?.length) {
      setOpenModal(GrantsModal.START_INFO);
    }
  }, [currentUser]);

  useEffect(() => {
    if (memberServers) {
      setServerID(memberServers[1]?._id);
    }
  }, [memberServers]);

  // if (memberServers) console.log("memberServers", memberServers[1]._id);

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
              bio: proj?.description,
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

  return (
    <>
      <SEO />
      <GridLayout>
        {view === "grants" && (
          <>
            <GridItemThree>
              <Card className={`lg:h-85 flex flex-col gap-2`}>
                <UserProfileCard />
                {(currentUser &&
                  getFillProfilePercentage({
                    ...state,
                    nodes:
                      currentUser &&
                      currentUser.nodes &&
                      currentUser.nodes?.length > (nodesID || []).length
                        ? currentUser.nodes
                        : nodesID,
                  }) < 50) ||
                !state.background?.some((bg: any) => !!bg.title) ? (
                  <WarningCard
                    profilePercentage={getFillProfilePercentage({
                      ...state,
                      nodes:
                        currentUser &&
                        currentUser.nodes &&
                        currentUser.nodes?.length > (nodesID || []).length
                          ? currentUser.nodes
                          : nodesID,
                    })}
                    onClickCompleteProfile={() => setView("profile")}
                  />
                ) : null}
              </Card>
            </GridItemThree>
            <GridItemNine>
              <Card
                shadow
                className="scrollbar-hide lg:h-85 overflow-scroll bg-white p-4"
              >
                <CardGrid>
                  {dataGrants &&
                    dataGrants?.findGrants?.map(
                      (grant: GrantTemplate, index: number) => (
                        <GrantsCard key={index} grant={grant} />
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
              <Card className={"h-85 bg-white shadow"}>
                <FillUserProfileContainer
                  step={step}
                  state={state}
                  setState={setState}
                  setStep={setStep}
                  setExperienceOpen={setExperienceOpen}
                  setView={setView}
                  percentage={getFillProfilePercentage({
                    ...state,
                    nodes:
                      currentUser &&
                      currentUser.nodes &&
                      currentUser.nodes?.length > (nodesID || []).length
                        ? currentUser.nodes
                        : nodesID,
                  })}
                />
              </Card>
            </GridItemSix>
            <GridItemSix>
              <Card className={"h-85 bg-white shadow"}>
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
          setNodesID(val);
          handleAddNodes(val);
        }}
        percentage={getFillProfilePercentage({
          ...state,
          nodes:
            currentUser &&
            currentUser.nodes &&
            currentUser.nodes?.length > (nodesID || []).length
              ? currentUser.nodes
              : nodesID,
        })}
      />
    </>
  );
};

GrantsPage.getLayout = (page) => (
  <GrantsProvider>
    <AppPublicLayout>{page}</AppPublicLayout>
  </GrantsProvider>
);

export default GrantsPage;

import { STEPS } from "@eden/package-ui/utils";
import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "next-auth/react";

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
