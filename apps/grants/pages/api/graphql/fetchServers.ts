/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({
    req,
    secret: process.env.NEXT_PUBLIC_SECRET,
  });

  if (!token || !token?.accessToken) {
    return res.status(404).end();
  }

  const response = await axios.post(
    process.env.NEXT_PUBLIC_GRAPHQL_URL as string,
    {
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
    }
  );

  return res.status(200).send({
    servers: response.data,
  });
};
