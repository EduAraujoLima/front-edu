import { Component, inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';

@Component({
  standalone: true,
  selector: 'app-loader',
  template: `
    @if(isLoading()) {
    <div class="wrapper">
      <div class="pokemon"></div>
    </div>
    }
  `,
  styles: [
    `
      .wrapper {
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
        inset: 0;
      }
      .pokemon {
        inset: 0;
        height: 100px;
        width: 100px;
        background: linear-gradient(to bottom, rgb(254, 0, 1) 50%, white 50%);
        border-radius: 50%;
        border: 8px solid black;
        animation: spin 1s linear infinite;
      }

      .pokemon::before {
        content: '';
        position: absolute;
        height: 8px;
        width: 100px;
        background: black;
        top: 50px;
        transform: translatey(-50%);
      }

      .pokemon::after {
        content: '';
        position: absolute;
        height: 38px;
        width: 38px;
        border-radius: 50%;
        background: white;
        top: 50px;
        left: 50px;
        transform: translate(-50%, -50%);
        box-shadow: inset 0 0 0 8px black, inset 0 0 0 10px white,
          inset 0 0 0 12px black;
      }

      /* Spin Animation */
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoaderComponent {
  isLoading = inject(LoaderService).isLoading;
}
