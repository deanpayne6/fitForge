import { TestBed } from '@angular/core/testing';

import { RecoverPassApiService } from './recover-pass-api.service';

describe('RecoverPassApiService', () => {
  let service: RecoverPassApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoverPassApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
