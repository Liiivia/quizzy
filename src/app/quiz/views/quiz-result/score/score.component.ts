import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';

import { SCORE_COLOR_MAPPING } from '@quiz/domain/const/score-color-mapping.const';


@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreComponent implements OnChanges {

  @Input() score!: number;

  scoreColor = '';

  private readonly colorMapping = SCORE_COLOR_MAPPING;

  ngOnChanges(): void {
    const mapping = this.colorMapping.find(mapping => this.score >= mapping.range[0] && this.score <= mapping.range[1]);
    this.scoreColor = mapping?.color ?? '';
  }
}
