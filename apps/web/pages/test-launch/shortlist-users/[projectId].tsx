import { LaunchProvider } from "@context/eden";
import {
  AppUserLayout,
  Button,
  Card,
  GridItemNine,
  GridItemSix,
  GridItemThree,
  GridLayout,
  Loading,
  ProjectLayoutCard,
  TextHeading3,
} from "ui";

import type { NextPageWithLayout } from "../../_app";

const LaunchPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { projectId, roleId, memberId } = router.query;
  const [members, setMembers] = useState<Members[]>([]);
  const [member, setMember] = useState<Members | null>(null);
  const [project, setProject] = useState<Project | null>(null);

  const { data: roleData } = useQuery(FIND_ROLE_TEMPLATE, {
    variables: {
      fields: {
        _id: roleId,
      },
    },
    // skip: !_id,
    context: { serviceName: "soilservice" },
  });

  useQuery(FIND_MEMBERS, {
    variables: {
      fields: {},
    },
    // skip: !_id,
    context: { serviceName: "soilservice" },
    onCompleted(data) {
      // @TODO missing the role filter, it should come from the backend
      setMembers(data.findMembers);
    },
  });

  useQuery(FIND_MEMBER, {
    variables: {
      fields: {
        _id: memberId,
      },
    },
    skip: !memberId,
    context: { serviceName: "soilservice" },
    onCompleted(data) {
      if (!data.findMember) return;

      setMember(data.findMember);
    },
  });

  useQuery(FIND_PROJECT, {
    variables: {
      fields: {
        _id: projectId,
      },
    },
    skip: !projectId,
    context: { serviceName: "soilservice" },
    onCompleted(data) {
      if (!data.findProject) return;
      setProject(data.findProject);
    },
  });

  const [updateProject, {}] = useMutation(UPDATE_PROJECT, {
    onCompleted({ updateProject }: Mutation) {
      if (!updateProject) console.log("updateProject is null");
      console.log(updateProject);
    },
  });

  const handleShortlistMember = () => {
    if (project?.team) {
      const mappedProject: TeamType[] = project.team.map(
        (member: Maybe<TeamType>) => {
          return {
            memberID: member?.memberInfo?._id,
            roleId: member?.roleID,
            phase: member?.phase,
          };
        }
      );

      updateProject({
        variables: {
          fields: {
            _id: projectId,
            team: [
              ...mappedProject,
              { memberID: memberId, roleID: roleId, phase: "shortlisted" },
            ],
          },
        },
        context: { serviceName: "soilservice" },
        onCompleted: () => {
          setMember(null);
          router.push(
            `/test-launch/shortlist-users/${projectId}?roleId=${roleId}`
          );
        },
      });
    }
  };

  const shortlistedMembers = project?.team?.filter(
    (member) => member?.phase === "shortlisted"
  );

  const filteredMembers = members?.filter((member: Members) => {
    debugger;
    return !project?.team?.some(
      (teamMember) => teamMember?.memberInfo?._id === member?._id
    );
  });

  return (
    <LaunchProvider>
      <GridLayout>
        <GridItemThree>
          {project && <ProjectLayoutCard project={project} />}

          {/* ----- to be removed ----- */}
          <button
            className="bg-red-500"
            onClick={() => {
              router.push(
                `/test-launch/shortlist-users/${projectId}?roleId=63071da6d24f80a5f3173a55`
              );
            }}
          >
            Add role
          </button>
          {/* ------------------------- */}
          {member &&
            filteredMembers.map((_member: Members, index) => (
              <p
                key={index}
                onClick={() =>
                  router.push(
                    `/test-launch/shortlist-users/${projectId}?roleId=${roleId}&memberId=${_member._id}`
                  )
                }
                className="cursor-pointer"
              >
                {_member.discordName}
              </p>
            ))}
        </GridItemThree>
        {!member && (
          <GridItemNine className="hide-scrollbar h-8/10 overflow-scroll">
            {roleId && (
              <>
                <Card className="mb-8 flex items-center bg-white p-6">
                  {!!filteredMembers.length && roleData ? (
                    <>
                      <div className="w-3/4">
                        <TextHeading3>
                          {`You’re looking at all ${filteredMembers.length} ${
                            roleData.findRole
                              ? roleData.findRole + "s"
                              : "members"
                          } in
                    Developer DAO. Please add desired skills to get the best
                    results.`}
                        </TextHeading3>
                        <p className="text-soilGray text-sm">
                          Choose just one role for now, you’ll be able to add
                          more later.
                        </p>
                      </div>
                      <Button className="ml-auto" variant="primary">
                        Add skills
                      </Button>
                    </>
                  ) : (
                    <Loading />
                  )}
                </Card>

                {filteredMembers?.map((_member: Members, index) => (
                  <p
                    key={index}
                    onClick={() =>
                      router.push(
                        `/test-launch/shortlist-users/${projectId}?roleId=${roleId}&memberId=${_member._id}`
                      )
                    }
                    className="cursor-pointer"
                  >
                    {_member.discordName}
                  </p>
                ))}
              </>
            )}
          </GridItemNine>
        )}
        {!!member && (
          <GridItemSix>
            <p>{member.discordName}</p>
            <button
              className="bg-soilGreen-500"
              onClick={() => {
                handleShortlistMember();
              }}
            >
              Shortlist
            </button>
            <button
              className="bg-red-500"
              onClick={() => {
                setMember(null);
                router.push(
                  `/test-launch/shortlist-users/${projectId}?roleId=${roleId}`
                );
              }}
            >
              Back
            </button>
          </GridItemSix>
        )}
        <GridItemThree>
          {shortlistedMembers?.map((member: any, index) => (
            <p key={index}>{member.memberInfo.discordName}</p>
          ))}
        </GridItemThree>
      </GridLayout>
    </LaunchProvider>
  );
};

LaunchPage.getLayout = (page) => <AppUserLayout>{page}</AppUserLayout>;

export default LaunchPage;

import { useMutation, useQuery } from "@apollo/client";
import {
  FIND_MEMBER,
  FIND_MEMBERS,
  FIND_PROJECT,
  FIND_ROLE_TEMPLATE,
  UPDATE_PROJECT,
} from "@graphql/eden";
import {
  Maybe,
  Members,
  Mutation,
  Project,
  TeamType,
} from "@graphql/eden/generated";
import { IncomingMessage, ServerResponse } from "http";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useState } from "react";

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
