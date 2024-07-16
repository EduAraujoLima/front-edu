import { Deck, DeckError } from '../types/deck.types';

export const checkIfCardHasMaxQuantity = (
  cardMap: Map<string, number>,
  cardName: string
): DeckError => {
  const cardQuantity = cardMap.get(cardName) || 0;
  return cardQuantity >= 4
    ? { isErrored: true, message: 'Card has max quantity' }
    : { isErrored: false, message: '' };
};
