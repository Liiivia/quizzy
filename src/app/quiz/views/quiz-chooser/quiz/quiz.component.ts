import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { QuizState } from '@quiz/domain/typing/models/quiz-state.model';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizComponent implements OnChanges {

  @Input() quizState!: QuizState | null;
  @Output() answersEmitter: EventEmitter<number[]> = new EventEmitter();

  quizForm!: FormGroup;

  private readonly numberOfQuestions = 5;

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges(): void {
    let fields = {};
    for (let i = 0; i < this.numberOfQuestions; i++) {
      fields = { ...fields, ['question-' + i]: ['', [Validators.required]] };
    }
    this.quizForm = this.formBuilder.group(fields);
  }

  onSubmit(): void {
    const answers: number[] = [];
    for (const controlName in this.quizForm.controls) {
      answers.push(this.quizForm.get(controlName)?.value);
    }

    this.answersEmitter.emit(answers);
  }
}
