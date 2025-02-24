import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserListComponent } from '../user-list/user-list.component';
import { SearchService } from '../../services/search.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-search-bar',
  standalone:true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule,MatIconModule,MatCardModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchInput: string = '';

  constructor(@Inject(SearchService) private searchService: SearchService) {}

  onSearch() {
    if (this.searchInput.length >= 3) {
      this.searchService.setQuery(this.searchInput);
    }
  }
}
