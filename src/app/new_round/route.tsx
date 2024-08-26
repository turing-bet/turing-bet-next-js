import { v4 as uuidv4 } from "uuid";
import { ethers } from "ethers";
export async function POST(req: Request) {
  const betterAddress = req;
  const roundID = uuidv4();
  // const round : Round = {
  //   id: roundID,

  // }
  return Response.json(
    {},
    //  { round }
  );
}
