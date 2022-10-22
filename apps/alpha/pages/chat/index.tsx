/* eslint-disable no-unused-vars */
import { useMutation } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { ADD_NEW_CHAT } from "@eden/package-graphql";
import {
  Members,
  MutationAddNewChatArgs,
} from "@eden/package-graphql/generated";
import {
  AppUserSubmenuLayout,
  Card,
  GridItemNine,
  GridItemThree,
  GridLayout,
  SendMessageToUserModal,
  SEO,
} from "@eden/package-ui";
import { useContext, useState } from "react";

import type { NextPageWithLayout } from "../_app";

const ChatPage: NextPageWithLayout = () => {
  const sampleUser: Members = {
    _id: "1007145437049921677",
    discordAvatar:
      "https://cdn.discordapp.com/avatars/1007145437049921677/e3a8f491c88a912d98eff2f46c52fd73.webp",
    discordName: "myz1237",
  };
  const { currentUser } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(true);
  const [addNewChat] = useMutation<any, MutationAddNewChatArgs>(ADD_NEW_CHAT);
  const createThread = async (body: CreateThreadApiRequestBody) => {
    const response = await fetch(encodeURI("/api/discord/createThread"), {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const jsonData: CreateThreadResponse = await response.json();

    return jsonData;
  };

  return (
    <>
      <SEO />
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
            member={sampleUser}
            openModal={openModal}
            onSubmit={async (message, member) => {
              let threadName = "Project Talents Discussion";

              if (member) {
                threadName = `Project Talents Discussion -- ${member.discordName}`;
              }
              const { threadId } = await createThread({
                message: `<@${member?._id}>`,
                embedMessage: message,
                senderAvatarURL: currentUser?.discordAvatar!,
                senderName: `${currentUser?.discordName} -- Just invite you to a conversation`,
                channelId: "1001547443135058010",
                threadName: `Project Talents Discussion with ${member?.discordName}`,
                autoArchiveDuration: AutoArchiveDuration.OneDay,
              });

              const result = await addNewChat({
                variables: {
                  fields: {
                    message: message,
                    projectID: "62f685952dc2d40004d395c7",
                    receiverID: member?._id!,
                    senderID: currentUser?._id!,
                    serverID: "988301790795685930",
                    threadID: threadId,
                  },
                },
              });

              console.log(result);
              setOpenModal(false);
            }}
          />
        </GridItemNine>
      </GridLayout>
    </>
  );
};

ChatPage.getLayout = (page) => (
  <AppUserSubmenuLayout showSubmenu={false}>{page}</AppUserSubmenuLayout>
);

export default ChatPage;

import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "next-auth/react";

import {
  AutoArchiveDuration,
  CreateThreadApiRequestBody,
  CreateThreadResponse,
} from "../../types/type";

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
