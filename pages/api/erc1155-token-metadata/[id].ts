import { NextApiRequest, NextApiResponse } from "next";
import { request, gql } from 'graphql-request';
import moment from 'moment';
import { metadataImage } from 'utils/vfMetadataImage';
import networkConfig from "config/networkConfig";
import { hexToNumber } from "utils/helpers";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Ex. If the URl is http://localhost:3000/api/erc1155-token-metadata/00000000000000000000000000000000000000755a98ef31e5075a00622f6284/
  // req.query.id should be "00000000000000000000000000000000000000755a98ef31e5075a00622f6284"
  // However it seems that (at least on Polygon),
  // OpenSea sometimes also passes the unpadded decimal equivalent "9297733551343413102038618169988",
  // so we need to handle this too.
  // ERC1155 Token ID is "0x755a98ef31e5075a00622f6284"

  const { id } = req.query;

  let paddedHexString: string;
  if (typeof id === 'string' && /^[0-9a-f]{64}$/i.test(id)) {
    paddedHexString = id;
  } else if (typeof id === 'string' && /^\d+$/.test(id)) {
    paddedHexString = BigInt(id).toString(16).padStart(64, '0');
  } else {
    return res.status(400).send({
      status: "failed",
      message: `Invalid ID ${id}`,
    });
  }

  // If hex representation has a leading 0, remove it to match OutcomeTimeslot entity id on Graph
  const graphOutcomeTimeslotEntityId = `0x${paddedHexString.replace(/^0+/, '')}`;

  const query = getQuery(graphOutcomeTimeslotEntityId);
  const queryResult = await request(`${networkConfig.subgraphEndpoint}`, query);

  if (!queryResult.outcomeTimeslot) {
    return res.status(400).send({
      status: "failed",
      message: `Asset ${graphOutcomeTimeslotEntityId} not found.`,
    });
  }


  const result = queryResult.outcomeTimeslot;
  const vfId = result.outcome.virtualFloor.intId;
  const timeslot = formatTimestamp(result.timeslot);

  const attributes = [
    {
      display_type: "date",
      trait_type: "Start Time",
      value: result.outcome.virtualFloor.tOpen,
    },
    {
      display_type: "date",
      trait_type: "Close Time",
      value: result.outcome.virtualFloor.tClose,
    },
    {
      display_type: "date",
      trait_type: "Resolve Time",
      value: result.outcome.virtualFloor.tResolve,
    }
  ];

  return res.status(200).send({
    name: result.outcome.title,
    external_link: `${process.env.NEXT_PUBLIC_IMAGE_URL}/bet/#!/${hexToNumber(vfId)}`,
    description: `Description for VirtualFloor id: ${vfId}; Outcome: ${result.outcome.title}; Timeslot ${timeslot}; Number of tokens owned: ${result.outcome.virtualFloor.totalSupply}`,
    image: metadataImage(
      result.outcome.virtualFloor.title,
      formatTimestamp(result.outcome.virtualFloor.tClose),
      formatTimestamp(result.outcome.virtualFloor.tResolve),
      result.outcome.title,
      result.beta
    ),
    decimals: result.outcome.virtualFloor.paymentToken.decimals,
    attributes,
    properties: attributes,
  })
};

const formatTimestamp = (timestamp: string) => moment(parseInt(timestamp) * 1000).format('MMMM Do YYYY, h:mm:ss a');

const getQuery = (erc1155TokenId: string): string => {
  const query = gql`
    {
      outcomeTimeslot(id: "${erc1155TokenId}") {
        id
        timeslot
    		beta
        outcome{
          id
          index
          title
          outcomeTimeslots{
            id
            timeslot
          }
          virtualFloor{
            id
            intId
            description
            title
            totalSupply
            bonusAmount
            tOpen
            tClose
            tResolve
            state
            paymentToken{
              decimals
            }
            opponents{
              id
              image
              title
            }
          }
        }
      }
    }
  `;
  return query;
};
