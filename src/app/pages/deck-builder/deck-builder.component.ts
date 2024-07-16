import { getDeck } from './../../utils/deck.utils';
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
import { switchMap } from 'rxjs';
import { DeckState } from '../../core/states/deck.state';

@Component({
  standalone: true,
  imports: [
    JsonPipe,
    CardGridComponent,
    LoaderComponent,
    DeckCardListComponent,
    RouterModule,
  ],
  template: `
    <div class="wrapper h-screen w-100 p-8 grid grid-cols-10 gap-8">
      <div
        class="col-span-7 rounded-md bg-white bg-opacity-75 overflow-y-scroll"
      >
        @if(cards().length) {
          <app-card-grid [cards]="cards()" />
        }
        <app-loader />
      </div>
      <div
        class="col-span-3 rounded-md bg-white bg-opacity-75 overflow-y-hidden"
      >
        <app-deck-card-list (onSaveDeck)="handleSaveDeck($event)" />
      </div>
    </div>
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
