import { Component, inject, input } from '@angular/core';
import { ScrollingModule, CdkScrollableModule } from '@angular/cdk/scrolling';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { Store } from '@ngxs/store';
import { AddCardToDeck } from '../../../../core/actions/deck-actions';
import { LoaderComponent } from '../../../../components/loader.component';

@Component({
  selector: 'app-card-grid',
  standalone: true,
  imports: [ScrollingModule, PokemonCardComponent, LoaderComponent],
  template: `
    <cdk-virtual-scroll-viewport itemSize="25" class="viewport">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:cols-6 gap-8 p-4"
      >
        <app-pokemon-card
          *cdkVirtualFor="let card of cards()"
          [card]="card"
          (onCardClick)="addCardToDeck($event)"
        />
      </div>
    </cdk-virtual-scroll-viewport>
  `,
  styles: `
    .viewport {
      min-height: 100%;
      width: 100%;
    }

  `,
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
