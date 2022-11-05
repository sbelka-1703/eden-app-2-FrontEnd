/* eslint-disable camelcase */
/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import { DISCORD_API_URL } from "../../../constants";
import {
  CreateMessageApiRequestBody,
  //   CreateThreadApiRequestBody,
  CreateThreadResponse,
  //   PartialChannel,
  PartialMessage,
} from "../../../types/type";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CreateThreadResponse>
) => {
  try {
    const { body } = req;

    const { thread, message } = body as CreateMessageApiRequestBody;

    if (message) {
      res.status(400);
    }

    await axios.post<PartialMessage>(
      `${DISCORD_API_URL}/channels/${thread}/messages`,
      {
        content: message,
      },
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        },
      }
    );

    res.status(200).send({
      threadId: thread,
    });
  } catch (error) {
    console.log(error);
  }
};
