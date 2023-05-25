import { of } from 'rxjs';

import { mockQuestions } from '@mock/quiz/data/mock-questions.data';
import { mockQuizStateNotLoaded } from '@mock/quiz/data/mock-quiz-state.data';
import { mockUserAnswers5Good } from '@mock/quiz/data/mock-user-answers.data';


export const mockQuizServiceFactory = () => {

  const publicMembers = [
    'resetStorage',
    'selectQuizState',
    'selectQuestions',
    'selectUserAnswers',
    'getQuiz',
    'saveAnswers'
  ];

  const spy = jasmine.createSpyObj(publicMembers);

  spy.resetStorage.and.returnValue(void 0);
  spy.selectQuizState.and.returnValue(of(mockQuizStateNotLoaded));
  spy.selectQuestions.and.returnValue(mockQuestions);
  spy.selectUserAnswers.and.returnValue(mockUserAnswers5Good);
  spy.getQuiz.and.returnValue(of(void 0));
  spy.saveAnswers.and.returnValue(void 0);

  return spy;
};
