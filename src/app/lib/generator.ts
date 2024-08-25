import readonlyTwitter from "./twitter";
import anthropic from "./anthropic";

export async function gatherData(Account: string): Promise<string[]> {
  const data = [];
  const timeline = await readonlyTwitter.v2.userTimeline(Account);
  for await (const tweet of timeline) {
    data.push(tweet.text);
  }
  return data;
}

export async function generateCast(data: string[]) {
  const msg = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 1000,
    temperature: 0,
    system:
      "Your task is to analyze the provided tweets and identify patterns in writing and themes. Then generate a new cast based on the patterns you've identified.",
    messages: [{ role: "user", content: data.join(" ") }],
  });
}
