import { Component, inject, OnInit } from '@angular/core';
import { select, Store } from '@ngxs/store';
import { TCGState } from '../../core/states/tcg.state';
import { TCGGetAllCards } from '../../core/actions/tgc-actions';
import { JsonPipe } from '@angular/common';
import { CardGridComponent } from './components/card-grid/card-grid.component';
import { LoaderComponent } from '../../components/loader.component';
import { DeckCardListComponent } from './components/deck-card-list/deck-card-list.component';
import { CreateDeck, UpdateDeck } from '../../core/actions/deck-actions';
import { Router, RouterModule } from '@angular/router';
import { DeckState } from '../../core/states/deck.state';
import {
  IonContent,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from '@ionic/angular/standalone';
import { switchMap } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    JsonPipe,
    CardGridComponent,
    LoaderComponent,
    DeckCardListComponent,
    RouterModule,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonContent,
  ],
  template: `
    <ion-content [fullscreen]="true">
      <div class="wrapper h-full max-h-full flex flex-col overflow-hidden">
        <div class="mx-8 pt-16">
          <ion-segment value="cardList" slot="fixed" #segment>
            <ion-segment-button value="cardList">
              <ion-label>Card List</ion-label>
            </ion-segment-button>
            <ion-segment-button value="deckDetails">
              <ion-label>Deck Details</ion-label>
            </ion-segment-button>
          </ion-segment>
        </div>
        <div class="grow mt-6 overflow-auto">
          @switch (segment.value) { @case ('deckDetails') {
          <app-deck-card-list (onSaveDeck)="handleSaveDeck($event)" />
          } @default { @defer(when cards().length) {
          <app-card-grid [cards]="cards()" />
          } @placeholder {
          <app-loader />
          } } }
        </div>
      </div>
    </ion-content>
  `,
  styleUrl: './deck-builder.component.scss',
})
export class DeckBuilderComponent implements OnInit {
  readonly store = inject(Store);
  readonly router = inject(Router);
  readonly cards = select(TCGState.cards);
  readonly selectedDeck = select(DeckState.getSelectedDeck);

  ngOnInit(): void {
    this.store.dispatch(new TCGGetAllCards());
  }

  handleSaveDeck(deckName: string) {
    const action = this.selectedDeck()?.id
      ? this.updateDeck(deckName)
      : this.createDeck(deckName);

    action
      .pipe(switchMap(() => this.router.navigate(['/deck-list'])))
      .subscribe();
  }

  createDeck(deckName: string) {
    return this.store.dispatch(new CreateDeck(deckName));
  }

  updateDeck(deckName: string) {
    return this.store.dispatch(new UpdateDeck(deckName));
  }
}
