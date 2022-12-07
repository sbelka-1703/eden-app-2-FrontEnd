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

  if (!token || !token?.accessToken) {
    return res.status(404).end();
  }

  const { data: memberData } = await _getUserGuildsService(
    token.accessToken as string
  );

  return res.status(200).send({
    member: memberData,
  });
};

async function _getUserGuildsService(token: string) {
  return axios.get(`${DISCORD_API_URL}/users/@me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
