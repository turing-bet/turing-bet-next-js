import { TwitterApi } from "twitter-api-v2";
require("dotenv").config();

const twitter = new TwitterApi({
  appKey: "<YOUR-TWITTER-APP-TOKEN>",
  appSecret: "<YOUR-TWITTER-APP-SECRET>",
  accessToken: "<YOUR-TWITTER-ACCESS-TOKEN>",
  accessSecret: "<YOUR-TWITTER-ACCESS-SECRET>",
});
const readonlyTwitter = twitter.readOnly;
export default readonlyTwitter;
