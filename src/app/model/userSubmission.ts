import { Submission } from "./submission";
export interface UserSubmission extends Submission {
  playerAddress?: string;
}
