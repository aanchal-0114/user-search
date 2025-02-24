import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../services/user.service';
import { SearchService } from '../../services/search.service';
import { of } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let searchService: SearchService;

  const mockUsers = [
    { id: 1, name: 'John Doe', age: 25, role: 'admin' },
    { id: 2, name: 'Jane Smith', age: 30, role: 'user' },
    { id: 3, name: 'Alice Johnson', age: 22, role: 'moderator' },
  ];

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['searchUsers']);

    await TestBed.configureTestingModule({
      imports: [  // ✅ Move UserListComponent here since it's standalone
        UserListComponent,
        CommonModule,
        FormsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatCardModule,
        NoopAnimationsModule, // Disable animations for testing
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: SearchService, useValue: { query$: of('test') } }, // Mock SearchService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    searchService = TestBed.inject(SearchService);

    // Mock the `searchUsers` method
    userService.searchUsers.and.returnValue(of(mockUsers));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users when a search query is emitted', () => {
    component.ngOnInit();
  
    expect(userService.searchUsers).toHaveBeenCalledWith('test');
  
    // 🔹 Sort both arrays by ID before asserting
    const sortedMockUsers = [...mockUsers].sort((a, b) => a.id - b.id);
    const sortedComponentUsers = [...component.users].sort((a, b) => a.id - b.id);
  
    expect(sortedComponentUsers).toEqual(sortedMockUsers);
  })

  it('should filter users by role', () => {
    component.users = mockUsers;
    component.selectedRole = 'admin';
    component.applyFilters();

    expect(component.filteredUsers).toEqual([mockUsers[0]]); // Only the admin user should remain
  });

  it('should sort users by age in ascending order', () => {
    component.users = mockUsers;
    component.selectedOrder = 'Ascending';
    component.applyFilters();

    expect(component.filteredUsers).toEqual([mockUsers[2], mockUsers[0], mockUsers[1]]); // Sorted by age ascending
  });

  it('should sort users by age in descending order', () => {
    component.users = mockUsers;
    component.selectedOrder = 'Descending';
    component.applyFilters();

    expect(component.filteredUsers).toEqual([mockUsers[1], mockUsers[0], mockUsers[2]]); // Sorted by age descending
  });

  it('should combine filtering by role and sorting by age', () => {
    component.users = mockUsers;
    component.selectedRole = 'user';
    component.selectedOrder = 'Descending';
    component.applyFilters();

    expect(component.filteredUsers).toEqual([mockUsers[1]]); // Only the user role, sorted by age descending
  });

  it('should update filteredUsers when the role selection changes', () => {
    component.users = mockUsers;
    const roleSelect: DebugElement = fixture.debugElement.query(By.css('mat-select[aria-label="Filter by Role"]'));

    component.onRoleChange('moderator');
    fixture.detectChanges();

    expect(component.filteredUsers).toEqual([mockUsers[2]]); // Only the moderator user should remain
  });

  it('should update filteredUsers when the sort order changes', () => {
    component.users = mockUsers;
    const sortSelect: DebugElement = fixture.debugElement.query(By.css('mat-select[aria-label="Sort by Age"]'));

    component.toggleSort('Descending');
    fixture.detectChanges();

    expect(component.filteredUsers).toEqual([mockUsers[1], mockUsers[0], mockUsers[2]]); // Sorted by age descending
  });
});
