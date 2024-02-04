import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      true; // Modify this line to return a boolean value

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
