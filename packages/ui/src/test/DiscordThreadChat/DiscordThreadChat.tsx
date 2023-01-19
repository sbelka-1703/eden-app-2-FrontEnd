import { UserContext } from "@eden/package-context";
import { ServerTemplate } from "@eden/package-graphql/generated";
import {
  Button,
  Card,
  Dropdown,
  ServerSelector,
  TextArea,
  TextHeading3,
} from "@eden/package-ui";
import { ThreadAutoArchiveDuration } from "discord-api-types/v10";
import { useContext, useEffect, useState } from "react";

import {
  CreateThreadApiRequestBody,
  CreateThreadResponse,
} from "../../../types/type";

const findChannels = async (guildId: string) => {
  const response = await fetch(
    encodeURI(`/api/discord/fetchGuildChannels?guildId=${guildId}`),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  return response.json();
};

const createThread = async (body: CreateThreadApiRequestBody) => {
  const response = await fetch(encodeURI("/api/discord/createThread"), {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // console.log("response", response);
  const jsonData: CreateThreadResponse = await response.json().catch((e) => {
    console.log("e", e);
  });

  return jsonData;
};

export interface IDiscordThreadChatProps {}

export const DiscordThreadChat = ({}: IDiscordThreadChatProps) => {
  const { currentUser } = useContext(UserContext);
  const [channels, setChannels] = useState<any>(null);
  const [selectedChannel, setSelectedChannel] = useState<any>(null);
  const [selectedServer, setSelectedServer] = useState<ServerTemplate>({});

  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    if (selectedServer?._id) {
      const filteredChannels: any[] = [];

      setSelectedChannel(null);
      findChannels(selectedServer?._id as string).then((response) => {
        // console.log("response", response.channels);
        response.channels.forEach((channel: any) => {
          if (channel.type === 0) {
            filteredChannels.push(channel);
          }
        });
        setChannels(filteredChannels);
        // setChannels(response.channels);
      });
    }
  }, [selectedServer]);

  const embededMessage = `
    Message from ${currentUser?.discordName}:
    ${message}
  `;

  const handleSendMessage = async () => {
    setSendingMessage(true);
    await createThread({
      message: `<@${currentUser?._id}>`,
      embedMessage: embededMessage,
      senderAvatarURL: currentUser?.discordAvatar!,
      senderName: `${currentUser?.discordName} - says hi!`,
      channelId: selectedChannel.id!,
      threadName: `A message from ${currentUser?.discordName}`,
      ThreadAutoArchiveDuration: ThreadAutoArchiveDuration.OneDay,
    }).then(() => {
      setSendingMessage(false);
      setMessage("");
    });
  };

  return (
    <Card shadow className={"bg-white p-4"}>
      <TextHeading3>Create a thread in any CHAT channel </TextHeading3>
      {!selectedServer?._id ? (
        <div
          className={`my-8 w-full text-center text-3xl font-medium uppercase text-zinc-700`}
        >
          please select a server
        </div>
      ) : (
        <Dropdown
          items={channels}
          onSelect={(value) => setSelectedChannel(value)}
          placeholder="Select a chat channel"
        />
      )}

      <div className={`my-4 md:mr-28 md:flex md:justify-between`}>
        <div className={`font-Inter my-auto font-medium text-gray-700`}>
          Select a Discord Server to Connect in
        </div>
        <ServerSelector
          compareServerID={[]}
          onChangeServer={(val) => setSelectedServer(val)}
        />
      </div>

      {selectedChannel && (
        <div>
          <div>{selectedChannel.name}</div>
          <div>catagory id : {selectedChannel.parent_id}</div>
          <div>channel id : {selectedChannel.id}</div>
          {/* <div>default channel id: {selectedServer?.channel?.chatID}</div> */}
          <div className="mt-3">
            <TextHeading3>Send a message!</TextHeading3>
            <TextArea
              rows={6}
              value={message}
              className=""
              placeholder="Start typing here"
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              className="mt-3"
              onClick={handleSendMessage}
              disabled={sendingMessage || !message}
            >
              Send
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
