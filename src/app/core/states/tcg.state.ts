import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';
import { TCGGetAllCards } from '../actions/tgc-actions';
import { PokemonTCGService } from '../../services/pokemon-tcg.service';
import { tap } from 'rxjs';
import { TCGPage } from '../../types/tgc-page.type';

export type TCGStateModel = {
  tcgPage: TCGPage | null;
};

@State<TCGStateModel>({
  name: 'tcg',
  defaults: {
    tcgPage: null,
  },
})
@Injectable()
export class TCGState {
  private tcgService = inject(PokemonTCGService);

  @Selector()
  static cards(state: TCGStateModel) {
    return state.tcgPage?.data || [];
  }

  @Action(TCGGetAllCards)
  getAllCards(ctx: StateContext<TCGStateModel>) {
    return this.tcgService.getAll().pipe(
      tap((tcgPage) => {
        ctx.patchState({ tcgPage });
      })
    );
  }
}
