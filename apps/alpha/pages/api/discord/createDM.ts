/* eslint-disable camelcase */
/* eslint-disable import/no-anonymous-default-export */
import axios, { AxiosResponse } from "axios";
import {
  APIChannel,
  APIMessage,
  RESTPostAPIChannelMessageJSONBody,
  RESTPostAPICurrentUserCreateDMChannelJSONBody,
} from "discord-api-types/v10";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { DISCORD_API_URL } from "../../../constants";
import {
  CreateDMApiRequestBody,
  CreateDMApiResponse,
} from "../../../types/type";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CreateDMApiResponse>
) => {
  const token = await getToken({
    req,
    secret: process.env.NEXT_PUBLIC_SECRET,
  });

  if (!token || !token?.accessToken) {
    return res.status(404).send({
      status: "No Token",
    });
  }
  try {
    const { body } = req;

    const { recipientId, message } = body as CreateDMApiRequestBody;

    const myAxios = axios.create({
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
    });
    const DMChannelResponse = await myAxios.post<
      APIChannel,
      AxiosResponse<APIChannel>,
      RESTPostAPICurrentUserCreateDMChannelJSONBody
    >(
      `${DISCORD_API_URL}/users/@me/channels`,
      {
        recipient_id: recipientId,
      },
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        },
      }
    );

    await axios.post<
      APIMessage,
      AxiosResponse<APIMessage>,
      RESTPostAPIChannelMessageJSONBody
    >(
      `${DISCORD_API_URL}/channels/${DMChannelResponse.data.id}/messages`,
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
      status: "Done",
    });
  } catch (error: any) {
    /// Error Obj { message: 'Cannot send messages to this user', code: 50007 }
    if (error?.response?.data?.code === 50007) {
      res.status(403).send({
        status: "Closed DM",
      });
    } else {
      res.status(404).send({
        status: "Unknown",
      });
    }
  }
};
