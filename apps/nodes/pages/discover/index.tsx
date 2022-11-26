import {
  DiscoverContext,
  DiscoverModal,
  DiscoverProvider,
} from "@eden/package-context";
import {
  AppUserSubmenuLayout,
  Card,
  DiscoverModalContainer,
  GridItemNine,
  GridItemThree,
  GridLayout,
  SEO,
  UserProfileCard,
} from "@eden/package-ui";
import { useContext, useEffect } from "react";

import type { NextPageWithLayout } from "../_app";

const DiscoverPage: NextPageWithLayout = () => {
  const { setOpenModal } = useContext(DiscoverContext);

  useEffect(() => {
    setOpenModal(DiscoverModal.START_INFO);
  }, []);

  return (
    <>
      <SEO />
      <GridLayout>
        <GridItemThree>
          <Card className={`h-85 flex flex-col gap-2`}>
            <UserProfileCard />
          </Card>
        </GridItemThree>
        <GridItemNine>
          <Card shadow className="h-85 overflow-auto bg-white p-6">
            discover page
          </Card>
        </GridItemNine>
      </GridLayout>
      <DiscoverModalContainer
        setSubmittingTalentAttributes={(val) => {
          // setRoleFilter(val);
          console.log("val", val);
        }}
      />
    </>
  );
};

DiscoverPage.getLayout = (page) => (
  <DiscoverProvider>
    <AppUserSubmenuLayout showSubmenu={false}>{page}</AppUserSubmenuLayout>
  </DiscoverProvider>
);

export default DiscoverPage;

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
