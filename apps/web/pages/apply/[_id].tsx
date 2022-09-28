import { useQuery } from "@apollo/client";
import { FIND_PROJECT } from "@graphql/eden";
import { useRouter } from "next/router";
import {
  ApplyContainer,
  AppUserLayout,
  GridItemSix,
  GridItemThree,
  GridLayout,
} from "ui";

import type { NextPageWithLayout } from "../_app";

const ApplyPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { _id } = router.query;

  const { data: dataProject } = useQuery(FIND_PROJECT, {
    variables: {
      fields: {
        _id,
      },
    },
    skip: !_id,
    context: { serviceName: "soilservice" },
  });

  // if (dataProject) console.log("dataProject", dataProject.findProject);

  return (
    <GridLayout>
      <GridItemThree>how to apply</GridItemThree>
      <GridItemSix>
        <ApplyContainer project={dataProject?.findProject} />
      </GridItemSix>
      <GridItemThree>about the project</GridItemThree>
    </GridLayout>
  );
};

ApplyPage.getLayout = (page) => <AppUserLayout>{page}</AppUserLayout>;

export default ApplyPage;

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
