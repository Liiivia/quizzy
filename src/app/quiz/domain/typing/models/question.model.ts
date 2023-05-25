import { Difficulties } from '../type/difficulties.type';


export interface Question {
  category: string;
  type: string;
  difficulty: Difficulties;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  merged_answers?: string[];
  correct_answer_index?: number;
}
