// Next
import { NextApiRequest, NextApiResponse } from "next";
import { v2 } from "cloudinary";

// Utils
import Honeybadger from "@honeybadger-io/js";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    CLOUDINARY_CLOUD,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_FOLDER,
  } = process.env;

  if (req.method === "GET") {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const params = {
      timestamp: timestamp,
      folder: CLOUDINARY_FOLDER,
    };

    try {
      const signature = await v2.utils.api_sign_request(
        params,
        CLOUDINARY_API_SECRET as string
      );
      signature &&
        res.send({
          signature,
          timestamp,
          apikey: CLOUDINARY_API_KEY,
          cloudname: CLOUDINARY_CLOUD,
          folder: CLOUDINARY_FOLDER,
        });
    } catch (error: any) {
      Honeybadger.notify(error);
      return res.status(500).send({
        status: "failed",
        message: `error occurred during signature genregulation : ${error}`,
      });
    }
  }
};
