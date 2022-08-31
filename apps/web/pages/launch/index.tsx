import { gql, useQuery } from "@apollo/client";
import { LaunchProvider } from "@context/eden";
import type { NextPage } from "next";
import { GridItemSix, GridItemThree, GridLayout, LaunchContainer } from "ui";

export const FIND_SERVERS = gql`
  query ($fields: findServersInput) {
    findServers(fields: $fields) {
      _id
      name
    }
  }
`;

export const FIND_ROLES = gql`
  query ($fields: findRoleTemplatesInput) {
    findRoleTemplates(fields: $fields) {
      _id
      title
    }
  }
`;

const LaunchPage: NextPage = () => {
  const { data: dataServers } = useQuery(FIND_SERVERS, {
    variables: {
      fields: {},
    },
    context: { serviceName: "soilservice" },
  });

  // if (dataServers) console.log("dataServers", dataServers);

  const { data: dataRoles } = useQuery(FIND_ROLES, {
    variables: {
      fields: {},
    },
    context: { serviceName: "soilservice" },
  });

  // if (dataRoles) console.log("dataRoles", dataRoles);

  return (
    <LaunchProvider>
      <GridLayout>
        <GridItemThree> </GridItemThree>
        <GridItemSix>
          <LaunchContainer
            servers={dataServers?.findServers}
            roles={dataRoles?.findRoleTemplates}
          />
        </GridItemSix>
        <GridItemThree> </GridItemThree>
      </GridLayout>
    </LaunchProvider>
  );
};

export default LaunchPage;
