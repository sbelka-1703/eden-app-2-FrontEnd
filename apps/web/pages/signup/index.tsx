import { useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import {
  FIND_PROJECT,
  FIND_PROJECTS_SERVER,
  FIND_ROLE_TEMPLATES,
  MATCH_SKILLS_TO_PROJECTS,
} from "@eden/package-graphql";
import { Project } from "@eden/package-graphql/generated";
import {
  AppUserSubmenuLayout,
  GridItemNine,
  GridItemThree,
  GridLayout,
  SEO,
  SignUpContainerMain,
  SignUpContainerSide,
} from "@eden/package-ui";
import { useContext, useEffect, useState } from "react";

import type { NextPageWithLayout } from "../_app";

const SignUpTestPage: NextPageWithLayout = () => {
  const { currentUser, selectedServer } = useContext(UserContext);
  const [selectProject, setSelectProject] = useState("");
  const [viewProject, setViewProject] = useState(false);

  // if (selectedServer) console.log("selectedServer", selectedServer);

  const { data: dataRoles } = useQuery(FIND_ROLE_TEMPLATES, {
    variables: {
      fields: {},
    },
    context: { serviceName: "soilservice" },
  });

  const filterskillsfromcurrentuser = currentUser?.skills?.map(
    (skill) => skill?.skillInfo?._id
  );

  // console.log("filterskillsfromcurrentuser", filterskillsfromcurrentuser);

  const {
    data: dataProjectsServer,
    // loading: loadingProjectsServer,
    refetch: refetchProjectsServer,
  } = useQuery(FIND_PROJECTS_SERVER, {
    variables: {
      fields: {
        serverID: selectedServer?._id,
      },
    },
    skip: !selectedServer?._id,
    context: { serviceName: "soilservice" },
  });

  // if (dataProjectsServer) console.log("dataProjectsServer", dataProjectsServer);
  const serverProjects = dataProjectsServer?.findProjects.map(
    (project: Project) => {
      return {
        project: project,
        matchPercentage: null,
        projectRoles:
          project?.role?.map((role) => {
            return {
              matchPercentage: null,
              commonSkills: [],
              projectRole: role,
            };
          }) || [],
      };
    }
  );

  // if (serverProjects) console.log("serverProjects", serverProjects);

  useEffect(() => {
    if (selectedServer?._id) {
      refetchProjectsServer();
      setViewProject(false);
    }
  }, [selectedServer?._id]);

  const { data: dataMatchedProjects, refetch: refetchMatch } = useQuery(
    MATCH_SKILLS_TO_PROJECTS,
    {
      variables: {
        fields: {
          skillsID: filterskillsfromcurrentuser,
          limit: 30,
          page: 0,
          serverID: [selectedServer?._id],
        },
      },
      skip: !currentUser && !selectedServer?._id,
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
            matchedProjects={
              selectedServer?._id
                ? serverProjects
                : dataMatchedProjects?.matchSkillsToProjects
            }
            onSelectedProject={(val) => setSelectProject(val)}
            viewProject={viewProject}
          />
        </GridItemThree>
        <GridItemNine>
          <SignUpContainerMain
            roles={dataRoles?.findRoleTemplates}
            matchedProjects={
              selectedServer?._id
                ? serverProjects
                : dataMatchedProjects?.matchSkillsToProjects
            }
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
