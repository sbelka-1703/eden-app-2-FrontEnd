/* eslint-disable camelcase */
import { gql, useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { FIND_PROJECT } from "@eden/package-graphql";
import {
  AppUserSubmenuLayout,
  GridItemNine,
  GridItemThree,
  GridLayout,
  SEO,
  SignUpContainerMain,
  SignUpContainerSide,
} from "@eden/package-ui";
import { useContext, useState } from "react";

import type { NextPageWithLayout } from "../_app";

const FIND_ROLES = gql`
  query ($fields: findRoleTemplatesInput) {
    findRoleTemplates(fields: $fields) {
      _id
      description
      title
      skills {
        _id
        name
      }
    }
  }
`;

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

const SignUpTestPage: NextPageWithLayout = () => {
  const { currentUser } = useContext(UserContext);
  const [selectProject, setSelectProject] = useState("");
  const [viewProject, setViewProject] = useState(false);

  const { data: dataRoles } = useQuery(FIND_ROLES, {
    variables: {
      fields: {},
    },
    context: { serviceName: "soilservice" },
  });

  const filterskillsfromcurrentuser = currentUser?.skills?.map(
    (skill) => skill?.skillInfo?._id
  );

  // console.log("filterskillsfromcurrentuser", filterskillsfromcurrentuser);

  const { data: dataMatchedProjects, refetch: refetchMatch } = useQuery(
    MATCH_SKILLS_TO_PROJECTS,
    {
      variables: {
        fields: {
          skillsID: filterskillsfromcurrentuser,
          limit: 25,
          page: 0,
        },
      },
      skip: !currentUser,
      context: { serviceName: "soilservice" },
    }
  );

  // if (dataMatchedProjects)
  //   console.log(
  //     "dataMatchedProjects",
  //     dataMatchedProjects.matchSkillsToProjects
  //   );

  const {
    data: dataProject,
    loading: loadingProject,
    refetch: refetchProject,
  } = useQuery(FIND_PROJECT, {
    variables: {
      fields: {
        _id: selectProject,
      },
    },
    skip: !selectProject,
    context: { serviceName: "soilservice" },
  });

  // if (dataProject) console.log("dataProject", dataProject);

  return (
    <>
      <SEO />

      <GridLayout>
        <GridItemThree>
          <SignUpContainerSide
            matchedProjects={dataMatchedProjects?.matchSkillsToProjects}
            onSelectedProject={(val) => setSelectProject(val)}
            viewProject={viewProject}
          />
        </GridItemThree>
        <GridItemNine>
          <SignUpContainerMain
            roles={dataRoles?.findRoleTemplates}
            matchedProjects={dataMatchedProjects?.matchSkillsToProjects}
            project={dataProject?.findProject}
            refetchMatch={refetchMatch}
            refetchProject={refetchProject}
            onSelectedProject={(val) => setSelectProject(val)}
            loadingProject={loadingProject}
            viewProject={viewProject}
            onViewProject={(val) => setViewProject(val)}
          />
        </GridItemNine>
      </GridLayout>
    </>
  );
};

SignUpTestPage.getLayout = (page) => (
  <AppUserSubmenuLayout showSubmenu={false}>{page}</AppUserSubmenuLayout>
);

export default SignUpTestPage;

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
