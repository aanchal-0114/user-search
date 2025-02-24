import { Component, Input } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatCard,MatCardModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input()
  user!: User;
}
