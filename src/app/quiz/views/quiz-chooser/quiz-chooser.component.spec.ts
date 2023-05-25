import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { QuizChooserComponent } from './quiz-chooser.component';
import { mockCategoryStateError, mockCategoryStateLoaded, mockCategoryStateLoading } from '@mock/quiz/data/mock-category-state.data';
import { mockCategoryServiceFactory } from '@mock/quiz/domain/services/mock-category.service';
import { mockQuizServiceFactory } from '@mock/quiz/domain/services/mock-quiz.service';
import { CategoryService } from '@quiz/domain/services/category.service';
import { QuizService } from '@quiz/domain/services/quiz.service';
import { QuizModule } from '@quiz/quiz.module';


const mockCategoryService = mockCategoryServiceFactory();
const mockQuizService = mockQuizServiceFactory();

describe('QuizChooserComponent', () => {

  let fixture: ComponentFixture<QuizChooserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizChooserComponent],
      imports: [HttpClientTestingModule, QuizModule],
      providers: [
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: QuizService, useValue: mockQuizService }
      ]
    });
    fixture = TestBed.createComponent(QuizChooserComponent);
    fixture.detectChanges();
  });

  describe(`quand l'appel API des catégories est en cours`, () => {
    beforeAll(() => {
      mockCategoryService.selectCategoryState.and.returnValue(of(mockCategoryStateLoading));
    });

    it(`devrait afficher un spinner`, () => {
      const x = fixture.debugElement.query(By.css('app-spinner'));
      expect(x).toBeTruthy();
    });
  });

  describe(`quand l'appel API des catégories est terminé`, () => {
    beforeAll(() => {
      mockCategoryService.selectCategoryState.and.returnValue(of(mockCategoryStateLoaded));
    });

    it(`devrait afficher un formulaire`, () => {
      const categorySelect = fixture.debugElement.query(By.css('#categorySelect'));
      expect(categorySelect).toBeTruthy();

      const difficultySelect = fixture.debugElement.query(By.css('#difficultySelect'));
      expect(difficultySelect).toBeTruthy();

      const createBtn = fixture.debugElement.query(By.css('#createBtn'));
      expect(createBtn).toBeTruthy();
    });

    describe(`quand on ne remplit pas le formulaire`, () => {
      describe(`et que l'on tente de cliquer sur le bouton "Create"`, () => {
        it(`ne devrait rien faire (bouton disabled)`, () => {

          const createBtn = fixture.debugElement.query(By.css('#createBtn'));
          createBtn.nativeElement.click();

          expect(mockQuizService.getQuiz).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe(`quand on remplit le formulaire`, () => {
      describe(`et que l'on clique sur le bouton "Create"`, () => {
        it(`devrait créer le quiz`, () => {

          const categorySelect = fixture.debugElement.query(By.css('#categorySelect')).nativeElement;
          categorySelect.value = categorySelect.options[1].value;
          categorySelect.dispatchEvent(new Event('change'));

          const difficultySelect = fixture.debugElement.query(By.css('#difficultySelect')).nativeElement;
          difficultySelect.value = difficultySelect.options[1].value;
          difficultySelect.dispatchEvent(new Event('change'));

          fixture.detectChanges();

          const createBtn = fixture.debugElement.query(By.css('#createBtn'));
          createBtn.nativeElement.click();

          expect(mockQuizService.getQuiz).toHaveBeenCalledTimes(1);
          expect(mockQuizService.getQuiz).toHaveBeenCalledWith(categorySelect.value, difficultySelect.value);
        });
      });
    });

    // saveAnswers
  });

  describe(`quand l'appel API des catégories est en erreur`, () => {
    beforeAll(() => {
      mockCategoryService.selectCategoryState.and.returnValue(of(mockCategoryStateError));
    });

    it(`devrait afficher un message d'erreur`, () => {
      const span = fixture.debugElement.query(By.css('.error'));
      expect(span.nativeElement.innerText).toBe('An error has occurred. Please retry later.');
    });
  });
});
