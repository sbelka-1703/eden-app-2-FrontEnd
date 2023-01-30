import { gql, useMutation } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import {
  Maybe,
  Members,
  MutationAddNewChatArgs,
  Project,
  RoleType,
  ServerTemplate,
} from "@eden/package-graphql/generated";
import {
  Avatar,
  Button,
  Loading,
  ServerSelector,
  TextArea,
  TextHeading3,
} from "@eden/package-ui";
import { ThreadAutoArchiveDuration } from "discord-api-types/v10";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

import {
  CreateMessageApiRequestBody,
  CreateThreadApiRequestBody,
  CreateThreadResponse,
} from "../../../types/type";

const ADD_NEW_CHAT = gql`
  mutation AddNewChat($fields: addNewChatInput) {
    addNewChat(fields: $fields) {
      _id
    }
  }
`;

const SET_APPLY_TO_PROJECT = gql`
  mutation ($fields: changeTeamMember_Phase_ProjectInput!) {
    changeTeamMember_Phase_Project(fields: $fields) {
      _id
    }
  }
`;

export interface ISendMessageToChampionProps {
  member: Maybe<Members>;
  project?: Project;
  role?: RoleType;
}

export const SendMessageToChampion = ({
  member,
  project,
  role,
}: ISendMessageToChampionProps) => {
  // console.log("project", project);
  // console.log("role", role);
  // console.log("member", member);

  const { currentUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);

  const [selectedServer, setSelectedServer] = useState<ServerTemplate>({});

  const [addNewChat] = useMutation<any, MutationAddNewChatArgs>(ADD_NEW_CHAT);

  const [changeTeamMemberPhaseProject, {}] = useMutation(SET_APPLY_TO_PROJECT, {
    onCompleted: () => {
      toast.success("success");
      setTimeout(() => {
        setSendingMessage(false);
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

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

  const embededMessage = `
    Project: ${project?.title}
    Description: ${project?.description}
    Role: ${role?.title}
  `;

  const createMessage = async (body: CreateMessageApiRequestBody) => {
    const response = await fetch(encodeURI("/api/discord/createMessage"), {
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

  const followUpMessage = `
    Message:
    
    ${message}

    please check out my profile on Eden
    https://eden-alpha-develop.vercel.app/profile/${currentUser?.discordName}
  `;

  const handleSendMessage = async () => {
    setSendingMessage(true);
    const { threadId } = await createThread({
      message: `<@${member?._id}> <@${currentUser?._id}>`,
      embedMessage: embededMessage,
      senderAvatarURL: currentUser?.discordAvatar!,
      senderName: `${currentUser?.discordName} - is interested in ${project?.title}`,
      channelId: selectedServer?.channel?.chatID!,
      threadName: `${project?.title}, has a new message from ${currentUser?.discordName}`,
      ThreadAutoArchiveDuration: ThreadAutoArchiveDuration.OneDay,
    });

    try {
      await createMessage({
        message: followUpMessage,
        channelId: selectedServer?.channel?.chatID!,
        thread: threadId,
      });
    } catch (error) {
      console.log(error);
    }

    try {
      await addNewChat({
        variables: {
          fields: {
            message: message,
            projectID: project?._id!,
            receiverID: member?._id!,
            senderID: currentUser?._id!,
            serverID: selectedServer?._id!,
            threadID: threadId,
          },
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsMessageSent(true);
      if (project?._id && member?._id && role?._id) {
        changeTeamMemberPhaseProject({
          variables: {
            fields: {
              projectID: project?._id,
              memberID: member?._id,
              roleID: role?._id,
              phase: "engaged",
            },
          },
          context: { serviceName: "soilservice" },
        });
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  if (!member) return null;

  return (
    <div className={``}>
      {isMessageSent ? (
        <div className={`flex flex-col items-center justify-center`}>
          <TextHeading3 className={`mt-24`}>
            Message sent successfully!
          </TextHeading3>
        </div>
      ) : (
        <>
          {sendingMessage ? (
            <Loading title={`sending message...`} />
          ) : (
            <>
              <div className="rounded-xl border border-gray-300 py-4 px-3">
                <TextHeading3 className={`mr-4`}>
                  Send message to @{member?.discordName} about the {role?.title}{" "}
                  Role
                </TextHeading3>
                <div className={`my-4 md:mr-28 md:flex md:justify-between`}>
                  <div
                    className={`font-Inter my-auto font-medium text-gray-700`}
                  >
                    Select a Discord Server to Connect in
                  </div>
                  <ServerSelector
                    compareServerID={project?.serverID || []}
                    onChangeServer={(val) => setSelectedServer(val)}
                  />
                </div>
                <div className="flex items-center ">
                  <Avatar
                    src={currentUser?.discordAvatar || ""}
                    alt={currentUser?.discordName || ""}
                    size={`sm`}
                  />
                  <TextHeading3 className="ml-3">
                    @{currentUser?.discordName}
                    {currentUser?.discriminator && (
                      <span className="pl-1 text-sm text-gray-400">
                        #{currentUser?.discriminator}
                      </span>
                    )}
                  </TextHeading3>
                </div>
                <div className="mt-3">
                  <TextArea
                    rows={6}
                    value={message}
                    className="border-none px-0"
                    placeholder="Start typing here"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-3 text-center">
                <div className="inline-block">
                  {!sendingMessage && selectedServer?._id && (
                    <Button
                      disabled={message.length === 0 || sendingMessage}
                      variant="primary"
                      onClick={() => {
                        handleSendMessage();
                      }}
                    >
                      Send
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
