/* eslint-disable import/no-anonymous-default-export */
import { ServerTemplate } from "@eden/package-graphql/generated";
import axios from "axios";
import { APIGuild } from "discord-api-types/v10";
// import _ from "lodash";
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

  const guilds = await getMutualGuildsService(token.accessToken as string);

  return res.status(200).send({
    guilds: guilds,
  });
};

// function _getBotGuildsService() {
//   return axios.get<APIGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
//     headers: {
//       Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
//     },
//   });
// }

function _getGuildsService() {
  return axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL as string, {
    headers: {
      "Access-Control-Allow-Origin": `*`,
    },
    query: `
      query  {
        findServers(fields: {_id: null}) {
            _id
            adminCommands
            adminID
            adminRoles
            channel {
                chatID
            }
            name
            serverAvatar
            serverType
        }
    }
    `,
  });
}

async function _getUserGuildsService(token: string) {
  return axios.get<APIGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

async function getMutualGuildsService(token: string) {
  // const { data: botGuilds } = await _getBotGuildsService();
  const { data: botGuilds } = await _getGuildsService();

  const { data: userGuilds } = await _getUserGuildsService(token);

  return botGuilds?.data?.findServers.filter((guild: ServerTemplate) =>
    userGuilds.find((userGuild) => userGuild.id === guild._id)
  );

  // return _.intersectionWith(userGuilds, botGuilds, (a, b) => a.id === b.id);
}
