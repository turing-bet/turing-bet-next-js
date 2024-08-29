import readonlyTwitter from "./twitter";
import anthropic from "./anthropic";

export async function gatherAnswers(answers: string[]): Promise<string[]> {
  const data = [];
  for await (const answer of answers) {
    data.push(answer);
  }
  return data;
}

export async function generateCast(data: string[], question: string) {
  const msg = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 1000,
    temperature: 0,
    system:
      "You're a participant in a question asking game. Given the following question and other participant's answers, identify patterns in writing and improvise to come up with a funny answer to the question. Question:  " +
      question,
    messages: [{ role: "user", content: data.join(" ") }],
  });
}
