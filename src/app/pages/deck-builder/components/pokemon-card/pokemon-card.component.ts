import { Component, input, output } from '@angular/core';
import { IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [IonFab, IonFabButton, IonIcon],
  template: `
    @let cardValue = card();
    <div class="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer ">
      <img
        [src]="cardValue.images.large"
        [alt]="cardValue.name"
        height="120"
        class="hover:shadow-xl hover:brightness-75"
      />
      <ion-fab slot="fixed" horizontal="left" vertical="bottom">
        <ion-fab-button size="small" (click)="onCardClick.emit(cardValue)">
          <ion-icon name="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </div>
  `,
  styles: [],
})
export class PokemonCardComponent {
  card = input.required<Card>();
  onCardClick = output<Card>();

  constructor() {
    addIcons({ add });
  }
}
