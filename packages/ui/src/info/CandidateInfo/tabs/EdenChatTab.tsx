import { useQuery } from "@apollo/client";
import { FIND_CONVERSATIONS } from "@eden/package-graphql";
import { Card } from "@eden/package-ui";
import React from "react";

type Props = {
  memberID: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const EdenChatTab: React.FC<Props> = ({ memberID }) => {
  const { data: findConversationsData } = useQuery(FIND_CONVERSATIONS, {
    variables: {
      fields: {
        userID: memberID,
      },
    },
    skip: !Boolean(memberID),
    ssr: false,
  });

  return (
    <>
      <Card border shadow className="h-6/10 mt-4 overflow-scroll bg-white">
        <div className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-hide scrolling-touch flex flex-col space-y-4 p-3">
          <div className="my-4">
            {findConversationsData &&
            findConversationsData.findConversations.length
              ? findConversationsData.findConversations.map(
                  (conversation: any) =>
                    conversation.conversation.length ? (
                      <>
                        {conversation.conversation.map(
                          (chat: any, index: any) => (
                            <div className="chat-message p-2" key={index}>
                              <div
                                className={classNames(
                                  chat.role == "assistant" ? "" : "justify-end",
                                  "flex items-start"
                                )}
                              >
                                <div
                                  className={classNames(
                                    chat.role == "assistant"
                                      ? "order-2"
                                      : "order-1",
                                    "mx-2 flex max-w-[78%] flex-col items-start space-y-2 text-xs"
                                  )}
                                >
                                  <span
                                    // className="inline-block rounded-lg rounded-bl-none bg-gray-300 px-4 py-2 text-gray-600"
                                    className={classNames(
                                      chat.role == "assistant"
                                        ? "rounded-tl-none border border-[#D1E4EE] bg-[#EDF2F7]"
                                        : "rounded-tr-none border border-[#BDECF6] bg-[#D9F5FD]",
                                      "inline-block whitespace-pre-wrap rounded-lg px-4 py-2"
                                    )}
                                  >
                                    {chat.content}
                                  </span>
                                </div>
                                {/* <img
                          src={Users[chat.user].img}
                          alt="My profile"
                          className="order-1 h-6 w-6 rounded-full"
                        /> */}
                              </div>
                            </div>
                          )
                        )}
                        <hr
                          style={{
                            border: "1",
                            borderTop: "medium double #CCC",
                            height: "1px",
                            overflow: "visible",
                            padding: "0",
                            color: "#CCC",
                            textAlign: "center",
                            marginTop: "10px",
                            marginBottom: "56px",
                          }}
                        />
                      </>
                    ) : null
                )
              : null}
          </div>
        </div>
      </Card>
    </>
  );
};
