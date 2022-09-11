import { useQuery } from "@apollo/client";
// import { UserContext } from "@context/eden";
import { FIND_PROJECT } from "@graphql/eden";
import Head from "next/head";
import { useRouter } from "next/router";
// import { useContext } from "react";
import {
  ApplyByRoleContainer,
  AppUserLayout,
  GridItemNine,
  GridItemThree,
  GridLayout,
  UserProfileCard,
} from "ui";

import type { NextPageWithLayout } from "../../../_app";

const SignUpTestPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { _id } = router.query;
  //   const { currentUser } = useContext(UserContext);
  const { data: dataProject } = useQuery(FIND_PROJECT, {
    variables: {
      fields: {
        _id: _id,
      },
    },
    skip: !_id,
    context: { serviceName: "soilservice" },
  });

  //   if (dataProject) console.log(dataProject?.findProject);

  return (
    <div className={`bg-background`}>
      <Head>
        <title>Eden protocol</title>
      </Head>

      <GridLayout>
        <GridItemThree>
          <UserProfileCard role={""} />
        </GridItemThree>
        <GridItemNine>
          <ApplyByRoleContainer project={dataProject?.findProject} />
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
