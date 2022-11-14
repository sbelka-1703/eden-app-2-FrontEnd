/* eslint-disable camelcase */
/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { APIMessage } from "discord-api-types/v10";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { DISCORD_API_URL } from "../../../constants";
import {
  CreateMessageApiRequestBody,
  CreateThreadResponse,
} from "../../../types/type";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CreateThreadResponse>
) => {
  const token = await getToken({
    req,
    secret: process.env.NEXT_PUBLIC_SECRET,
  });

  if (!token || !token?.accessToken) {
    return res.status(404).end();
  }
  try {
    const { body } = req;

    const { thread, message } = body as CreateMessageApiRequestBody;

    if (message) {
      res.status(400);
    }

    await axios.post<APIMessage>(
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
