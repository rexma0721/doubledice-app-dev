// Next
import { NextApiRequest, NextApiResponse } from "next";

// Utils
import axios from "axios";

import Cors from 'cors'
import initMiddleware from 'config/cors';

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: process.env.NEXT_PUBLIC_SITE_URL!.split(",")
  })
)


export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res)
  const { DISCORD_BOT_TOKEN, DISCORD_API_URL, DISCORD_GUILD_ID } = process.env;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
  };

  if (req.method === "POST") {
    const { channelName } = req.body;

    try {
      const result = await axios.post(
        `${DISCORD_API_URL}/guilds/${DISCORD_GUILD_ID}/channels`,
        {
          name: channelName,
          permission_overwrites: [],
          type: 0,
        },
        {
          headers,
        }
      );

      if (result && result.data)
        return res.status(200).send({
          status: "success",
          message: `Channel is created successfully.`,
          data: result.data,
        });
    } catch (error: any) {
      return res.status(500).send({
        status: "failed",
        message: `Error creating channel: ${error}`,
      });
    }
  }
};
