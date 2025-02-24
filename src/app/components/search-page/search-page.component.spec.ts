import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchPageComponent } from './search-page.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { UserListComponent } from '../user-list/user-list.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';  // ✅ Ensure this is included
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    // ✅ Mock UserService
    userServiceSpy = jasmine.createSpyObj('UserService', ['searchUsers']);
    userServiceSpy.searchUsers.and.returnValue(of([])); // ✅ Prevent real API calls

    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientModule,     // ✅ Fix: Provide HttpClient
        SearchPageComponent,  // ✅ Standalone component
        SearchBarComponent,   // ✅ Standalone component
        UserListComponent,    // ✅ Standalone component (relies on UserService)
        NavbarComponent,      // ✅ Standalone component
        MatToolbarModule      // ✅ Needed for Navbar
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy } // ✅ Provide mock UserService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // ✅ Prevents Angular from throwing unknown element errors
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the navbar component', () => {
    const navbar = fixture.nativeElement.querySelector('app-navbar');
    expect(navbar).toBeTruthy();
  });

  it('should render the search bar component', () => {
    const searchBar = fixture.nativeElement.querySelector('app-search-bar');
    expect(searchBar).toBeTruthy();
  });

  it('should render the user list component', () => {
    const userList = fixture.nativeElement.querySelector('app-user-list');
    expect(userList).toBeTruthy();
  });

  it('should display the correct title', () => {
    const titleElement = fixture.nativeElement.querySelector('h2');
    expect(titleElement.textContent.trim()).toBe('UserFinderX');
  });
});
