import {
  LaunchProjectContext,
  LaunchProjectModal,
  LaunchProjectProvider,
  ProjectActionKind,
} from "@eden/package-context";
import {
  AppUserLayout,
  Button,
  CandidateProfileCard,
  GridItemNine,
  GridItemSix,
  GridItemThree,
  GridLayout,
  ShortlistContainer,
  ShortlistMemberContainer,
  ShortlistModalContainer,
  ShortlistSideContainer,
  TextHeading3,
  TextLabel,
} from "ui";

import type { NextPageWithLayout } from "../../_app";

const LaunchPage: NextPageWithLayout = () => {
  const {
    project,
    dispatchProject,
    selectedRole,
    selectedMemberId,
    setOpenModal,
    matchMembersPage,
  } = useContext(LaunchProjectContext);

  const { data: matchingMembers } = useQuery(MATCH_MEMBERS_TO_SKILLS, {
    variables: {
      fields: {
        skillsID: selectedRole?.skills?.flatMap(
          (skill) => skill?.skillData?._id
        ),
        page: matchMembersPage,
        limit: 9,
      },
    },
    skip: !selectedRole,
    context: { serviceName: "soilservice" },
  });

  const filteredMembers: Members[] =
    matchingMembers?.matchSkillsToMembers?.filter(
      (member: any) =>
        !project?.team?.some((teamMember) => {
          return teamMember?.memberInfo?._id === member?.member?._id;
        })
    ) || [];

  function handleRemoveShortlistMember(member: Maybe<TeamType>) {
    dispatchProject!({
      payload: {
        member: member,
        roleId: selectedRole?._id,
      },
      type: ProjectActionKind.REMOVE_SHORTLIST_MEMBER,
    });
  }

  useEffect(() => {
    if (!project?.role?.length) {
      setOpenModal(LaunchProjectModal.ROLE);
    }
  }, []);

  return (
    <>
      <GridLayout>
        <GridItemThree className="h-8/10 scrollbar-hide overflow-scroll">
          {project && (
            <ShortlistSideContainer matchingMembers={filteredMembers} />
          )}
        </GridItemThree>

        {!selectedMemberId ? (
          <GridItemNine className="scrollbar-hide h-8/10 overflow-scroll">
            <ShortlistContainer matchingMembers={filteredMembers} />
          </GridItemNine>
        ) : (
          <>
            <GridItemSix className="h-8/10 overflow-scroll">
              <ShortlistMemberContainer matchingMembers={filteredMembers} />
            </GridItemSix>
            <GridItemThree className="scrollbar-hide h-8/10 overflow-scroll">
              <div className="mb-3 text-center">
                <TextLabel>Shortlisted for:</TextLabel>
                <TextHeading3>{selectedRole?.title}</TextHeading3>
              </div>
              {project?.team
                ?.filter((member) => member?.phase === null)
                ?.filter((member) => member?.roleID === selectedRole?._id)
                .map((member: Maybe<TeamType>, index) => (
                  <div key={index} className="mb-2">
                    <CandidateProfileCard
                      member={member?.memberInfo}
                      percentage={undefined}
                      closeButton
                      handleDelete={() => handleRemoveShortlistMember(member)}
                    />
                  </div>
                ))}
              <Button
                className="mx-auto"
                variant="primary"
                onClick={() => setOpenModal(LaunchProjectModal.PROJECT_INFO)}
              >
                Invite to apply
              </Button>
            </GridItemThree>
          </>
        )}
      </GridLayout>
      <ShortlistModalContainer />
    </>
  );
};

LaunchPage.getLayout = (page) => (
  <AppUserLayout>
    <LaunchProjectProvider>{page}</LaunchProjectProvider>
  </AppUserLayout>
);

export default LaunchPage;

import { useQuery } from "@apollo/client";
import { MATCH_MEMBERS_TO_SKILLS } from "@eden/package-graphql";
import { Maybe, Members, TeamType } from "@eden/package-graphql/generated";
import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "next-auth/react";
import { useContext, useEffect } from "react";

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
