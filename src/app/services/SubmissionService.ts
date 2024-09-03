import { Submission } from "../model/submission";
import { gatherAnswers, generateAnswer } from "../lib/generator";
class SubmissionService {
  async getContextSubmissions(): Promise<Submission[]> {
    const contextSubmissions: Submission[] = [];
    const userAnswers: string[] = [];

    return contextSubmissions;
  }

  async shuffleSubmissions(submissions: Submission[]): Promise<Submission[]> {
    const shuffledSubmissions: Submission[] = [];
    return shuffledSubmissions;
  }

  async getSubmissions(): Promise<Submission[]> {
    const canidateSubmissions: Submission[] = [];
    return canidateSubmissions;
  }
}

export default new SubmissionService();
