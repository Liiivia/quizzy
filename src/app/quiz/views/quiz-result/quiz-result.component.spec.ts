import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { QuizResultComponent } from './quiz-result.component';
import { mockQuestions } from '@mock/quiz/data/mock-questions.data';
import { mockUserAnswers0Good, mockUserAnswers5Good } from '@mock/quiz/data/mock-user-answers.data';
import { mockQuizServiceFactory } from '@mock/quiz/domain/services/mock-quiz.service';
import { QuizService } from '@quiz/domain/services/quiz.service';
import { QuizModule } from '@quiz/quiz.module';


const mockQuizService = mockQuizServiceFactory();

describe('QuizResultComponent', () => {

  let fixture: ComponentFixture<QuizResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizResultComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        QuizModule
      ],
      providers: [
        { provide: QuizService, useValue: mockQuizService }
      ]
    });

    fixture = TestBed.createComponent(QuizResultComponent);
    fixture.detectChanges();
  });

  describe(`quand l'API a retourné 5 questions`, () => {

    it(`devrait afficher 5 questions`, () => {
      const questionBlocks = fixture.debugElement.queryAll(By.css('.question-block'));
      expect(questionBlocks.length).toBe(5);

      const questionBlock1 = questionBlocks[0];
      const question = questionBlock1.query(By.css('.question'));
      expect(question.nativeElement.innerHTML).toBe(mockQuestions[0].question);
    });

    it(`devrait afficher les 4 réponses de chaque question`, () => {
      const questionBlock1 = fixture.debugElement.query(By.css('.question-block'));
      const answers = questionBlock1.queryAll(By.css('.answer'));

      expect(answers.length).toBe(4);
      expect(answers[0].nativeElement.innerHTML.trim()).toBe(mockQuestions[0].merged_answers?.[0]);
    });
  });

  describe(`quand une question a reçu une réponse correcte`, () => {

    beforeAll(() => {
      mockQuizService.selectUserAnswers.and.returnValue(mockUserAnswers5Good);
    });

    it(`devrait y avoir une classe correct-answer et aucune classe user-error`, () => {

      const questionBlock1 = fixture.debugElement.query(By.css('.question-block'));
      const answers = questionBlock1.queryAll(By.css('.answer'));

      const correctAnswer = mockQuestions[0].correct_answer;

      answers.forEach(answer => {
        const elem = answer.nativeElement;
        expect(elem.getAttribute('class')).not.toContain('user-error');
        if (elem.innerHTML.trim() === correctAnswer) {
          expect(elem.getAttribute('class')).toContain('correct-answer');
        }
      });
    });
  });

  describe(`quand une question a reçu une réponse inccorecte`, () => {

    beforeAll(() => {
      mockQuizService.selectUserAnswers.and.returnValue(mockUserAnswers0Good);
    });

    it(`devrait y avoir une classe correct-answer et une classe user-error`, () => {

      const questionBlock1 = fixture.debugElement.query(By.css('.question-block'));
      const answers = questionBlock1.queryAll(By.css('.answer'));

      const correctAnswer = mockQuestions[0].correct_answer;
      const userAnswer = mockUserAnswers0Good[0];

      answers.forEach(answer => {
        const elem = answer.nativeElement;
        if (elem.innerHTML.trim() === correctAnswer) {
          expect(elem.getAttribute('class')).toContain('correct-answer');
        }
        if (elem.innerHTML.trim() === userAnswer) {
          expect(elem.getAttribute('class')).toContain('user-error');
        }
      });
    });
  });

});
