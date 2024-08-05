import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  IonToolbar,
  IonContent,
  IonHeader,
  IonTitle,
  IonApp,
  IonTabs,
  IonTabBar,
  IonIcon,
  IonTabButton,
  IonFooter, IonRouterOutlet } from '@ionic/angular/standalone';
  import { addIcons } from 'ionicons';
  import { radio, library, playCircle, search } from 'ionicons/icons';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IonTabs,
    IonTabBar,
    IonIcon,
    IonTabButton,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'poke-tcg';

  constructor() {
    addIcons({
      radio, library, playCircle, search
    });
  }
}
