import { HttpInterceptorFn } from '@angular/common/http';

console.log('Interceptor cargado');
export const authInterceptor: HttpInterceptorFn =
  (req, next) => {

    console.log(
      `[${req.method}] ${req.url}`
    );

    return next(req);
  };