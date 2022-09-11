import { gql, useQuery } from "@apollo/client";
import { UserContext } from "@context/eden";
import { FIND_PROJECTS_RECOMMENDED } from "@graphql/eden";
import { Maybe, RoleTemplate } from "@graphql/eden/generated";
import Head from "next/head";
import { useContext, useState } from "react";
import {
  AppUserLayout,
  GridItemNine,
  GridItemThree,
  GridLayout,
  ProjectMatchList,
  SignUpCard,
  UserProfileCard,
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

const SignUpTestPage: NextPageWithLayout = () => {
  const { currentUser } = useContext(UserContext);
  const [roleSelected, setRoleSelected] = useState<Maybe<RoleTemplate>>();
  const { data: dataRoles } = useQuery(FIND_ROLES, {
    variables: {
      fields: {},
    },
    context: { serviceName: "soilservice" },
  });

  const { data: dataProjectsRecommended } = useQuery(
    FIND_PROJECTS_RECOMMENDED,
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

  // if (dataProjectsRecommended)
  //   console.log(dataProjectsRecommended.findProjects_RecommendedToUser);
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
          <div className={``}>
            <SignUpCard
              roles={dataRoles?.findRoleTemplates}
              onSelectedRole={(val) => setRoleSelected(val)}
            />
            <div className={"mt-6"}>
              <ProjectMatchList
                projects={
                  dataProjectsRecommended?.findProjects_RecommendedToUser
                }
              />
            </div>
          </div>
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
