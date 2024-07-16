import { select, Store } from '@ngxs/store';
import { DeckState } from '../../../../core/states/deck.state';
import { Component, computed, inject, OnInit, output } from '@angular/core';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';
import { RemoveCardFromDeck } from '../../../../core/actions/deck-actions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-deck-card-list',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="flex flex-col justify-between h-full gap-4 flex-grow">
      <input
        type="text"
        placeholder="Deck Name"
        class="w-full p-4 border-b border-cyan-900"
        [(ngModel)]="deckName"
      />
      <ul class="flex-grow overflow-y-scroll">
        @for (card of temporaryCards(); track $index) {
        <li
          class="flex justify-between items-center p-4 border-b border-cyan-900"
        >
          {{ card.name }}
          <button class="text-red-600" (click)="removeCardFromDeck(card)">
            x
          </button>
        </li>
        }
      </ul>
      <p
        class="
        p-4
        bg-cyan-500
        
        text-white
        text-center
        rounded-t-md
        "
      >
        Total de cartas:
        {{ cardQuantity() }}
      </p>
      <button
        class="
        w-full
        p-4
        bg-cyan-900
        text-white
        text-center
        rounded-b-md
        hover:bg-cyan-800
        disabled:bg-cyan-500
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
        (click)="onSaveDeck.emit(deckName)"
        [disabled]="!deckName || cardQuantity() < 24"
      >
        Salvar Baralho
      </button>
    </div>
  `,
  styles: [],
})
export class DeckCardListComponent implements OnInit {
  deckName = '';
  temporaryCards = select(DeckState.getTemporaryCards);
  readonly selectedDeck = select(DeckState.getSelectedDeck);

  cardQuantity = computed(() => this.temporaryCards().length);

  store = inject(Store);
  onSaveDeck = output<string>();

  ngOnInit() {
    if (this.selectedDeck()) {
      this.deckName = this.selectedDeck()?.name || '';
    }
  }

  removeCardFromDeck(card: Card) {
    this.store.dispatch(new RemoveCardFromDeck(card));
  }
}
