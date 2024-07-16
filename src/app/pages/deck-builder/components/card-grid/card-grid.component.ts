import { Component, inject, input } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { Store } from '@ngxs/store';
import { AddCardToDeck } from '../../../../core/actions/deck-actions';

@Component({
  selector: 'app-card-grid',
  standalone: true,
  imports: [ScrollingModule, PokemonCardComponent],
  template: `
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:cols-6 gap-8 p-4"
    >
      @for (card of cards(); track $index) {
      <app-pokemon-card [card]="card" (onCardClick)="addCardToDeck($event)" />
      }
    </div>
  `,
  styles: [],
})
export class CardGridComponent {
  cards = input.required<Card[]>();
  private store = inject(Store);

  addCardToDeck(card: Card) {
    this.store.dispatch(new AddCardToDeck(card)).subscribe({
      error: (message: string) => {
        alert(message || 'An error occurred');
      },
    });
  }
}
