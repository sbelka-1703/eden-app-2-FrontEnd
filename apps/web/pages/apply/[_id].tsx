import { gql, useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { FIND_PROJECT } from "@eden/package-graphql";
import {
  ApplyByRoleContainer,
  AppUserLayout,
  GridItemEight,
  GridItemTwo,
  GridLayout,
} from "@eden/package-ui";
import { useRouter } from "next/router";
import { useContext } from "react";

import type { NextPageWithLayout } from "../_app";

const MATCH_SKILLS_TO_PROJECTS = gql`
  query ($fields: matchSkillsToProjectsInput) {
    matchSkillsToProjects(fields: $fields) {
      matchPercentage
      projectRoles {
        matchPercentage
        commonSkills {
          _id
          name
        }
        projectRole {
          _id
          title
          description
          openPositions
          keyRosponsibilities
          hoursPerWeek
          skills {
            level
            skillData {
              _id
              name
            }
          }
        }
      }
      project {
        _id
        title
        description
        descriptionOneLine
        emoji
        backColorEmoji
        champion {
          _id
          discordName
          discordAvatar
        }
      }
    }
  }
`;

const ApplyPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { _id } = router.query;
  const { currentUser } = useContext(UserContext);

  const {
    data: dataProject,
    loading: loadingProject,
    refetch: refetchProject,
  } = useQuery(FIND_PROJECT, {
    variables: {
      fields: {
        _id,
      },
    },
    skip: !_id,
    context: { serviceName: "soilservice" },
  });

  // if (dataProject) console.log("dataProject", dataProject.findProject);

  const filterskillsfromcurrentuser = currentUser?.skills?.map(
    (skill) => skill?.skillInfo?._id
  );

  const { data: dataMatchedProjects } = useQuery(MATCH_SKILLS_TO_PROJECTS, {
    variables: {
      fields: {
        skillsID: filterskillsfromcurrentuser,
        limit: 40,
        page: 0,
      },
    },
    skip: !currentUser,
    context: { serviceName: "soilservice" },
  });

  // if (dataMatchedProjects)
  //   console.log(
  //     "dataMatchedProjects",
  //     dataMatchedProjects.matchSkillsToProjects
  //   );

  return (
    <GridLayout>
      <GridItemTwo> </GridItemTwo>
      <GridItemEight>
        <ApplyByRoleContainer
          project={dataProject?.findProject}
          matchedProjects={dataMatchedProjects?.matchSkillsToProjects}
          refetch={refetchProject}
          loadingProject={loadingProject}
          // eslint-disable-next-line no-unused-vars
          onViewProject={(val) => router.push(`/home`)}
        />
      </GridItemEight>
      <GridItemTwo> </GridItemTwo>
    </GridLayout>
  );
};

ApplyPage.getLayout = (page) => <AppUserLayout>{page}</AppUserLayout>;

export default ApplyPage;

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
