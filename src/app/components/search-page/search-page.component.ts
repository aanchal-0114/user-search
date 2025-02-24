import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { UserListComponent } from '../user-list/user-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [SearchBarComponent, UserListComponent, MatToolbarModule, NavbarComponent],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {

}
