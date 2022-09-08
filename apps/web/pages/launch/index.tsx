import { gql, useQuery } from "@apollo/client";
import { LaunchProvider } from "@context/eden";
import {
  AppUserLayout,
  GridItemSix,
  GridItemThree,
  GridLayout,
  LaunchContainer,
} from "ui";

import type { NextPageWithLayout } from "../_app";

export const FIND_SERVERS = gql`
  query ($fields: findServersInput) {
    findServers(fields: $fields) {
      _id
      name
    }
  }
`;

// export const FIND_ROLES = gql`
//   query ($fields: findRoleTemplatesInput) {
//     findRoleTemplates(fields: $fields) {
//       _id
//       title
//     }
//   }
// `;

export const FIND_ROLES = gql`
  query ($fields: findRolesInput) {
    findRoles(fields: $fields) {
      _id
      description
      name
    }
  }
`;

const LaunchPage: NextPageWithLayout = () => {
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
            roles={dataRoles?.findRoles}
          />
        </GridItemSix>
        <GridItemThree> </GridItemThree>
      </GridLayout>
    </LaunchProvider>
  );
};

LaunchPage.getLayout = (page) => <AppUserLayout>{page}</AppUserLayout>;

export default LaunchPage;

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
