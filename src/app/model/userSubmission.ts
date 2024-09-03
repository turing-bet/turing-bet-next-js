import { Submission } from './submission';
export interface UserSubmission extends Submission {
  userAddress?: string;
}
