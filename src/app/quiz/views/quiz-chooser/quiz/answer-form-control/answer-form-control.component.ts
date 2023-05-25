import { ChangeDetectionStrategy, Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-answer-form-control',
  templateUrl: './answer-form-control.component.html',
  styleUrls: ['./answer-form-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: AnswerFormControlComponent
  }]
})
export class AnswerFormControlComponent implements ControlValueAccessor {

  @Input() answers!: string[] | undefined;

  @ViewChildren('answersRef') answersElements!: QueryList<ElementRef>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (answerIndex: number) => { /* do nothing */ };
  onTouched = () => {  /* do nothing */ };


  selectAnswer(answerIndex: number): void {
    this.updateCssClass(answerIndex);
    this.onChange(answerIndex);
  }

  writeValue() {
    /* do nothing */
  }

  registerOnChange(onChange: () => unknown): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => unknown): void {
    this.onTouched = onTouched;
  }

  private updateCssClass(answerIndex: number): void {
    this.answersElements.forEach((elem, index) => {
      if (index === answerIndex) {
        elem.nativeElement.classList.add('selected');
      } else {
        elem.nativeElement.classList.remove('selected');
      }
    });
  }
}
