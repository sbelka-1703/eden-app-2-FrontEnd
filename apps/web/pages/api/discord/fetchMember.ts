/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { DISCORD_API_URL } from "../../../constants";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({
    req,
    secret: process.env.NEXT_PUBLIC_SECRET,
  });

  const { query } = req;
  const { memberId } = query;

  if (!token || !token?.accessToken) {
    return res.status(404).end();
  }

  const member = await getMutualGuildsService(memberId as string);

  return res.status(200).send({
    member: member,
  });
};

async function _getUserGuildsService(memberId: string) {
  return axios.get(`${DISCORD_API_URL}/users/${memberId}`, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
    },
  });
}

async function getMutualGuildsService(memberId: string) {
  const { data: memberData } = await _getUserGuildsService(memberId);

  return memberData;
}
