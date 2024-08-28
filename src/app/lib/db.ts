import { Redis } from "@upstash/redis";
import dotenv from "dotenv";
const redis = new Redis({
  url: process.env["REDIS_URL"],
  token: process.env["REDIS_PASSWORD"],
});

export default redis;
