import { UserContext } from "@eden/package-context";
import {
  Button,
  Card,
  Dropdown,
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
  const jsonData: CreateThreadResponse = await response.json();

  return jsonData;
};

export interface IDiscordAnyChannelProps {}

export const DiscordAnyChannel = ({}: IDiscordAnyChannelProps) => {
  const { selectedServer, currentUser } = useContext(UserContext);
  const [channels, setChannels] = useState<any>(null);
  const [selectedChannel, setSelectedChannel] = useState<any>(null);

  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    if (selectedServer?._id) {
      findChannels(selectedServer?._id as string).then((response) => {
        // console.log("response", response.channels);
        setChannels(response.channels);
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
      channelId: selectedChannel.id,
      threadName: `A message from ${currentUser?.discordName}`,
      ThreadAutoArchiveDuration: ThreadAutoArchiveDuration.OneDay,
    }).then(() => {
      setSendingMessage(false);
      setMessage("");
    });
  };

  return (
    <Card shadow className={" bg-white p-4"}>
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
          placeholder="Select a channel"
        />
      )}

      {selectedChannel && (
        <div>
          <div>{selectedChannel.name}</div>
          <div>catagory id : {selectedChannel.parent_id}</div>
          <div>channel id : {selectedChannel.id}</div>
          <div>default channel id: {selectedServer?.channel?.chatID}</div>
          <div className="mt-3">
            <TextHeading3>Send a message!</TextHeading3>
            <TextArea
              rows={6}
              value={message}
              className="border-none px-0"
              placeholder="Start typing here"
              customStyle={{ boxShadow: "none", fontSize: "20px" }}
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
