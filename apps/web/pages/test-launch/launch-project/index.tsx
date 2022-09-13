import { gql, useQuery } from "@apollo/client";
import { LaunchProvider } from "@context/eden";
import {
  AppUserLayout,
  Button,
  Card,
  EmojiSelector,
  GridItemNine,
  GridItemThree,
  GridLayout,
  ProjectLayoutCard,
  TextBody,
  TextField,
  TextHeading3,
  UserProfileMenu,
} from "ui";

import type { NextPageWithLayout } from "../../_app";

export const FIND_SERVERS = gql`
  query ($fields: findServersInput) {
    findServers(fields: $fields) {
      _id
      name
    }
  }
`;

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

  if (dataServers) console.log("dataServers", dataServers);

  const { data: dataRoles } = useQuery(FIND_ROLES, {
    variables: {
      fields: {},
    },
    context: { serviceName: "soilservice" },
  });

  if (dataRoles) console.log("dataRoles", dataRoles);

  return (
    <LaunchProvider>
      <GridLayout>
        <GridItemThree>
          <Card className="bg-white p-6">
            <UserProfileMenu title={`Good Morning,`} />
          </Card>
        </GridItemThree>
        <GridItemNine>
          <Card className="mb-8 bg-white p-6">
            <section className="mb-6">
              <TextHeading3>
                Future Champion? Welcome to Eden!
                <br />
                Let&rsquo;s get started and go through launching your first
                project.
              </TextHeading3>
              <p className="text-soilGray text-sm">
                You can exit at any time, your workflow will be saved to drafts.
              </p>
            </section>
            <section className="lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="col-span-1">
                <div className="mb-3">
                  <TextBody>Name your project</TextBody>
                  <TextField
                    name="name"
                    placeholder="Start typing here"
                    onChange={() => {
                      /**/
                    }}
                  />
                </div>
                <div className="mb-3">
                  <TextBody>Choose emoji for your project</TextBody>
                </div>
                <EmojiSelector />
              </div>
              <div className="col-span-1">
                <TextBody className="mb-1">Preview</TextBody>
                <ProjectLayoutCard />
              </div>
            </section>
          </Card>
          <Button variant="primary" className="mx-auto">
            Next
          </Button>
        </GridItemNine>
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
