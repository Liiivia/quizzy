import { Question } from './question.model';


export interface ApiGetQuiz {
  response_code: number;
  results: Question[];
}
