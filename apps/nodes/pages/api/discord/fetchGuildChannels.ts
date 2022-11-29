/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { APIGuild } from "discord-api-types/v10";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { DISCORD_API_URL } from "../../../constants";
// import { FetchMutualGuildsResponse } from "../../../types/type";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({
    req,
    secret: process.env.NEXT_PUBLIC_SECRET,
  });

  if (!token || !token?.accessToken) {
    return res.status(404).end();
  }
  const { query } = req;
  const { guildId } = query;
  const { data: botChannels } = await _getBotGuildChannelsService(
    guildId as string
  );

  return res.status(200).send({
    channels: botChannels,
  });
};

function _getBotGuildChannelsService(guildId: string) {
  return axios.get<APIGuild[]>(
    `${DISCORD_API_URL}/guilds/${guildId}/channels`,
    {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
    }
  );
}
