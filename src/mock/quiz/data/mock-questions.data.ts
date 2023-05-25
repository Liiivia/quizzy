import { mockApiGetQuiz } from './mock-api-get-quiz.data';
import { Question } from '@quiz/domain/typing/models/question.model';


export const mockQuestions: Question[] = mockApiGetQuiz.results;
