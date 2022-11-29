/* eslint-disable import/no-anonymous-default-export */

// import axios from "axios";
// import { APIGuildMember } from "discord-api-types/v10";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

// import { DISCORD_API_URL } from "../../../constants";
// import { FetchGuildMembersResponse } from "../../../types/type";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
  // res: NextApiResponse<FetchGuildMembersResponse>
) => {
  const token = await getToken({
    req,
    secret: process.env.NEXT_PUBLIC_SECRET,
  });

  if (!token || !token?.accessToken) {
    return res.status(404).end();
  }
  // const { query } = req;
  // const { guildId } = query;

  return res.status(200).send({
    test: "test",
  });

  // returns an error

  // const response = await axios.get<Array<APIGuildMember>>(
  //   `${DISCORD_API_URL}/guilds/${guildId}/members`,
  //   {
  //     headers: {
  //       Authorization: `BOT ${process.env.DISCORD_BOT_TOKEN}`,
  //     },
  //   }
  // );

  // return res.status(200).send({
  //   members: response.data,
  // });
};
