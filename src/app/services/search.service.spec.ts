import { TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchService]
    });
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with an empty query', (done) => {
    service.query$.subscribe(query => {
      expect(query).toBe('');
      done();
    });
  });

  it('should update query when setQuery is called', (done) => {
    service.setQuery('test search');

    service.query$.subscribe(query => {
      expect(query).toBe('test search');
      done();
    });
  });
});
