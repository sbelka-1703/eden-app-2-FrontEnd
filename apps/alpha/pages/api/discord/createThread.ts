/* eslint-disable camelcase */
/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { APIChannel, APIMessage } from "discord-api-types/v10";
import type { NextApiRequest, NextApiResponse } from "next";

import { DISCORD_API_URL } from "../../../constants";
import {
  CreateThreadApiRequestBody,
  CreateThreadResponse,
} from "../../../types/type";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CreateThreadResponse>
) => {
  try {
    const { body } = req;

    const {
      message,
      embedMessage,
      senderAvatarURL,
      senderName,
      channelId,
      threadName,
      ThreadAutoArchiveDuration,
    } = body as CreateThreadApiRequestBody;

    if (message) {
      res.status(400);
    }

    const thread = await axios.post<APIChannel>(
      `${DISCORD_API_URL}/channels/${channelId}/threads`,
      {
        name: threadName,
        // eslint-disable-next-line camelcase
        auto_archive_duration: ThreadAutoArchiveDuration,
        type: 11, // public thread
      },
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        },
      }
    );

    await axios.post<APIMessage>(
      `${DISCORD_API_URL}/channels/${thread.data.id}/messages`,
      {
        content: message,
        embeds: [
          {
            author: {
              name: senderName,
              icon_url: senderAvatarURL,
            },
            description: embedMessage,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        },
      }
    );

    res.status(200).send({
      threadId: thread.data.id,
    });
  } catch (error) {
    console.log(error);
  }
};
