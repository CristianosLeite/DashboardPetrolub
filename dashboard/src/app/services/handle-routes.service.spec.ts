import { TestBed } from '@angular/core/testing';

import { HandleRoutesService } from './handle-routes.service';

describe('HandleRoutesService', () => {
  let service: HandleRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
