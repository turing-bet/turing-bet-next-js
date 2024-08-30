import { Redis } from "@upstash/redis";
import "dotenv/config";
const redis = new Redis({
  url: "https://frank-bass-60714.upstash.io",
  token: "Ae0qAAIjcDFkMmI1ZTU3YTY5MjU0ZmJlOTU0NjU5NTRjZGE4ZjE1OXAxMA",
});

export default redis;
