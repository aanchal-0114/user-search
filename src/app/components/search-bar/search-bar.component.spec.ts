import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SearchBarComponent } from './search-bar.component';
import { SearchService } from '../../services/search.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let searchService: SearchService;
  let searchServiceSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [  // ✅ Move SearchBarComponent here
        SearchBarComponent,  // ✅ Standalone components go in `imports`, not `declarations`
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        NoopAnimationsModule,
      ],
      providers: [SearchService],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    searchService = TestBed.inject(SearchService);
    searchServiceSpy = spyOn(searchService, 'setQuery').and.callThrough();
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSearch method when the search button is clicked', () => {
    const searchButton: DebugElement = fixture.debugElement.query(By.css('button[mat-icon-button]'));
    const inputElement: DebugElement = fixture.debugElement.query(By.css('input[matInput]'));

    inputElement.nativeElement.value = 'John Doe';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    searchButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(searchServiceSpy).toHaveBeenCalledWith('John Doe');
  });

  it('should call onSearch method when Enter key is pressed', () => {
    const inputElement: DebugElement = fixture.debugElement.query(By.css('input[matInput]'));

    inputElement.nativeElement.value = 'John Doe';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    inputElement.nativeElement.dispatchEvent(enterEvent);
    fixture.detectChanges();

    expect(searchServiceSpy).toHaveBeenCalledWith('John Doe');
  });

  it('should not call onSearch method if search input length is less than 3', () => {
    const inputElement: DebugElement = fixture.debugElement.query(By.css('input[matInput]'));

    inputElement.nativeElement.value = 'Jo';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    inputElement.nativeElement.dispatchEvent(enterEvent);
    fixture.detectChanges();

    expect(searchServiceSpy).not.toHaveBeenCalled();
  });

  it('should update searchInput property when input value changes', () => {
    const inputElement: DebugElement = fixture.debugElement.query(By.css('input[matInput]'));

    inputElement.nativeElement.value = 'John Doe';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.searchInput).toBe('John Doe');
  });
});
