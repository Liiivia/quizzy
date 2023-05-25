import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ScoreComponent } from './score.component';
import { SCORE_COLOR_MAPPING } from '@quiz/domain/const/score-color-mapping.const';


@Component({
  template: `<app-score [score]="score"></app-score>`
})
class HostComponent {
  score = 0;
}

describe('ScoreComponent', () => {

  let hostComponent: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent, ScoreComponent]
    });
    fixture = TestBed.createComponent(HostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`devrait afficher le score du joueur`, () => {
    const div = fixture.debugElement.query(By.css('.score-block'));

    for (let score = 0; score <= 5; score++) {
      hostComponent.score = score;
      fixture.detectChanges();
      expect(div.nativeElement.innerText).toContain(`You scored ${score}`);
    }
  });

  it(`devrait afficher une couleur de fond différente en fonction du score`, () => {
    const div = fixture.debugElement.query(By.css('.score-block'));

    for (let score = 0; score <= 5; score++) {

      hostComponent.score = score;
      fixture.detectChanges();

      const matchingMapping = SCORE_COLOR_MAPPING.find(m => score >= m.range[0] && score <= m.range[1]);

      expect(div.nativeElement.classList).toContain(matchingMapping?.color);
    }
  });
});
