import { Injectable } from '@angular/core';
import { Deck, DeckError } from '../../types/deck.types';
import { Card, Type } from 'pokemon-tcg-sdk-typescript/dist/sdk';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  AddCardToDeck,
  CreateDeck,
  DeleteDeck,
  RemoveCardFromDeck,
  SelectDeck,
} from '../actions/deck-actions';
import { of, throwError } from 'rxjs';
import { checkIfCardHasMaxQuantity } from '../../utils/deck.utils';

export type DeckStateModel = {
  decks: Deck[];
  selectedDeck: Deck | null;
  temporaryCards: Card[];
  cardNameQuantity: Map<string, number>;
};

@State<DeckStateModel>({
  name: 'deck',
  defaults: {
    decks: [],
    selectedDeck: null,
    temporaryCards: [],
    cardNameQuantity: new Map(),
  },
})
@Injectable()
export class DeckState {
  @Selector()
  static getDecks(state: DeckStateModel) {
    return state.decks;
  }

  @Selector()
  static getSelectedDeck(state: DeckStateModel) {
    return state.selectedDeck;
  }

  @Selector()
  static getTemporaryCards(state: DeckStateModel) {
    return state.temporaryCards;
  }

  @Action(AddCardToDeck)
  addCardToDeck(ctx: StateContext<DeckStateModel>, action: AddCardToDeck) {
    const state = ctx.getState();
    const cardsLength =
      state.temporaryCards.length + (state.selectedDeck?.cartas.length || 0);

    const deckSizeError: DeckError =
      cardsLength >= 60
        ? { isErrored: true, message: 'Deck is full' }
        : { isErrored: false, message: '' };

    if (deckSizeError.isErrored) {
      return throwError(() => deckSizeError.message);
    }

    const hasMaxQuantity = checkIfCardHasMaxQuantity(
      state.cardNameQuantity,
      action.card.name
    );

    if (hasMaxQuantity.isErrored) {
      return throwError(() => hasMaxQuantity.message);
    }

    const cardQuantity = state.cardNameQuantity.get(action.card.name) || 0;

    return of(
      ctx.patchState({
        temporaryCards: [...state.temporaryCards, action.card],
        cardNameQuantity: state.cardNameQuantity.set(
          action.card.name,
          cardQuantity + 1
        ),
      })
    );
  }

  @Action(RemoveCardFromDeck)
  removeCardFromDeck(
    ctx: StateContext<DeckStateModel>,
    action: RemoveCardFromDeck
  ) {
    const state = ctx.getState();

    const cardQuantity = state.cardNameQuantity.get(action.card.name) || 0;

    const newCardQuantity = cardQuantity - 1;

    if (newCardQuantity <= 0) {
      state.cardNameQuantity.delete(action.card.name);
    } else {
      state.cardNameQuantity.set(action.card.name, newCardQuantity);
    }

    const cardIndex = state.temporaryCards.findIndex(
      (card) => card.id === action.card.id
    );

    const newTemporaryCards = [...state.temporaryCards];

    newTemporaryCards.splice(cardIndex, 1);

    return of(
      ctx.patchState({
        temporaryCards: newTemporaryCards,
        cardNameQuantity: state.cardNameQuantity,
      })
    );
  }

  @Action(DeleteDeck)
  deleteDeck(ctx: StateContext<DeckStateModel>, action: DeleteDeck) {
    const state = ctx.getState();
    const newDecks = state.decks.filter((deck) => deck.id !== action.id);
    return of(ctx.patchState({ decks: newDecks }));
  }

  @Action(SelectDeck)
  selectDeck(ctx: StateContext<DeckStateModel>, action: SelectDeck) {
    const state = ctx.getState();
    const selectedDeck = state.decks.find((deck) => deck.id === action.id);
    return of(
      ctx.patchState({
        selectedDeck,
        temporaryCards: selectedDeck?.cartas || [],
      })
    );
  }

  @Action(CreateDeck)
  createDeck(ctx: StateContext<DeckStateModel>, action: CreateDeck) {
    const state = ctx.getState();

    const quantidadeCartas = state.temporaryCards.length;

    if (quantidadeCartas < 24) {
      return throwError(() => 'O Deck precisa ter no mínimo 24 cartas');
    }

    const tiposUnicos = Array.from(
      new Set(state.temporaryCards.map((card) => card.supertype))
    );

    const cores: Type[] = state.temporaryCards.reduce((acc, card) => {
      if (card?.types) {
        card.types.forEach((type) => {
          if (!acc.includes(type)) {
            acc.push(type);
          }
        });
      }
      return acc;
    }, [] as Type[]);

    const pokemons = state.temporaryCards.filter(
      (card) => card.supertype === 'Pokémon'
    ).length;
    const cartasTreinador = state.temporaryCards.filter(
      (card) => card.supertype === 'Trainer'
    ).length;

    const newDeck: Deck = {
      id: crypto.randomUUID(),
      name: action.name,
      cartas: state.temporaryCards,
      quantidadeCartas,
      tiposUnicos,
      cores,
      pokemons,
      cartasTreinador,
    };

    return of(
      ctx.patchState({
        decks: [...state.decks, newDeck],
        temporaryCards: [],
        cardNameQuantity: new Map(),
      })
    );
  }
}
