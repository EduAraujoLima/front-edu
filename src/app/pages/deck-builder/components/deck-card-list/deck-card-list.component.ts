import { select, Store } from '@ngxs/store';
import { DeckState } from '../../../../core/states/deck.state';
import { Component, computed, inject, OnInit, output } from '@angular/core';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';
import { RemoveCardFromDeck } from '../../../../core/actions/deck-actions';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-deck-card-list',
  standalone: true,
  imports: [
    FormsModule,
    IonInput,
    IonButton,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
  ],
  template: `
    <div class="flex flex-col h-full max-h-full gap-4 px-8 pb-8 ">
      <ion-input
        label="Deck Name"
        label-placement="floating"
        fill="outline"
        placeholder="Enter text"
        [(ngModel)]="deckName"
        class="custom"
      />
      <div class="card-list">
        <ion-list [inset]="true">
          @for (card of temporaryCards(); track $index) {
          <ion-item>
            <ion-label> {{ card.name }}</ion-label>
            <button class="text-red-600" (click)="removeCardFromDeck(card)">
              x
            </button>
          </ion-item>
          }
        </ion-list>
      </div>

      <p class=" p-4 bg-cyan-500 text-white text-center rounded-t-md">
        Total de cartas: {{ cardQuantity() }}
      </p>
      <ion-button
        class="button w-100 h-16 bg-blue-500 rounded-lg cursor-pointer select-none
              active:translate-y-2 active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
              active:border-b-[0px]
              transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
              border-b-[1px] border-blue-400
              "
        (click)="onSaveDeck.emit(deckName)"
        [disabled]="!deckName || cardQuantity() < 24"
      >
        <span
          class="flex flex-col justify-center items-center h-full text-white font-bold text-lg "
          >Save Deck</span
        >
      </ion-button>
    </div>
  `,
  styleUrls: ['./deck-card-list.component.scss'],
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
