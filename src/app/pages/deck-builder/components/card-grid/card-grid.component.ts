import { Component, inject, input } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { Store } from '@ngxs/store';
import { AddCardToDeck } from '../../../../core/actions/deck-actions';
import { LoaderComponent } from '../../../../components/loader.component';
import {
  IonAlert,
  IonCol,
  IonGrid,
  IonRow,
  IonToast,
} from '@ionic/angular/standalone';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-card-grid',
  standalone: true,
  imports: [
    ScrollingModule,
    PokemonCardComponent,
    LoaderComponent,
    IonGrid,
    IonRow,
    IonCol,
    JsonPipe,
    IonAlert,
    IonToast,
  ],
  template: `
    <ion-alert
      [isOpen]="isMaxQuantityAlertOpen"
      header="Error"
      [message]="isMaxQuantityAlertText"
      [buttons]="isMaxQuantityAlertButtons"
      (didDismiss)="isMaxQuantityAlertOpen = false"
    ></ion-alert>

    <ion-toast
      [isOpen]="isAddCardToDeckToastOpen"
      [message]="isAddCardToDeckToastText"
      [duration]="5000"
      (didDismiss)="isAddCardToDeckToastOpen = false"
      position="bottom"
    ></ion-toast>
    <ion-grid>
      <ion-row class="ion-align-items-start">
        @for (card of cards(); track $index) {
        <ion-col size="1">
          <app-pokemon-card
            [card]="card"
            (onCardClick)="addCardToDeck($event)"
          />
        </ion-col>
        }
      </ion-row>
    </ion-grid>
  `,
  styleUrls: ['./card-grid.component.scss'],
})
export class CardGridComponent {
  cards = input.required<Card[]>();
  isMaxQuantityAlertOpen = false;
  isMaxQuantityAlertText = '';
  isMaxQuantityAlertButtons = ['Close'];

  isAddCardToDeckToastOpen = false;
  isAddCardToDeckToastText = '';
  private store = inject(Store);

  addCardToDeck(card: Card) {
    this.store.dispatch(new AddCardToDeck(card)).subscribe({
      next: () => {
        this.isAddCardToDeckToastOpen = true;
        this.isAddCardToDeckToastText = `${card.name} added to deck`;
      },
      error: (message: string) => {
        this.isMaxQuantityAlertOpen = true;
        this.isMaxQuantityAlertText = message;
      },
    });
  }
}
