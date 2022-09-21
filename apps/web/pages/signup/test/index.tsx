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

import type { NextPageWithLayout } from "../../_app";

export const FIND_ROLES = gql`
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

export const MATCH_PROJECTS_TO_MEMBER = gql`
  query ($fields: matchProjectsToMemberInput) {
    matchProjectsToMember(fields: $fields) {
      matchPercentage
      matchProjectRoles {
        matchPercentage
        roleID
        relatedSkills {
          _id
          name
          relatedSkills {
            _id
            name
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
      relatedSkills {
        _id
        name
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

  const { data: dataMatchedProjects, refetch: refetchMatch } = useQuery(
    MATCH_PROJECTS_TO_MEMBER,
    {
      variables: {
        fields: {
          memberID: currentUser?._id,
        },
      },
      skip: !currentUser,
      context: { serviceName: "soilservice" },
    }
  );

  // if (dataMatchedProjects)
  //   console.log("dataMatchedProjects", dataMatchedProjects);

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
            matchedProjects={dataMatchedProjects?.matchProjectsToMember}
            project={dataProject?.findProject}
            onSelectedProject={(val) => setSelectProject(val)}
          />
        </GridItemThree>
        <GridItemNine>
          <SignUpContainerMain
            roles={dataRoles?.findRoleTemplates}
            matchedProjects={dataMatchedProjects?.matchProjectsToMember}
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
