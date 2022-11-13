/* eslint-disable import/no-anonymous-default-export */

import axios from "axios";
import { APIGuildMember } from "discord-api-types/v10";
import { NextApiRequest, NextApiResponse } from "next";

import { DISCORD_API_URL } from "../../../constants";
import { FetchGuildMembersResponse } from "../../../types/type";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<FetchGuildMembersResponse>
) => {
  const { query } = req;
  const { guildId } = query;

  const response = await axios.get<Array<APIGuildMember>>(
    `${DISCORD_API_URL}/guilds/${guildId}/members`,
    {
      headers: {
        Authorization: `BOT ${process.env.DISCORD_BOT_TOKEN}`,
      },
    }
  );

  return res.status(200).send({
    members: response.data,
  });
};
