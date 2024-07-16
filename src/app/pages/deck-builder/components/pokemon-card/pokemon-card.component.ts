import { NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <div
      class="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl hover:brightness-75"
      (click)="onCardClick.emit(card())"
    >
      <!-- <div class="bg-gray-200 text-center text-sm p-2">
                {{ card().name }}
            </div> -->
      <img [src]="card().images.large" [alt]="card().name" height="120" />
      <!-- <div class="bg-gray-200 text-center text-sm p-2">
                {{ card().set.name }}
            </div> -->
    </div>
  `,
  styles: [],
})
export class PokemonCardComponent {
  card = input.required<Card>();
  onCardClick = output<Card>();
}
