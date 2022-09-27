/* eslint-disable camelcase */
import { gql, useQuery } from "@apollo/client";
import { UserContext } from "@context/eden";
import { FIND_PROJECT } from "@graphql/eden";
import Head from "next/head";
import { useContext, useState } from "react";
import {
  AppUserLayout,
  GridItemNine,
  GridItemThree,
  GridLayout,
  SignUpContainerMain,
  SignUpContainerSide,
} from "ui";

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
          description
          title
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

  const { data: dataRoles } = useQuery(FIND_ROLES, {
    variables: {
      fields: {},
    },
    context: { serviceName: "soilservice" },
  });

  const filterskillsfromcurrentuser = currentUser?.skills?.map(
    (skill) => skill?.skillInfo?._id
  );

  const { data: dataMatchedProjects, refetch: refetchMatch } = useQuery(
    MATCH_SKILLS_TO_PROJECTS,
    {
      variables: {
        fields: {
          skillsID: filterskillsfromcurrentuser,
          limit: 20,
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

  const { data: dataProject, refetch: refetchProject } = useQuery(
    FIND_PROJECT,
    {
      variables: {
        fields: {
          _id: selectProject,
        },
      },
      skip: !selectProject,
      context: { serviceName: "soilservice" },
    }
  );

  // if (dataProject) console.log("dataProject", dataProject);

  return (
    <div className={`bg-background`}>
      <Head>
        <title>Eden protocol</title>
      </Head>

      <GridLayout>
        <GridItemThree>
          <SignUpContainerSide
            matchedProjects={dataMatchedProjects?.matchSkillsToProjects}
            project={dataProject?.findProject}
            onSelectedProject={(val) => setSelectProject(val)}
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
          />
        </GridItemNine>
      </GridLayout>
    </div>
  );
};

SignUpTestPage.getLayout = (page) => <AppUserLayout>{page}</AppUserLayout>;

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
