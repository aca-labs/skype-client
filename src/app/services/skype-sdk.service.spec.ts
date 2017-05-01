import { TestBed, inject } from '@angular/core/testing';

import { SkypeSDKService } from './skype-sdk.service';

describe('SkypeSDKService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkypeSDKService]
    });
  });

  it('should ...', inject([SkypeSDKService], (service: SkypeSDKService) => {
    expect(service).toBeTruthy();
  }));
});
