import { Card, Type } from 'pokemon-tcg-sdk-typescript/dist/sdk';
import { Deck, DeckError } from '../types/deck.types';
import { Observable, of, throwError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
export const checkIfCardHasMaxQuantity = (
  cardMap: Map<string, number>,
  cardName: string
): DeckError => {
  const cardQuantity = cardMap.get(cardName) || 0;
  return cardQuantity >= 4
    ? {
        isErrored: true,
        message: `Card ${cardName} has max quantity of 4 per deck`,
      }
    : { isErrored: false, message: '' };
};

export const getDeck = (cards: Card[], name: string): Observable<Deck> => {
  const quantidadeCartas = cards.length;
  if (quantidadeCartas < 24) {
    return throwError(() => 'O Deck precisa ter no mínimo 24 cartas');
  }

  const tiposUnicos = Array.from(new Set(cards.map((card) => card.supertype)));

  const cores: Type[] = cards.reduce((acc, card) => {
    if (card?.types) {
      card.types.forEach((type) => {
        if (!acc.includes(type)) {
          acc.push(type);
        }
      });
    }
    return acc;
  }, [] as Type[]);

  const pokemons = cards.filter((card) => card.supertype === 'Pokémon').length;

  const cartasTreinador = cards.filter(
    (card) => card.supertype === 'Trainer'
  ).length;

  const newDeck: Deck = {
    id: uuidv4(),
    name,
    cartas: cards,
    quantidadeCartas,
    tiposUnicos,
    cores,
    pokemons,
    cartasTreinador,
  };

  return of(newDeck);
};
