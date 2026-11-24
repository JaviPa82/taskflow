import { HttpInterceptorFn } from '@angular/common/http';

import { catchError } from 'rxjs/operators';

import { throwError } from 'rxjs';

export const errorInterceptor:
  HttpInterceptorFn = (req, next) => {

    return next(req).pipe(

        catchError(error => {

            switch (error.status) {

                case 401:
                console.error(
                    '401 - No autorizado'
                );
                break;

                case 404:
                console.error(
                    '404 - Recurso no encontrado'
                );
                break;

                case 500:
                console.error(
                    '500 - Error interno'
                );
                break;

                default:
                console.error(
                    `Error ${error.status}`
                );
            }

            return throwError(
                () => error
            );
        })

    );

  };