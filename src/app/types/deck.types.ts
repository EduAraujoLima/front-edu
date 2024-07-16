import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';

export type Deck = {
  id: string;
  cartas: Card[];
  name: string;
  quantidadeCartas: number;
  tiposUnicos: string[];
  cores: string[];
  pokemons: number;
  cartasTreinador: number;
};

export type DeckError = {
  isErrored: boolean;
  message: string;
}