import { UserSubmission } from "../model/userSubmission";
import { Submission } from "../model/submission";
import { gatherAnswers } from "../lib/generator";
import { v4 as uuidv4 } from "uuid";
class SubmissionService {
  async createSubmission(text: string, lobbyId: string): Promise<Submission> {
    const submissionId = uuidv4();

    const submission: Submission = {
      submissionId,
      text,
      lobbyId,
    };
    return submission;
  }

  async createUserSubmission(
    text: string,
    lobbyId: string,
    playerAddress: string,
  ): Promise<UserSubmission> {
    const submissionId = uuidv4();

    const submission: UserSubmission = {
      submissionId,
      text,
      lobbyId,
      playerAddress,
    };
    return submission;
  }

  async getContextSubmissions(): Promise<Submission[]> {
    const contextSubmissions: Submission[] = [];
    const userAnswers: string[] = [];

    return contextSubmissions;
  }

  async getSubmissions(): Promise<Submission[]> {
    const canidateSubmissions: Submission[] = [];
    return canidateSubmissions;
  }
}

export default new SubmissionService();
