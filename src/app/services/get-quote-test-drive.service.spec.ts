import { TestBed, inject } from '@angular/core/testing';

import { GetQuoteTestDriveService } from './get-quote-test-drive.service';

describe('GetQuoteTestDriveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetQuoteTestDriveService]
    });
  });

  it('should be created', inject([GetQuoteTestDriveService], (service: GetQuoteTestDriveService) => {
    expect(service).toBeTruthy();
  }));
});
