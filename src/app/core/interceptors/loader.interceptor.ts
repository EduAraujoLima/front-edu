import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, retry, RetryConfig } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

export const loaderInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const loaderService = inject(LoaderService);

  loaderService.start();
  return next(req).pipe(finalize(() => loaderService.stop()));
};
