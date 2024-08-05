import { Component, inject } from '@angular/core';
import { select, Store } from '@ngxs/store';
import { DeckState } from '../../core/states/deck.state';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { DeleteDeck, SelectDeck } from '../../core/actions/deck-actions';
import { switchMap } from 'rxjs';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/angular/standalone';
import { DeckCardComponent } from './components/deck-card.component';

@Component({
  standalone: true,
  selector: 'app-deck-list',
  imports: [
    RouterLink,
    RouterModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    DeckCardComponent,
  ],
  template: `
    <div
      class="wrapper h-screen w-100 flex justify-center items-center flex-col gap-8"
    >
      @if(decks().length === 0) {
      <div
        class="text-2xl text-white font-bold text-center bg-red-600 p-8 rounded-md"
      >
        Nenhum deck encontrado
      </div>
      } @else {
      <div class="flex flex-col gap-8">
        @for (deck of decks(); track $index) {
        <app-deck-card
          [deck]="deck"
          (deleteDeck)="deleteDeck($event)"
          (previewDeck)="previewDeck($event)"
        />
        }
      </div>
      }
      <button
        class="border-4 bg-gradient-to-r from-cyan-500 to-blue-500 border-cyan-800
         text-white py-4 uppercase font-bold
         hover:from-cyan-600 hover:to-blue-600 px-4"
        routerLink="/deck-builder"
        (click)="resetDeck()"
      >
        Criar novo deck
      </button>
    </div>
  `,
  styleUrl: './deck-list.component.scss',
})
export class DeckListComponent {
  decks = select(DeckState.getDecks);
  store = inject(Store);
  router = inject(Router);

  deleteDeck(id: string) {
    this.store.dispatch(new DeleteDeck(id));
  }

  previewDeck(id: string) {
    this.store
      .dispatch(new SelectDeck(id))
      .pipe(switchMap(() => this.router.navigate(['/deck-builder'])))
      .subscribe();
  }

  resetDeck() {
    this.store.dispatch(new SelectDeck(''));
  }
}
