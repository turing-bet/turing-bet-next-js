import { v4 as uuidv4 } from "uuid";
export async function POST(req: Request) {
  const roundID = uuidv4();
  return Response.json({ roundID });
}
