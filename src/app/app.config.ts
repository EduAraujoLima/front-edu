import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngxs/store';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { TCGState } from './core/states/tcg.state';
import { loaderInterceptor } from './core/interceptors/loader.interceptor';
import { DeckState } from './core/states/deck.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([loaderInterceptor])),
    provideStore([TCGState, DeckState], withNgxsLoggerPlugin(), withNgxsReduxDevtoolsPlugin())
  ],
};
