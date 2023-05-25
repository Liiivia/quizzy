import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerFormControlComponent } from './answer-form-control.component';


describe('AnswerFormControlComponent', () => {

  let component: AnswerFormControlComponent;
  let fixture: ComponentFixture<AnswerFormControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnswerFormControlComponent]
    });
    fixture = TestBed.createComponent(AnswerFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
