import { gql, useQuery } from "@apollo/client";
import { Maybe, RoleTemplate } from "@graphql/eden/generated";
// import type { NextPage } from "next";
import Head from "next/head";
import {
  AppUserLayout,
  GridItemNine,
  GridItemThree,
  GridLayout,
  SignUpCard,
  UserProfileCard,
} from "ui";

import type { NextPageWithLayout } from "../_app";

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

const SignUpTestPage: NextPageWithLayout = () => {
  const [roleSelected, setRoleSelected] = useState<Maybe<RoleTemplate>>();
  const { data: dataRoles } = useQuery(FIND_ROLES, {
    variables: {
      fields: {},
    },
    context: { serviceName: "soilservice" },
  });

  //   if (dataRoles) console.log("dataRoles", dataRoles);

  return (
    <div className={`bg-background`}>
      <Head>
        <title>Eden protocol</title>
      </Head>

      <GridLayout>
        <GridItemThree>
          <UserProfileCard role={roleSelected?.title} />
        </GridItemThree>
        <GridItemNine>
          <SignUpCard
            roles={dataRoles?.findRoleTemplates}
            onSelectedRole={(val) => setRoleSelected(val)}
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
