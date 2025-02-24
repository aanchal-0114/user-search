import { Component, Inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  standalone: true,
  imports: [UserCardComponent, CommonModule, FormsModule, CommonModule,MatButtonModule,MatSelectModule,MatFormField,MatCardModule],
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users: any[] = []; // Holds original API response
  filteredUsers: any[] = []; // Holds users after sorting/filtering
  sortAscending = true;
  selectedRole: string = '';
  selectedOrder:string='Ascending';

  constructor(@Inject(SearchService) private searchService: SearchService, private userService: UserService) {}

  ngOnInit() {
    this.searchService.query$.subscribe(query => {
      if (query.length >= 3) {
        console.log("Query:", query);
        this.fetchUsers(query);
      }
    });
  }

  fetchUsers(query: string) {
    this.userService.searchUsers(query).subscribe(users => {
      console.log("Fetched Users:", users);
      this.users = users;
      this.applyFilters(); // Ensure sorting & filtering are applied after fetch
    });
  }

  /** Apply sorting & filtering together **/
  applyFilters() {
    let filtered = [...this.users]; // Copy original list to avoid modifying `users`

    // 🔹 Filter by role (if selected)
    if (this.selectedRole) {
      filtered = filtered.filter(user => user.role === this.selectedRole);
    }

    // 🔹 Sort by age
    filtered.sort((a, b) => this.selectedOrder == 'Ascending' ? a.age - b.age : b.age - a.age);

    this.filteredUsers = filtered;
  }

  /** Toggle Sorting Order & Apply Filters **/
  toggleSort(selectedOrder: string) {
    this.selectedOrder = selectedOrder;
    this.applyFilters();
  }

  /** Handle Role Selection & Apply Filters **/
  onRoleChange(role: string) {
    this.selectedRole = role;
    this.applyFilters();
  }
}
