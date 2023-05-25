import { mockQuestions } from './mock-questions.data';
import { QuizState } from '@quiz/domain/typing/models/quiz-state.model';


export const mockQuizStateNotLoaded: QuizState = {
  status: 'NotLoaded',
  data: null,
  error: null
};

export const mockQuizStateLoading: QuizState = {
  status: 'Loading',
  data: null,
  error: null
};

export const mockQuizStateLoaded: QuizState = {
  status: 'Loaded',
  data: mockQuestions,
  error: null
};
