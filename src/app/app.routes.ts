import { Routes } from '@angular/router';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchPageComponent } from './components/search-page/search-page.component';

export const routes: Routes = [
    { path: '', component: SearchPageComponent }, // Default route
];
