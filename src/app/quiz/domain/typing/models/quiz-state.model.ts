import { LoadingStatus } from '../type/loading-status.type';
import { Question } from './question.model';


export interface QuizState {
  status: LoadingStatus;
  data: null | Question[];
  error: null | Error;
}
