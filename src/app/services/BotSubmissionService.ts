import { v4 as uuidv4 } from "uuid";
import { BotSubmission } from "../model/botSubmission";
import { Submission } from "../model/submission";
import { generateBotText } from "../lib/generator";
class BotSubmissionService {
  async setupBotSubmission(
    contextSubmissions: Submission[],
    question: string,
    lobbyId: string,
  ): Promise<BotSubmission> {
    const contextSubmissionTexts: string[] = contextSubmissions.map(
      (submission) => submission.text || "",
    );
    const res = await generateBotText(contextSubmissionTexts, question);
    const botSubmission: BotSubmission = {
      lobbyId: lobbyId,
      text: res,
    };
    return botSubmission;
  }
}

export default new BotSubmissionService();
