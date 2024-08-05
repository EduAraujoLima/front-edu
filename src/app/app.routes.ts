import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-menu',
    pathMatch: 'full',
    
  },
  {
    path: 'main-menu',
    loadComponent: () =>
      import('./pages/main-menu/main-menu.component').then(
        (c) => c.MainMenuComponent
      ),
  },
  {
    path: 'deck-builder',
    loadComponent: () =>
      import('./pages/deck-builder/deck-builder.component').then(
        (c) => c.DeckBuilderComponent
      ),
  },
  {
    path: 'deck-list',
    loadComponent: () =>
      import('./pages/deck-list/deck-list.component').then(
        (c) => c.DeckListComponent
      ),
  },
];
