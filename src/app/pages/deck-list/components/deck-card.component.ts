import { Component, input, output } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonAlert,
} from '@ionic/angular/standalone';
import { Deck } from '../../../types/deck.types';

@Component({
  standalone: true,
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonAlert,
  ],
  selector: 'app-deck-card',
  template: `
    @let deckValue = deck();
    <ion-card>
      <ion-card-header>
        <ion-card-title>{{ deckValue.name }}</ion-card-title>
      </ion-card-header>

      <ion-card-content>
        <p class="text-gray-700">
          Quantidade de Cartas:
          <span class="font-bold">{{ deckValue.quantidadeCartas }}</span>
        </p>
        <p class="text-gray-700">
          @let types = deckValue.tiposUnicos.join(', '); Tipos Únicos:
          <span class="font-bold">{{ types }}</span>
        </p>
        <p class="text-gray-700">
          @let cores = deckValue.cores.join(', '); Cores:
          <span class="font-bold">{{ cores }}</span>
        </p>
        <p class="text-gray-700">
          Pokémons: <span class="font-bold">{{ deckValue.pokemons }}</span>
        </p>
        <p class="text-gray-700">
          Cartas Treinador:
          <span class="font-bold">{{ deckValue.cartasTreinador }}</span>
        </p>
      </ion-card-content>

      <ion-button
        fill="clear"
        id="deleteBtn"
        class="border-4 bg-gradient-to-r from-red-500 to-red-900 border-red-800 text-white px-3"
        >Apagar Baralho</ion-button
      >
      <ion-button
        fill="clear"
        (click)="previewDeck.emit(deckValue.id)"
        class="
                border-4 bg-gradient-to-r from-cyan-500 to-cyan-900 border-cyan-800 text-white px-3"
        >Editar baralho</ion-button
      >
    </ion-card>
    <ion-alert
      trigger="deleteBtn"
      header="Deseja excluir este deck?"
      [buttons]="deleteDeckButtons"
    ></ion-alert>
  `,
})
export class DeckCardComponent {
  deck = input.required<Deck>();
  deleteDeck = output<string>();
  previewDeck = output<string>();

  readonly deleteDeckButtons = [
    {
      text: 'Não',
      role: 'cancel',
    },
    {
      text: 'Sim',
      role: 'confirm',
      handler: () => {
        this.deleteDeck.emit(this.deck().id);
      },
    },
  ];
}
