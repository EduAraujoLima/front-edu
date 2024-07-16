import { Component, inject } from '@angular/core';
import { select, Store } from '@ngxs/store';
import { DeckState } from '../../core/states/deck.state';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { DeleteDeck, SelectDeck } from '../../core/actions/deck-actions';
import { switchMap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-deck-list',
  imports: [RouterLink, RouterModule],
  template: `
    <div
      class="wrapper h-screen w-100 flex justify-center items-center flex-col gap-8"
    >
      @if(decks().length === 0) {
      <div
        class="text-2xl text-white font-bold text-center bg-red-600 p-8 rounded-md"
      >
        Nenhum deck encontrado
      </div>
      } @else {
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-white bg-opacity-75 w-4/5 rounded-md shadow-md"
      >
        @for (deck of decks(); track $index) {
        <div class="card bg-white shadow-md rounded-md overflow-hidden">
          <div class="flex flex-col items-center justify-between p-6">
            <h3 class="text-2xl font-bold text-gray-900">{{ deck.name }}</h3>
            <div class="mt-4">
              <p class="text-gray-700">
                Quantidade de Cartas:
                <span class="font-bold">{{ deck.quantidadeCartas }}</span>
              </p>
              <p class="text-gray-700">
                @let types = deck.tiposUnicos.join(', '); Tipos Únicos:
                <span class="font-bold">{{ types }}</span>
              </p>
              <p class="text-gray-700">
                @let cores = deck.tiposUnicos.join(', '); Cores:
                <span class="font-bold">{{ cores }}</span>
              </p>
              <p class="text-gray-700">
                Pokémons: <span class="font-bold">{{ deck.pokemons }}</span>
              </p>
              <p class="text-gray-700">
                Cartas Treinador:
                <span class="font-bold">{{ deck.cartasTreinador }}</span>
              </p>
            </div>
            <div class="flex justify-between gap-3">
              <button
                (click)="deleteDeck(deck.id)"
                class="
                border-4 bg-gradient-to-r from-red-500 to-red-900 border-red-800 text-white px-3"
              >
                Deletar deck
              </button>
              <button
                (click)="previewDeck(deck.id)"
                class="
                border-4 bg-gradient-to-r from-cyan-500 to-cyan-900 border-cyan-800 text-white px-3"
              >
                Visualizar deck
              </button>
            </div>
          </div>
        </div>
        }
      </div>
      }
      <button
        class="border-4 bg-gradient-to-r from-cyan-500 to-blue-500 border-cyan-800
         text-white py-4 uppercase font-bold
         hover:from-cyan-600 hover:to-blue-600 px-4"
        routerLink="/deck-builder"
        (click)="resetDeck()"
      >
        Criar novo deck
      </button>
    </div>
  `,
  styleUrl: './deck-list.component.scss',
})
export class DeckListComponent {
  decks = select(DeckState.getDecks);
  store = inject(Store);
  router = inject(Router);

  deleteDeck(id: string) {
    this.store.dispatch(new DeleteDeck(id));
  }

  previewDeck(id: string) {
    this.store
      .dispatch(new SelectDeck(id))
      .pipe(switchMap(() => this.router.navigate(['/deck-builder'])))
      .subscribe();
  }

  resetDeck() {
    this.store.dispatch(new SelectDeck(''));
  }
}
