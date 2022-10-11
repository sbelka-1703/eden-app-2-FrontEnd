import {
  AppUserSubmenuLayout,
  Card,
  GridItemNine,
  GridItemThree,
  GridLayout,
  SendMessageToUserModal,
} from "@eden/package-ui";
import { useState } from "react";

import type { NextPageWithLayout } from "../_app";

const ChatPage: NextPageWithLayout = () => {
  const [openModal, setOpenModal] = useState(true);

  return (
    <GridLayout>
      <GridItemThree>
        <Card shadow className="h-85 bg-white p-6">
          left side
        </Card>
      </GridItemThree>
      <GridItemNine>
        <Card shadow className="h-85 overflow-auto bg-white p-6">
          main window
        </Card>
        <SendMessageToUserModal
          openModal={openModal}
          onSubmit={() => setOpenModal(false)}
        />
      </GridItemNine>
    </GridLayout>
  );
};

ChatPage.getLayout = (page) => (
  <AppUserSubmenuLayout showSubmenu={false}>{page}</AppUserSubmenuLayout>
);

export default ChatPage;

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
