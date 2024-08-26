import { v4 as uuidv4 } from "uuid";
import redis from "../../lib/db";
export async function GET(request: Request) {
  // const { id } = request?.url;
  // const round = await redis.hgetall(`round:${id}`);
  return Response.json({});
}
