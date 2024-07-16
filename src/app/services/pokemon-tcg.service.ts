import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TCGPage } from '../types/tgc-page.type';
@Injectable({
  providedIn: 'root',
})
export class PokemonTCGService {
  private http = inject(HttpClient);
  getAll() {
    return this.http.get<TCGPage>('https://api.pokemontcg.io/v2/cards')
  }
}
