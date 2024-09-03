import anthropic from "./anthropic";

export async function gatherAnswers(answers: string[]): Promise<string[]> {
  const data = [];
  for await (const answer of answers) {
    data.push(answer);
  }
  return data;
}

export async function generateBotText(
  data: string[],
  question: string,
): Promise<string> {
  const stream = anthropic.messages
    .stream({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      temperature: 0,
      system:
        "You're a participant in a question asking game. Given the following question and other participant's answers, identify patterns in writing and improvise to come up with a funny answer to the question. Be concise, no yapping, redundant words Question:  " +
        question,
      messages: [{ role: "user", content: data.join(" ") }],
    })
    .on("text", (text) => {
      console.log(text);
    });
  const result = JSON.stringify(await stream);

  return result;
}
