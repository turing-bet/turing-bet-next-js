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
    const submissionId = uuidv4();
    const contextSubmissionTexts: string[] = contextSubmissions.map(
      (submission) => submission.text || "",
    );
    const res = await generateBotText(contextSubmissionTexts, question);
    const botSubmission: BotSubmission = {
      lobbyId: lobbyId,
      submissionId: submissionId,
      text: res,
    };
    return botSubmission;
  }

  async shuffleBotSubmission(
    submissions: Submission[],
    botSubmission: BotSubmission,
  ): Promise<void> {
    const botSubmissionIndex = Math.floor(
      Math.random() * (submissions.length + 1),
    );
    submissions.splice(botSubmissionIndex, 0, botSubmission);
  }
}

export default new BotSubmissionService();
