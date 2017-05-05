import { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis';
import moment from 'moment';


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


const authorize = async () => {

  const auth = new google.auth.GoogleAuth({
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: {
      type: process.env.GOOGLE_TYPE,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/gm, '\n'),
      token_url: process.env.GOOGLE_TOKEN_URL,
    },
    clientOptions: {
      clientId: process.env.GOOGLE_CLIENT_ID,
    },

    scopes: process.env.GOOGLE_AUTH_SCOPES_URL,
  });
  let authClient = await auth.getClient();

  if (authClient == null) {
    throw Error('authentication failed');
  }
  return authClient;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res)

  if (req.method === 'POST') {
    // Process a POST request
    const authClient = await authorize();
    const googleSheets = google.sheets({ version: "v4", auth: authClient })
    
    const params = {
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      auth: authClient,
    };   

    const today = moment();
  
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;

    try {
      // @ts-ignore
      const appendRows = await googleSheets.spreadsheets.values.append({
        ...params,
        range: "Sheet1!A:B",
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        resource: {
          values: [[req.body.virtualFloorId, req.body.virtualFloorTitle, ip, req.body.reasons, req.body.account, today.format()]]
        }
      });

      if (appendRows) {
        return res.status(200).send({ status: "success", message: "Data have been added to the sheet" })
      }
      
    } catch (error: any) {      
      console.log({error})
      return res.status(500).send({ status: "failed", message: error.message })
    }
   
   
  } else {
    // Handle any other HTTP method
    res.status(400).send({ status: "failed", message: "Wrong HTTP Method" })
  }
}

export default handler;

