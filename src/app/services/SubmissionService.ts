import { UserSubmission } from "../model/userSubmission";
import { Submission } from "../model/submission";
import { gatherAnswers } from "../lib/generator";
import { v4 as uuidv4 } from "uuid";
class SubmissionService {
  async createSubmission(
    text: string,
    lobbyId: string,
    submissionNumber: number,
  ): Promise<Submission> {
    const submissionId = uuidv4();

    const submission: Submission = {
      lobbyId,
      text,
      submissionNumber,
    };
    return submission;
  }

  async createUserSubmission(
    text: string,
    lobbyId: string,
    playerAddress: string,
  ): Promise<UserSubmission> {
    const submission: UserSubmission = {
      text,
      lobbyId,
      playerAddress,
    };
    return submission;
  }

  async getContextSubmissions(
    userSubmissions: UserSubmission[],
  ): Promise<Submission[]> {
    const contextSubmissions: Submission[] = [];
    const userAnswers: string[] = [];

    return contextSubmissions;
  }

  async getSubmissions(): Promise<Submission[]> {
    const canidateSubmissions: Submission[] = [];
    return canidateSubmissions;
  }

  async shuffleSubmissionsNumbers(submissions: Submission[]): Promise<void> {
    for (const submission of submissions) {
      submission.submissionNumber = Math.random() * submissions.length;
    }
  }
}

export default new SubmissionService();
