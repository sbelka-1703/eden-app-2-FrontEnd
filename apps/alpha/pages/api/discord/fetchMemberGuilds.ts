/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { APIGuild } from "discord-api-types/v10";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { DISCORD_API_URL } from "../../../constants";
import { FetchMutualGuildsResponse } from "../../../types/type";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<FetchMutualGuildsResponse>
) => {
  const token = await getToken({
    req,
    secret: process.env.NEXT_PUBLIC_SECRET,
  });

  if (!token || !token?.accessToken) {
    return res.status(404).end();
  }

  const guilds = await getMemberGuildsService(token.accessToken as string);

  return res.status(200).send({
    guilds: guilds,
  });
};

async function _getUserGuildsService(token: string) {
  return axios.get<APIGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

async function getMemberGuildsService(token: string) {
  const { data: userGuilds } = await _getUserGuildsService(token);

  return userGuilds;
}
