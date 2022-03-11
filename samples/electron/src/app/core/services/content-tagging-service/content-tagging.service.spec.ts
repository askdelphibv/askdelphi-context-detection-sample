import { TestBed } from '@angular/core/testing';

import { ContentTaggingService } from './content-tagging.service';

describe('ContentTaggingService', () => {
  let service: ContentTaggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentTaggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
