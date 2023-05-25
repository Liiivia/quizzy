import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { QuizClient } from './quiz-client.service';


describe('QuizClient', () => {

  let service: QuizClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(QuizClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
