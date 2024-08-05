import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { IgxButtonModule, IgxCardModule } from 'igniteui-angular';
import { SelectDeck } from '../../core/actions/deck-actions';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
@Component({
  standalone: true,
  imports: [
    IgxButtonModule,
    IgxCardModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
  ],
  template: `
    <ion-content>
      <div class="flex items-center flex-col justify-around h-full menu-bg">
        <img
          alt="Silhouette of mountains"
          src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Pok%C3%A9mon_Trading_Card_Game_logo.svg"
        />
        <div class="flex flex-col gap-8">
          <ion-button
            class="button w-60 h-16 bg-blue-500 rounded-lg cursor-pointer select-none
              active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
              active:border-b-[0px]
              transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
              border-b-[1px] border-blue-400
              "
            (click)="resetDeck()"
            routerLink="/deck-builder"
          >
            <span
              class="flex flex-col justify-center items-center h-full text-white font-bold text-lg "
              >Criar novo deck</span
            >
          </ion-button>

          <ion-button
            class="button w-60 h-16 bg-blue-500 rounded-lg cursor-pointer select-none
              active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
              active:border-b-[0px]
              transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
              border-b-[1px] border-blue-400
              "
            routerLink="/deck-list"
          >
            <span
              class="flex flex-col justify-center items-center h-full text-white font-bold text-lg "
              >Listar decks</span
            >
          </ion-button>
        </div>
      </div>
    </ion-content>
  `,
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent {
  store = inject(Store);

  resetDeck() {
    this.store.dispatch(new SelectDeck(''));
  }
}
