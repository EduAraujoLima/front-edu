import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IgxButtonModule, IgxCardModule } from 'igniteui-angular';
@Component({
  standalone: true,
  imports: [IgxButtonModule, IgxCardModule, RouterLink],
  template: `
    <div class="menu-bg min-h-screen flex items-center justify-center">
      <div
        class="border-4 border-cyan-600 shadow-xl shadow-cyan-200 p-8 gap-12 flex flex-col justify-between menu-card"
      >
        <h1 class="text-3xl font-bold text-white mb-16">Menu Principal</h1>
        <div class="flex flex-col gap-4">
          <button
            class="border-4 bg-gradient-to-r from-cyan-500 to-blue-500 border-cyan-800
           text-white py-4 uppercase font-bold
           hover:from-cyan-600 hover:to-blue-600"
            routerLink="/deck-builder"
          >
            Criar novo deck
          </button>
          <button
            class="border-4 bg-gradient-to-r from-cyan-500 to-blue-500 border-cyan-800
           text-white py-4 uppercase font-bold 
           hover:from-cyan-600 hover:to-blue-600"
           routerLink="/deck-list"
          >
            Consultar decks
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent {}
