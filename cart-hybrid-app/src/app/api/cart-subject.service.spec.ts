import { TestBed } from '@angular/core/testing';

import { CartSubjectService } from './cart-subject.service';

describe('CartSubjectService', () => {
  let service: CartSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
