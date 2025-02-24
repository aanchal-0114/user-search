import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCardComponent } from './user-card.component';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../models/user.model';
import { Component } from '@angular/core';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardComponent, MatCardModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user details correctly', () => {
    const mockUser: User = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      ssn: '123-45-6789',
      age: 30,
      role: 'admin'
    };

    component.user = mockUser;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('mat-card-title')?.textContent).toContain('John Doe');
    expect(compiled.querySelector('mat-card-content')?.textContent).toContain('john.doe@example.com');
    expect(compiled.querySelector('mat-card-content')?.textContent).toContain('123-45-6789');
    expect(compiled.querySelector('mat-card-content')?.textContent).toContain('30');
    expect(compiled.querySelector('.role')?.textContent).toContain('admin');
  });

  it('should handle undefined user input gracefully', () => {
    expect(() => {
      component.user = undefined as unknown as User; // Assign undefined
      fixture.detectChanges();
    }).not.toThrow();
  });
  
});
