import { Card } from "pokemon-tcg-sdk-typescript/dist/sdk";

export class CreateDeck {
  static readonly type = '[Deck] Create Deck';
  constructor(public name: string) {}
}

export class AddCardToDeck {
  static readonly type = '[Deck] Add Card To Deck';
  constructor(public card: Card) {}
}

export class RemoveCardFromDeck {
  static readonly type = '[Deck] Remove Card From Deck';
  constructor(public card: Card) {}
}

export class DeleteDeck {
  static readonly type = '[Deck] Delete Deck';
  constructor(public id: string) {}
}

export class SelectDeck {
  static readonly type = '[Deck] Select Deck';
  constructor(public id: string) {}
}

export class UpdateDeck {
  static readonly type = '[Deck] Update Deck';
  constructor(public name: string) {}
}